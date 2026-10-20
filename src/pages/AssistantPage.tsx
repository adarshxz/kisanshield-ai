import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { assistantService, ChatMessage } from '../services/assistantService';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RotateCcw, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  Bot,
  User as UserIcon
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { useNavigate } from 'react-router-dom';

export const AssistantPage: React.FC = () => {
  const { selectedFarm, selectedField, language, setLanguage, t, showToast } = useApp();
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: language === 'hi'
        ? `नमस्ते ${selectedFarm.ownerName}! मैं आपका किसान सहायक हूँ। वर्तमान में ${selectedField?.name} (${selectedField?.currentCrop}) में 84% आर्द्रता के कारण 'राइजोक्टोनिया ब्लाइट' का जोखिम बढ़ा हुआ है। आप मुझसे फसल स्वास्थ्य, सिंचाई, या आज के कार्यों के बारे में हिंदी या अंग्रेजी में पूछ सकते हैं।`
        : `Namaste ${selectedFarm.ownerName}! I am your Kisan Assistant. In ${selectedField?.name} (${selectedField?.currentCrop}), elevated disease risk is active due to 84% canopy humidity. Ask me about crop symptoms, irrigation decisions, or today's scheduled tasks in English or Hindi.`,
      timestamp: 'Just now',
      language,
      evidenceReferences: ['Micro-climate wetness: 14.2h', 'Rainfall: 18.4mm'],
      suggestedAction: {
        label: 'View Crop Risk Radar',
        path: '/app/risk-radar'
      }
    }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      language,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);

    try {
      const resp = await assistantService.getResponse(textToSend, language, {
        farmName: selectedFarm.name,
        crop: selectedField?.currentCrop || 'Soybean',
        fieldName: selectedField?.name || 'Field A',
        highestRiskTitle: 'Rhizoctonia Aerial Blight Weather Alert',
      });
      setMessages(prev => [...prev, resp]);

      // If browser supports SpeechSynthesis, speak response
      if ('speechSynthesis' in window && isSpeaking) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(resp.text);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      showToast({ type: 'error', title: 'Assistant Error', message: 'Could not process message.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleMic = () => {
    // Check Web Speech API support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast({
        type: 'info',
        title: 'Speech Recognition Demo Notice',
        message: 'Browser Speech API not detected in this environment. You can type or tap sample questions.'
      });
      return;
    }

    if (isListening) {
      setIsListening(false);
    } else {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
          handleSend(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  const sampleQuestions = language === 'hi' ? [
    "मेरी फसल में पत्ते पीले क्यों हो रहे हैं?",
    "बारिश के हिसाब से मुझे सिंचाई कब करनी चाहिए?",
    "आज के मेरे आवश्यक कृषि कार्य क्या हैं?",
    "सोयाबीन में कीट का प्रकोप कैसे पहचानें?"
  ] : [
    "Why are lower leaves turning yellow in Field A?",
    "Should I irrigate before tomorrow's rain forecast?",
    "What are my highest priority farm tasks today?",
    "Explain my current crop risk assessment."
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <Mic className="w-6 h-6 text-forest-700 dark:text-fresh" />
            <h2 className="text-xl font-black text-kisan-text dark:text-white">
              {t.assistant.title}
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Bilingual (हिंदी / English)
            </span>
          </div>
          <p className="text-xs text-kisan-muted dark:text-gray-400 mt-1">
            {t.assistant.subtitle} Context-grounded in {selectedFarm.name} telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switch */}
          <div className="flex items-center bg-surface-warm dark:bg-forest-900 rounded-xl p-0.5 border border-surface-border dark:border-forest-800">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                language === 'en' ? 'bg-white dark:bg-forest-800 text-forest-700 dark:text-white shadow-xs' : 'text-kisan-muted'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                language === 'hi' ? 'bg-white dark:bg-forest-800 text-forest-700 dark:text-white shadow-xs' : 'text-kisan-muted'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Read aloud toggle */}
          <button
            onClick={() => setIsSpeaking(!isSpeaking)}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isSpeaking ? 'bg-forest-700 text-white border-forest-700' : 'bg-white dark:bg-forest-900 border-surface-border text-kisan-muted'
            }`}
            title="Read assistant responses aloud"
          >
            {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <DisclaimerBanner variant="compact" />

      {/* Chat Messages Log */}
      <Card className="p-6 min-h-[420px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto max-h-[460px] pr-2">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                  isUser ? 'bg-forest-700 text-white' : 'bg-fresh/20 text-forest-900 dark:text-fresh'
                }`}>
                  {isUser ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                  isUser 
                    ? 'bg-forest-700 text-white rounded-tr-none' 
                    : 'bg-surface-warm dark:bg-forest-900 border border-surface-border dark:border-forest-800 text-kisan-text dark:text-gray-100 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Evidence stream tags */}
                  {msg.evidenceReferences && (
                    <div className="pt-2 border-t border-surface-border/60 dark:border-forest-800 text-[10px] space-y-0.5 opacity-90">
                      <span className="font-bold uppercase tracking-wider block">Ground Evidence References:</span>
                      {msg.evidenceReferences.map((ref, idx) => (
                        <div key={idx}>• {ref}</div>
                      ))}
                    </div>
                  )}

                  {/* Suggested action button */}
                  {msg.suggestedAction && (
                    <div className="pt-2">
                      <button
                        onClick={() => navigate(msg.suggestedAction!.path)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-forest-950 text-forest-700 dark:text-fresh font-bold text-[11px] shadow-xs hover:underline"
                      >
                        {msg.suggestedAction.label} <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <span className={`block text-[10px] text-right mt-1 ${isUser ? 'text-forest-200' : 'text-kisan-muted'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isProcessing && (
            <div className="flex gap-3 items-center text-xs text-kisan-muted italic animate-pulse">
              <Bot className="w-5 h-5 text-forest-700" />
              <span>{t.assistant.processing}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        <div className="pt-4 mt-4 border-t border-surface-border dark:border-forest-900">
          <span className="text-[11px] font-bold text-kisan-muted dark:text-gray-400 block mb-2">
            {t.assistant.sampleQuestionsTitle}:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[11px] font-medium px-3 py-1.5 rounded-xl border border-surface-border dark:border-forest-800 bg-surface-warm dark:bg-forest-900/60 hover:bg-forest-50 hover:text-forest-800 dark:hover:bg-forest-800 transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar with Large Mic Button */}
        <div className="mt-4 pt-4 border-t border-surface-border dark:border-forest-900 flex items-center gap-3">
          <button
            onClick={toggleMic}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shrink-0 ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse shadow-lg ring-4 ring-rose-200'
                : 'bg-forest-700 hover:bg-forest-800 text-white shadow-card'
            }`}
            title="Tap to speak in Hindi or English"
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? t.assistant.listening : t.assistant.micPrompt}
              className="w-full text-xs rounded-2xl border border-surface-border dark:border-forest-800 px-4 py-3 bg-surface-warm dark:bg-forest-900 text-kisan-text dark:text-white focus:outline-none focus:border-forest-700"
            />
          </div>

          <Button
            size="md"
            variant="primary"
            onClick={() => handleSend()}
            disabled={!input.trim() || isProcessing}
            rightIcon={<Send className="w-4 h-4" />}
          >
            Send
          </Button>
        </div>
      </Card>

    </div>
  );
};
