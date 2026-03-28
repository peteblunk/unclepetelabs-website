'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBondEducation } from '@/hooks/useBondEducation';
import Header from '@/components/layout/header';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, ExternalLink, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PerAnkhWiki() {
  const { getAllTerms } = useBondEducation();
  const [search, setSearch] = useState('');
  
  const allTerms = getAllTerms();
  
  const filteredTerms = allTerms.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-[#00ff41] font-mono flex flex-col pt-24">
      <Header />
      
      {/* Scanlines effect for the Cyber-Egyptian vibe */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] z-50"></div>

      <main className="container mx-auto px-4 flex-1 pb-12 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link href="/akh/bond-project" className="text-xs text-[#ffaa00] flex items-center gap-1 hover:underline">
            <ChevronLeft size={14} /> BACK_TO_PER_HEDJ_TERMINAL
          </Link>
        </div>

        {/* Title Header */}
        <div className="border-b border-[#00ffff]/40 pb-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tighter text-[#d600ff] drop-shadow-[0_0_8px_rgba(214,0,255,0.6)]">
            PER-ANKH KNOWLEDGE BASE
          </h1>
          <p className="text-xs text-[#00ffff] uppercase tracking-widest mt-1">
            The Scribe Learns Until the End of Days // Ibis Labs LLC
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar / Overview Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border border-[#33ff33]/30 p-4 bg-[#111]">
              <h2 className="text-[#33ff33] text-sm uppercase mb-3 flex items-center gap-2">
                <BookOpen size={16} /> ABOUT_THE_AUCTIONS
              </h2>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                The US Treasury sells debt securities to finance operations. Most auctions use a "single-price" format where all successful bidders receive the same yield (the Stop-Out).
              </p>
              <Link 
                href="https://www.newyorkfed.org/markets/primarydealers" 
                target="_blank"
                className="text-[10px] text-[#00ffff] flex items-center gap-1 hover:underline"
              >
                CURRENT_PRIMARY_DEALER_LIST <ExternalLink size={10} />
              </Link>
            </div>
            
            <div className="border border-[#ffaa00]/30 p-4 bg-[#111]">
              <h2 className="text-[#ffaa00] text-sm uppercase mb-2">QUICK_STATS</h2>
              <div className="text-[10px] text-white/60 space-y-1">
                <div>TOTAL_TERMS: {allTerms.length}</div>
                <div>SYSTEM_STATUS: ONLINE</div>
                <div>ENCRYPTION: 1024-BIT_ISIS</div>
              </div>
            </div>
          </div>

          {/* Main Wiki Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Box */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#33ff33] group-focus-within:text-[#00ffff] transition-colors" size={18} />
              <Input 
                className="bg-black border-[#33ff33]/40 focus:border-[#00ffff] text-[#33ff33] pl-10 h-12 text-lg rounded-none transition-all placeholder:text-[#33ff33]/30"
                placeholder="SEARCH_THE_SCROLLS..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTerms.length > 0 ? (
                filteredTerms.map((term) => (
                  <Card key={term.name} className="bg-black border-[#33ff33]/20 rounded-none hover:border-[#00ffff]/60 transition-all group">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-[#ffaa00] text-lg group-hover:text-white transition-colors">
                        {term.name.toUpperCase()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-white/80 leading-relaxed italic">
                        {term.definition}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full border border-red-500/30 p-8 text-center text-red-500 text-sm uppercase">
                  NO_RECORDS_FOUND_IN_THE_ANKH
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
