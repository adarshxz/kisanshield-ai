import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { cropDoctorService, CropDoctorParams } from '../services/cropDoctorService';
import { AssessmentResult } from '../types';
import { 
  Stethoscope, 
  Upload, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles, 
  Send, 
  X, 
  ArrowRight,
  ShieldCheck,
  Eye,
  FileCheck
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

const SYMPTOM_OPTIONS = [
  'Yellowing of foliage',
  'Brown or black spots',
  'Wilting or drooping',
  'Holes or chewing damage',
  'Curling leaves',
  'Stunted plant growth',
  'Powdery white / gray coating',
  'Stem discolouration'
];

export const CropDoctorPage: React.FC = () => {
  const { selectedFarm, selectedField, t, showToast } = useApp();

  // Inputs
  const [selectedFieldId, setSelectedFieldId] = useState(selectedField?.id || 'field-a');
  const [selectedCrop, setSelectedCrop] = useState(selectedField?.currentCrop || 'Soybean');
  const [variety, setVariety] = useState(selectedField?.variety || 'JS 20-34');
  const [growthStage, setGrowthStage] = useState(selectedField?.growthStage || 'Pod / Grain Formation');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Brown or black spots', 'Yellowing of foliage']);
  const [spread, setSpread] = useState<'single_plant' | 'patches' | 'widespread'>('patches');
  const [notes, setNotes] = useState('Observed small water-soaked brown spots on lower leaves after continuous morning dew and rain.');
  
  // Image state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('https://images.unsplash.com/photo-1592982537447-6f230b42c672?w=800&auto=format&fit=crop&q=80');
  
  // Assessment state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        showToast({ type: 'error', title: 'File Too Large', message: 'Please select an image smaller than 10MB.' });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRunAssessment = async () => {
    if (selectedSymptoms.length === 0) {
      showToast({ type: 'warning', title: 'Select Symptoms', message: 'Please choose at least one observable symptom.' });
      return;
    }

    setIsAnalyzing(true);
    setAssessmentResult(null);

    const targetField = selectedFarm.fields.find(f => f.id === selectedFieldId) || selectedFarm.fields[0];

    const result = await cropDoctorService.analyzeObservation({
      crop: selectedCrop,
      variety,
      fieldId: targetField.id,
      fieldName: targetField.name,
      growthStage,
      symptoms: selectedSymptoms,
      spread,
      notes,
      imageUrl: imagePreview,
    });

    setAssessmentResult(result);
    setIsAnalyzing(false);

    showToast({
      type: 'success',
      title: 'Assessment Generated',
      message: 'Heuristic agronomic explanation ready for review.'
    });
  };

  const handleRequestExpert = () => {
    if (assessmentResult) {
      setAssessmentResult({
        ...assessmentResult,
        expertReviewRequested: true,
        expertReviewStatus: 'pending'
      });
      showToast({
        type: 'success',
        title: 'Case Submitted for Agronomist Review',
        message: 'Dr. S. K. Verma (KVK Sehore) notified for visual verification.'
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Page Title */}
      <div className="p-6 rounded-3xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-6 h-6 text-forest-700 dark:text-fresh" />
          <h2 className="text-xl font-black text-kisan-text dark:text-white">
            {t.cropDoctor.title}
          </h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            Explainable Vision & Field Diagnostics
          </span>
        </div>
        <p className="text-xs text-kisan-muted dark:text-gray-400 mt-1">
          {t.cropDoctor.subtitle} Visual patterns are probabilistic indicators; safe biological and cultural practices are recommended first.
        </p>
      </div>

      <DisclaimerBanner variant="compact" />

      {/* Main Workflow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Input & Upload Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <Card className="p-6 space-y-5">
            <h3 className="text-sm font-bold text-kisan-text dark:text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-forest-700" />
              <span>1. Upload Crop or Leaf Photo</span>
            </h3>

            {/* Photo preview or dropzone */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-surface-border dark:border-forest-800 bg-surface-warm dark:bg-forest-900/50 p-4 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Uploaded leaf symptom"
                    className="w-full h-52 object-cover rounded-xl"
                  />
                  <button
                    onClick={() => {
                      setImagePreview('');
                      setImageFile(null);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-forest-950/70 text-white hover:bg-forest-900"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded">
                    Field A Leaf Sample
                  </span>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center py-8 cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-forest-100 dark:bg-forest-900 text-forest-700 dark:text-fresh flex items-center justify-center mb-3">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-kisan-text dark:text-white">
                    Tap to take photo or choose file
                  </span>
                  <span className="text-[11px] text-kisan-muted mt-1">
                    JPG, PNG, WebP up to 10MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Field & Crop Select */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-kisan-text dark:text-white">Field</label>
                <select
                  value={selectedFieldId}
                  onChange={(e) => setSelectedFieldId(e.target.value)}
                  className="w-full rounded-xl border border-surface-border dark:border-forest-800 p-2 bg-white dark:bg-forest-900"
                >
                  {selectedFarm.fields.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-kisan-text dark:text-white">Crop Stage</label>
                <input
                  type="text"
                  value={growthStage}
                  onChange={(e) => setGrowthStage(e.target.value as any)}
                  className="w-full rounded-xl border border-surface-border dark:border-forest-800 p-2 bg-white dark:bg-forest-900"
                />
              </div>
            </div>

            {/* Symptoms Selection */}
            <div>
              <label className="block text-xs font-semibold mb-2 text-kisan-text dark:text-white">
                Observed Leaf / Canopy Symptoms:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SYMPTOM_OPTIONS.map((sym) => {
                  const isChecked = selectedSymptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                        isChecked
                          ? 'bg-forest-700 text-white border-forest-700'
                          : 'bg-surface-warm dark:bg-forest-900 text-kisan-muted border-surface-border dark:border-forest-800 hover:text-kisan-text'
                      }`}
                    >
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field Spread */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-kisan-text dark:text-white">
                Symptom Distribution in Field:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'single_plant', label: 'Single Plant' },
                  { id: 'patches', label: 'Patches / Lower Area' },
                  { id: 'widespread', label: 'Widespread' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSpread(item.id as any)}
                    className={`py-2 px-1 text-xs font-semibold rounded-xl border text-center transition-all ${
                      spread === item.id
                        ? 'border-forest-700 bg-forest-50 dark:bg-forest-900 text-forest-800 dark:text-fresh'
                        : 'border-surface-border text-kisan-muted'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Trigger */}
            <Button
              variant="primary"
              size="md"
              className="w-full"
              isLoading={isAnalyzing}
              onClick={handleRunAssessment}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Analyze Photo & Observations
            </Button>
          </Card>
        </div>

        {/* Right: Diagnostic Assessment Results (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {assessmentResult ? (
            <div className="space-y-5 animate-fade-in">
              <Card className="p-6 border-forest-300 dark:border-forest-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-surface-border dark:border-forest-900 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase font-extrabold text-forest-700 dark:text-fresh">
                        Assessment Result
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                        Demonstration Diagnostic
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-kisan-text dark:text-white mt-1">
                      {assessmentResult.crop} · {assessmentResult.fieldName}
                    </h3>
                  </div>

                  <Badge variant={assessmentResult.confidenceRating === 'High' ? 'low' : 'elevated'}>
                    {assessmentResult.confidenceRating} Qualitative Confidence
                  </Badge>
                </div>

                {/* Candidate Causes Accordion / List */}
                <div className="mt-5 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-kisan-muted dark:text-gray-400 block">
                    Possible Agronomic Causes (Ranked by Evidence Fit):
                  </span>

                  {assessmentResult.possibleCauses.map((cause, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl border border-surface-border dark:border-forest-800 bg-surface-warm/60 dark:bg-forest-900/40 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-kisan-text dark:text-white">
                              {cause.name}
                            </h4>
                            {cause.scientificName && (
                              <span className="text-xs italic text-kisan-muted dark:text-gray-400">
                                ({cause.scientificName})
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-forest-700 dark:text-fresh font-semibold uppercase">
                            Type: {cause.type.replace('_', ' ')}
                          </span>
                        </div>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          cause.likelihood === 'Probable'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-surface-border text-kisan-muted'
                        }`}>
                          {cause.likelihood}
                        </span>
                      </div>

                      {/* Supporting evidence */}
                      <div className="text-xs space-y-1">
                        <span className="font-semibold text-kisan-text dark:text-white block text-[11px]">
                          Supporting Evidence in this Observation:
                        </span>
                        <ul className="list-disc list-inside text-kisan-muted dark:text-gray-300 space-y-0.5 text-[11px]">
                          {cause.supportingEvidence.map((ev, idx) => (
                            <li key={idx}>{ev}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Missing or contradicting */}
                      {cause.contradictingOrMissing.length > 0 && (
                        <div className="text-xs space-y-1">
                          <span className="font-semibold text-amber-800 dark:text-amber-400 block text-[11px]">
                            Missing or Contradicting Observations:
                          </span>
                          <ul className="list-disc list-inside text-kisan-muted dark:text-gray-400 space-y-0.5 text-[11px]">
                            {cause.contradictingOrMissing.map((ev, idx) => (
                              <li key={idx}>{ev}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Safe Next Steps */}
                      <div className="p-3 rounded-xl bg-forest-900 text-white text-xs space-y-1">
                        <span className="text-fresh font-bold block text-[11px]">
                          Safe Agronomic Next Steps:
                        </span>
                        <ul className="list-disc list-inside text-forest-100 space-y-0.5 text-[11px]">
                          {cause.safeNextSteps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ul>
                        {cause.cautionNote && (
                          <div className="pt-2 mt-2 border-t border-forest-800 text-[10px] text-amber-300 font-medium">
                            Caution: {cause.cautionNote}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Information Needed Box */}
                <div className="mt-5 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200 mb-1">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>How to Refine This Assessment:</span>
                  </div>
                  <ul className="list-disc list-inside text-amber-900/80 dark:text-amber-200/80 text-[11px] space-y-0.5">
                    {assessmentResult.additionalInfoNeeded.map((info, idx) => (
                      <li key={idx}>{info}</li>
                    ))}
                  </ul>
                </div>

                {/* Expert Review Escalation Button */}
                <div className="mt-6 pt-4 border-t border-surface-border dark:border-forest-900 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[11px] text-kisan-muted">
                    {assessmentResult.expertReviewRequested
                      ? '✓ Submitted to Dr. S. K. Verma (KVK Sehore) for confirmation.'
                      : 'Uncertain about the diagnosis? Request review from local agronomist.'}
                  </span>

                  <Button
                    variant={assessmentResult.expertReviewRequested ? 'secondary' : 'outline'}
                    size="sm"
                    disabled={assessmentResult.expertReviewRequested}
                    onClick={handleRequestExpert}
                    leftIcon={<Send className="w-3.5 h-3.5 text-forest-700" />}
                  >
                    {assessmentResult.expertReviewRequested ? 'Review Requested' : 'Request Human Expert Review'}
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <Card className="p-12 text-center text-kisan-muted flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-3xl bg-surface-warm dark:bg-forest-900 text-forest-700 dark:text-fresh flex items-center justify-center mb-4">
                <Stethoscope className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-kisan-text dark:text-white">
                Ready for Visual Crop Assessment
              </h3>
              <p className="text-xs text-kisan-muted max-w-sm mt-1 leading-relaxed">
                Upload or select a leaf photo, pick observed symptoms, and tap "Analyze Photo & Observations" to generate an explainable assessment.
              </p>
            </Card>
          )}
        </div>

      </div>

    </div>
  );
};
