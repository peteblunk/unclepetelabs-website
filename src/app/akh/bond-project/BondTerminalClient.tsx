'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useBondEducation } from '@/hooks/useBondEducation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  parseTreasuryData, 
  TreasuryAuctionRecord,
  filterAuctions,
  getHistoricalTape,
  getUpcomingAuctions,
  getLatestCompleted
} from '@/lib/akh/bond-engine';
import { BondGraphs } from '@/components/akh/bond-graphs';

export default function BondTerminalClient({ initialData }: { initialData: TreasuryAuctionRecord[] }) {
  const [filter, setFilter] = useState('ALL');
  const [heroFilter, setHeroFilter] = useState('ALL');
  const { getDefinition } = useBondEducation();

  // Rule of Ptah (Part VI): Logic separated into src/lib/akh/bond-engine.ts
  // Memoize data processing for performance and stability
  const parsedData = useMemo(() => parseTreasuryData(initialData), [initialData]);

  // Apply quick filters for the tape (Part VI separation)
  const filteredData = useMemo(() => filterAuctions(parsedData, filter), [parsedData, filter]);

  // Historical tape (Part VI separation)
  const historicalTape = useMemo(() => getHistoricalTape(filteredData), [filteredData]);

  // Hero filter logic (Part VI separation)
  const latestCompleted = useMemo(() => getLatestCompleted(parsedData, heroFilter), [parsedData, heroFilter]);

  // Upcoming auctions (Part VI separation)
  const upcomingAuctions = useMemo(() => getUpcomingAuctions(parsedData), [parsedData]);

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
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2 cursor-help hover:text-[#ffaa00] transition-colors">{latestCompleted?.type || 'No Data'}</div>
              </TooltipTrigger>
              <TooltipContent className="bg-black text-[#ffaa00] border-[#ffaa00] max-w-[200px]">
                {latestCompleted?.type.includes('Bill') ? getDefinition('T-Bill') : (latestCompleted?.type.includes('Note') ? getDefinition('Note') : (latestCompleted?.type.includes('Bond') ? getDefinition('Bond') : 'Specific Treasury Security'))}
              </TooltipContent>
            </Tooltip>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xl text-[#00ffff]">SIZE: {latestCompleted?.size || 'N/A'}</span>
              <span className="text-[#888] text-xs">{latestCompleted?.rawDate.toLocaleDateString()}</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="border border-[#33ff33]/30 p-2 bg-[#111] cursor-help hover:bg-[#33ff33]/10 transition-colors">
                    <div className="text-[10px] text-[#888] mb-1 uppercase truncate border-b border-dotted border-[#888]">Stop-Out Yield</div>
                    <div className="text-xl sm:text-2xl text-[#33ff33]">{latestCompleted?.yield}</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-[#33ff33] border-[#33ff33] max-w-[200px]">
                  {getDefinition('Stop-Out Yield')}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="border border-[#ff3333]/40 p-2 bg-[#111] cursor-help hover:bg-[#ff3333]/10 transition-colors">
                    <div className="text-[10px] text-[#888] mb-1 uppercase truncate border-b border-dotted border-[#888]">Spread / Tail</div>
                    <div className="text-xl sm:text-2xl text-[#ff3333]">{latestCompleted?.tail}</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-[#ff3333] border-[#ff3333] max-w-[200px]">
                  {getDefinition('Spread / Tail')}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="border border-[#00ffff]/30 p-2 bg-[#111] cursor-help hover:bg-[#00ffff]/10 transition-colors">
                    <div className="text-[10px] text-[#888] mb-1 uppercase truncate border-b border-dotted border-[#888]">Bid-to-Cover</div>
                    <div className="text-xl sm:text-2xl text-[#00ffff]">{latestCompleted?.btc}</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-[#00ffff] border-[#00ffff] max-w-[200px]">
                  {getDefinition('Bid-to-Cover')}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="border border-[#ffaa00]/30 p-2 bg-[#111] cursor-help hover:bg-[#ffaa00]/10 transition-colors">
                    <div className="text-[10px] text-[#888] mb-1 uppercase truncate border-b border-dotted border-[#888]">Primary Dealer Takedown</div>
                    <div className="text-xl sm:text-2xl text-[#ffaa00]">{latestCompleted?.primary}</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-[#ffaa00] border-[#ffaa00] max-w-[200px]">
                  {getDefinition('Primary Dealer Takedown')}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="border border-[#d600ff]/30 p-2 bg-[#111] cursor-help hover:bg-[#d600ff]/10 transition-colors">
                    <div className="text-[10px] text-[#888] mb-1 uppercase truncate border-b border-dotted border-[#888]">Indirect Allotment</div>
                    <div className="text-xl sm:text-2xl text-[#d600ff]">{latestCompleted?.indirect}</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-[#d600ff] border-[#d600ff] max-w-[200px]">
                  {getDefinition('Indirect Allotment')}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          
          <div className="border border-[#33ff33]/40 bg-black/60 p-4 flex-1">
             <h2 className="text-[#33ff33] text-sm uppercase tracking-widest border-b border-[#33ff33]/30 pb-1 mb-4">Signal Analysis (Visual)</h2>
             <BondGraphs data={parsedData} />
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
                  <th className="pb-2 font-normal whitespace-nowrap pl-1 sm:px-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help border-b border-dotted border-[#888]">TYPE</span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-[#ffaa00] border-[#ffaa00]">Specific security class (Bill, Note, Bond)</TooltipContent>
                    </Tooltip>
                  </th>
                  <th className="pb-2 font-normal whitespace-nowrap">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help border-b border-dotted border-[#888]">SIZE</span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-[#33ff33] border-[#33ff33]">Total par amount allotted to all bidders</TooltipContent>
                    </Tooltip>
                  </th>
                  <th className="pb-2 font-normal whitespace-nowrap pl-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help border-b border-dotted border-[#888]">YIELD</span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-[#33ff33] border-[#33ff33]">{getDefinition('Stop-Out Yield')}</TooltipContent>
                    </Tooltip>
                  </th>
                  <th className="pb-2 font-normal whitespace-nowrap pl-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help border-b border-dotted border-[#888]">BTC</span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-[#00ffff] border-[#00ffff]">{getDefinition('Bid-to-Cover')}</TooltipContent>
                    </Tooltip>
                  </th>
                  <th className="pb-2 font-normal whitespace-nowrap hidden sm:table-cell pl-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help border-b border-dotted border-[#888]">PRIMARY</span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-[#ffaa00] border-[#ffaa00]">{getDefinition('Primary Dealer Takedown')}</TooltipContent>
                    </Tooltip>
                  </th>
                  <th className="pb-2 font-normal whitespace-nowrap hidden sm:table-cell pl-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help border-b border-dotted border-[#888]">INDIRECT</span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-[#d600ff] border-[#d600ff]">{getDefinition('Indirect Allotment')}</TooltipContent>
                    </Tooltip>
                  </th>
                </tr>
              </thead>
              <tbody className="text-[#eee]">
                {historicalTape.slice(0, 50).map((auction: any) => (
                  <tr key={auction.id} className="border-b border-[#33ff33]/10 hover:bg-[#33ff33]/10 cursor-pointer transition-colors group">
                    <td className="py-2 sm:py-3 pr-1 text-[#888] whitespace-nowrap">{auction.rawDate.toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'})}</td>
                    <td className="py-2 sm:py-3 pl-1 sm:px-2 text-[#ffaa00] group-hover:text-white whitespace-nowrap max-w-[80px] sm:max-w-none truncate">
                      {auction.type.replace('-Week', '-Wk').replace('-Year', '-Yr').replace('-Month', '-Mo')}
                    </td>
                    <td className="py-2 sm:py-3 whitespace-nowrap">
                      {auction.size.replace('.0B', 'B')}
                    </td>
                    <td className="py-2 sm:py-3 text-[#33ff33] whitespace-nowrap pl-1">
                      {auction.yield}
                    </td>
                    <td className="py-2 sm:py-3 text-[#00ffff] whitespace-nowrap pl-1">
                      {auction.btc}
                    </td>
                    <td className="py-2 sm:py-3 hidden sm:table-cell pl-1">
                      {auction.primary}
                    </td>
                    <td className="py-2 sm:py-3 hidden sm:table-cell pl-1">
                      {auction.indirect}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-[10px] text-[#555] italic text-right border-t border-[#33ff33]/20 pt-2 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-white/40 group hover:text-white/80 transition-colors">
              <span className="whitespace-nowrap">Digital Services by Ka -</span>
              <div className="h-10 w-8">
                <svg viewBox="0 0 210 297" className="w-full h-full">
                  <rect style={{fill:'#050505', stroke:'#d600ff', strokeWidth:4}} width="140" height="260" x="35" y="18.5" ry="70" />
                  <text x="105" y="150" textAnchor="middle" style={{fontWeight:'bold', fontSize:'48px', fontFamily:'Orbitron', fill:'#00ff41'}}>KA</text>
                  <path d="M 105,60 L 105,90 M 105,210 L 105,240" style={{stroke:'#00ffff', strokeWidth:2, opacity:0.5}} />
                  <circle cx="105" cy="270" r="10" style={{fill:'#d600ff'}} />
                </svg>
              </div>
              <span className="whitespace-nowrap">- powered by The Ka Terminal at <a href="https://www.ibislabs.cloud/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ffff] underline decoration-dotted transition-colors">Ibis Labs LLC</a></span>
            </div>
            <span>Showing latest {Math.min(historicalTape.length, 50)} prints. Filter to isolate tenors.</span>
          </div>
        </div>

      </div>
    </div>
    </TooltipProvider>
  );
}
