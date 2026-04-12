'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Globe, TrendingUp, RefreshCw } from 'lucide-react';
import { prepareExchangeRateChartData, getUniqueCurrencies } from '@/lib/akh/bond-engine';

interface ExchangeRate {
  country_currency_desc: string;
  exchange_rate: string;
  record_date: string;
}

export default function InternationalBondsClient({ initialData }: { initialData: ExchangeRate[] }) {
  // Rule of Ptah (Part VI): Logic separated into src/lib/akh/bond-engine.ts
  const chartData = useMemo(() => prepareExchangeRateChartData(initialData), [initialData]);
  const currencies = useMemo(() => getUniqueCurrencies(initialData), [initialData]);

  const colors = ['#33ff33', '#00ffff', '#ffaa00', '#d600ff', '#ff3333'];

  return (
    <div className="min-h-screen bg-[#050505] text-[#33ff33] font-mono p-4 flex flex-col pt-24">
      <div className="border-b border-[#33ff33]/40 pb-2 mb-6 flex justify-between items-end px-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#00ffff] drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]">
          INTERNATIONAL PORTFOLIO
        </h1>
        <div className="text-xs text-[#33ff33] uppercase font-bold tracking-wider hidden sm:block">
          GLOBAL MACRO FEED | CURRENCY CORRELATIONS
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Left Column: Stats & Explanation */}
        <div className="space-y-6">
          <Card className="bg-black/60 border-[#33ff33]/40 text-[#33ff33]">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-widest flex items-center gap-2">
                <Globe size={16} /> Market Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-[#aaa]">
              &gt; Tracking the <span className="text-[#33ff33]">Treasury Reporting Rates of Exchange</span>.
              <br /><br />
              &gt; International demand for U.S. debt is heavily influenced by the strength of the dollar against major reserve currencies. 
              <br /><br />
              &gt; High exchange rates (strong USD) can make U.S. bonds more expensive for foreign central banks, impacting auction "Indirect Bidders".
            </CardContent>
          </Card>

          <div className="border border-[#ffaa00]/40 bg-[#ffaa00]/5 p-4 space-y-4">
            <h3 className="text-[#ffaa00] text-xs uppercase font-bold">Latest Spot Rates</h3>
            {initialData.slice(0, 5).map((rate, i) => (
              <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-white/80">{rate.country_currency_desc.split('-')[0]}</span>
                <span className="text-[#33ff33]">{rate.exchange_rate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Graphic Trends */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="bg-black/60 border-[#33ff33]/40 flex-1 min-h-[400px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm uppercase tracking-widest flex items-center gap-2 text-[#33ff33]">
                <TrendingUp size={16} /> Currency Trajectories (vs USD)
              </CardTitle>
              <RefreshCw size={14} className="text-[#33ff33]/40 animate-pulse" />
            </CardHeader>
            <CardContent className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#555" 
                    fontSize={10} 
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#555" 
                    fontSize={10} 
                    tickLine={false}
                    axisLine={false}
                    domain={['auto', 'auto']}
                  />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #33ff33', fontSize: '10px' }}
                    itemStyle={{ fontSize: '10px' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                  {currencies.map((curr, i) => (
                    <Line 
                      key={curr}
                      type="monotone" 
                      dataKey={curr} 
                      stroke={colors[i % colors.length]} 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, strokeWidth: 0 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
