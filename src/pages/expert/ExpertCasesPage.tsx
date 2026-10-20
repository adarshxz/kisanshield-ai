import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { INITIAL_EXPERT_CASES } from '../../data/demoData';
import { ExpertCase } from '../../types';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  ShieldCheck, 
  Clock, 
  User, 
  FileText,
  Edit3
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const ExpertCasesPage: React.FC = () => {
  const [cases] = useState<ExpertCase[]>(INITIAL_EXPERT_CASES);
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-surface-border dark:border-forest-900">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/expert/dashboard')}
            className="p-2 rounded-xl border border-surface-border hover:bg-surface-warm"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-kisan-text dark:text-white">All Submitted Cases</h2>
            <p className="text-xs text-kisan-muted">Escalated diagnostic queries requiring agronomic confirmation</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {cases.map((c) => (
          <Card key={c.id} className="p-6 hoverable" onClick={() => navigate(`/expert/cases/${c.id}`)}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={c.priority === 'critical' ? 'critical' : 'high'}>{c.priority.toUpperCase()}</Badge>
                  <span className="text-xs font-bold text-forest-700 dark:text-fresh">{c.crop} · {c.fieldArea}</span>
                  <span className="text-xs text-kisan-muted">({c.farmerName}, {c.village})</span>
                </div>
                <h3 className="font-bold text-sm text-kisan-text dark:text-white">{c.originalAiAssessment}</h3>
                <p className="text-xs text-kisan-muted mt-1">Submitted: {c.dateSubmitted}</p>
              </div>
              <Button size="sm" variant="outline">Review Details</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const ExpertCaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();

  const [theCase, setTheCase] = useState<ExpertCase>(() => {
    const found = INITIAL_EXPERT_CASES.find(c => c.id === id);
    return found || INITIAL_EXPERT_CASES[0];
  });

  const [expertDiagnosis, setExpertDiagnosis] = useState(
    theCase.correctedDiagnosis || 'Confirmed Rhizoctonia aerial blight; recommended biological Trichoderma spray.'
  );
  const [expertNotes, setExpertNotes] = useState(
    theCase.expertNotes || 'Foliage pattern shows characteristic water-soaked irregular spots caused by high humidity. Postpone any chemical spraying until leaves are dry.'
  );

  const handleVerifyCase = () => {
    setTheCase({
      ...theCase,
      status: 'verified',
      correctedDiagnosis: expertDiagnosis,
      expertNotes: expertNotes,
      reviewedBy: 'Dr. S. K. Verma (KVK Sehore)',
      reviewedAt: new Date().toLocaleString('en-IN')
    });

    showToast({
      type: 'success',
      title: 'Case Verified & Signed',
      message: 'Official agronomist assessment transmitted back to farmer workspace.'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Back button */}
      <div className="flex items-center justify-between pb-4 border-b border-surface-border dark:border-forest-900">
        <button
          onClick={() => navigate('/expert/dashboard')}
          className="inline-flex items-center gap-2 text-xs font-bold text-forest-700 dark:text-fresh hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Review Desk
        </button>
        <span className="text-xs text-kisan-muted">Case ID: {theCase.id}</span>
      </div>

      {/* Case Details Card */}
      <Card className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-surface-border dark:border-forest-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={theCase.priority === 'critical' ? 'critical' : 'high'}>
                {theCase.priority.toUpperCase()}
              </Badge>
              <span className="text-xs font-bold text-forest-700 dark:text-fresh">
                {theCase.crop} · {theCase.fieldArea}
              </span>
            </div>
            <h2 className="text-lg font-black text-kisan-text dark:text-white">
              Farmer Case: {theCase.farmerName}
            </h2>
            <p className="text-xs text-kisan-muted">
              Location: {theCase.village} · Submitted: {theCase.dateSubmitted}
            </p>
          </div>

          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
            theCase.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            Status: {theCase.status}
          </span>
        </div>

        {/* Original AI Assessment & Uncertainty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-surface-warm dark:bg-forest-900 border border-surface-border dark:border-forest-800 text-xs space-y-2">
            <span className="font-bold text-kisan-muted uppercase tracking-wider block text-[10px]">
              Original Automated Model Output:
            </span>
            <p className="font-bold text-kisan-text dark:text-white">
              {theCase.originalAiAssessment}
            </p>
            <div className="pt-2 text-[11px] text-amber-800 dark:text-amber-300">
              <strong>Uncertainty Trigger:</strong> {theCase.uncertaintyReason}
            </div>
          </div>

          {theCase.imageUrl && (
            <div className="rounded-2xl overflow-hidden border border-surface-border relative">
              <img src={theCase.imageUrl} alt="Uploaded symptom" className="w-full h-44 object-cover" />
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                Farmer Uploaded Photo
              </span>
            </div>
          )}
        </div>

        {/* Symptoms recorded */}
        <div className="text-xs">
          <span className="font-bold text-kisan-text dark:text-white block mb-1">Reported Symptoms:</span>
          <div className="flex flex-wrap gap-1.5">
            {theCase.symptoms.map((s, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-surface-warm text-kisan-muted border border-surface-border text-xs">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Expert Review Input Section */}
        <div className="pt-4 border-t border-surface-border dark:border-forest-900 space-y-4">
          <h3 className="text-sm font-bold text-kisan-text dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-forest-700" />
            <span>Agronomist Clinical Assessment & Recommendation</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold mb-1 text-kisan-text dark:text-white">
              Official Agronomist Diagnosis:
            </label>
            <input
              type="text"
              value={expertDiagnosis}
              onChange={(e) => setExpertDiagnosis(e.target.value)}
              className="w-full rounded-xl border border-surface-border dark:border-forest-800 p-2.5 text-xs bg-white dark:bg-forest-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-kisan-text dark:text-white">
              Reviewer Advisory Notes & Safe Steps:
            </label>
            <textarea
              rows={3}
              value={expertNotes}
              onChange={(e) => setExpertNotes(e.target.value)}
              className="w-full rounded-xl border border-surface-border dark:border-forest-800 p-2.5 text-xs bg-white dark:bg-forest-900"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/expert/dashboard')}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleVerifyCase}
              rightIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Sign & Publish Verified Advisory
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
