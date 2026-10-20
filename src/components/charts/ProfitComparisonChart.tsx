import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { ProfitScenario } from '../../types';
import { profitService } from '../../services/profitService';

interface ProfitComparisonChartProps {
  scenarios: ProfitScenario[];
}

export const ProfitComparisonChart: React.FC<ProfitComparisonChartProps> = ({ scenarios }) => {
  const chartData = scenarios.map(scen => {
    const res = profitService.calculate(scen);
    return {
      name: scen.name,
      grossRevenue: res.grossRevenue,
      totalCost: res.totalCost,
      netReturn: res.netReturn,
    };
  });

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E3E9E1" opacity={0.6} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 11, fill: '#68756B' }} 
            interval={0}
          />
          <YAxis 
            tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`} 
            tick={{ fontSize: 11, fill: '#68756B' }}
          />
          <Tooltip 
            formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, '']}
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              borderColor: '#E3E9E1', 
              borderRadius: '12px',
              fontSize: '12px' 
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
          <Bar dataKey="grossRevenue" name="Gross Revenue (₹)" fill="#22C55E" radius={[4, 4, 0, 0]} />
          <Bar dataKey="totalCost" name="Total Expenses (₹)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          <Bar dataKey="netReturn" name="Net Margin (₹)" fill="#166534" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
