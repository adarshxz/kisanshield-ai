// Core Data Types for KisanShield AI

export type Language = 'en' | 'hi';
export type Theme = 'light' | 'dark';

export type UserRole = 'farmer' | 'expert';

export type RiskLevel = 'low' | 'moderate' | 'elevated' | 'high' | 'critical';

export type RiskCategory = 
  | 'disease_weather'
  | 'water_stress'
  | 'excess_rainfall'
  | 'heat_stress'
  | 'pest_outbreak'
  | 'soil_nutrient';

export type CropGrowthStage = 
  | 'Germination / Sowing'
  | 'Vegetative'
  | 'Flowering'
  | 'Pod / Grain Formation'
  | 'Maturity / Ripening'
  | 'Harvesting';

export type DataSourceType = 
  | 'measured'            // Real physical sensors or farmer measurement
  | 'farmer_reported'     // Reported by farmer observation
  | 'trusted_retrieval'   // Retrieved from verified agronomic knowledge / IMD
  | 'model_prediction'    // ML or heuristic model output
  | 'simulated_scenario'  // What-if / economic projection
  | 'expert_verified';    // Certified by verified agronomist

export interface Field {
  id: string;
  farmId: string;
  name: string;
  areaAcres: number;
  currentCrop: string;
  variety?: string;
  sowingDate: string;
  growthStage: CropGrowthStage;
  soilType: string;
  irrigationMethod: 'Drip' | 'Sprinkler' | 'Flood / Furrow' | 'Rainfed';
  coordinates: [number, number]; // [lat, lng]
  boundaries?: [number, number][];
  latestNdvi?: number;
  moistureStatus: 'Deficit' | 'Optimal' | 'Excess' | 'Unknown';
}

export interface Farm {
  id: string;
  name: string;
  ownerName: string;
  state: string;
  district: string;
  village: string;
  totalAreaAcres: number;
  fields: Field[];
  createdAt: string;
}

export interface WeatherDay {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  tempCurrent?: number;
  humidity: number;
  rainfallMm: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Light Rain' | 'Heavy Rain' | 'Thunderstorm';
  windKmh: number;
  dataSource: DataSourceType;
  lastUpdated: string;
}

export interface WeatherSummary {
  currentTemp: number;
  feelsLike: number;
  humidity: number;
  rainfallPast24hMm: number;
  rainfallForecast48hMm: number;
  windSpeedKmh: number;
  condition: string;
  isSimulatedDemo: boolean;
  stationName: string;
  lastUpdated: string;
  forecast: WeatherDay[];
}

export interface RiskItem {
  id: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  category: RiskCategory;
  categoryLabel: string;
  level: RiskLevel;
  title: string;
  headline: string;
  explanation: string;
  evidence: {
    label: string;
    value: string;
    source: DataSourceType;
    sourceName: string;
    timestamp: string;
  }[];
  missingInformation?: string[];
  forecastPeriod: string;
  dataFreshness: string;
  confidenceScore?: number; // 0-100 if calibrated
  uncertaintyRating: 'Low' | 'Moderate' | 'High';
  recommendedNextAction: string;
  actionUrgency: 'immediate' | 'within_24h' | 'routine';
  modelVersion?: string;
  expertEscalationAvailable: boolean;
}

export interface FarmTask {
  id: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  title: string;
  description: string;
  reason: string;
  relatedRiskCategory?: RiskCategory;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  estimatedMinutes?: number;
  isCompleted: boolean;
  completedAt?: string;
  skipped?: boolean;
  skipReason?: string;
  outcomeNotes?: string;
  source: 'ai_recommendation' | 'farmer_created' | 'expert_advisory';
  recommendationHistory?: {
    date: string;
    previous: string;
    updated: string;
    reason: string;
  }[];
}

export interface CropObservation {
  id: string;
  fieldId: string;
  fieldName: string;
  date: string;
  symptoms: string[];
  notes: string;
  severity: 'mild' | 'moderate' | 'severe';
  spread: 'single_plant' | 'patches' | 'widespread';
  imageUrl?: string;
  reportedBy: string;
}

export interface AssessmentResult {
  id: string;
  timestamp: string;
  crop: string;
  fieldId: string;
  fieldName: string;
  growthStage: string;
  uploadedImageUrl?: string;
  reportedSymptoms: string[];
  possibleCauses: {
    name: string;
    scientificName?: string;
    type: 'fungal' | 'bacterial' | 'viral' | 'pest' | 'nutrient_deficiency' | 'environmental';
    likelihood: 'Probable' | 'Possible' | 'Uncertain';
    supportingEvidence: string[];
    contradictingOrMissing: string[];
    safeNextSteps: string[];
    cautionNote: string;
  }[];
  confidenceRating: 'Low' | 'Moderate' | 'High';
  uncertaintyReason: string;
  additionalInfoNeeded: string[];
  isDemoSimulation: boolean;
  expertReviewRequested?: boolean;
  expertReviewStatus?: 'pending' | 'reviewed' | 'escalated';
  disclaimer: string;
}

export interface ProfitScenario {
  id: string;
  name: string;
  type: 'adverse' | 'expected' | 'favorable' | 'custom';
  fieldAreaAcres: number;
  crop: string;
  expectedYieldPerAcreQuintal: number;
  expectedSellingPricePerQuintal: number;
  costs: {
    seeds: number;
    fertilizers: number;
    cropProtection: number;
    irrigation: number;
    labor: number;
    machineryFuel: number;
    transport: number;
    other: number;
  };
  notes?: string;
}

export interface ProfitResult {
  totalYieldQuintal: number;
  grossRevenue: number;
  totalCost: number;
  netReturn: number;
  costPerQuintal: number;
  breakEvenSellingPrice: number;
  returnOnInvestmentPercent: number;
}

export interface SoilReport {
  id: string;
  farmId: string;
  fieldId: string;
  fieldName: string;
  testDate: string;
  labName: string;
  reportSource: 'lab_test' | 'manual_entry' | 'demo_sample';
  parameters: {
    ph: { value: number; rating: 'Acidic' | 'Optimal' | 'Alkaline'; idealRange: string };
    organicCarbonPercent: { value: number; rating: 'Low' | 'Medium' | 'High'; idealRange: string };
    nitrogenKgHa: { value: number; rating: 'Low' | 'Medium' | 'High'; idealRange: string };
    phosphorusKgHa: { value: number; rating: 'Low' | 'Medium' | 'High'; idealRange: string };
    potassiumKgHa: { value: number; rating: 'Low' | 'Medium' | 'High'; idealRange: string };
    electricalConductivityDsm?: { value: number; rating: 'Normal' | 'Saline'; idealRange: string };
    zincPpm?: { value: number; rating: 'Deficient' | 'Sufficient'; idealRange: string };
    sulfurPpm?: { value: number; rating: 'Deficient' | 'Sufficient'; idealRange: string };
  };
  cropContext: string;
  generalGuidance: string[];
  isOcrExtracted: boolean;
}

export interface CommunityAlert {
  id: string;
  category: 'pest' | 'disease' | 'weather_impact';
  crop: string;
  title: string;
  pestOrDiseaseName: string;
  region: string;
  reportedDate: string;
  observationsCount: number;
  verificationStatus: 'reported' | 'under_review' | 'expert_verified' | 'corrected' | 'dismissed';
  verifiedBy?: string;
  summary: string;
  advisory: string;
  severity: 'advisory' | 'watch' | 'warning';
}

export interface InsuranceIncident {
  id: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  incidentType: 'Excessive Rainfall / Flood' | 'Drought / Dry Spell' | 'Pest Infestation' | 'Hailstorm' | 'Heatwave';
  incidentDate: string;
  affectedAreaPercent: number;
  estimatedLossPercent: number;
  farmerNotes: string;
  images: { url: string; caption: string; date: string }[];
  weatherEventLog: { date: string; description: string; measurement: string }[];
  policyNumber?: string;
  checklistStatus: {
    notifiedWithin72h: boolean;
    lossDocumented: boolean;
    weatherEvidenceAttached: boolean;
    sowingCertificateReady: boolean;
    bankPassbookAttached: boolean;
  };
  disclaimer: string;
}

export interface DecisionRecord {
  id: string;
  alertId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  timestamp: string;
  evidence: {
    name: string;
    value: string;
    type: DataSourceType;
    source: string;
    timestamp: string;
  }[];
  riskAssessment: {
    category: RiskCategory;
    level: RiskLevel;
    rationale: string;
    uncertainty: 'Low' | 'Moderate' | 'High';
    modelVersion: string;
  };
  recommendation: string;
  supportingReference: string;
  farmerResponse?: {
    status: 'followed' | 'skipped' | 'modified' | 'pending';
    actionTaken?: string;
    skipReason?: string;
    notes?: string;
    updatedAt: string;
  };
  observedOutcome?: {
    recordedDate: string;
    description: string;
    rating: 'positive' | 'neutral' | 'negative' | 'unknown';
  };
  humanReviewStatus: 'automated_only' | 'expert_reviewed' | 'expert_corrected';
  expertNotes?: string;
}

export interface ExpertCase {
  id: string;
  dateSubmitted: string;
  farmerName: string;
  village: string;
  crop: string;
  fieldArea: string;
  type: 'crop_doctor_uncertainty' | 'high_risk_escalation' | 'community_alert';
  priority: 'routine' | 'urgent' | 'critical';
  status: 'pending' | 'in_review' | 'verified' | 'corrected';
  originalAiAssessment: string;
  uncertaintyReason: string;
  symptoms: string[];
  imageUrl?: string;
  expertNotes?: string;
  correctedDiagnosis?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}
