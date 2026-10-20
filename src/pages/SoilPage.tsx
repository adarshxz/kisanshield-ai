import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { soilService } from '../services/soilService';
import { SoilReport } from '../types';
import { 
  Sprout, 
  FileText, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Upload, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const SoilPage: React.FC = () => {
  const { selectedFarm, selectedField, setSelectedFieldId, showToast } = useApp();
  const [reports, setReports] = useState<SoilReport[]>(() => soilService.getSoilReports(selectedFarm.id));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New report form state
  const [labName, setLabName] = useState('KVK Soil Testing Lab, Sehore');
  const [testDate, setTestDate] = useState('2026-06-10');
  const [ph, setPh] = useState(7.3);
  const [oc, setOc] = useState(0.55);
  const [nitrogen, setNitrogen] = useState(220);
  const [phosphorus, setPhosphorus] = useState(19.0);
  const [potassium, setPotassium] = useState(330);
  const [zinc, setZinc] = useState(0.62);

  const activeReport = reports[0];

  const handleAddReport = (e: React.FormEvent) => {
    e.preventDefault();
    const newRep: SoilReport = {
      id: `soil-${Date.now().toString(36)}`,
      farmId: selectedFarm.id,
      fieldId: selectedField?.id || 'field-a',
      fieldName: selectedField?.name || 'Field A',
      testDate,
      labName,
      reportSource: 'manual_entry',
      parameters: {
        ph: { value: ph, rating: ph < 6.5 ? 'Acidic' : ph > 7.8 ? 'Alkaline' : 'Optimal', idealRange: '6.5 - 7.5' },
        organicCarbonPercent: { value: oc, rating: oc < 0.5 ? 'Low' : 'Medium', idealRange: '0.50 - 0.75%' },
        nitrogenKgHa: { value: nitrogen, rating: nitrogen < 280 ? 'Low' : 'Medium', idealRange: '280 - 560 kg/ha' },
        phosphorusKgHa: { value: phosphorus, rating: phosphorus < 15 ? 'Low' : phosphorus > 25 ? 'High' : 'Medium', idealRange: '15 - 25 kg/ha' },
        potassiumKgHa: { value: potassium, rating: potassium > 300 ? 'High' : 'Medium', idealRange: '150 - 300 kg/ha' },
        zincPpm: { value: zinc, rating: zinc < 0.6 ? 'Deficient' : 'Sufficient', idealRange: '> 0.60 ppm' },
      },
      cropContext: `${selectedField?.currentCrop || 'Soybean'} - Wheat Rotation`,
      generalGuidance: [
        'Apply organic compost / FYM @ 2-3 tonnes/acre to sustain soil organic carbon.',
        'Use recommended legume Rhizobium inoculant to reduce chemical nitrogen requirement.',
        'Deep black vertisol contains natural clay-bound potassium; avoid excess MOP fertilization.'
      ],
      isOcrExtracted: false
    };

    soilService.addReport(newRep);
    setReports(soilService.getSoilReports(selectedFarm.id));
    setIsAddModalOpen(false);
    showToast({ type: 'success', title: 'Soil Report Recorded', message: 'Parameters saved to field health profile.' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <Sprout className="w-6 h-6 text-forest-700 dark:text-fresh" />
            <h2 className="text-xl font-black text-kisan-text dark:text-white">
              Soil Health & Nutrient Intelligence
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Soil Health Card (SHC)
            </span>
          </div>
          <p className="text-xs text-kisan-muted dark:text-gray-400 mt-1 max-w-xl">
            Interpret certified soil test reports and evaluate crop-specific nutrient availability before buying chemical fertilizers.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Enter Soil Test Report
        </Button>
      </div>

      <DisclaimerBanner 
        customText="Soil guidance is derived from laboratory test values and standard ICAR regional recommendation tables. It does not prescribe commercial brand chemical doses without in-person agronomist consultation."
      />

      {activeReport ? (
        <div className="space-y-6">
          
          {/* Active Report Header Meta */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-surface-border dark:border-forest-900">
              <div>
                <span className="text-xs uppercase font-extrabold text-forest-700 dark:text-fresh">
                  Certified Soil Test Record
                </span>
                <h3 className="text-base font-bold text-kisan-text dark:text-white mt-0.5">
                  {activeReport.labName}
                </h3>
                <span className="text-xs text-kisan-muted dark:text-gray-400">
                  Tested: {activeReport.testDate} · Field: {activeReport.fieldName}
                </span>
              </div>

              <Badge variant="low">
                Report Verified
              </Badge>
            </div>

            {/* Nutrients Parameters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
              {[
                { name: 'Soil pH', value: activeReport.parameters.ph.value, unit: '', rating: activeReport.parameters.ph.rating, ideal: activeReport.parameters.ph.idealRange },
                { name: 'Organic Carbon', value: `${activeReport.parameters.organicCarbonPercent.value}%`, unit: '', rating: activeReport.parameters.organicCarbonPercent.rating, ideal: activeReport.parameters.organicCarbonPercent.idealRange },
                { name: 'Available Nitrogen (N)', value: activeReport.parameters.nitrogenKgHa.value, unit: 'kg/ha', rating: activeReport.parameters.nitrogenKgHa.rating, ideal: activeReport.parameters.nitrogenKgHa.idealRange },
                { name: 'Phosphorus (P)', value: activeReport.parameters.phosphorusKgHa.value, unit: 'kg/ha', rating: activeReport.parameters.phosphorusKgHa.rating, ideal: activeReport.parameters.phosphorusKgHa.idealRange },
                { name: 'Potassium (K)', value: activeReport.parameters.potassiumKgHa.value, unit: 'kg/ha', rating: activeReport.parameters.potassiumKgHa.rating, ideal: activeReport.parameters.potassiumKgHa.idealRange },
                { name: 'Zinc (Zn)', value: activeReport.parameters.zincPpm?.value || 0.58, unit: 'ppm', rating: activeReport.parameters.zincPpm?.rating || 'Deficient', ideal: '> 0.60 ppm' },
              ].map((param, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-surface-warm dark:bg-forest-900/60 border border-surface-border dark:border-forest-800 text-xs">
                  <span className="text-kisan-muted dark:text-gray-400 font-medium block text-[11px] truncate">{param.name}</span>
                  <div className="text-lg font-black text-kisan-text dark:text-white mt-1">
                    {param.value} <span className="text-[10px] font-normal text-kisan-muted">{param.unit}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      param.rating === 'Low' || param.rating === 'Deficient' 
                        ? 'bg-rose-100 text-rose-800' 
                        : param.rating === 'High' 
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {param.rating}
                    </span>
                    <span className="text-[9px] text-kisan-muted truncate max-w-[60px]" title={`Ideal: ${param.ideal}`}>
                      {param.ideal}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Agronomic Guidance from Soil Test */}
            <div className="mt-6 pt-4 border-t border-surface-border dark:border-forest-900">
              <span className="text-xs font-bold text-kisan-text dark:text-white uppercase tracking-wider block mb-2">
                Agronomic Recommendations Based on this Report:
              </span>
              <ul className="space-y-2 text-xs text-kisan-muted dark:text-gray-300">
                {activeReport.generalGuidance.map((g, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-forest-700 dark:text-fresh shrink-0 mt-0.5" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

        </div>
      ) : (
        <Card className="p-12 text-center text-kisan-muted">
          <FileText className="w-12 h-12 text-forest-700/40 mx-auto mb-3" />
          <h4 className="font-bold text-sm text-kisan-text dark:text-white">No Soil Health Card on Record</h4>
          <p className="text-xs text-kisan-muted mt-1 max-w-sm mx-auto">
            Add parameters from your Krishi Vigyan Kendra Soil Testing Lab report to unlock balanced nutrient guidance.
          </p>
        </Card>
      )}

      {/* Manual Entry Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsAddModalOpen(false)}
          title="Enter Soil Test Parameters"
          subtitle="Soil Health Card Record"
        >
          <form onSubmit={handleAddReport} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Testing Laboratory</label>
                <input
                  type="text"
                  required
                  value={labName}
                  onChange={(e) => setLabName(e.target.value)}
                  className="w-full rounded-xl border border-surface-border p-2.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Sample Date</label>
                <input
                  type="date"
                  required
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                  className="w-full rounded-xl border border-surface-border p-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold mb-1">pH Level</label>
                <input
                  type="number"
                  step="0.1"
                  value={ph}
                  onChange={(e) => setPh(Number(e.target.value))}
                  className="w-full rounded-xl border border-surface-border p-2.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Organic Carbon (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={oc}
                  onChange={(e) => setOc(Number(e.target.value))}
                  className="w-full rounded-xl border border-surface-border p-2.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Nitrogen (kg/ha)</label>
                <input
                  type="number"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(Number(e.target.value))}
                  className="w-full rounded-xl border border-surface-border p-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold mb-1">Phosphorus (kg/ha)</label>
                <input
                  type="number"
                  step="0.1"
                  value={phosphorus}
                  onChange={(e) => setPhosphorus(Number(e.target.value))}
                  className="w-full rounded-xl border border-surface-border p-2.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Potassium (kg/ha)</label>
                <input
                  type="number"
                  value={potassium}
                  onChange={(e) => setPotassium(Number(e.target.value))}
                  className="w-full rounded-xl border border-surface-border p-2.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Zinc (ppm)</label>
                <input
                  type="number"
                  step="0.05"
                  value={zinc}
                  onChange={(e) => setZinc(Number(e.target.value))}
                  className="w-full rounded-xl border border-surface-border p-2.5"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-surface-border flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Save Soil Report
              </Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
