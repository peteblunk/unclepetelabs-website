'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
  const [menuOpen, setMenuOpen] = useState(false);

  // Parse the raw Treasury API data into our clean mock format
  const parsedData = initialData.map((raw: any, index: number) => ({
    id: `${raw.cusip || 'unknown'}-${index}`,
    type: `${raw.security_term} ${raw.security_type}`,
    size: formatMoney(raw.offering_amt),
    yield: raw.high_yield !== 'null' ? `${parseFloat(raw.high_yield).toFixed(3)}%` : 'N/A',
    tail: calculateTail(raw.high_yield, raw.low_yield),
    btc: raw.bid_to_cover_ratio !== 'null' ? parseFloat(raw.bid_to_cover_ratio).toFixed(2) : 'N/A',
    primary: calculateAllotment(raw.primary_dealer_accepted, raw.total_accepted),
    direct: calculateAllotment(raw.direct_bidder_accepted, raw.total_accepted),
    indirect: calculateAllotment(raw.indirect_bidder_accepted, raw.total_accepted),
    rawDate: new Date(raw.auction_date),
  }));

  // Apply quick filters
  const filteredData = parsedData.filter((item: any) => {
    if (filter === 'ALL') return true;
    const typeStr = item.type.toLowerCase();
    if (filter === 'BILLS') return typeStr.includes('bill') || typeStr.includes('cmb');
    if (filter === 'NOTES') return typeStr.includes('note');
    if (filter === 'BONDS') return typeStr.includes('bond') || typeStr.includes('tips');
    return true;
  });

  const completedAuctions = filteredData.filter((a: any) => a.yield !== 'N/A');
  const latestCompleted = completedAuctions[0] || null;

  // Find the next upcoming auction (yield is N/A, sorted by closest date first)
  const upcomingAuctions = filteredData
    .filter((a: any) => a.yield === 'N/A')
    .sort((a: any, b: any) => a.rawDate.getTime() - b.rawDate.getTime());
  const nextUpcoming = upcomingAuctions[0] || null;

  return (
    <div className="min-h-screen bg-[#050505] text-[#33ff33] font-mono p-4 flex flex-col pt-24 overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#33ff33]/40 pb-2 mb-6 flex justify-between items-end px-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#ffaa00] drop-shadow-[0_0_8px_rgba(255,170,0,0.6)]">
          PER-HEDJ TERMINAL
        </h1>
        <div className="text-xs text-[#00ffff] uppercase font-bold tracking-wider hidden sm:block">
          MARKET PLUMBING | YTD AUCTIONS: {initialData.length}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Hero Dashboard */}
        <div className="col-span-1 lg:col-span-1 flex flex-col gap-4">
          
          {/* Upcoming Auction Ticker */}
          {nextUpcoming ? (
            <div className="border border-[#00ffff]/60 bg-[#00ffff]/10 p-3 shadow-[0_0_10px_rgba(0,255,255,0.1)] flex flex-col">
              <div className="text-[#00ffff] text-[10px] uppercase tracking-widest border-b border-[#00ffff]/30 pb-1 mb-2 flex justify-between">
                <span>Next Upcoming Auction</span>
                <span>{nextUpcoming.rawDate.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-base sm:text-lg">{nextUpcoming.type}</span>
                <span className="text-[#00ffff] font-bold">{nextUpcoming.size}</span>
              </div>
            </div>
          ) : (
             <div className="border border-[#00ffff]/30 bg-black/60 p-3 flex justify-between items-center text-[10px] text-[#00ffff]/50 uppercase tracking-widest">
               <span>Next Upcoming Auction</span>
               <span>No Data</span>
             </div>
          )}

          <div className="border border-[#ffaa00]/60 bg-black/60 p-4 shadow-[0_0_15px_rgba(255,170,0,0.1)]">
            <h2 className="text-[#ffaa00] text-sm uppercase tracking-widest border-b border-[#ffaa00]/30 pb-1 mb-4 flex justify-between">
              <span>Most Recent Completed</span>
              <span className="text-white text-xs">{latestCompleted?.rawDate.toLocaleDateString()}</span>
            </h2>
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{latestCompleted?.type || 'No Data'}</div>
            <div className="text-xl text-[#00ffff] mb-6">SIZE: {latestCompleted?.size || 'N/A'}</div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[#33ff33]/30 p-2 bg-[#111]">
                <div className="text-[10px] text-[#888] mb-1 uppercase truncate">Stop-Out Yield</div>
                <div className="text-xl sm:text-2xl text-[#33ff33]">{latestCompleted?.yield}</div>
              </div>
              <div className="border border-[#ff3333]/40 p-2 bg-[#111]">
                <div className="text-[10px] text-[#888] mb-1 uppercase truncate">Spread / Tail</div>
                <div className="text-xl sm:text-2xl text-[#ff3333]">{latestCompleted?.tail}</div>
              </div>
              <div className="border border-[#00ffff]/30 p-2 bg-[#111]">
                <div className="text-[10px] text-[#888] mb-1 uppercase truncate">Bid-to-Cover</div>
                <div className="text-xl sm:text-2xl text-[#00ffff]">{latestCompleted?.btc}</div>
              </div>
              <div className="border border-[#ffaa00]/30 p-2 bg-[#111]">
                <div className="text-[10px] text-[#888] mb-1 uppercase truncate">Dealer Takedown</div>
                <div className="text-xl sm:text-2xl text-[#ffaa00]">{latestCompleted?.primary}</div>
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
                {filteredData.slice(0, 50).map((auction: any) => (
                  <tr key={auction.id} className="border-b border-[#33ff33]/10 hover:bg-[#33ff33]/10 cursor-pointer transition-colors group">
                    <td className="py-2 sm:py-3 pr-1 text-[#888] whitespace-nowrap">{auction.rawDate.toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'})}</td>
                    <td className="py-2 sm:py-3 pl-1 sm:px-2 text-[#ffaa00] group-hover:text-white whitespace-nowrap max-w-[80px] sm:max-w-none truncate">{auction.type.replace('-Week', '-Wk').replace('-Year', '-Yr').replace('-Month', '-Mo')}</td>
                    <td className="py-2 sm:py-3 whitespace-nowrap">{auction.size.replace('.0B', 'B')}</td>
                    <td className="py-2 sm:py-3 text-[#33ff33] whitespace-nowrap pl-1">{auction.yield}</td>
                    <td className="py-2 sm:py-3 text-[#00ffff] whitespace-nowrap pl-1">{auction.btc}</td>
                    <td className="py-2 sm:py-3 hidden sm:table-cell pl-1">{auction.primary}</td>
                    <td className="py-2 sm:py-3 hidden sm:table-cell pl-1">{auction.indirect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-[10px] text-[#555] italic text-right border-t border-[#33ff33]/20 pt-2">
            Showing latest {Math.min(filteredData.length, 50)} prints. Filter to isolate tenors.
          </div>
        </div>

      </div>
    </div>
  );
}
