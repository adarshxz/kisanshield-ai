import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { decisionService } from '../services/decisionService';
import { DecisionRecord } from '../types';
import { 
  GitBranch, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  FileText, 
  AlertTriangle, 
  User, 
  Cpu, 
  BookOpen,
  Filter,
  Check,
  RotateCcw
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const DecisionHistoryPage: React.FC = () => {
  const { t, showToast } = useApp();
  const [decisions, setDecisions] = useState<DecisionRecord[]>(() => decisionService.getDecisions());
  const [selectedRecordId, setSelectedRecordId] = useState<string>(decisions[0]?.id || 'dec-1001');

  const selectedRecord = decisions.find(d => d.id === selectedRecordId) || decisions[0];

  const handleUpdateResponse = (status: 'followed' | 'skipped' | 'modified') => {
    if (selectedRecord) {
      decisionService.updateFarmerResponse(selectedRecord.id, {
        status,
        actionTaken: status === 'followed' ? 'Field inspected and foliar spray postponed as recommended.' : undefined,
        skipReason: status === 'skipped' ? 'Evaluated by farmer as not immediately necessary.' : undefined,
      });
      setDecisions(decisionService.getDecisions());
      showToast({ type: 'success', title: 'Audit Trail Updated', message: `Farmer response recorded: ${status}.` });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card">
        <div className="flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-forest-700 dark:text-fresh" />
          <h2 className="text-xl font-black text-kisan-text dark:text-white">
            {t.decisions.title}
          </h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
            5-Stage Decision Lineage
          </span>
        </div>
        <p className="text-xs text-kisan-muted dark:text-gray-400 mt-1 max-w-2xl">
          {t.decisions.subtitle} Every recommendation preserves the underlying ground evidence, model version, and verified agronomist reviews.
        </p>
      </div>

      <DisclaimerBanner variant="compact" />

      {/* Record Selector / Timeline List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Audit Log Entries (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-kisan-muted dark:text-gray-400 block px-1">
            Historical Decision Events:
          </span>

          {decisions.map((record) => (
            <div
              key={record.id}
              onClick={() => setSelectedRecordId(record.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                record.id === selectedRecord?.id
                  ? 'bg-white dark:bg-forest-900 border-forest-700 dark:border-fresh ring-1 ring-forest-700/20 shadow-card'
                  : 'bg-white/60 dark:bg-forest-950/60 border-surface-border dark:border-forest-900 hover:border-forest-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <Badge variant={record.riskAssessment.level as any} dot>
                  {record.riskAssessment.category.replace('_', ' ').toUpperCase()}
                </Badge>
                <span className="text-[10px] text-kisan-muted shrink-0">{record.timestamp}</span>
              </div>

              <h4 className="text-xs font-bold text-kisan-text dark:text-white leading-snug">
                {record.recommendation}
              </h4>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-kisan-muted dark:text-gray-400">
                <span>{record.fieldName} ({record.crop})</span>
                <span className="font-semibold text-forest-700 dark:text-fresh">
                  {record.farmerResponse ? `Status: ${record.farmerResponse.status}` : 'Pending Response'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: The 5-Stage Structured Decision Flow (8 cols) */}
        {selectedRecord && (
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-surface-border dark:border-forest-900 gap-2 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700 dark:text-fresh">
                    Audit Record ID: {selectedRecord.id}
                  </span>
                  <h3 className="text-base font-black text-kisan-text dark:text-white mt-0.5">
                    {selectedRecord.fieldName} · {selectedRecord.crop}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-kisan-muted">Human Review:</span>
                  <Badge variant={selectedRecord.humanReviewStatus === 'expert_reviewed' ? 'low' : 'neutral'}>
                    {selectedRecord.humanReviewStatus === 'expert_reviewed' ? 'Verified by Agronomist' : 'Automated Model Only'}
                  </Badge>
                </div>
              </div>

              {/* STAGE 1: Input Evidence */}
              <div className="relative pl-6 pb-6 border-l-2 border-forest-200 dark:border-forest-800">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-forest-700 flex items-center justify-center text-white text-[10px] font-bold">
                  1
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-forest-100">
                    Stage 1: Ground Input Evidence Stream
                  </h4>
                  <div className="space-y-1.5">
                    {selectedRecord.evidence.map((ev, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-surface-warm dark:bg-forest-900/60 text-xs gap-1">
                        <div>
                          <span className="font-semibold text-kisan-text dark:text-white">{ev.name}: </span>
                          <span className="font-bold text-forest-700 dark:text-fresh">{ev.value}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-kisan-muted">
                          <span>{ev.source}</span>
                          <DataSourceBadge type={ev.type} showIcon={false} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* STAGE 2: Risk Assessment */}
              <div className="relative pl-6 pb-6 border-l-2 border-forest-200 dark:border-forest-800">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-forest-700 flex items-center justify-center text-white text-[10px] font-bold">
                  2
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-forest-100">
                    Stage 2: Micro-Climate Risk Assessment
                  </h4>
                  <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs">
                    <p className="font-semibold text-amber-950 dark:text-amber-100">
                      {selectedRecord.riskAssessment.rationale}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-[10px] text-amber-800 dark:text-amber-300">
                      <span>Model: {selectedRecord.riskAssessment.modelVersion}</span>
                      <span>·</span>
                      <span>Uncertainty: {selectedRecord.riskAssessment.uncertainty}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STAGE 3: Recommendation */}
              <div className="relative pl-6 pb-6 border-l-2 border-forest-200 dark:border-forest-800">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-forest-700 flex items-center justify-center text-white text-[10px] font-bold">
                  3
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-forest-100">
                    Stage 3: Generated Preventative Recommendation
                  </h4>
                  <div className="p-3.5 rounded-xl bg-forest-900 text-white text-xs">
                    <p className="leading-relaxed font-medium">
                      {selectedRecord.recommendation}
                    </p>
                    <div className="mt-2 pt-2 border-t border-forest-800 flex items-center gap-1.5 text-[10px] text-forest-300">
                      <BookOpen className="w-3.5 h-3.5 text-fresh shrink-0" />
                      <span>Reference: {selectedRecord.supportingReference}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STAGE 4: Farmer Response */}
              <div className="relative pl-6 pb-6 border-l-2 border-forest-200 dark:border-forest-800">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-forest-700 flex items-center justify-center text-white text-[10px] font-bold">
                  4
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-forest-100">
                      Stage 4: Farmer Field Action / Decision
                    </h4>
                    <span className="text-[10px] text-kisan-muted">
                      {selectedRecord.farmerResponse?.updatedAt || 'Awaiting Response'}
                    </span>
                  </div>

                  {selectedRecord.farmerResponse ? (
                    <div className="p-3.5 rounded-xl bg-surface-warm dark:bg-forest-900 border border-surface-border dark:border-forest-800 text-xs">
                      <span className="font-bold text-forest-700 dark:text-fresh capitalize block mb-0.5">
                        Response Status: {selectedRecord.farmerResponse.status}
                      </span>
                      <p className="text-kisan-muted dark:text-gray-300 leading-relaxed">
                        {selectedRecord.farmerResponse.actionTaken || selectedRecord.farmerResponse.notes}
                      </p>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-surface-warm dark:bg-forest-900 border border-surface-border dark:border-forest-800 text-xs flex flex-wrap items-center justify-between gap-3">
                      <span className="text-kisan-muted">Did you follow this recommendation?</span>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handleUpdateResponse('followed')}
                        >
                          Followed Action
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleUpdateResponse('skipped')}
                        >
                          Skipped
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* STAGE 5: Observed Outcome */}
              <div className="relative pl-6">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-forest-700 flex items-center justify-center text-white text-[10px] font-bold">
                  5
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-forest-100">
                    Stage 5: Observed Harvest / Field Outcome
                  </h4>

                  {selectedRecord.observedOutcome ? (
                    <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-emerald-900 dark:text-emerald-200">
                          Field Outcome Logged
                        </span>
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold uppercase">
                          Rating: {selectedRecord.observedOutcome.rating}
                        </span>
                      </div>
                      <p className="text-emerald-900/90 dark:text-emerald-200/90 leading-relaxed text-[11px]">
                        {selectedRecord.observedOutcome.description}
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-surface-warm dark:bg-forest-900 text-xs text-kisan-muted">
                      Outcome measurement scheduled for post-event field check.
                    </div>
                  )}
                </div>
              </div>

            </Card>
          </div>
        )}

      </div>

    </div>
  );
};
