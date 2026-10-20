import React from 'react';
import { DataSourceType } from '../../types';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, User, Database, Cpu, Sparkles, ShieldCheck } from 'lucide-react';

interface DataSourceBadgeProps {
  type: DataSourceType;
  showIcon?: boolean;
  className?: string;
  sourceName?: string;
}

export const DataSourceBadge: React.FC<DataSourceBadgeProps> = ({
  type,
  showIcon = true,
  className = '',
  sourceName
}) => {
  const { t } = useApp();

  const config: Record<DataSourceType, { label: string; icon: any; bg: string; text: string; border: string }> = {
    measured: {
      label: t.sources.measured,
      icon: CheckCircle2,
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      text: 'text-emerald-800 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-800'
    },
    farmer_reported: {
      label: t.sources.farmer_reported,
      icon: User,
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      text: 'text-blue-800 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-800'
    },
    trusted_retrieval: {
      label: t.sources.trusted_retrieval,
      icon: Database,
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      text: 'text-purple-800 dark:text-purple-300',
      border: 'border-purple-200 dark:border-purple-800'
    },
    model_prediction: {
      label: t.sources.model_prediction,
      icon: Cpu,
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      text: 'text-amber-800 dark:text-amber-300',
      border: 'border-amber-200 dark:border-amber-800'
    },
    simulated_scenario: {
      label: t.sources.simulated_scenario,
      icon: Sparkles,
      bg: 'bg-orange-50 dark:bg-orange-950/40',
      text: 'text-orange-800 dark:text-orange-300',
      border: 'border-orange-200 dark:border-orange-800'
    },
    expert_verified: {
      label: t.sources.expert_verified,
      icon: ShieldCheck,
      bg: 'bg-teal-50 dark:bg-teal-950/40',
      text: 'text-teal-800 dark:text-teal-300',
      border: 'border-teal-200 dark:border-teal-800'
    }
  };

  const item = config[type] || config.model_prediction;
  const Icon = item.icon;

  return (
    <span
      title={sourceName ? `${item.label} (${sourceName})` : item.label}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${item.bg} ${item.text} ${item.border} ${className}`}
    >
      {showIcon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span className="truncate max-w-[190px]">
        {sourceName ? `${item.label} · ${sourceName}` : item.label}
      </span>
    </span>
  );
};
