import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid,
  ReferenceArea
} from 'recharts';
import { NdviDataPoint } from '../../services/satelliteService';

interface VegetationTrendChartProps {
  data: NdviDataPoint[];
}

export const VegetationTrendChart: React.FC<VegetationTrendChartProps> = ({ data }) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E3E9E1" opacity={0.6} />
          {/* Healthy vigor reference zone */}
          <ReferenceArea y1={0.6} y2={0.9} fill="#22C55E" fillOpacity={0.08} label={{ value: 'Optimal Vigor Zone', fill: '#166534', fontSize: 10, position: 'insideTopRight' }} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#68756B' }} />
          <YAxis domain={[0.1, 0.9]} unit=" NDVI" tick={{ fontSize: 11, fill: '#68756B' }} />
          <Tooltip 
            formatter={(value: any, name: string) => [value, name === 'ndvi' ? 'Vegetation Index (NDVI)' : name]}
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              borderColor: '#E3E9E1', 
              borderRadius: '12px',
              fontSize: '12px' 
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
          <Line 
            type="monotone" 
            dataKey="ndvi" 
            name="Field NDVI" 
            stroke="#166534" 
            strokeWidth={3}
            dot={{ r: 5, fill: '#22C55E', stroke: '#166534', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const WaterBalanceChart: React.FC = () => {
  const days = [
    { day: 'Day -3', soilStorage: 42, rainfall: 4, irrigation: 0, evapotranspiration: 6 },
    { day: 'Day -2', soilStorage: 38, rainfall: 0, irrigation: 0, evapotranspiration: 5 },
    { day: 'Day -1', soilStorage: 34, rainfall: 0, irrigation: 0, evapotranspiration: 5 },
    { day: 'Today', soilStorage: 46, rainfall: 18.4, irrigation: 0, evapotranspiration: 4 },
    { day: '+1 Day', soilStorage: 62, rainfall: 22.5, irrigation: 0, evapotranspiration: 3 },
    { day: '+2 Days', soilStorage: 56, rainfall: 8, irrigation: 0, evapotranspiration: 4 },
    { day: '+3 Days', soilStorage: 50, rainfall: 0, irrigation: 0, evapotranspiration: 5 },
  ];

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={days} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E3E9E1" opacity={0.6} />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#68756B' }} />
          <YAxis unit=" mm" tick={{ fontSize: 11, fill: '#68756B' }} domain={[0, 80]} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              borderColor: '#E3E9E1', 
              borderRadius: '12px',
              fontSize: '12px' 
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
          <Line type="monotone" dataKey="soilStorage" name="Root Zone Available Water (mm)" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="evapotranspiration" name="Crop Water Demand / ET (mm)" stroke="#F59E0B" strokeWidth={1.5} strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
