'use client';

import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ParsedAuction, prepareGraphData, getUniqueSecurityTypes } from '@/lib/akh/bond-engine';

export function BondGraphs({ data }: { data: ParsedAuction[] }) {
  const graphData = prepareGraphData(data);
  const keys = getUniqueSecurityTypes(data);

  const colors = [
    '#33ff33', // Neon Green
    '#ffaa00', // Amber
    '#00ffff', // Cyan
    '#d600ff', // Purple
    '#ff3333', // Red
    '#ffffff', // White
  ];

  return (
    <div className="w-full h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#666" 
            fontSize={10} 
            tickFormatter={(str) => {
              const date = new Date(str);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis 
            stroke="#666" 
            fontSize={10} 
            tickFormatter={(val) => `${val}%`}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#050505', border: '1px solid #33ff33', fontSize: '10px' }}
            itemStyle={{ fontSize: '10px' }}
            labelStyle={{ color: '#888', marginBottom: '4px' }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
          />
          {keys.slice(0, 6).map((key, index) => (
            <Line 
              key={key}
              type="monotone" 
              dataKey={key} 
              stroke={colors[index % colors.length]} 
              strokeWidth={2}
              dot={{ r: 2, strokeWidth: 1 }}
              activeDot={{ r: 4 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
