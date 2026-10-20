export interface NdviDataPoint {
  date: string;
  ndvi: number;
  cloudCoverPercent: number;
  satellite: 'Sentinel-2 (Simulated)' | 'Landsat-8 (Simulated)';
  stage: string;
}

export interface FieldSatelliteData {
  fieldId: string;
  fieldName: string;
  crop: string;
  latestNdvi: number;
  meanNdvi: number;
  anomalyDetected: boolean;
  anomalyReason?: string;
  suggestedInspectionZone: string;
  cloudInterferenceNotice: string;
  trend: NdviDataPoint[];
  zones: {
    zoneName: string;
    areaPercent: number;
    vigorStatus: 'High Vigor' | 'Moderate Vigor' | 'Low / Stressed';
    color: string;
  }[];
}

export const satelliteService = {
  getFieldSatelliteData: (fieldId: string): FieldSatelliteData => {
    // Return sample series with explicit simulated label
    if (fieldId === 'field-b') {
      return {
        fieldId: 'field-b',
        fieldName: 'Field B (Canal Side)',
        crop: 'Wheat (Early)',
        latestNdvi: 0.58,
        meanNdvi: 0.52,
        anomalyDetected: true,
        anomalyReason: 'Canal side corner shows 14% drop in vegetation index compared to previous pass, correlating with soil moisture deficit.',
        suggestedInspectionZone: 'North-East inlet boundary near canal gate',
        cloudInterferenceNotice: 'Latest pass had 8% cloud shadow near southern perimeter. NDVI values masked accordingly.',
        trend: [
          { date: 'Sep 01', ndvi: 0.22, cloudCoverPercent: 2, satellite: 'Sentinel-2 (Simulated)', stage: 'Land Prep' },
          { date: 'Sep 15', ndvi: 0.28, cloudCoverPercent: 12, satellite: 'Sentinel-2 (Simulated)', stage: 'Sowing' },
          { date: 'Oct 01', ndvi: 0.44, cloudCoverPercent: 5, satellite: 'Sentinel-2 (Simulated)', stage: 'Emergence' },
          { date: 'Oct 10', ndvi: 0.62, cloudCoverPercent: 0, satellite: 'Sentinel-2 (Simulated)', stage: 'Vegetative' },
          { date: 'Oct 17', ndvi: 0.58, cloudCoverPercent: 8, satellite: 'Sentinel-2 (Simulated)', stage: 'Vegetative (Dry stress)' },
        ],
        zones: [
          { zoneName: 'Zone 1 (Central Loam)', areaPercent: 55, vigorStatus: 'Moderate Vigor', color: '#22C55E' },
          { zoneName: 'Zone 2 (North Inlet)', areaPercent: 30, vigorStatus: 'Low / Stressed', color: '#F59E0B' },
          { zoneName: 'Zone 3 (South Bund)', areaPercent: 15, vigorStatus: 'High Vigor', color: '#166534' },
        ]
      };
    }

    // Default Field A
    return {
      fieldId: 'field-a',
      fieldName: 'Field A (North Ridge)',
      crop: 'Soybean',
      latestNdvi: 0.72,
      meanNdvi: 0.68,
      anomalyDetected: false,
      suggestedInspectionZone: 'Eastern lower depression to confirm drainage furrow runoff',
      cloudInterferenceNotice: 'Cloud-free pass recorded by Sentinel-2 on 16 Oct 2026.',
      trend: [
        { date: 'Jul 15', ndvi: 0.25, cloudCoverPercent: 15, satellite: 'Sentinel-2 (Simulated)', stage: 'Vegetative V1' },
        { date: 'Aug 01', ndvi: 0.42, cloudCoverPercent: 20, satellite: 'Sentinel-2 (Simulated)', stage: 'Vegetative V3' },
        { date: 'Aug 20', ndvi: 0.65, cloudCoverPercent: 10, satellite: 'Sentinel-2 (Simulated)', stage: 'Flowering R1' },
        { date: 'Sep 10', ndvi: 0.76, cloudCoverPercent: 5, satellite: 'Sentinel-2 (Simulated)', stage: 'Pod Set R3' },
        { date: 'Oct 01', ndvi: 0.74, cloudCoverPercent: 0, satellite: 'Sentinel-2 (Simulated)', stage: 'Pod Formation R4' },
        { date: 'Oct 16', ndvi: 0.72, cloudCoverPercent: 4, satellite: 'Sentinel-2 (Simulated)', stage: 'Grain Fill R5' },
      ],
      zones: [
        { zoneName: 'Zone A (Ridge)', areaPercent: 65, vigorStatus: 'High Vigor', color: '#166534' },
        { zoneName: 'Zone B (Mid-slope)', areaPercent: 25, vigorStatus: 'Moderate Vigor', color: '#22C55E' },
        { zoneName: 'Zone C (Lower Basin)', areaPercent: 10, vigorStatus: 'Low / Stressed', color: '#F59E0B' },
      ]
    };
  }
};
