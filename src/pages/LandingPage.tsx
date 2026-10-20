import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Radar, 
  Stethoscope, 
  Droplets, 
  TrendingUp, 
  CalendarCheck, 
  Satellite, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Cpu, 
  HelpCircle, 
  Shield, 
  Layers, 
  FileCheck, 
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { Button } from '../components/common/Button';

export const LandingPage: React.FC = () => {
  const { t, language, setLanguage, theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-warm dark:bg-forest-950 text-kisan-text dark:text-white flex flex-col transition-colors">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-forest-950/90 backdrop-blur-md border-b border-surface-border dark:border-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-700 flex items-center justify-center text-white font-bold shadow-sm">
              <ShieldCheck className="w-6 h-6 text-fresh" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-forest-900 dark:text-white">KisanShield</span>
              <span className="ml-1 text-xs px-1.5 py-0.5 rounded uppercase font-bold bg-fresh/20 text-forest-800 dark:text-fresh">AI</span>
              <p className="text-[11px] text-kisan-muted dark:text-gray-400 leading-none hidden sm:block">From Reactive to Predictive Farming</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-kisan-muted dark:text-gray-300">
            <a href="#how-it-works" className="hover:text-forest-700 dark:hover:text-fresh transition-colors">How It Works</a>
            <a href="#features" className="hover:text-forest-700 dark:hover:text-fresh transition-colors">Features</a>
            <a href="#explainability" className="hover:text-forest-700 dark:hover:text-fresh transition-colors">Explainable AI</a>
            <a href="#transparency" className="hover:text-forest-700 dark:hover:text-fresh transition-colors">Trust & Safety</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-surface-border dark:border-forest-800 hover:bg-surface-warm dark:hover:bg-forest-900 text-kisan-text dark:text-gray-200 transition-colors"
            >
              {language === 'en' ? 'हिन्दी में देखें' : 'View in English'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-surface-border dark:border-forest-800 hover:bg-surface-warm dark:hover:bg-forest-900 text-kisan-muted dark:text-gray-300 transition-colors"
              title="Toggle light / dark theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
            <Link
              to="/login"
              className="text-xs font-semibold text-kisan-muted hover:text-forest-700 dark:text-gray-300 dark:hover:text-white px-3 py-2"
            >
              Sign In
            </Link>
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate('/app/dashboard')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Launch Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-white to-surface-warm dark:from-forest-950 dark:to-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-50 dark:bg-forest-900 border border-forest-200 dark:border-forest-800 text-xs font-semibold text-forest-800 dark:text-forest-200">
                <Sparkles className="w-4 h-4 text-fresh" />
                <span>AI-Powered Agricultural Risk Intelligence & Decision Support</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-950 dark:text-white tracking-tight leading-[1.15]">
                Know the Risk.<br />
                <span className="text-forest-700 dark:text-fresh">Protect the Harvest.</span>
              </h1>

              <p className="text-base sm:text-lg text-kisan-muted dark:text-gray-300 max-w-xl leading-relaxed">
                KisanShield AI turns weather signals, crop observations, and farm economics into understandable insights and actionable farming decisions.
              </p>

              {/* Core Mantra Box */}
              <div className="p-4 rounded-xl bg-forest-900 text-white shadow-soft flex items-center justify-between gap-4 text-xs sm:text-sm font-medium">
                <span className="text-fresh font-bold">Predict the risk.</span>
                <span className="text-forest-300">→</span>
                <span>Explain the reason.</span>
                <span className="text-forest-300">→</span>
                <span className="text-amber-300">Recommend the action.</span>
                <span className="text-forest-300">→</span>
                <span>Measure outcome.</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/app/dashboard')}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Explore Your Farm
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-forest-700 text-forest-700 hover:bg-forest-50 dark:border-fresh dark:text-fresh dark:hover:bg-forest-900 font-bold"
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  See How It Works
                </Button>
                <Link
                  to="/onboarding"
                  className="text-xs font-semibold text-forest-700 dark:text-fresh hover:underline px-2 py-1"
                >
                  Start New Farm Setup →
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-surface-border flex flex-wrap items-center gap-6 text-xs text-kisan-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-700" />
                  Honest Data Provenance
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-700" />
                  Deterministic Economics
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-700" />
                  Bilingual (हिन्दी / English)
                </span>
              </div>
            </div>

            {/* Right Live Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-elevated border border-surface-border">
                {/* Live Demonstration Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-surface-border">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-fresh animate-ping" />
                    <span className="font-bold text-xs text-forest-900">Crop Risk Radar · Field A</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    Elevated Risk
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="p-3 rounded-xl bg-surface-warm border border-surface-border">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-kisan-text">Rhizoctonia Aerial Blight</span>
                      <span className="text-[11px] text-kisan-muted">Soybean (R4 Stage)</span>
                    </div>
                    <p className="text-[11px] text-kisan-muted mt-1 leading-snug">
                      14 consecutive hours of canopy wetness &gt;82% RH detected following 18.4mm rainfall.
                    </p>
                  </div>

                  {/* Evidence Stream */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-kisan-muted tracking-wider block mb-1.5">
                      Ground Evidence Sources
                    </span>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 text-xs">
                        <span className="text-emerald-900">Canopy Wetness: 14.2h</span>
                        <DataSourceBadge type="measured" sourceName="Field Node A1" showIcon={false} />
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-purple-50/70 border border-purple-100 text-xs">
                        <span className="text-purple-900">Rainfall: 18.4 mm</span>
                        <DataSourceBadge type="trusted_retrieval" sourceName="IMD Sehore" showIcon={false} />
                      </div>
                    </div>
                  </div>

                  {/* Recommended Action */}
                  <div className="p-3 rounded-xl bg-forest-900 text-white text-xs">
                    <span className="text-fresh font-bold block mb-1">Recommended Preventative Step:</span>
                    <p className="text-forest-100 text-[11px] leading-relaxed">
                      Scout 10 lower-terrace plants. Postpone foliar chemical sprays until leaf surface is fully dry.
                    </p>
                    <div className="mt-2 pt-2 border-t border-forest-800 flex items-center justify-between text-[10px] text-forest-300">
                      <span>Assigned to Today's Tasks</span>
                      <span className="text-fresh font-semibold">Priority: High</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <Link
                    to="/app/dashboard"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-700 hover:text-forest-800"
                  >
                    Open Full Interactive Demonstration <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-16 bg-white dark:bg-forest-900/40 border-y border-surface-border dark:border-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs uppercase font-bold tracking-widest text-forest-700 dark:text-fresh">The Problem in Traditional Farming</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-forest-950 dark:text-white mt-2">
              Farmers Are Forced to React After Damage Has Already Occurred
            </h3>
            <p className="text-sm text-kisan-muted dark:text-gray-300 mt-3">
              Unpredictable micro-climates, water stress, delayed disease discovery, and rising input costs leave farmers bearing all the financial risk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-surface-warm dark:bg-forest-950 border border-surface-border dark:border-forest-800">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h4 className="font-bold text-base text-kisan-text dark:text-white">Late Disease Detection</h4>
              <p className="text-xs text-kisan-muted dark:text-gray-300 mt-2 leading-relaxed">
                Fungal and bacterial blights spread silently under dense canopies days before visible yellowing. Spraying late costs more and yields less.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-warm dark:bg-forest-950 border border-surface-border dark:border-forest-800">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h4 className="font-bold text-base text-kisan-text dark:text-white">Uncertain Rainfall & Irrigation</h4>
              <p className="text-xs text-kisan-muted dark:text-gray-300 mt-2 leading-relaxed">
                Irrigating hours before an unforecast heavy shower causes waterlogging, root hypoxia, and wasted electricity and water resources.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-warm dark:bg-forest-950 border border-surface-border dark:border-forest-800">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold mb-4">
                03
              </div>
              <h4 className="font-bold text-base text-kisan-text dark:text-white">Unexplained Generic Advice</h4>
              <p className="text-xs text-kisan-muted dark:text-gray-300 mt-2 leading-relaxed">
                Generic broadcast messages fail to explain why an action is needed for a specific field or what evidence triggered the recommendation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-warm dark:bg-forest-950 border border-surface-border dark:border-forest-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-forest-700 dark:text-fresh flex items-center justify-center font-bold mb-4">
                04
              </div>
              <h4 className="font-bold text-base text-kisan-text dark:text-white">Blind Financial Decisions</h4>
              <p className="text-xs text-kisan-muted dark:text-gray-300 mt-2 leading-relaxed">
                Purchasing costly chemical inputs without simulating break-even price sensitivity frequently leads to negative net seasonal margins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How KisanShield Works (Observe -> Assess -> Recommend -> Act -> Learn) */}
      <section id="how-it-works" className="py-20 bg-surface-warm dark:bg-forest-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-forest-700 dark:text-fresh">The 5-Question Framework</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-forest-950 dark:text-white mt-2">
              From Observation to Measured Field Outcomes
            </h3>
            <p className="text-sm text-kisan-muted dark:text-gray-300 mt-3">
              KisanShield AI connects farm telemetry, visual symptom diagnosis, and daily action workflows into a closed learning loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '1. Observe',
                question: 'What is happening on my farm?',
                desc: 'Continuous micro-climate readings, crop stages, and farmer mobile photos.',
                icon: Radar,
                color: 'bg-emerald-500'
              },
              {
                step: '2. Assess',
                question: 'What could go wrong next?',
                desc: 'Risk models estimate pathogen wetness windows, pest thresholds, and moisture deficits.',
                icon: AlertTriangle,
                color: 'bg-amber-500'
              },
              {
                step: '3. Explain',
                question: 'Why does the system believe this?',
                desc: 'Full transparency: every alert details exact sensor readings, IMD records, and uncertainty.',
                icon: Cpu,
                color: 'bg-purple-500'
              },
              {
                step: '4. Act',
                question: 'What should I do next?',
                desc: 'Prioritized daily tasks with safe cultural practices and clear scouting guidance.',
                icon: CalendarCheck,
                color: 'bg-blue-500'
              },
              {
                step: '5. Learn',
                question: 'Did the action actually help?',
                desc: 'Audit trail records whether recommendations were followed and the resulting field outcome.',
                icon: FileCheck,
                color: 'bg-forest-700'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white dark:bg-forest-900 p-6 rounded-2xl border border-surface-border dark:border-forest-800 shadow-card relative flex flex-col justify-between">
                  <div>
                    <div className={`w-8 h-8 rounded-lg ${item.color} text-white flex items-center justify-center font-bold text-xs mb-3`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-forest-700 dark:text-fresh uppercase tracking-wider block mb-1">{item.step}</span>
                    <h4 className="text-sm font-bold text-forest-950 dark:text-white leading-snug">{item.question}</h4>
                    <p className="text-xs text-kisan-muted dark:text-gray-300 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Overview Section */}
      <section id="features" className="py-20 bg-white dark:bg-forest-900/40 border-t border-surface-border dark:border-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-forest-700 dark:text-fresh">Platform Capabilities</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-forest-950 dark:text-white mt-2">
              A Complete Agricultural Decision Support Suite
            </h3>
            <p className="text-sm text-kisan-muted dark:text-gray-300 mt-3">
              Explore interconnected tools designed for smallholder and progressive farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Crop Risk Radar',
                desc: 'Predictive early warning across disease-conducive weather, root moisture deficit, and extreme heat before symptoms erupt.',
                icon: Radar,
                link: '/app/risk-radar'
              },
              {
                title: 'Multimodal Crop Doctor',
                desc: 'Visual leaf assessment with explainable candidate causes, missing information prompts, and safe next agronomic steps.',
                icon: Stethoscope,
                link: '/app/crop-doctor'
              },
              {
                title: 'Adaptive Action Planner',
                desc: 'Daily prioritized farm tasks that dynamically reschedule when micro-weather changes or rain events occur.',
                icon: CalendarCheck,
                link: '/app/action-planner'
              },
              {
                title: 'ProfitGuard Simulator',
                desc: 'Deterministic farm economics simulator comparing adverse, expected, and favorable price/yield scenarios with break-even calculations.',
                icon: TrendingUp,
                link: '/app/profitguard'
              },
              {
                title: 'Satellite Field Intelligence',
                desc: 'Open-access Sentinel-2 NDVI trends, vegetation vigor zoning, and cloud-mask transparency across registered farm boundaries.',
                icon: Satellite,
                link: '/app/field-intelligence'
              },
              {
                title: 'Smart Irrigation Advisor',
                desc: 'Soil-water balance modeling integrating soil type, crop root depth, and forecast rain to prevent over-watering.',
                icon: Droplets,
                link: '/app/irrigation'
              }
            ].map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-surface-warm dark:bg-forest-950 border border-surface-border dark:border-forest-800 hover:shadow-card transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-fresh flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-forest-950 dark:text-white">{f.title}</h4>
                    <p className="text-xs text-kisan-muted dark:text-gray-300 mt-2 leading-relaxed">{f.desc}</p>
                  </div>
                  <Link
                    to={f.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-700 dark:text-fresh hover:underline mt-6"
                  >
                    Open Workspace <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section id="transparency" className="py-20 bg-forest-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-fresh">Trust & Agronomic Transparency</span>
              <h3 className="text-3xl font-extrabold mt-2">
                Honest AI That Never Fakes Certainty
              </h3>
              <p className="text-sm text-forest-200 mt-4 leading-relaxed">
                Agricultural decisions impact family livelihoods. KisanShield AI explicitly marks all simulated demonstration data, distinguishes sensor observations from model predictions, and escalates high-uncertainty cases to qualified human agronomists.
              </p>

              <div className="space-y-4 mt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-fresh shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">Clear Data Provenance</h5>
                    <p className="text-xs text-forest-300">Measured data, farmer observations, trusted IMD bulletins, and simulated models are color-coded and labeled.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-fresh shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">No Arbitrary Chemical Prescriptions</h5>
                    <p className="text-xs text-forest-300">We prioritize cultural, biological, and preventive field practices over unverified pesticide doses.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-fresh shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">Expert Review Desk</h5>
                    <p className="text-xs text-forest-300">Farmers can submit ambiguous crop assessments directly to local agricultural extension officers for human validation.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-forest-950 p-6 sm:p-8 rounded-3xl border border-forest-800 shadow-xl space-y-4">
              <h4 className="text-sm font-bold text-fresh uppercase tracking-wider">Mandatory Product Advisory</h4>
              <p className="text-xs text-forest-200 leading-relaxed">
                "KisanShield AI provides agricultural decision support. Assessments may be uncertain and depend on the quality and freshness of available data. Verify important crop-treatment, irrigation, fertilizer, and financial decisions with trusted local guidance or a qualified agricultural expert."
              </p>

              <div className="pt-4 border-t border-forest-800 flex items-center justify-between text-xs text-forest-300">
                <span>Madhya Pradesh Pilot Farm Dataset</span>
                <span className="font-semibold text-white">Prototype v1.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-surface-warm dark:bg-forest-950 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h3 className="text-3xl font-extrabold text-forest-950 dark:text-white">
            Ready to Experience Predictive Farming?
          </h3>
          <p className="text-sm text-kisan-muted dark:text-gray-300 max-w-xl mx-auto">
            Explore the live demonstration workspace featuring real field parameters from Sehore district, Madhya Pradesh.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/app/dashboard')}
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Enter Farm Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-forest-700 text-forest-700 hover:bg-forest-50 dark:border-fresh dark:text-fresh dark:hover:bg-forest-900 font-bold"
              onClick={() => navigate('/onboarding')}
            >
              Run Farm Onboarding Wizard
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-white dark:bg-forest-950 border-t border-surface-border dark:border-forest-900 py-8 text-xs text-kisan-muted dark:text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-forest-700 dark:text-fresh" />
            <span className="font-bold text-forest-950 dark:text-white">KisanShield AI</span>
            <span>— From Reactive to Predictive Farming</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/app/settings" className="hover:text-forest-700 dark:hover:text-fresh">Privacy & Consent</Link>
            <Link to="/app/decision-history" className="hover:text-forest-700 dark:hover:text-fresh">Explainability Audit</Link>
            <Link to="/expert/dashboard" className="hover:text-forest-700 dark:hover:text-fresh">Expert Desk</Link>
          </div>

          <p className="text-[11px]">
            Demonstration Agricultural Decision Support Prototype.
          </p>
        </div>
      </footer>
    </div>
  );
};
