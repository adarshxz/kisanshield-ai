import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { farmService } from '../services/farmService';
import { Farm, Field } from '../types';
import { 
  ShieldCheck, 
  User, 
  MapPin, 
  Sprout, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Droplet,
  FileText
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const OnboardingPage: React.FC = () => {
  const { setSelectedFarmId, setSelectedFieldId, showToast, refreshFarms } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Form state
  const [farmerName, setFarmerName] = useState('Devendra Singh');
  const [preferredLang, setPreferredLang] = useState<'en' | 'hi'>('hi');
  const [contact, setContact] = useState('9425098765');

  // Farm info
  const [farmName, setFarmName] = useState('Kisan Prerna Farm');
  const [state, setState] = useState('Madhya Pradesh');
  const [district, setDistrict] = useState('Sehore');
  const [village, setVillage] = useState('Bilkisganj');
  const [farmSizeAcres, setFarmSizeAcres] = useState(8.0);

  // Crop info
  const [crop, setCrop] = useState('Soybean');
  const [variety, setVariety] = useState('JS 95-60');
  const [sowingDate, setSowingDate] = useState('2026-07-08');
  const [growthStage, setGrowthStage] = useState<'Pod / Grain Formation'>('Pod / Grain Formation');
  const [irrigationMethod, setIrrigationMethod] = useState<'Sprinkler' | 'Drip' | 'Flood / Furrow' | 'Rainfed'>('Sprinkler');

  // Soil info
  const [soilType, setSoilType] = useState('Deep Black Cotton Soil (Vertisol)');
  const [hasSoilTest, setHasSoilTest] = useState(true);
  const [moistureStatus, setMoistureStatus] = useState<'Optimal' | 'Deficit' | 'Excess' | 'Unknown'>('Optimal');

  const handleFinishOnboarding = () => {
    const newField: Field = {
      id: `field-${Date.now().toString(36)}`,
      farmId: `farm-${Date.now().toString(36)}`,
      name: `${crop} Plot (Main)`,
      areaAcres: farmSizeAcres,
      currentCrop: crop,
      variety: variety || undefined,
      sowingDate,
      growthStage,
      soilType,
      irrigationMethod,
      coordinates: [23.0250, 76.5350],
      latestNdvi: 0.70,
      moistureStatus,
    };

    const newFarm: Farm = {
      id: newField.farmId,
      name: farmName,
      ownerName: farmerName,
      state,
      district,
      village,
      totalAreaAcres: farmSizeAcres,
      fields: [newField],
      createdAt: new Date().toISOString().split('T')[0],
    };

    farmService.saveFarm(newFarm);
    refreshFarms();
    setSelectedFarmId(newFarm.id);
    setSelectedFieldId(newField.id);

    showToast({
      type: 'success',
      title: 'Farm Setup Complete',
      message: `${farmName} registered with ${crop} monitoring enabled.`
    });

    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface-warm py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-forest-700 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5 text-fresh" />
            </div>
            <span className="font-bold text-lg text-forest-950">KisanShield Farm Onboarding</span>
          </div>
          <p className="text-xs text-kisan-muted">
            Configure your farm plot to enable personalized risk alerts and adaptive schedules
          </p>
        </div>

        {/* Multi-step Stepper */}
        <div className="flex items-center justify-between mb-8 max-w-xl mx-auto">
          {[
            { num: 1, label: 'Profile' },
            { num: 2, label: 'Farm' },
            { num: 3, label: 'Crops' },
            { num: 4, label: 'Soil' },
            { num: 5, label: 'Confirm' }
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step >= s.num ? 'bg-forest-700 text-white' : 'bg-surface-border text-kisan-muted'
              }`}>
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`text-[11px] mt-1 font-medium ${step >= s.num ? 'text-forest-900 font-bold' : 'text-kisan-muted'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Wizard Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-surface-border">
          
          {/* STEP 1: Farmer Profile */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-lg font-bold text-kisan-text">Step 1: Farmer Profile</h3>
              <p className="text-xs text-kisan-muted">Tell us who is managing this agricultural plot.</p>

              <div>
                <label className="block text-xs font-semibold mb-1">Farmer Full Name *</label>
                <input
                  type="text"
                  required
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Mobile Contact (Optional)</label>
                <input
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Preferred Language</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPreferredLang('hi')}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      preferredLang === 'hi' ? 'border-forest-700 bg-forest-50 text-forest-800' : 'border-surface-border text-kisan-muted'
                    }`}
                  >
                    हिन्दी (Hindi)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredLang('en')}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      preferredLang === 'en' ? 'border-forest-700 bg-forest-50 text-forest-800' : 'border-surface-border text-kisan-muted'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Farm Location & Size */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-lg font-bold text-kisan-text">Step 2: Farm & Plot Location</h3>
              <p className="text-xs text-kisan-muted">Micro-climate models use this to correlate localized IMD grid data.</p>

              <div>
                <label className="block text-xs font-semibold mb-1">Farm Name</label>
                <input
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    disabled
                    className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5 bg-surface-warm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">District</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Village</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Total Farm Area (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={farmSizeAcres}
                  onChange={(e) => setFarmSizeAcres(Number(e.target.value))}
                  className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Crop Details */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-lg font-bold text-kisan-text">Step 3: Crop & Sowing Information</h3>
              <p className="text-xs text-kisan-muted">Configure active crop for phenological risk tracking.</p>

              <div>
                <label className="block text-xs font-semibold mb-1">Primary Crop</label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5 bg-white"
                >
                  <option value="Soybean">Soybean (सोयाबीन)</option>
                  <option value="Wheat">Wheat (गेहूं)</option>
                  <option value="Gram (Chickpea)">Gram / Chickpea (चना)</option>
                  <option value="Mustard">Mustard (सरसों)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Seed Variety (Optional if known)</label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  placeholder="e.g. JS 20-34, Sharbati, JG-11"
                  className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Sowing Date</label>
                  <input
                    type="date"
                    value={sowingDate}
                    onChange={(e) => setSowingDate(e.target.value)}
                    className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Irrigation Method</label>
                  <select
                    value={irrigationMethod}
                    onChange={(e) => setIrrigationMethod(e.target.value as any)}
                    className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5 bg-white"
                  >
                    <option value="Sprinkler">Sprinkler (फव्वारा)</option>
                    <option value="Drip">Drip (ड्रिप)</option>
                    <option value="Flood / Furrow">Flood / Furrow (खुली नाली)</option>
                    <option value="Rainfed">Rainfed (वर्षा आधारित)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Soil & Conditions */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-lg font-bold text-kisan-text">Step 4: Soil Profile & Water Observations</h3>
              <p className="text-xs text-kisan-muted">Soil water retention informs waterlogging vs drought stress calculations.</p>

              <div>
                <label className="block text-xs font-semibold mb-1">Soil Texture / Type</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5 bg-white"
                >
                  <option value="Deep Black Cotton Soil (Vertisol)">Deep Black Cotton Soil (काली मिट्टी - Vertisol)</option>
                  <option value="Medium Black Loam">Medium Black Loam (मध्यम दोमट)</option>
                  <option value="Sandy Loam">Sandy Loam (बलुई दोमट)</option>
                  <option value="Light Clay">Light Clay (हल्की चिकनी मिट्टी)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Current Soil Moisture Condition</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Optimal', 'Deficit', 'Excess'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setMoistureStatus(status)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold capitalize ${
                        moistureStatus === status ? 'border-forest-700 bg-forest-50 text-forest-800' : 'border-surface-border text-kisan-muted'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-warm border border-surface-border text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-kisan-text block">Do you have a Soil Health Card?</span>
                  <span className="text-kisan-muted text-[11px]">You can enter or upload N-P-K and micronutrient values later.</span>
                </div>
                <input
                  type="checkbox"
                  checked={hasSoilTest}
                  onChange={(e) => setHasSoilTest(e.target.checked)}
                  className="w-4 h-4 text-forest-700 rounded"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Confirmation */}
          {step === 5 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-lg font-bold text-kisan-text">Step 5: Review & Confirm Setup</h3>
              <p className="text-xs text-kisan-muted">Verify your details before launching into the predictive dashboard.</p>

              <div className="p-4 rounded-2xl bg-surface-warm border border-surface-border divide-y divide-surface-border text-xs">
                <div className="pb-3 flex justify-between">
                  <span className="text-kisan-muted">Farmer & Language:</span>
                  <span className="font-bold text-kisan-text">{farmerName} ({preferredLang === 'hi' ? 'हिन्दी' : 'English'})</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-kisan-muted">Farm & Village:</span>
                  <span className="font-bold text-kisan-text">{farmName} · {village}, {district} ({farmSizeAcres} Ac)</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-kisan-muted">Active Crop:</span>
                  <span className="font-bold text-kisan-text">{crop} ({variety || 'Standard'})</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-kisan-muted">Growth Stage & Sowing:</span>
                  <span className="font-bold text-kisan-text">{growthStage} (Sown {sowingDate})</span>
                </div>
                <div className="pt-3 flex justify-between">
                  <span className="text-kisan-muted">Soil & Irrigation:</span>
                  <span className="font-bold text-kisan-text">{soilType} · {irrigationMethod}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>Demonstration Note:</strong> All data will be saved to your local browser storage. You can edit or reset this farm anytime in Settings.
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 pt-4 border-t border-surface-border flex items-center justify-between">
            {step > 1 ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep(step - 1)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Previous Step
              </Button>
            ) : <div />}

            {step < 5 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setStep(step + 1)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={handleFinishOnboarding}
                rightIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Save Farm & Launch Dashboard
              </Button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
