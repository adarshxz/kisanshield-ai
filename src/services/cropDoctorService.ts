import { AssessmentResult } from '../types';

export interface CropDoctorParams {
  crop: string;
  variety?: string;
  fieldId: string;
  fieldName: string;
  growthStage: string;
  symptoms: string[];
  spread: 'single_plant' | 'patches' | 'widespread';
  onsetDaysAgo?: number;
  recentRainfallMm?: number;
  notes?: string;
  imageFile?: File | null;
  imageUrl?: string;
}

export const cropDoctorService = {
  analyzeObservation: async (params: CropDoctorParams): Promise<AssessmentResult> => {
    // Simulate realistic computer-vision + agronomic reasoning latency
    await new Promise(resolve => setTimeout(resolve, 1400));

    const isSoybean = params.crop.toLowerCase().includes('soybean');
    const hasSpots = params.symptoms.includes('Brown or black spots');
    const hasYellowing = params.symptoms.includes('Yellowing');
    const hasChewing = params.symptoms.includes('Holes or chewing damage');

    // Tailored, realistic diagnostic outputs for MP crops
    if (isSoybean && (hasSpots || hasYellowing)) {
      return {
        id: `assess-${Date.now().toString(36)}`,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        crop: params.crop,
        fieldId: params.fieldId,
        fieldName: params.fieldName,
        growthStage: params.growthStage,
        uploadedImageUrl: params.imageUrl,
        reportedSymptoms: params.symptoms,
        possibleCauses: [
          {
            name: 'Rhizoctonia Aerial Blight / Wet-weather Foliar Blight',
            scientificName: 'Rhizoctonia solani',
            type: 'fungal',
            likelihood: 'Probable',
            supportingEvidence: [
              'Irregular brown water-soaked lesions expanding rapidly on lower foliage',
              'Sustained high canopy humidity (>82%) and recent rainfall of 18.4mm in local weather record',
              'Dense foliage at Pod Formation stage restricting airflow',
            ],
            contradictingOrMissing: [
              'Web-like mycelium threads on leaf petioles not yet verified by physical loupe inspection',
              'Upper leaves remain green with no vascular wilting'
            ],
            safeNextSteps: [
              'Scout 10 randomized plants in moist lower terrace areas to inspect stem bases',
              'Avoid foliar sprays while leaves are wet to prevent chemical runoff',
              'Improve boundary drainage to reduce standing water humidity pool'
            ],
            cautionNote: 'Do not spray synthetic fungicides without confirming active sporulation. Consult your local KVK extension officer.'
          },
          {
            name: 'Cercospora Leaf Spot / Purple Seed Stain Complex',
            scientificName: 'Cercospora kikuchii',
            type: 'fungal',
            likelihood: 'Possible',
            supportingEvidence: [
              'Angular reddish-purple to dark brown specks noticed on upper surface',
              'Favored by warm humid days and morning dew'
            ],
            contradictingOrMissing: [
              'Pod discolouration not observed; seed maturity not yet reached',
              'Requires microscopic confirmation of conidia spores'
            ],
            safeNextSteps: [
              'Record high-resolution close-up of leaf underside in bright natural daylight',
              'Ensure no overhead sprinkler irrigation is scheduled during evening hours'
            ],
            cautionNote: 'Seed treatment before sowing is primary defense; post-emergence sprays have variable efficacy.'
          },
          {
            name: 'Potassium / Micronutrient Imbalance',
            type: 'nutrient_deficiency',
            likelihood: 'Uncertain',
            supportingEvidence: [
              'Marginal yellowing (chlorosis) along leaf borders',
              'Soil test indicates high potassium, but heavy rains can temporarily impair root nutrient uptake'
            ],
            contradictingOrMissing: [
              'Symptoms appeared suddenly following rain event rather than progressive slow aging'
            ],
            safeNextSteps: [
              'Compare with recent Soil Health Card values',
              'Check root system for healthy nodulation (pinkish internal cross-section)'
            ],
            cautionNote: 'Do not apply heavy fertilizer doses during waterlogged periods as roots cannot assimilate.'
          }
        ],
        confidenceRating: 'Moderate',
        uncertaintyReason: 'Leaf photographs alone cannot distinguish early fungal mycelia from physiological stress without microscopic verification or laboratory culturing.',
        additionalInfoNeeded: [
          'Close-up photo of leaf underside under natural sunlight',
          'Observation whether dark lesions have a yellow halo',
          'Seed variety resistance profile (e.g. JS 20-34 tolerance)'
        ],
        isDemoSimulation: true,
        disclaimer: 'This assessment is a demonstration heuristic analysis. Visual AI patterns can be misleading. Always verify with local agricultural extension officers before applying chemical treatments.'
      };
    }

    if (hasChewing) {
      return {
        id: `assess-${Date.now().toString(36)}`,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        crop: params.crop,
        fieldId: params.fieldId,
        fieldName: params.fieldName,
        growthStage: params.growthStage,
        uploadedImageUrl: params.imageUrl,
        reportedSymptoms: params.symptoms,
        possibleCauses: [
          {
            name: 'Gram Pod Borer / Foliage Feeder',
            scientificName: 'Helicoverpa armigera',
            type: 'pest',
            likelihood: 'Probable',
            supportingEvidence: [
              'Circular holes on pods/buds with visible caterpillar droppings (frass)',
              'Cluster pheromone trap alert indicated >8 moths/trap threshold breach in Sehore district',
              'Crop at flowering/podding stage is highly attractant to oviposition'
            ],
            contradictingOrMissing: [
              'Actual physical caterpillar specimen photographed or counted per meter row'
            ],
            safeNextSteps: [
              'Install 5 T-shaped bird perches per acre immediately to invite insectivorous birds',
              'Shake 10 random plants over a white sheet in early morning to count larval density',
              'Install 2 monitoring pheromone traps per acre to track moth influx'
            ],
            cautionNote: 'Biological controls like HaNPV or Neem-based Azadirachtin (1500 ppm) should precede broad-spectrum chemicals.'
          }
        ],
        confidenceRating: 'High',
        uncertaintyReason: 'Chewing damage is characteristic; however, exact larval instar stage requires close-up inspection to determine intervention threshold.',
        additionalInfoNeeded: [
          'Larva count per linear meter row',
          'Presence of fresh green droppings versus dry old feeding signs'
        ],
        isDemoSimulation: true,
        disclaimer: 'Decision support demonstration. Adhere to Economic Threshold Level (ETL) principles before pesticide spraying.'
      };
    }

    // Default general assessment
    return {
      id: `assess-${Date.now().toString(36)}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      crop: params.crop,
      fieldId: params.fieldId,
      fieldName: params.fieldName,
      growthStage: params.growthStage,
      uploadedImageUrl: params.imageUrl,
      reportedSymptoms: params.symptoms,
      possibleCauses: [
        {
          name: 'Early Physiological / Environmental Moisture Stress',
          type: 'environmental',
          likelihood: 'Possible',
          supportingEvidence: [
            'Reported symptoms align with micro-climate soil water transitions',
            'No widespread necrotic lesions or chewing detected in sample visual pattern'
          ],
          contradictingOrMissing: [
            'Direct soil moisture tension sensor data for root zone'
          ],
          safeNextSteps: [
            'Monitor top 10cm soil moisture near root zone',
            'Re-inspect in 48 hours and submit follow-up leaf photo if yellowing progresses'
          ],
          cautionNote: 'Maintain balanced irrigation and avoid over-saturating black cotton soils.'
        }
      ],
      confidenceRating: 'Low',
      uncertaintyReason: 'Reported symptoms are non-specific and overlap with multiple environmental conditions.',
      additionalInfoNeeded: [
        'Higher resolution image with direct sunlight',
        'Details of recent fertilizer or herbicide applications'
      ],
      isDemoSimulation: true,
      disclaimer: 'Heuristic decision support. Consult an agronomist for critical field issues.'
    };
  }
};
