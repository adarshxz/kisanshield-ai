export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language: 'en' | 'hi';
  evidenceReferences?: string[];
  suggestedAction?: {
    label: string;
    path: string;
  };
}

export const assistantService = {
  getResponse: async (
    query: string,
    language: 'en' | 'hi',
    farmContext: { farmName: string; crop: string; fieldName: string; highestRiskTitle: string }
  ): Promise<ChatMessage> => {
    // Simulate thinking delay
    await new Promise(r => setTimeout(r, 650));

    const q = query.toLowerCase();

    if (language === 'hi') {
      if (q.includes('पीले') || q.includes('पत्ते') || q.includes('रोग') || q.includes('बीमारी')) {
        return {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: `आपके ${farmContext.fieldName} में ${farmContext.crop} की फसल में हाल ही में 18.4 मिमी बारिश और 84% नमी दर्ज की गई है। नमी के कारण 'राइजोक्टोनिया फोलियर ब्लाइट' या जलभराव से निचले पत्तों में पीलापन आ सकता है। तुरंत कोई रासायनिक छिड़काव न करें; पहले पत्ते के निचले हिस्से की जांच करें और जल निकासी सुनिश्चित करें।`,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          language: 'hi',
          evidenceReferences: [
            'माइक्रो-क्लाइमेट आर्द्रता: 84%',
            'फसल वृद्धि अवस्था: फली बनना (Pod Formation)',
            'ICAR-IISR अनुशंसित प्राथमिक उपाय'
          ],
          suggestedAction: {
            label: 'क्रॉप डॉक्टर में फोटो जांचें',
            path: '/app/crop-doctor'
          }
        };
      }

      if (q.includes('सिंचाई') || q.includes('पानी') || q.includes('बारिश')) {
        return {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: `मौसम पूर्वानुमान के अनुसार कल 22.5 मिमी भारी वर्षा होने की संभावना है। अतः Field A (सोयाबीन) और Field C (चना) में वर्तमान में सिंचाई पूरी तरह टाल दें। Field B (गेहूं) में बुधवार से पहले हल्की सिंचाई की योजना बनाई जा सकती है।`,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          language: 'hi',
          evidenceReferences: [
            'आगामी 48 घंटे में 34 मिमी वर्षा अनुमान',
            'मृदा जल संतुलन मॉडल (HydroCrop)'
          ],
          suggestedAction: {
            label: 'स्मार्ट सिंचाई सलाहकार देखें',
            path: '/app/irrigation'
          }
        };
      }

      if (q.includes('कार्य') || q.includes('काम') || q.includes('टास्क')) {
        return {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: `आज के लिए सबसे महत्वपूर्ण कार्य है: Field A के पूर्वी ढलान पर जलनिकासी नालियों को साफ करना ताकि आने वाली बारिश का पानी जमा न हो, और Field C में पक्षी बैठने के 5 टी-आकार के अड्डे लगाना।`,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          language: 'hi',
          suggestedAction: {
            label: 'कार्य योजनाकार खोलें',
            path: '/app/action-planner'
          }
        };
      }

      // Default Hindi
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: `मैंने आपके ${farmContext.farmName} का संदर्भ देखा है। वर्तमान में शीर्ष जोखिम है: "${farmContext.highestRiskTitle}"। आप फसल की स्थिति, रोग लक्षण, सिंचाई योजना या आज के कार्यों के बारे में पूछ सकते हैं।`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        language: 'hi',
        suggestedAction: {
          label: 'जोखिम रडार देखें',
          path: '/app/risk-radar'
        }
      };
    }

    // English responses
    if (q.includes('yellow') || q.includes('leaf') || q.includes('disease') || q.includes('spot')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: `In your ${farmContext.fieldName} (${farmContext.crop}), recent heavy moisture (84% RH, 18.4mm rain) creates elevated risk for Rhizoctonia aerial blight. Do not rush to spray chemicals while leaves are wet. Scout the lower canopy first and verify drainage.`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        language: 'en',
        evidenceReferences: [
          'Sensor Wetness: 14.2 Hours recorded',
          'Forecast 48h Rain: 34 mm',
          'IISR Soybean Advisory Bulletin'
        ],
        suggestedAction: {
          label: 'Open Crop Doctor AI',
          path: '/app/crop-doctor'
        }
      };
    }

    if (q.includes('irrigation') || q.includes('water') || q.includes('rain')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: `With 22.5mm rain forecast tomorrow, hold off on irrigation for Field A and Field C. For Field B (Wheat early vegetative), plan a 35mm furrow watering after the rain event passes.`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        language: 'en',
        suggestedAction: {
          label: 'View Irrigation Advisor',
          path: '/app/irrigation'
        }
      };
    }

    if (q.includes('task') || q.includes('today') || q.includes('work')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: `You have 2 pending high-priority tasks today: 1) Scout Field A for aerial blight lesions, and 2) Install 5 bird perches in Field C for natural pod borer defense.`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        language: 'en',
        suggestedAction: {
          label: 'View Action Planner',
          path: '/app/action-planner'
        }
      };
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: `Connected to ${farmContext.farmName} decision context. Active highest risk: "${farmContext.highestRiskTitle}". How can I assist you with scouting, irrigation, cost simulations, or disease checks today?`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      language: 'en',
      suggestedAction: {
        label: 'Inspect Crop Risk Radar',
        path: '/app/risk-radar'
      }
    };
  }
};
