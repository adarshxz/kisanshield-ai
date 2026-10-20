import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { communityService } from '../services/communityService';
import { CommunityAlert } from '../types';
import { 
  Users, 
  AlertTriangle, 
  ShieldCheck, 
  Plus, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Filter, 
  Send,
  Eye,
  Info
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const CommunityAlertsPage: React.FC = () => {
  const { userRole, showToast } = useApp();
  const [alerts, setAlerts] = useState<CommunityAlert[]>(() => communityService.getAlerts());
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Submit report state
  const [crop, setCrop] = useState('Soybean');
  const [title, setTitle] = useState('');
  const [pestName, setPestName] = useState('');
  const [region, setRegion] = useState('Ashta Block, Sehore');
  const [summary, setSummary] = useState('');
  const [advisory, setAdvisory] = useState('');
  const [consent, setConsent] = useState(true);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !consent) return;

    communityService.submitReport({
      category: 'pest',
      crop,
      title,
      pestOrDiseaseName: pestName || 'Unspecified Pest',
      region,
      summary,
      advisory: advisory || 'Monitor local fields and verify with KVK before spraying.',
      severity: 'advisory',
    });

    setAlerts(communityService.getAlerts());
    setIsSubmitOpen(false);
    setTitle('');
    setPestName('');
    setSummary('');
    showToast({
      type: 'success',
      title: 'Observation Submitted',
      message: 'Pending agronomist verification before community watch notification.'
    });
  };

  const handleVerify = (id: string) => {
    communityService.verifyAlert(id, 'Dr. S. K. Verma (KVK Sehore)', 'expert_verified');
    setAlerts(communityService.getAlerts());
    showToast({
      type: 'success',
      title: 'Report Verified as Official Advisory',
      message: 'Alert escalated to expert-verified district watch.'
    });
  };

  const filteredAlerts = alerts.filter(a => {
    if (categoryFilter !== 'all' && a.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-forest-700 dark:text-fresh" />
            <h2 className="text-xl font-black text-kisan-text dark:text-white">
              Community Pest & Disease Early-Warning Network
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
              Crowd-Sensing + Expert Verification
            </span>
          </div>
          <p className="text-xs text-kisan-muted dark:text-gray-400 mt-1 max-w-2xl">
            Crowdsourced pest trap counts and visual symptoms validated by certified agronomists before conversion into official warnings.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsSubmitOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Report Field Observation
        </Button>
      </div>

      <DisclaimerBanner 
        customText="Community alerts preserve farmer privacy. Exact GPS coordinates are never publicly broadcast; notifications are aggregated to block/radius level. Citizen reports remain marked 'Under Review' until verified by certified extension officers."
      />

      {/* Filter */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-kisan-muted">Filter:</span>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-surface-border dark:border-forest-800 bg-white dark:bg-forest-950 text-kisan-text dark:text-white"
        >
          <option value="all">All Alert Types</option>
          <option value="pest">Pest Outbreaks (Helicoverpa, Armyworm)</option>
          <option value="disease">Foliar Pathogens</option>
          <option value="weather_impact">Weather Impact Advisories</option>
        </select>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={alert.severity === 'warning' ? 'high' : 'moderate'}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <span className="text-xs font-bold text-forest-700 dark:text-fresh">
                    {alert.crop}
                  </span>
                  <span className="text-xs text-kisan-muted">·</span>
                  <span className="text-xs text-kisan-muted flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {alert.region}
                  </span>
                </div>

                <h3 className="text-base font-bold text-kisan-text dark:text-white">
                  {alert.title}
                </h3>
                <p className="text-xs text-kisan-muted dark:text-gray-300 leading-relaxed max-w-3xl">
                  {alert.summary}
                </p>

                {/* Advisory guidance */}
                <div className="mt-3 p-3 rounded-xl bg-forest-900 text-white text-xs">
                  <span className="font-bold text-fresh block mb-0.5">Community Agronomic Advisory:</span>
                  <p className="text-forest-100 text-[11px] leading-relaxed">{alert.advisory}</p>
                </div>
              </div>

              {/* Status & Verification Box */}
              <div className="flex sm:flex-col items-end gap-2 shrink-0">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                  alert.verificationStatus === 'expert_verified'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  {alert.verificationStatus.replace('_', ' ')}
                </span>
                
                {alert.verifiedBy && (
                  <span className="text-[10px] text-kisan-muted text-right max-w-[140px] truncate" title={alert.verifiedBy}>
                    By: {alert.verifiedBy}
                  </span>
                )}

                <span className="text-[10px] text-kisan-muted">
                  {alert.observationsCount} farmer reports
                </span>

                {/* Expert Verification Action */}
                {userRole === 'expert' && alert.verificationStatus !== 'expert_verified' && (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleVerify(alert.id)}
                    className="mt-2"
                  >
                    Verify as Agronomist
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Submit Report Modal */}
      {isSubmitOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsSubmitOpen(false)}
          title="Submit Local Pest or Disease Observation"
          subtitle="Contribute to regional early warning"
        >
          <form onSubmit={handleSubmitReport} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Crop</label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full rounded-xl border border-surface-border p-2.5 bg-white"
              >
                <option value="Soybean">Soybean</option>
                <option value="Gram (Chickpea)">Gram (Chickpea)</option>
                <option value="Wheat">Wheat</option>
                <option value="Cotton">Cotton</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Observation Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Caterpillar defoliation on chickpea buds"
                className="w-full rounded-xl border border-surface-border p-2.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Suspected Pest / Symptom</label>
                <input
                  type="text"
                  value={pestName}
                  onChange={(e) => setPestName(e.target.value)}
                  placeholder="e.g. Pod Borer / Leaf Miner"
                  className="w-full rounded-xl border border-surface-border p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Block / Village Area</label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full rounded-xl border border-surface-border p-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Observation Description</label>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Describe how many plants were affected, approximate severity, and any pest count..."
                className="w-full rounded-xl border border-surface-border p-2.5"
              />
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded text-forest-700"
              />
              <label htmlFor="consent" className="text-[11px] text-kisan-muted leading-tight">
                I consent to sharing this anonymized observation to help warn neighboring farmers in my block.
              </label>
            </div>

            <div className="pt-3 border-t border-surface-border flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsSubmitOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={!consent}
              >
                Submit for Verification
              </Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
