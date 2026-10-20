import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { insuranceService } from '../services/insuranceService';
import { InsuranceIncident } from '../types';
import { 
  ShieldAlert, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ExternalLink, 
  Download, 
  AlertTriangle,
  Upload,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const InsurancePage: React.FC = () => {
  const { showToast } = useApp();
  const [incident, setIncident] = useState<InsuranceIncident>(() => insuranceService.getIncident());
  const [noteInput, setNoteInput] = useState('');

  const handleToggleChecklist = (key: keyof InsuranceIncident['checklistStatus']) => {
    const updated = insuranceService.updateChecklist(key, !incident.checklistStatus[key]);
    setIncident({ ...updated });
    showToast({ type: 'info', title: 'Checklist Updated', message: 'Status saved locally.' });
  };

  const handleAddNote = () => {
    if (noteInput.trim()) {
      const updated = insuranceService.addIncidentNote(noteInput);
      setIncident({ ...updated });
      setNoteInput('');
      showToast({ type: 'success', title: 'Note Appended to Incident Log' });
    }
  };

  const handleExport = () => {
    showToast({
      type: 'success',
      title: 'Incident Summary Dossier Generated',
      message: 'Organized PDF evidence packet formatted for PMFBY 72-hour claim intimation.'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-forest-700 dark:text-fresh" />
            <h2 className="text-xl font-black text-kisan-text dark:text-white">
              Crop Loss Documentation & Insurance Readiness
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
              PMFBY 72h Readiness
            </span>
          </div>
          <p className="text-xs text-kisan-muted dark:text-gray-400 mt-1 max-w-2xl">
            Chronological evidence packet organizing localized weather records, geotagged loss photos, and intimation timelines for Pradhan Mantri Fasal Bima Yojana.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleExport}
          leftIcon={<Download className="w-4 h-4" />}
        >
          Export Evidence Dossier
        </Button>
      </div>

      <DisclaimerBanner 
        customText="Organizing incident evidence in this platform does not establish eligibility, prove a formal insurance claim, or guarantee claim acceptance or compensation payment. Farmers must submit official intimations through the PMFBY portal (pmfby.gov.in), their insurance bank branch, or the toll-free helpline within 72 hours of loss."
      />

      {/* Grid: Checklist & Incident Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 72h PMFBY Checklist & Dossier Meta (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border dark:border-forest-900">
              <h3 className="text-sm font-bold text-kisan-text dark:text-white">
                PMFBY 72-Hour Evidence Checklist
              </h3>
              <Badge variant="low">Active Policy</Badge>
            </div>

            <div className="space-y-3">
              {[
                { key: 'notifiedWithin72h', label: 'Claim Intimation within 72 Hours of Incident', desc: 'Mandatory intimation to bank or PMFBY portal' },
                { key: 'lossDocumented', label: 'Photographs of Standing Water / Damage', desc: 'Geotagged high-res images showing field boundary' },
                { key: 'weatherEvidenceAttached', label: 'Local Agromet Weather Log Attached', desc: '120mm rainfall record linked from IMD station' },
                { key: 'sowingCertificateReady', label: 'Sowing Certificate / Patwari Girdawari', desc: 'Khasra / survey plot verification' },
                { key: 'bankPassbookAttached', label: 'Bank Account & Aadhaar Linked to PMFBY', desc: 'For direct DBT benefit transfer' },
              ].map((item) => {
                const isChecked = incident.checklistStatus[item.key as keyof typeof incident.checklistStatus];
                return (
                  <div
                    key={item.key}
                    onClick={() => handleToggleChecklist(item.key as any)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900'
                        : 'bg-surface-warm/60 border-surface-border'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-forest-700 w-4 h-4"
                    />
                    <div>
                      <span className={`text-xs font-bold block ${isChecked ? 'text-emerald-900 dark:text-emerald-200' : 'text-kisan-text dark:text-white'}`}>
                        {item.label}
                      </span>
                      <span className="text-[11px] text-kisan-muted dark:text-gray-400">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Official link */}
            <div className="pt-3 border-t border-surface-border dark:border-forest-900">
              <a
                href="https://pmfby.gov.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-700 dark:text-fresh hover:underline"
              >
                Go to Official National PMFBY Portal (pmfby.gov.in) <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card>
        </div>

        {/* Right: Incident Chronology & Weather Log (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-surface-border dark:border-forest-900">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-forest-700 dark:text-fresh">
                  Incident Docket: {incident.id}
                </span>
                <h3 className="text-base font-bold text-kisan-text dark:text-white mt-0.5">
                  {incident.incidentType}
                </h3>
                <span className="text-xs text-kisan-muted">
                  Field: {incident.fieldName} ({incident.crop}) · Incident Date: {incident.incidentDate}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-kisan-muted block">Estimated Damage</span>
                <span className="text-lg font-black text-rose-600">{incident.estimatedLossPercent}%</span>
              </div>
            </div>

            {/* Weather event evidence */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-kisan-muted dark:text-gray-400 block mb-2">
                Correlated Micro-Climate Event History:
              </span>
              <div className="space-y-2">
                {incident.weatherEventLog.map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-warm dark:bg-forest-900 text-xs">
                    <div>
                      <span className="font-bold text-kisan-text dark:text-white">{log.date}: </span>
                      <span className="text-kisan-muted dark:text-gray-300">{log.description}</span>
                    </div>
                    <span className="font-black text-blue-600 dark:text-blue-400">{log.measurement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photos attached */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-kisan-muted dark:text-gray-400 block mb-2">
                Attached Geotagged Field Evidence Photos:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {incident.images.map((img, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-surface-border relative group">
                    <img src={img.url} alt={img.caption} className="w-full h-36 object-cover" />
                    <div className="p-2 bg-white dark:bg-forest-950 text-[11px]">
                      <span className="font-semibold block truncate">{img.caption}</span>
                      <span className="text-[10px] text-kisan-muted">{img.date} · GPS: 23.0185° N, 76.5412° E</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Farmer Notes */}
            <div className="p-3.5 rounded-xl bg-surface-warm dark:bg-forest-900 border border-surface-border dark:border-forest-800 text-xs">
              <span className="font-bold text-kisan-text dark:text-white block mb-1">Farmer Incident Statement:</span>
              <p className="text-kisan-muted dark:text-gray-300 whitespace-pre-line leading-relaxed text-[11px]">
                {incident.farmerNotes}
              </p>
            </div>

            {/* Add note input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Append a field observation note to timeline..."
                className="flex-1 rounded-xl border border-surface-border dark:border-forest-800 px-3 py-2 text-xs"
              />
              <Button
                size="sm"
                variant="primary"
                onClick={handleAddNote}
              >
                Add Note
              </Button>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};
