import { 
  Farm, 
  WeatherSummary, 
  RiskItem, 
  FarmTask, 
  CropObservation, 
  ProfitScenario, 
  SoilReport, 
  CommunityAlert, 
  InsuranceIncident, 
  DecisionRecord,
  ExpertCase
} from '../types';

export const INITIAL_FARMS: Farm[] = [
  {
    id: 'farm-mp-01',
    name: 'Kisan Demo Adarsh Farm',
    ownerName: 'Ramesh Patel',
    state: 'Madhya Pradesh',
    district: 'Sehore',
    village: 'Ashta',
    totalAreaAcres: 12.5,
    createdAt: '2026-06-15',
    fields: [
      {
        id: 'field-a',
        farmId: 'farm-mp-01',
        name: 'Field A (North Ridge)',
        areaAcres: 5.0,
        currentCrop: 'Soybean',
        variety: 'JS 20-34 (Early maturing)',
        sowingDate: '2026-07-02',
        growthStage: 'Pod / Grain Formation',
        soilType: 'Deep Black Cotton Soil (Vertisol)',
        irrigationMethod: 'Sprinkler',
        coordinates: [23.0185, 76.5412],
        latestNdvi: 0.72,
        moistureStatus: 'Optimal',
        boundaries: [
          [23.0195, 76.5402],
          [23.0205, 76.5422],
          [23.0175, 76.5428],
          [23.0168, 76.5408],
        ]
      },
      {
        id: 'field-b',
        farmId: 'farm-mp-01',
        name: 'Field B (Canal Side)',
        areaAcres: 4.5,
        currentCrop: 'Wheat (Planning / Early)',
        variety: 'Sharbati (C-306)',
        sowingDate: '2026-10-05',
        growthStage: 'Vegetative',
        soilType: 'Medium Black Loam',
        irrigationMethod: 'Flood / Furrow',
        coordinates: [23.0152, 76.5445],
        latestNdvi: 0.58,
        moistureStatus: 'Deficit',
        boundaries: [
          [23.0160, 76.5435],
          [23.0169, 76.5458],
          [23.0142, 76.5462],
          [23.0135, 76.5439],
        ]
      },
      {
        id: 'field-c',
        farmId: 'farm-mp-01',
        name: 'Field C (South Terraces)',
        areaAcres: 3.0,
        currentCrop: 'Gram (Chickpea)',
        variety: 'JG-11 (Desi)',
        sowingDate: '2026-09-28',
        growthStage: 'Flowering',
        soilType: 'Light Clay Loam',
        irrigationMethod: 'Rainfed',
        coordinates: [23.0120, 76.5395],
        latestNdvi: 0.65,
        moistureStatus: 'Optimal',
        boundaries: [
          [23.0132, 76.5385],
          [23.0138, 76.5409],
          [23.0108, 76.5412],
          [23.0102, 76.5388],
        ]
      }
    ]
  }
];

export const DEMO_WEATHER: WeatherSummary = {
  currentTemp: 28.5,
  feelsLike: 31.0,
  humidity: 84,
  rainfallPast24hMm: 18.4,
  rainfallForecast48hMm: 34.0,
  windSpeedKmh: 14.2,
  condition: 'Cloudy with intermittent rain',
  isSimulatedDemo: true,
  stationName: 'Sehore Agromet Advisory Station (Demo Simulated)',
  lastUpdated: 'Today at 08:30 AM IST',
  forecast: [
    {
      date: '2026-10-18',
      dayName: 'Today',
      tempMax: 30,
      tempMin: 22,
      tempCurrent: 28.5,
      humidity: 84,
      rainfallMm: 18.4,
      condition: 'Light Rain',
      windKmh: 14,
      dataSource: 'trusted_retrieval',
      lastUpdated: '08:30 AM'
    },
    {
      date: '2026-10-19',
      dayName: 'Tomorrow',
      tempMax: 29,
      tempMin: 21,
      humidity: 88,
      rainfallMm: 22.5,
      condition: 'Heavy Rain',
      windKmh: 18,
      dataSource: 'trusted_retrieval',
      lastUpdated: '06:00 AM'
    },
    {
      date: '2026-10-20',
      dayName: 'Day 3',
      tempMax: 31,
      tempMin: 22,
      humidity: 78,
      rainfallMm: 8.0,
      condition: 'Partly Cloudy',
      windKmh: 12,
      dataSource: 'model_prediction',
      lastUpdated: '06:00 AM'
    },
    {
      date: '2026-10-21',
      dayName: 'Day 4',
      tempMax: 32,
      tempMin: 23,
      humidity: 68,
      rainfallMm: 0.0,
      condition: 'Sunny',
      windKmh: 10,
      dataSource: 'model_prediction',
      lastUpdated: '06:00 AM'
    },
    {
      date: '2026-10-22',
      dayName: 'Day 5',
      tempMax: 33,
      tempMin: 23,
      humidity: 62,
      rainfallMm: 0.0,
      condition: 'Sunny',
      windKmh: 9,
      dataSource: 'model_prediction',
      lastUpdated: '06:00 AM'
    }
  ]
};

export const INITIAL_RISKS: RiskItem[] = [
  {
    id: 'risk-01',
    fieldId: 'field-a',
    fieldName: 'Field A (North Ridge)',
    crop: 'Soybean',
    category: 'disease_weather',
    categoryLabel: 'Disease-Conducive Weather Alert',
    level: 'elevated',
    title: 'Rhizoctonia Aerial Blight & Anthracnose Weather Conduciveness',
    headline: 'High sustained humidity (>82%) and canopy wetness hours elevate fungal spore germination risk.',
    explanation: 'The micro-climate model detected 14 consecutive hours of relative humidity above 82% following 18.4mm rainfall. Soybean at Pod Formation stage has dense canopy coverage, limiting air circulation and prolonging leaf wetness.',
    evidence: [
      {
        label: 'Continuous Canopy Wetness',
        value: '14.2 Hours recorded',
        source: 'measured',
        sourceName: 'Field Micro-sensor Node A1',
        timestamp: 'Today, 06:15 AM'
      },
      {
        label: '72-Hour Rainfall Accumulation',
        value: '42.4 mm total',
        source: 'trusted_retrieval',
        sourceName: 'IMD Gridded Advisory',
        timestamp: 'Today, 07:00 AM'
      },
      {
        label: 'Susceptible Crop Stage',
        value: 'Pod / Grain Formation (R4/R5)',
        source: 'farmer_reported',
        sourceName: 'Farmer Sowing Record',
        timestamp: '2026-07-02'
      }
    ],
    missingInformation: [
      'In-person visual inspection of lower leaf undersides and stems',
      'Recent history of seed treatment before sowing'
    ],
    forecastPeriod: 'Next 48 to 72 hours',
    dataFreshness: 'Updated 2 hours ago',
    confidenceScore: 78,
    uncertaintyRating: 'Moderate',
    recommendedNextAction: 'Scout 10 randomized plants in the lower terrace of Field A for water-soaked lesions. Postpone chemical spray until foliage is dry to prevent wash-off.',
    actionUrgency: 'within_24h',
    modelVersion: 'AgriPathogen-RiskNet v2.4 (Simulated Demo)',
    expertEscalationAvailable: true
  },
  {
    id: 'risk-02',
    fieldId: 'field-b',
    fieldName: 'Field B (Canal Side)',
    crop: 'Wheat (Early)',
    category: 'water_stress',
    categoryLabel: 'Root Zone Moisture Deficit',
    level: 'moderate',
    title: 'Topsoil Moisture Evaporation in Field B',
    headline: 'Canal gate delay combined with light loam soil causing early vegetative dry spell.',
    explanation: 'Top 15cm soil moisture has dropped to 18% available water capacity. Early vegetative crown root initiation stage requires adequate moisture to avoid tiller abortion.',
    evidence: [
      {
        label: 'Soil Water Balance Model',
        value: '18% Available Moisture',
        source: 'model_prediction',
        sourceName: 'Soil-Water Balance Estimator',
        timestamp: 'Today, 05:30 AM'
      },
      {
        label: 'Days Since Last Irrigation',
        value: '11 Days ago',
        source: 'farmer_reported',
        sourceName: 'Action Planner Log',
        timestamp: '2026-10-07'
      }
    ],
    forecastPeriod: 'Next 5 days',
    dataFreshness: 'Updated 3 hours ago',
    confidenceScore: 82,
    uncertaintyRating: 'Low',
    recommendedNextAction: 'Schedule 35mm light furrow irrigation by Wednesday before day temperatures reach 32°C.',
    actionUrgency: 'within_24h',
    modelVersion: 'HydroCrop-Balance v1.8',
    expertEscalationAvailable: false
  },
  {
    id: 'risk-03',
    fieldId: 'field-c',
    fieldName: 'Field C (South Terraces)',
    crop: 'Gram (Chickpea)',
    category: 'pest_outbreak',
    categoryLabel: 'Pest Advisory (Helicoverpa Pod Borer)',
    level: 'elevated',
    title: 'Helicoverpa Armigera Pheromone Trap Alert in Ashta Cluster',
    headline: 'Surrounding cluster traps recorded >8 moths/trap/night threshold.',
    explanation: 'Pheromone trap catches across Ashta cluster indicate adult Helicoverpa moth activity exceeding 8 moths/trap/night. With chickpea at flowering, eggs will hatch into foliage-feeding caterpillars within 3 to 4 days if left unmonitored.',
    evidence: [
      {
        label: 'Cluster Trap Counts',
        value: '9.2 moths/trap/night average',
        source: 'trusted_retrieval',
        sourceName: 'Ashta Krishi Vigyan Kendra (KVK)',
        timestamp: 'Yesterday, 18:00 IST'
      },
      {
        label: 'Crop Growth Stage',
        value: 'Flowering Stage (Highly vulnerable)',
        source: 'farmer_reported',
        sourceName: 'Farmer Log',
        timestamp: '2026-09-28'
      }
    ],
    forecastPeriod: 'Next 3 to 7 days',
    dataFreshness: 'Updated 14 hours ago',
    confidenceScore: 74,
    uncertaintyRating: 'Moderate',
    recommendedNextAction: 'Install 5 bird perches per acre and install 2 pheromone traps to confirm local egg-laying activity before spraying.',
    actionUrgency: 'immediate',
    modelVersion: 'IPM-RegionalWatch v3.1',
    expertEscalationAvailable: true
  },
  {
    id: 'risk-04',
    fieldId: 'field-a',
    fieldName: 'Field A (North Ridge)',
    crop: 'Soybean',
    category: 'excess_rainfall',
    categoryLabel: 'Waterlogging Risk in Furrow Depressions',
    level: 'low',
    title: 'Localized Water Drainage Requirement',
    headline: 'Expected 22.5mm rain tomorrow may pool in eastern slope.',
    explanation: 'Black cotton soil has high water retention. Clearing drainage furrows prevents root hypoxia.',
    evidence: [
      {
        label: 'Forecast Rain 48h',
        value: '34 mm expected',
        source: 'trusted_retrieval',
        sourceName: 'Regional IMD Node',
        timestamp: 'Today, 06:00 AM'
      }
    ],
    forecastPeriod: 'Next 36 hours',
    dataFreshness: 'Updated 2 hours ago',
    confidenceScore: 85,
    uncertaintyRating: 'Low',
    recommendedNextAction: 'Check that boundary outlet drainage trenches are cleared of residue.',
    actionUrgency: 'routine',
    modelVersion: 'TopoDrainage-Sim v1.0',
    expertEscalationAvailable: false
  }
];

export const INITIAL_TASKS: FarmTask[] = [
  {
    id: 'task-101',
    fieldId: 'field-a',
    fieldName: 'Field A (North Ridge)',
    crop: 'Soybean',
    title: 'Field Scouting for Aerial Blight Lesions',
    description: 'Walk in a "W" pattern through Field A. Inspect lower leaves for water-soaked irregular lesions.',
    reason: 'Triggered by 14 consecutive hours of >82% humidity and 18.4mm rainfall.',
    relatedRiskCategory: 'disease_weather',
    priority: 'high',
    dueDate: '2026-10-18',
    estimatedMinutes: 45,
    isCompleted: false,
    source: 'ai_recommendation',
    recommendationHistory: [
      {
        date: '2026-10-17',
        previous: 'Routine pod monitoring scheduled for Friday',
        updated: 'Moved forward to today due to elevated humidity alert',
        reason: 'Rainfall event exceeded threshold (18.4mm vs 5mm predicted)'
      }
    ]
  },
  {
    id: 'task-102',
    fieldId: 'field-c',
    fieldName: 'Field C (South Terraces)',
    crop: 'Gram (Chickpea)',
    title: 'Install 5 Bird Perches for Natural Pest Control',
    description: 'Erect T-shaped wooden bird perches (1.5m tall) across Field C to encourage insectivorous birds.',
    reason: 'KVK advisory warned of Helicoverpa pod borer moth flight threshold breach in Ashta block.',
    relatedRiskCategory: 'pest_outbreak',
    priority: 'high',
    dueDate: '2026-10-19',
    estimatedMinutes: 60,
    isCompleted: false,
    source: 'ai_recommendation'
  },
  {
    id: 'task-103',
    fieldId: 'field-b',
    fieldName: 'Field B (Canal Side)',
    crop: 'Wheat (Early)',
    title: 'Prepare Furrow Irrigation Channels',
    description: 'Clear field channels from canal feeder gate before planned Wednesday watering.',
    reason: 'Soil water model indicates available moisture dropped below 20%.',
    relatedRiskCategory: 'water_stress',
    priority: 'medium',
    dueDate: '2026-10-20',
    estimatedMinutes: 90,
    isCompleted: false,
    source: 'farmer_created'
  },
  {
    id: 'task-104',
    fieldId: 'field-a',
    fieldName: 'Field A (North Ridge)',
    crop: 'Soybean',
    title: 'Clear Drainage Outlets on Eastern Slope',
    description: 'Ensure field-end bund outlets are open to drain excess runoff from expected heavy showers.',
    reason: 'Heavy rain warning (22.5mm) predicted for tomorrow.',
    relatedRiskCategory: 'excess_rainfall',
    priority: 'medium',
    dueDate: '2026-10-18',
    estimatedMinutes: 30,
    isCompleted: true,
    completedAt: '2026-10-18T10:15:00Z',
    outcomeNotes: 'Both bund trenches cleared; water flowing freely toward village nala.',
    source: 'ai_recommendation'
  }
];

export const INITIAL_OBSERVATIONS: CropObservation[] = [
  {
    id: 'obs-01',
    fieldId: 'field-a',
    fieldName: 'Field A (North Ridge)',
    date: '2026-10-16',
    symptoms: ['Slight yellowing of bottom leaves', 'No visible insect chewing'],
    notes: 'Noticed after heavy morning fog. Middle and top canopy leaves appear green and healthy.',
    severity: 'mild',
    spread: 'patches',
    reportedBy: 'Ramesh Patel'
  },
  {
    id: 'obs-02',
    fieldId: 'field-c',
    fieldName: 'Field C (South Terraces)',
    date: '2026-10-14',
    symptoms: ['Flower buds forming uniformly', 'Good nodulation checked on 2 sample roots'],
    notes: 'Soil moisture adequate after previous shower. No wilt symptoms observed.',
    severity: 'mild',
    spread: 'single_plant',
    reportedBy: 'Ramesh Patel'
  }
];

export const INITIAL_PROFIT_SCENARIOS: ProfitScenario[] = [
  {
    id: 'scen-expected',
    name: 'Normal Expected Season',
    type: 'expected',
    fieldAreaAcres: 5.0,
    crop: 'Soybean (JS 20-34)',
    expectedYieldPerAcreQuintal: 8.5,
    expectedSellingPricePerQuintal: 4600, // ₹ / quintal (MSP ~ ₹4,892)
    costs: {
      seeds: 6500, // ₹ total for 5 acres
      fertilizers: 11000,
      cropProtection: 7500,
      irrigation: 3500,
      labor: 14000,
      machineryFuel: 9500,
      transport: 3000,
      other: 2000
    },
    notes: 'Standard package of practices with timely harvest and average mandi prices.'
  },
  {
    id: 'scen-adverse',
    name: 'Adverse Weather / Pest Attack',
    type: 'adverse',
    fieldAreaAcres: 5.0,
    crop: 'Soybean (JS 20-34)',
    expectedYieldPerAcreQuintal: 5.5,
    expectedSellingPricePerQuintal: 4200,
    costs: {
      seeds: 6500,
      fertilizers: 11000,
      cropProtection: 12500, // Higher chemical intervention
      irrigation: 5000,
      labor: 15500,
      machineryFuel: 10500,
      transport: 2200,
      other: 3000
    },
    notes: 'Simulates 35% yield reduction due to unmanaged pod blight and depressed distress selling.'
  },
  {
    id: 'scen-favorable',
    name: 'Favorable Predictive Management',
    type: 'favorable',
    fieldAreaAcres: 5.0,
    crop: 'Soybean (JS 20-34)',
    expectedYieldPerAcreQuintal: 10.5,
    expectedSellingPricePerQuintal: 4950,
    costs: {
      seeds: 6500,
      fertilizers: 10500,
      cropProtection: 5500, // Targeted early biological control reduces costly emergency sprays
      irrigation: 3000,
      labor: 14500,
      machineryFuel: 9500,
      transport: 3800,
      other: 1500
    },
    notes: 'Assumes risk radar alerts followed early, saving input costs and preserving quality grade A.'
  }
];

export const INITIAL_SOIL_REPORTS: SoilReport[] = [
  {
    id: 'soil-01',
    farmId: 'farm-mp-01',
    fieldId: 'field-a',
    fieldName: 'Field A (North Ridge)',
    testDate: '2026-05-20',
    labName: 'Krishi Vigyan Kendra Soil Testing Lab, Sehore',
    reportSource: 'lab_test',
    parameters: {
      ph: { value: 7.4, rating: 'Optimal', idealRange: '6.5 - 7.5' },
      organicCarbonPercent: { value: 0.52, rating: 'Medium', idealRange: '0.50 - 0.75%' },
      nitrogenKgHa: { value: 215, rating: 'Low', idealRange: '280 - 560 kg/ha' },
      phosphorusKgHa: { value: 18.5, rating: 'Medium', idealRange: '15 - 25 kg/ha' },
      potassiumKgHa: { value: 340, rating: 'High', idealRange: '150 - 300 kg/ha' },
      electricalConductivityDsm: { value: 0.42, rating: 'Normal', idealRange: '< 1.0 dS/m' },
      zincPpm: { value: 0.58, rating: 'Deficient', idealRange: '> 0.60 ppm' },
      sulfurPpm: { value: 8.4, rating: 'Deficient', idealRange: '> 10.0 ppm' }
    },
    cropContext: 'Soybean - Wheat cropping system',
    generalGuidance: [
      'Zinc deficiency detected. Basal application of 25 kg/ha Zinc Sulfate recommended before next rabi sowing.',
      'Available Nitrogen is low. Inoculate legume seeds with Rhizobium culture and apply vermicompost @ 2 tonnes/ha.',
      'Potassium levels are naturally high in this deep black soil; chemical muriate of potash can be scaled down.'
    ],
    isOcrExtracted: false
  }
];

export const INITIAL_COMMUNITY_ALERTS: CommunityAlert[] = [
  {
    id: 'comm-01',
    category: 'pest',
    crop: 'Gram (Chickpea)',
    title: 'Helicoverpa Pod Borer Activity Reported in Ashta Block',
    pestOrDiseaseName: 'Gram Pod Borer (Helicoverpa armigera)',
    region: 'Sehore District (Radius 15 km)',
    reportedDate: '2026-10-17',
    observationsCount: 14,
    verificationStatus: 'expert_verified',
    verifiedBy: 'Dr. S. K. Verma (KVK Entomologist)',
    summary: 'Multiple farmers in Ashta and Ichhawar villages recorded larval presence in vegetative and flowering chickpea.',
    advisory: 'Install pheromone traps @ 5/ha for monitoring. Conserve predatory wasps. Avoid premature broad-spectrum insecticide sprays.',
    severity: 'warning'
  },
  {
    id: 'comm-02',
    category: 'disease',
    crop: 'Soybean',
    title: 'Yellow Mosaic Virus (YMV) Watch Notice',
    pestOrDiseaseName: 'Soybean Yellow Mosaic Virus',
    region: 'Dewas - Sehore Border',
    reportedDate: '2026-10-15',
    observationsCount: 6,
    verificationStatus: 'under_review',
    summary: 'Localized patches of leaf yellowing reported. Suspected whitefly vector transmission in late-sown fields.',
    advisory: 'Rogue out severely infected scattered plants early to stop vector feeding spread.',
    severity: 'watch'
  },
  {
    id: 'comm-03',
    category: 'weather_impact',
    crop: 'All Kharif Crops',
    title: 'Sudden Squall & Localized Waterlogging Advisory',
    pestOrDiseaseName: 'Thunderstorm with heavy showers',
    region: 'Western MP Agro-climatic Zone',
    reportedDate: '2026-10-18',
    observationsCount: 22,
    verificationStatus: 'expert_verified',
    verifiedBy: 'State Agro-Met Cell',
    summary: 'Convective cloud bands moving across Sehore-Hoshangabad corridor.',
    advisory: 'Clear drainage channels. Delay planned foliar pesticide and herbicide applications by 48 hours.',
    severity: 'warning'
  }
];

export const INITIAL_INSURANCE_INCIDENT: InsuranceIncident = {
  id: 'ins-2026-088',
  fieldId: 'field-a',
  fieldName: 'Field A (North Ridge)',
  crop: 'Soybean',
  incidentType: 'Excessive Rainfall / Flood',
  incidentDate: '2026-08-22',
  affectedAreaPercent: 25,
  estimatedLossPercent: 20,
  farmerNotes: 'Continuous 120mm rain in 36 hours caused water ponding in eastern half for 4 days during early flowering.',
  images: [
    {
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
      caption: 'Field A furrow water accumulation on 23rd August',
      date: '2026-08-23'
    }
  ],
  weatherEventLog: [
    {
      date: '2026-08-21',
      description: 'Heavy continuous rain event',
      measurement: '68.2 mm'
    },
    {
      date: '2026-08-22',
      description: 'Continuous torrential downpour',
      measurement: '54.6 mm'
    }
  ],
  policyNumber: 'PMFBY/MP/2026/0928371',
  checklistStatus: {
    notifiedWithin72h: true,
    lossDocumented: true,
    weatherEvidenceAttached: true,
    sowingCertificateReady: true,
    bankPassbookAttached: true
  },
  disclaimer: 'This documentation tool assists in organizing timeline evidence for PMFBY claims. It does not certify eligibility, claim acceptance, or payment guarantees.'
};

export const INITIAL_DECISION_HISTORY: DecisionRecord[] = [
  {
    id: 'dec-1001',
    alertId: 'risk-01',
    fieldId: 'field-a',
    fieldName: 'Field A (North Ridge)',
    crop: 'Soybean',
    timestamp: '2026-10-18 07:30 IST',
    evidence: [
      {
        name: 'Continuous Canopy Wetness',
        value: '14.2 Hours recorded',
        type: 'measured',
        source: 'Micro-climate Node A1',
        timestamp: '2026-10-18 06:15'
      },
      {
        name: 'Rainfall Event',
        value: '18.4 mm',
        type: 'trusted_retrieval',
        source: 'IMD Sehore Gridded',
        timestamp: '2026-10-18 07:00'
      },
      {
        name: 'Crop Growth Stage',
        value: 'Pod Formation (R4/R5)',
        type: 'farmer_reported',
        source: 'Farmer Sowing Record',
        timestamp: '2026-07-02'
      }
    ],
    riskAssessment: {
      category: 'disease_weather',
      level: 'elevated',
      rationale: 'Fungal spore germination threshold (>80% RH for >12h) breached in dense soybean canopy.',
      uncertainty: 'Moderate',
      modelVersion: 'AgriPathogen-RiskNet v2.4 (Simulated Demo)'
    },
    recommendation: 'Scout 10 randomized plants in lower terrace for water-soaked lesions. Postpone chemical spray until foliage is dry.',
    supportingReference: 'ICAR-Indian Institute of Soybean Research (IISR) Technical Bulletin No. 42',
    farmerResponse: {
      status: 'followed',
      actionTaken: 'Inspected 12 plants; noticed minor brown specs on lower leaves; postponed spraying.',
      notes: 'Found ground very damp. Created task to re-check in 24 hours.',
      updatedAt: '2026-10-18 11:30 IST'
    },
    observedOutcome: {
      recordedDate: '2026-10-18',
      description: 'Spray expenditure avoided while leaves are wet; scout confirmed no rapid lesion spread yet.',
      rating: 'positive'
    },
    humanReviewStatus: 'automated_only'
  },
  {
    id: 'dec-1002',
    alertId: 'risk-04',
    fieldId: 'field-a',
    fieldName: 'Field A (North Ridge)',
    crop: 'Soybean',
    timestamp: '2026-10-17 16:00 IST',
    evidence: [
      {
        name: 'Heavy Rain Forecast',
        value: '22.5 mm within 24h',
        type: 'trusted_retrieval',
        source: 'Regional IMD Node',
        timestamp: '2026-10-17 15:30'
      }
    ],
    riskAssessment: {
      category: 'excess_rainfall',
      level: 'moderate',
      rationale: 'Black cotton soil in Field A prone to water retention if furrows are blocked.',
      uncertainty: 'Low',
      modelVersion: 'TopoDrainage-Sim v1.0'
    },
    recommendation: 'Clear field drainage trenches on eastern slope before rainfall onset.',
    supportingReference: 'State Agronomy Extension Guidelines, MP Dept of Agriculture',
    farmerResponse: {
      status: 'followed',
      actionTaken: 'Cleared bund outlets and cleared weed residue in 30 minutes.',
      updatedAt: '2026-10-18 10:15 IST'
    },
    observedOutcome: {
      recordedDate: '2026-10-18',
      description: 'Water drained cleanly into village nala during morning shower; no root waterlogging.',
      rating: 'positive'
    },
    humanReviewStatus: 'expert_reviewed',
    expertNotes: 'Agronomist confirmed timely furrow opening protected root aeration in vertisol soil.'
  }
];

export const INITIAL_EXPERT_CASES: ExpertCase[] = [
  {
    id: 'case-901',
    dateSubmitted: '2026-10-17 14:20 IST',
    farmerName: 'Ramesh Patel',
    village: 'Ashta, Sehore',
    crop: 'Soybean',
    fieldArea: 'Field A (5.0 Acres)',
    type: 'crop_doctor_uncertainty',
    priority: 'urgent',
    status: 'pending',
    originalAiAssessment: 'Possible Rhizoctonia aerial blight or Cercospora leaf spot (Moderate confidence 64%)',
    uncertaintyReason: 'Leaf symptom image showed both yellow margins and small brown speckling, which can indicate either fungal blight or potassium deficiency.',
    symptoms: ['Brown water-soaked specks', 'Leaf margin yellowing', 'Lower canopy'],
    imageUrl: 'https://images.unsplash.com/photo-1592982537447-6f230b42c672?w=600&auto=format&fit=crop&q=80',
    expertNotes: '',
    correctedDiagnosis: ''
  },
  {
    id: 'case-902',
    dateSubmitted: '2026-10-16 11:05 IST',
    farmerName: 'Kailash Meena',
    village: 'Shyampur, Sehore',
    crop: 'Gram (Chickpea)',
    fieldArea: 'Plot 3 (3.2 Acres)',
    type: 'community_alert',
    priority: 'critical',
    status: 'verified',
    originalAiAssessment: 'Helicoverpa armigera moth influx confirmed via pheromone trap photograph.',
    uncertaintyReason: 'High count confirmed; needs official district advisory.',
    symptoms: ['Egg clusters on tender leaves', 'High trap count (11 moths)'],
    expertNotes: 'Verified against local trap threshold. Advised community bio-pesticide distribution (NPV virus / Bt).',
    correctedDiagnosis: 'Confirmed Gram Pod Borer emergence',
    reviewedBy: 'Dr. S. K. Verma (KVK)',
    reviewedAt: '2026-10-16 16:30 IST'
  }
];
