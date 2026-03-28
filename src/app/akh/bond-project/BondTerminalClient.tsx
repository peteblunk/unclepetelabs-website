'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBondEducation } from '@/hooks/useBondEducation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Format currency
const formatMoney = (amount: string) => {
  if (!amount || amount === 'null') return 'N/A';
  const num = parseFloat(amount);
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  return `$${num.toLocaleString()}`;
};

// Calculate Allotment Percentage safely
const calculateAllotment = (accepted: string, total: string) => {
  if (!accepted || !total || accepted === 'null' || total === 'null') return 'N/A';
  return ((parseFloat(accepted) / parseFloat(total)) * 100).toFixed(1) + '%';
};

// Calculate proxy tail (High - Low yield if WI isn't in this specific dataset)
const calculateTail = (high: string, low: string) => {
  if (!high || !low || high === 'null' || low === 'null') return 'N/A';
  const diff = (parseFloat(high) - parseFloat(low)) * 100; // basis points
  if (diff === 0) return '0.0bps';
  return diff > 0 ? `+${diff.toFixed(1)}bps` : `${diff.toFixed(1)}bps`;
};

export default function BondTerminalClient({ initialData }: { initialData: any[] }) {
  const [filter, setFilter] = useState('ALL');
  const [heroFilter, setHeroFilter] = useState('ALL');
  const [menuOpen, setMenuOpen] = useState(false);
  const { getDefinition } = useBondEducation();

  // Parse the raw Treasury API data into our clean mock format
  const parsedData = initialData.map((raw: any, index: number) => {
    // Determine the true yield (Bills use investment rate or discount rate)
    let finalYield = 'N/A';
    if (raw.high_yield !== 'null') {
      finalYield = `${parseFloat(raw.high_yield).toFixed(3)}%`;
    } else if (raw.high_investment_rate !== 'null') {
      finalYield = `${parseFloat(raw.high_investment_rate).toFixed(3)}%`;
    } else if (raw.high_discnt_rate !== 'null') {
      finalYield = `${parseFloat(raw.high_discnt_rate).toFixed(3)}%`;
    }

    // Proxy tail calculation depending on instrument
    let finalTail = 'N/A';
    if (raw.high_yield !== 'null' && raw.low_yield !== 'null') {
      finalTail = calculateTail(raw.high_yield, raw.low_yield);
    } else if (raw.high_investment_rate !== 'null' && raw.low_investment_rate !== 'null') {
      finalTail = calculateTail(raw.high_investment_rate, raw.low_investment_rate);
    } else if (raw.high_discnt_rate !== 'null' && raw.low_discnt_rate !== 'null') {
      finalTail = calculateTail(raw.high_discnt_rate, raw.low_discnt_rate);
    }

    return {
      id: `${raw.cusip || 'unknown'}-${index}`,
      type: raw.security_type === 'Bill' ? `${raw.security_term} T-Bill` : `${raw.security_term} ${raw.security_type}`,
      size: formatMoney(raw.offering_amt),
      yield: finalYield,
      tail: finalTail,
      btc: raw.bid_to_cover_ratio !== 'null' ? parseFloat(raw.bid_to_cover_ratio).toFixed(2) : 'N/A',
      primary: calculateAllotment(raw.primary_dealer_accepted, raw.total_accepted),
      direct: calculateAllotment(raw.direct_bidder_accepted, raw.total_accepted),
      indirect: calculateAllotment(raw.indirect_bidder_accepted, raw.total_accepted),
      rawDate: new Date(raw.auction_date),
    };
  });

  // Apply quick filters for the tape
  const filteredData = parsedData.filter((item: any) => {
    if (filter === 'ALL') return true;
    const typeStr = item.type.toLowerCase();
    if (filter === 'BILLS') return typeStr.includes('bill') || typeStr.includes('cmb');
    if (filter === 'NOTES') return typeStr.includes('note');
    if (filter === 'BONDS') return typeStr.includes('bond') || typeStr.includes('tips');
    return true;
  });

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Historical tape should only include completed auctions
  const historicalTape = filteredData.filter((a: any) => a.yield !== 'N/A' && a.rawDate < now);

  // Hero filter logic (separate from tape filter)
  const completedAuctions = parsedData.filter((a: any) => a.yield !== 'N/A');
  const heroFiltered = completedAuctions.filter((item: any) => {
    if (heroFilter === 'ALL') return true;
    const typeStr = item.type.toLowerCase();
    if (heroFilter === 'BILLS') return typeStr.includes('bill') || typeStr.includes('cmb');
    if (heroFilter === 'NOTES') return typeStr.includes('note');
    if (heroFilter === 'BONDS') return typeStr.includes('bond') || typeStr.includes('tips');
    return true;
  });
  const latestCompleted = heroFiltered[0] || null;

  // Upcoming auctions: Yield is N/A AND date is today or in the future
  const upcomingAuctions = parsedData
    .filter((a: any) => a.yield === 'N/A' && a.rawDate >= now)
    .sort((a: any, b: any) => a.rawDate.getTime() - b.rawDate.getTime());

  return (
    <TooltipProvider>
    <div className="min-h-screen bg-[#050505] text-[#33ff33] font-mono p-4 flex flex-col pt-24 overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#33ff33]/40 pb-2 mb-6 flex justify-between items-end px-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#ffaa00] drop-shadow-[0_0_8px_rgba(255,170,0,0.6)]">
          PER-HEDJ TERMINAL
        </h1>
        <div className="flex items-center gap-4">
          <Link href="/akh/per-ankh" className="text-[10px] text-[#d600ff] uppercase font-bold tracking-wider hover:underline flex items-center gap-1 border border-[#d600ff]/30 px-2 py-1 bg-[#d600ff]/10">
            KNOWLEDGE_BASE (PER-ANKH)
          </Link>
          <div className="text-xs text-[#00ffff] uppercase font-bold tracking-wider hidden sm:block">
            MARKET PLUMBING | YTD AUCTIONS: {initialData.length}
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Hero Dashboard */}
        <div className="col-span-1 lg:col-span-1 flex flex-col gap-4">
          
          {/* Upcoming Auctions Ticker */}
          <div className="border border-[#00ffff]/60 bg-[#00ffff]/10 p-3 shadow-[0_0_10px_rgba(0,255,255,0.1)] flex flex-col max-h-[160px] overflow-y-auto scrollbar-hide">
            <div className="text-[#00ffff] text-[10px] uppercase tracking-widest border-b border-[#00ffff]/30 pb-1 mb-2 sticky top-0 bg-[#061a1a] z-10">
              Upcoming Auctions
            </div>
            {upcomingAuctions.length > 0 ? (
              <div className="flex flex-col gap-2">
                {upcomingAuctions.map((ua: any) => (
                  <div key={ua.id} className="flex justify-between items-center text-sm border-b border-[#00ffff]/10 pb-1">
                    <div>
                      <span className="font-bold text-white mr-2">{ua.type.replace('-Week', '-Wk').replace('-Year', '-Yr').replace('-Month', '-Mo')}</span>
                      <span className="text-[#00ffff]">{ua.size.replace('.0B', 'B')}</span>
                    </div>
                    <span className="text-[#00ffff]/70 text-[10px]">{ua.rawDate.toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'})}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[10px] text-[#00ffff]/50 uppercase text-center mt-2">No Future Auctions</div>
            )}
          </div>

          <div className="border border-[#ffaa00]/60 bg-black/60 p-4 shadow-[0_0_15px_rgba(255,170,0,0.1)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#ffaa00]/30 pb-1 mb-4 gap-2">
              <h2 className="text-[#ffaa00] text-xs sm:text-sm uppercase tracking-widest">
                Most Recent Completed
              </h2>
              <div className="flex flex-wrap gap-1 text-[8px] sm:text-[10px]">
                <button onClick={() => setHeroFilter('ALL')} className={`px-2 py-1 font-bold transition-colors ${heroFilter === 'ALL' ? 'bg-[#ffaa00] text-black' : 'border border-[#ffaa00] text-[#ffaa00] hover:bg-[#ffaa00]/20'}`}>ALL</button>
                <button onClick={() => setHeroFilter('BILLS')} className={`px-2 py-1 font-bold transition-colors ${heroFilter === 'BILLS' ? 'bg-[#ffaa00] text-black' : 'border border-[#ffaa00] text-[#ffaa00] hover:bg-[#ffaa00]/20'}`}>BILLS</button>
                <button onClick={() => setHeroFilter('NOTES')} className={`px-2 py-1 font-bold transition-colors ${heroFilter === 'NOTES' ? 'bg-[#ffaa00] text-black' : 'border border-[#ffaa00] text-[#ffaa00] hover:bg-[#ffaa00]/20'}`}>NOTES</button>
                <button onClick={() => setHeroFilter('BONDS')} className={`px-2 py-1 font-bold transition-colors ${heroFilter === 'BONDS' ? 'bg-[#ffaa00] text-black' : 'border border-[#ffaa00] text-[#ffaa00] hover:bg-[#ffaa00]/20'}`}>BONDS</button>
              </div>
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{latestCompleted?.type || 'No Data'}</div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl text-[#00ffff]">SIZE: {latestCompleted?.size || 'N/A'}</span>
              <span className="text-[#888] text-xs">{latestCompleted?.rawDate.toLocaleDateString()}</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="border border-[#33ff33]/30 p-2 bg-[#111]">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-[10px] text-[#888] mb-1 uppercase truncate cursor-help border-b border-dotted border-[#888]">Stop-Out Yield</div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-[#33ff33] border-[#33ff33] max-w-[200px]">
                    {getDefinition('Stop-Out Yield')}
                  </TooltipContent>
                </Tooltip>
                <div className="text-xl sm:text-2xl text-[#33ff33]">{latestCompleted?.yield}</div>
              </div>
              <div className="border border-[#ff3333]/40 p-2 bg-[#111]">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-[10px] text-[#888] mb-1 uppercase truncate cursor-help border-b border-dotted border-[#888]">Spread / Tail</div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-[#ff3333] border-[#ff3333] max-w-[200px]">
                    {getDefinition('Spread / Tail')}
                  </TooltipContent>
                </Tooltip>
                <div className="text-xl sm:text-2xl text-[#ff3333]">{latestCompleted?.tail}</div>
              </div>
              <div className="border border-[#00ffff]/30 p-2 bg-[#111]">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-[10px] text-[#888] mb-1 uppercase truncate cursor-help border-b border-dotted border-[#888]">Bid-to-Cover</div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-[#00ffff] border-[#00ffff] max-w-[200px]">
                    {getDefinition('Bid-to-Cover')}
                  </TooltipContent>
                </Tooltip>
                <div className="text-xl sm:text-2xl text-[#00ffff]">{latestCompleted?.btc}</div>
              </div>
              <div className="border border-[#ffaa00]/30 p-2 bg-[#111]">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-[10px] text-[#888] mb-1 uppercase truncate cursor-help border-b border-dotted border-[#888]">Primary Dealer Takedown</div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-[#ffaa00] border-[#ffaa00] max-w-[200px]">
                    {getDefinition('Primary Dealer Takedown')}
                  </TooltipContent>
                </Tooltip>
                <div className="text-xl sm:text-2xl text-[#ffaa00]">{latestCompleted?.primary}</div>
              </div>
              <div className="border border-[#d600ff]/30 p-2 bg-[#111]">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-[10px] text-[#888] mb-1 uppercase truncate cursor-help border-b border-dotted border-[#888]">Indirect Allotment</div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-[#d600ff] border-[#d600ff] max-w-[200px]">
                    {getDefinition('Indirect Allotment')}
                  </TooltipContent>
                </Tooltip>
                <div className="text-xl sm:text-2xl text-[#d600ff]">{latestCompleted?.indirect}</div>
              </div>
            </div>
          </div>
          
          <div className="border border-[#33ff33]/40 bg-black/60 p-4 flex-1">
             <h2 className="text-[#33ff33] text-sm uppercase tracking-widest border-b border-[#33ff33]/30 pb-1 mb-4">Signal Analysis</h2>
             <p className="text-xs text-[#aaa] leading-relaxed">
               &gt; <span className="text-[#33ff33]">LIVE FEED ESTABLISHED:</span> Connected to Fiscal Data Vault.
               <br/><br/>
               &gt; The {latestCompleted?.type} cleared at {latestCompleted?.yield} with a bid-to-cover of {latestCompleted?.btc}. 
               Primary Dealer allotment printed at {latestCompleted?.primary}. 
               <br/><br/>
               &gt; ALGO RECOMMENDATION: Compare {latestCompleted?.primary} dealer takedown against historical 6-month moving average to confirm true structural demand.
             </p>
          </div>
        </div>

        {/* Right Column - Data Table / Squawk Box */}
        <div className="col-span-1 lg:col-span-2 border border-[#33ff33]/40 bg-black/60 p-4 overflow-hidden flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#33ff33]/30 pb-2 mb-4 gap-2">
            <h2 className="text-[#33ff33] text-[10px] sm:text-sm uppercase tracking-widest">Historical Tape (YTD)</h2>
            <div className="flex flex-wrap gap-1 sm:gap-2 text-[8px] sm:text-[10px]">
              <button onClick={() => setFilter('ALL')} className={`px-2 sm:px-3 py-1 font-bold transition-colors ${filter === 'ALL' ? 'bg-[#33ff33] text-black' : 'border border-[#33ff33] text-[#33ff33] hover:bg-[#33ff33]/20'}`}>ALL</button>
              <button onClick={() => setFilter('BILLS')} className={`px-2 sm:px-3 py-1 font-bold transition-colors ${filter === 'BILLS' ? 'bg-[#33ff33] text-black' : 'border border-[#33ff33] text-[#33ff33] hover:bg-[#33ff33]/20'}`}>BILLS</button>
              <button onClick={() => setFilter('NOTES')} className={`px-2 sm:px-3 py-1 font-bold transition-colors ${filter === 'NOTES' ? 'bg-[#33ff33] text-black' : 'border border-[#33ff33] text-[#33ff33] hover:bg-[#33ff33]/20'}`}>NOTES</button>
              <button onClick={() => setFilter('BONDS')} className={`px-2 sm:px-3 py-1 font-bold transition-colors ${filter === 'BONDS' ? 'bg-[#33ff33] text-black' : 'border border-[#33ff33] text-[#33ff33] hover:bg-[#33ff33]/20'}`}>BONDS</button>
            </div>
          </div>

          <div className="overflow-x-auto flex-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            <table className="w-full text-left text-[10px] sm:text-xs">
              <thead className="sticky top-0 bg-[#050505] z-10">
                <tr className="text-[#888] border-b border-[#33ff33]/20">
                  <th className="pb-2 font-normal whitespace-nowrap">DATE</th>
                  <th className="pb-2 font-normal whitespace-nowrap pl-1 sm:px-2">TYPE</th>
                  <th className="pb-2 font-normal whitespace-nowrap">SIZE</th>
                  <th className="pb-2 font-normal whitespace-nowrap pl-1">YIELD</th>
                  <th className="pb-2 font-normal whitespace-nowrap pl-1">BTC</th>
                  <th className="pb-2 font-normal whitespace-nowrap hidden sm:table-cell pl-1">PRIMARY</th>
                  <th className="pb-2 font-normal whitespace-nowrap hidden sm:table-cell pl-1">INDIRECT</th>
                </tr>
              </thead>
              <tbody className="text-[#eee]">
                {historicalTape.slice(0, 50).map((auction: any) => (
                  <tr key={auction.id} className="border-b border-[#33ff33]/10 hover:bg-[#33ff33]/10 cursor-pointer transition-colors group">
                    <td className="py-2 sm:py-3 pr-1 text-[#888] whitespace-nowrap">{auction.rawDate.toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'})}</td>
                    <td className="py-2 sm:py-3 pl-1 sm:px-2 text-[#ffaa00] group-hover:text-white whitespace-nowrap max-w-[80px] sm:max-w-none truncate">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">{auction.type.replace('-Week', '-Wk').replace('-Year', '-Yr').replace('-Month', '-Mo')}</span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-black text-[#ffaa00] border-[#ffaa00]">
                          {auction.type.includes('Bill') ? getDefinition('T-Bill') : (auction.type.includes('Note') ? getDefinition('Note') : (auction.type.includes('Bond') ? getDefinition('Bond') : auction.type))}
                        </TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 sm:py-3 whitespace-nowrap">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">{auction.size.replace('.0B', 'B')}</span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-black text-[#33ff33] border-[#33ff33]">
                          The total par amount of securities allotted to all successful bidders in the auction.
                        </TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 sm:py-3 text-[#33ff33] whitespace-nowrap pl-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">{auction.yield}</span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-black text-[#33ff33] border-[#33ff33]">
                          {getDefinition('Stop-Out Yield')}
                        </TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 sm:py-3 text-[#00ffff] whitespace-nowrap pl-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">{auction.btc}</span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-black text-[#00ffff] border-[#00ffff]">
                          {getDefinition('Bid-to-Cover')}
                        </TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 sm:py-3 hidden sm:table-cell pl-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">{auction.primary}</span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-black text-[#ffaa00] border-[#ffaa00]">
                          {getDefinition('Primary Dealer Takedown')}
                        </TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="py-2 sm:py-3 hidden sm:table-cell pl-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">{auction.indirect}</span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-black text-[#d600ff] border-[#d600ff]">
                          {getDefinition('Indirect Allotment')}
                        </TooltipContent>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-[10px] text-[#555] italic text-right border-t border-[#33ff33]/20 pt-2">
            Showing latest {Math.min(historicalTape.length, 50)} prints. Filter to isolate tenors.
          </div>
        </div>

      </div>
    </div>
    </TooltipProvider>
  );
}
