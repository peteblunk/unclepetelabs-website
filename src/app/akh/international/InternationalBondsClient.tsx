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
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { Globe, TrendingUp, RefreshCw, BarChart3, Activity } from 'lucide-react';
import { prepareExchangeRateChartData, getUniqueCurrencies, prepareYieldChartData } from '@/lib/akh/bond-engine';

interface ExchangeRate {
  country_currency_desc: string;
  exchange_rate: string;
  record_date: string;
}

interface BondYield {
  country: string;
  value: number;
  date: string;
}

export default function InternationalBondsClient({ 
  initialData,
  yieldData = [] 
}: { 
  initialData: ExchangeRate[],
  yieldData?: BondYield[]
}) {
  const [view, setView] = useState<'FX' | 'YIELD'>('FX');

  // Rule of Ptah (Part VI): Logic separated into src/lib/akh/bond-engine.ts
  const fxChartData = useMemo(() => prepareExchangeRateChartData(initialData), [initialData]);
  const currencies = useMemo(() => getUniqueCurrencies(initialData), [initialData]);
  
  const yieldChartData = useMemo(() => {
    // For this demonstration, we'll use the latest scraped data if yieldData is empty
    const data = yieldData.length > 0 ? yieldData : [
      { country: 'UK', value: 4.7240, date: '2026-04-14' },
      { country: 'Germany', value: 3.0297, date: '2026-04-14' },
      { country: 'Japan', value: 2.4050, date: '2026-04-14' },
      { country: 'France', value: 3.6570, date: '2026-04-14' },
      { country: 'US', value: 4.2550, date: '2026-04-14' },
      // Mocking some historical points for the graph
      { country: 'UK', value: 4.82, date: '2026-04-13' },
      { country: 'Germany', value: 2.95, date: '2026-04-13' },
      { country: 'Japan', value: 2.38, date: '2026-04-13' },
      { country: 'France', value: 3.58, date: '2026-04-13' },
      { country: 'US', value: 4.28, date: '2026-04-13' },
    ];
    
    // Split into international and base (US)
    const international = data.filter(d => d.country !== 'US');
    const base = data.filter(d => d.country === 'US');
    
    return prepareYieldChartData(international, base);
  }, [yieldData]);

  const countries = useMemo(() => {
    const data = yieldData.length > 0 ? yieldData : [
      { country: 'UK', value: 4.7240, date: '2026-04-14' },
      { country: 'Germany', value: 3.0297, date: '2026-04-14' },
      { country: 'Japan', value: 2.4050, date: '2026-04-14' },
      { country: 'France', value: 3.6570, date: '2026-04-14' }
    ];
    return Array.from(new Set(data.filter(d => d.country !== 'US').map(d => d.country)));
  }, [yieldData]);

  const colors = ['hsl(var(--ka-green))', '#00ffff', '#ffaa00', '#d600ff', '#ff3333'];

  return (
    <div className="min-h-screen bg-[#050505] text-[hsl(var(--ka-green))] font-mono p-4 flex flex-col pt-24">
      <div className="border-b border-[hsl(var(--ka-green))]/40 pb-2 mb-6 flex justify-between items-end px-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#00ffff] drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]">
            GLOBAL MARKET TERMINAL
          </h1>
          <div className="flex gap-4 mt-2">
            <button 
              onClick={() => setView('FX')}
              className={`text-xs uppercase font-bold tracking-wider px-2 py-1 border ${view === 'FX' ? 'bg-[hsl(var(--ka-green))] text-black border-[hsl(var(--ka-green))]' : 'text-[hsl(var(--ka-green))] border-[hsl(var(--ka-green))]/40'}`}
            >
              FX CORRELATIONS
            </button>
            <button 
              onClick={() => setView('YIELD')}
              className={`text-xs uppercase font-bold tracking-wider px-2 py-1 border ${view === 'YIELD' ? 'bg-[#00ffff] text-black border-[#00ffff]' : 'text-[#00ffff] border-[#00ffff]/40'}`}
            >
              SOVEREIGN YIELDS
            </button>
          </div>
        </div>
        <div className="text-xs text-[hsl(var(--ka-green))] uppercase font-bold tracking-wider hidden sm:block">
          {view === 'FX' ? 'TREASURY REPORTING RATES' : 'INTERNATIONAL BOND AUCTIONS'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Left Column: Stats & Explanation */}
        <div className="space-y-6">
          <Card className="bg-black/60 border-[hsl(var(--ka-green))]/40 text-[hsl(var(--ka-green))]">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-widest flex items-center gap-2">
                <Globe size={16} /> {view === 'FX' ? 'FX Intelligence' : 'Yield Intelligence'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-[#aaa]">
              {view === 'FX' ? (
                <>
                  &gt; Tracking the <span className="text-[hsl(var(--ka-green))]">Treasury Reporting Rates of Exchange</span>.
                  <br /><br />
                  &gt; International demand for U.S. debt is heavily influenced by the strength of the dollar against major reserve currencies. 
                </>
              ) : (
                <>
                  &gt; Tracking <span className="text-[#00ffff]">10-Year Benchmark Yields</span> for major economies.
                  <br /><br />
                  &gt; The "Spread" vs US Treasuries indicates capital flight risk and relative economic strength.
                  <br /><br />
                  &gt; <span className="text-[#ffaa00]">Rule of Ptah VI</span>: Logic is strictly decoupled from the Body/UI.
                </>
              )}
            </CardContent>
          </Card>

          <div className="border border-[#ffaa00]/40 bg-[#ffaa00]/5 p-4 space-y-4">
            <h3 className="text-[#ffaa00] text-xs uppercase font-bold">
              {view === 'FX' ? 'Latest Spot Rates' : 'Latest 10Y Yields'}
            </h3>
            {view === 'FX' ? (
              initialData.slice(0, 5).map((rate, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                  <span className="text-white/80">{rate.country_currency_desc.split('-')[0]}</span>
                  <span className="text-[hsl(var(--ka-green))] font-bold">{rate.exchange_rate}</span>
                </div>
              ))
            ) : (
              yieldChartData.slice(-1).map((point: any) => (
                <div key="latest-yields" className="space-y-2">
                  {countries.map((c, i) => (
                    <div key={c} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                      <span className="text-white/80">{c}</span>
                      <div className="text-right">
                        <div className="text-[#00ffff] font-bold">{point[c]}%</div>
                        <div className={`text-[10px] ${point[`${c}_spread`] >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                          Spread: {point[`${c}_spread`] >= 0 ? '+' : ''}{point[`${c}_spread`]}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center text-sm border-t border-[hsl(var(--ka-green))]/20 pt-2 mt-2">
                    <span className="text-[hsl(var(--ka-green))] font-bold">US 10Y</span>
                    <span className="text-[hsl(var(--ka-green))] font-bold">{point['US']}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Graphic Trends */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="bg-black/60 border-[hsl(var(--ka-green))]/40 flex-1 min-h-[400px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm uppercase tracking-widest flex items-center gap-2 text-[hsl(var(--ka-green))]">
                {view === 'FX' ? <TrendingUp size={16} /> : <BarChart3 size={16} />} 
                {view === 'FX' ? 'Currency Trajectories (vs USD)' : 'Benchmark Yield Trends'}
              </CardTitle>
              <RefreshCw size={14} className="text-[hsl(var(--ka-green))]/40 animate-pulse" />
            </CardHeader>
            <CardContent className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                {view === 'FX' ? (
                  <LineChart data={fxChartData}>
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
                      contentStyle={{ backgroundColor: '#000', border: '1px solid hsl(var(--ka-green))', fontSize: '10px' }}
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
                ) : (
                  <LineChart data={yieldChartData}>
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
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #00ffff', fontSize: '10px' }}
                      itemStyle={{ fontSize: '10px' }}
                    />
                    <Legend iconType="rect" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                    <Line 
                      type="monotone" 
                      dataKey="US" 
                      stroke="hsl(var(--ka-green))" 
                      strokeWidth={3}
                      dot={true}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    {countries.map((c, i) => (
                      <Line 
                        key={c}
                        type="monotone" 
                        dataKey={c} 
                        stroke={colors[(i + 1) % colors.length]} 
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }}
                      />
                    ))}
                  </LineChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {view === 'YIELD' && (
            <Card className="bg-black/60 border-[#00ffff]/40">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-widest flex items-center gap-2 text-[#00ffff]">
                  <Activity size={16} /> Yield Spreads (vs US 10Y)
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={yieldChartData}>
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
                    />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #ffaa00', fontSize: '10px' }}
                      itemStyle={{ fontSize: '10px' }}
                    />
                    {countries.map((c, i) => (
                      <Area 
                        key={`${c}_spread`}
                        type="monotone" 
                        dataKey={`${c}_spread`} 
                        stroke={colors[(i + 1) % colors.length]} 
                        fill={colors[(i + 1) % colors.length]}
                        fillOpacity={0.1}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}


