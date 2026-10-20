import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { INITIAL_EXPERT_CASES } from '../../data/demoData';
import { ExpertCase } from '../../types';
import { 
  ShieldCheck, 
  Stethoscope, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Filter, 
  ArrowRight, 
  FileText,
  UserCheck,
  ChevronRight,
  Send
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const ExpertDashboardPage: React.FC = () => {
  const { userRole, setUserRole, showToast } = useApp();
  const [cases, setCases] = useState<ExpertCase[]>(INITIAL_EXPERT_CASES);
  const navigate = useNavigate();

  const pendingCases = cases.filter(c => c.status === 'pending');
  const verifiedCases = cases.filter(c => c.status === 'verified');

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      
      {/* Role Banner */}
      <div className="p-6 rounded-3xl bg-forest-900 text-white shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-fresh/20 text-fresh text-xs font-semibold mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Authorized Agronomist Desk · Dr. S. K. Verma (KVK Sehore)</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Agricultural Expert Review Workspace
          </h2>
          <p className="text-forest-200 text-xs mt-1 max-w-xl">
            Review high-uncertainty farmer crop images, confirm community pest surges, and issue official district advisories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setUserRole('farmer');
              navigate('/app/dashboard');
            }}
          >
            Return to Farmer View
          </Button>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 border-amber-200 bg-amber-50/50 dark:bg-forest-950">
          <span className="text-xs font-bold uppercase text-amber-800 tracking-wider">
            Pending Case Reviews
          </span>
          <div className="text-3xl font-black text-amber-900 dark:text-amber-100 mt-2">
            {pendingCases.length}
          </div>
          <span className="text-[11px] text-amber-700">Requires agronomist confirmation</span>
        </Card>

        <Card className="p-5 border-emerald-200 bg-emerald-50/50 dark:bg-forest-950">
          <span className="text-xs font-bold uppercase text-forest-700 tracking-wider">
            Verified / Corrected
          </span>
          <div className="text-3xl font-black text-forest-900 dark:text-emerald-100 mt-2">
            {verifiedCases.length}
          </div>
          <span className="text-[11px] text-forest-700">Signed with KVK digital audit</span>
        </Card>

        <Card className="p-5 border-purple-200 bg-purple-50/50 dark:bg-forest-950">
          <span className="text-xs font-bold uppercase text-purple-800 tracking-wider">
            Community Watch Status
          </span>
          <div className="text-xl font-black text-purple-900 dark:text-purple-100 mt-2">
            Advisory Active
          </div>
          <span className="text-[11px] text-purple-700">Gram Pod Borer in Ashta Block</span>
        </Card>
      </div>

      {/* Cases List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-kisan-text dark:text-white">
            Submitted Escalation Queue
          </h3>
          <Link
            to="/expert/cases"
            className="text-xs font-bold text-forest-700 dark:text-fresh hover:underline inline-flex items-center gap-1"
          >
            View All Cases <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {cases.map((c) => (
            <Card key={c.id} className="p-6 hoverable" onClick={() => navigate(`/expert/cases/${c.id}`)}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={c.priority === 'critical' ? 'critical' : c.priority === 'urgent' ? 'high' : 'neutral'}>
                      {c.priority.toUpperCase()}
                    </Badge>
                    <span className="text-xs font-bold text-forest-700 dark:text-fresh">
                      {c.crop} · {c.fieldArea}
                    </span>
                    <span className="text-xs text-kisan-muted">·</span>
                    <span className="text-xs text-kisan-muted">Farmer: {c.farmerName} ({c.village})</span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-kisan-text dark:text-white">
                    {c.originalAiAssessment}
                  </h4>

                  <p className="text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900">
                    <strong>Reason for Expert Escalation:</strong> {c.uncertaintyReason}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-kisan-muted">
                    <span>Submitted: {c.dateSubmitted}</span>
                    <span>·</span>
                    <span>Symptoms: {c.symptoms.join(', ')}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end gap-2 shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                    c.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {c.status}
                  </span>

                  <Button
                    size="sm"
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/expert/cases/${c.id}`);
                    }}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Review Case
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
};
