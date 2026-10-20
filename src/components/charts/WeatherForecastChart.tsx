import React from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { WeatherDay } from '../../types';

interface WeatherForecastChartProps {
  data: WeatherDay[];
}

export const WeatherForecastChart: React.FC<WeatherForecastChartProps> = ({ data }) => {
  const chartData = data.map(d => ({
    date: d.dayName,
    maxTemp: d.tempMax,
    minTemp: d.tempMin,
    rainfall: d.rainfallMm,
    humidity: d.humidity,
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E3E9E1" opacity={0.6} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 11, fill: '#68756B' }} 
            axisLine={{ stroke: '#E3E9E1' }}
          />
          <YAxis 
            yAxisId="left" 
            unit="°C" 
            tick={{ fontSize: 11, fill: '#68756B' }}
            domain={[15, 40]}
            axisLine={{ stroke: '#E3E9E1' }}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            unit="mm" 
            tick={{ fontSize: 11, fill: '#68756B' }}
            domain={[0, 40]}
            axisLine={{ stroke: '#E3E9E1' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              borderColor: '#E3E9E1', 
              borderRadius: '12px',
              fontSize: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
          <Bar 
            yAxisId="right" 
            dataKey="rainfall" 
            name="Rainfall (mm)" 
            fill="#2563EB" 
            radius={[4, 4, 0, 0]} 
            opacity={0.8}
            barSize={24}
          />
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="maxTemp" 
            name="Max Temp (°C)" 
            stroke="#DC2626" 
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#DC2626' }}
          />
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="minTemp" 
            name="Min Temp (°C)" 
            stroke="#F59E0B" 
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={{ r: 3, fill: '#F59E0B' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
