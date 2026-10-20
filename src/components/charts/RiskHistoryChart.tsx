import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';

interface RiskHistoryChartProps {
  className?: string;
}

const SAMPLE_RISK_HISTORY = [
  { date: '12 Oct', disease: 25, waterStress: 60, excessRain: 10, pest: 30 },
  { date: '13 Oct', disease: 30, waterStress: 65, excessRain: 10, pest: 40 },
  { date: '14 Oct', disease: 40, waterStress: 50, excessRain: 15, pest: 55 },
  { date: '15 Oct', disease: 45, waterStress: 40, excessRain: 20, pest: 68 },
  { date: '16 Oct', disease: 65, waterStress: 25, excessRain: 45, pest: 72 },
  { date: '17 Oct', disease: 78, waterStress: 20, excessRain: 60, pest: 75 },
  { date: '18 Oct (Today)', disease: 84, waterStress: 35, excessRain: 55, pest: 74 },
];

export const RiskHistoryChart: React.FC<RiskHistoryChartProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-72 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={SAMPLE_RISK_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorDisease" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#DC2626" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#DC2626" stopOpacity={0.0}/>
            </linearGradient>
            <linearGradient id="colorPest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0}/>
            </linearGradient>
            <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E3E9E1" opacity={0.6} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#68756B' }} />
          <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11, fill: '#68756B' }} />
          <Tooltip 
            formatter={(value: any) => [`${value}% risk index`, '']}
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              borderColor: '#E3E9E1', 
              borderRadius: '12px',
              fontSize: '12px' 
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
          <Area 
            type="monotone" 
            dataKey="disease" 
            name="Disease Weather Risk" 
            stroke="#DC2626" 
            fillOpacity={1} 
            fill="url(#colorDisease)" 
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="pest" 
            name="Pest Activity Index" 
            stroke="#F59E0B" 
            fillOpacity={1} 
            fill="url(#colorPest)" 
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="waterStress" 
            name="Moisture Stress" 
            stroke="#2563EB" 
            fillOpacity={1} 
            fill="url(#colorWater)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
