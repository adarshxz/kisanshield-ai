import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { farmService } from '../services/farmService';
import { Field } from '../types';
import { 
  MapPin, 
  Plus, 
  Sprout, 
  Droplets, 
  Layers, 
  Calendar, 
  CheckCircle2, 
  Edit3, 
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { FieldMap } from '../components/maps/FieldMap';

export const FarmsPage: React.FC = () => {
  const { selectedFarm, selectedField, setSelectedFieldId, refreshFarms, showToast } = useApp();
  const [isAddFieldOpen, setIsAddFieldOpen] = useState(false);

  // New field state
  const [fieldName, setFieldName] = useState('');
  const [crop, setCrop] = useState('Soybean');
  const [variety, setVariety] = useState('');
  const [areaAcres, setAreaAcres] = useState(3.5);
  const [soilType, setSoilType] = useState('Medium Black Loam');
  const [irrigationMethod, setIrrigationMethod] = useState<'Drip' | 'Sprinkler' | 'Flood / Furrow' | 'Rainfed'>('Sprinkler');

  const handleCreateField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fieldName.trim()) return;

    farmService.addField(selectedFarm.id, {
      name: fieldName,
      areaAcres,
      currentCrop: crop,
      variety: variety || undefined,
      sowingDate: new Date().toISOString().split('T')[0],
      growthStage: 'Vegetative',
      soilType,
      irrigationMethod,
      coordinates: [23.0170 + Math.random() * 0.005, 76.5420 + Math.random() * 0.005],
      latestNdvi: 0.65,
      moistureStatus: 'Optimal',
    });

    refreshFarms();
    setIsAddFieldOpen(false);
    setFieldName('');
    setVariety('');
    showToast({ type: 'success', title: 'Field Registered', message: `${fieldName} added to ${selectedFarm.name}.` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-forest-700 dark:text-fresh" />
            <h2 className="text-xl font-black text-kisan-text dark:text-white">
              Farm & Field Management
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              {selectedFarm.totalAreaAcres} Acres Total
            </span>
          </div>
          <p className="text-xs text-kisan-muted dark:text-gray-400 mt-1">
            Registered plots in {selectedFarm.village}, {selectedFarm.district}, {selectedFarm.state} (Owner: {selectedFarm.ownerName})
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsAddFieldOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add New Field Plot
        </Button>
      </div>

      {/* Map Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-kisan-text dark:text-white uppercase tracking-wider">
            Interactive Plot Boundaries & Sensor Locations
          </span>
          <span className="text-[11px] text-kisan-muted">Click any plot to focus</span>
        </div>
        <FieldMap
          fields={selectedFarm.fields}
          selectedFieldId={selectedField?.id}
          onSelectField={(id) => setSelectedFieldId(id)}
        />
      </div>

      {/* Fields List */}
      <div>
        <span className="text-xs font-bold text-kisan-text dark:text-white uppercase tracking-wider block mb-3 px-1">
          Registered Field Profiles ({selectedFarm.fields.length})
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {selectedFarm.fields.map((field) => {
            const isSelected = field.id === selectedField?.id;
            return (
              <Card
                key={field.id}
                onClick={() => setSelectedFieldId(field.id)}
                className={`p-5 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-forest-700 dark:border-fresh ring-2 ring-forest-700/20 shadow-elevated'
                    : 'hover:border-forest-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-base text-kisan-text dark:text-white">
                      {field.name}
                    </h3>
                    <Badge variant={field.moistureStatus === 'Deficit' ? 'elevated' : 'low'}>
                      {field.moistureStatus}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-xs mt-3">
                    <div className="flex justify-between py-1 border-b border-surface-border dark:border-forest-900">
                      <span className="text-kisan-muted">Area:</span>
                      <span className="font-bold text-kisan-text dark:text-white">{field.areaAcres} Acres</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-surface-border dark:border-forest-900">
                      <span className="text-kisan-muted">Current Crop:</span>
                      <span className="font-bold text-forest-700 dark:text-fresh">{field.currentCrop} {field.variety && `(${field.variety})`}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-surface-border dark:border-forest-900">
                      <span className="text-kisan-muted">Growth Stage:</span>
                      <span className="font-medium text-kisan-text dark:text-white">{field.growthStage}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-surface-border dark:border-forest-900">
                      <span className="text-kisan-muted">Irrigation:</span>
                      <span className="font-medium text-kisan-text dark:text-white">{field.irrigationMethod}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-surface-border dark:border-forest-900">
                      <span className="text-kisan-muted">Soil Texture:</span>
                      <span className="font-medium text-kisan-text dark:text-white truncate max-w-[140px]">{field.soilType}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-kisan-muted">Latest NDVI:</span>
                      <span className="font-bold text-forest-700 dark:text-fresh">{field.latestNdvi || '0.70'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-surface-border dark:border-forest-900 text-center">
                  <span className="text-xs font-bold text-forest-700 dark:text-fresh">
                    {isSelected ? '✓ Currently Selected Field' : 'Click to Set as Active Field'}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add Field Modal */}
      {isAddFieldOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsAddFieldOpen(false)}
          title="Register New Field Plot"
          subtitle={`Adding to ${selectedFarm.name}`}
        >
          <form onSubmit={handleCreateField} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Field Name *</label>
              <input
                type="text"
                required
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                placeholder="e.g. Field D (Riverbed Plot)"
                className="w-full rounded-xl border border-surface-border p-2.5 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Crop</label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full rounded-xl border border-surface-border p-2.5 bg-white text-xs"
                >
                  <option value="Soybean">Soybean</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Gram (Chickpea)">Gram (Chickpea)</option>
                  <option value="Mustard">Mustard</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Variety (Optional)</label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  placeholder="e.g. JS 20-34"
                  className="w-full rounded-xl border border-surface-border p-2.5 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Plot Area (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={areaAcres}
                  onChange={(e) => setAreaAcres(Number(e.target.value))}
                  className="w-full rounded-xl border border-surface-border p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Irrigation Method</label>
                <select
                  value={irrigationMethod}
                  onChange={(e) => setIrrigationMethod(e.target.value as any)}
                  className="w-full rounded-xl border border-surface-border p-2.5 bg-white text-xs"
                >
                  <option value="Sprinkler">Sprinkler</option>
                  <option value="Drip">Drip</option>
                  <option value="Flood / Furrow">Flood / Furrow</option>
                  <option value="Rainfed">Rainfed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Soil Type</label>
              <input
                type="text"
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full rounded-xl border border-surface-border p-2.5 text-xs"
              />
            </div>

            <div className="pt-3 border-t border-surface-border flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddFieldOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Save Field
              </Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
