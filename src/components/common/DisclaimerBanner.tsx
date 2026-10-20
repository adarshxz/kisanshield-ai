import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DisclaimerBannerProps {
  customText?: string;
  variant?: 'warning' | 'info' | 'compact';
  className?: string;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  customText,
  variant = 'warning',
  className = ''
}) => {
  const { t } = useApp();
  const text = customText || t.disclaimerText;

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 p-2 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 ${className}`}>
        <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <p className="leading-tight">{text}</p>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 ${className}`}>
      <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
      <div>
        <span className="font-semibold block mb-0.5 text-amber-950 dark:text-amber-100">Agricultural Advisory Notice</span>
        <p className="leading-relaxed text-amber-900/90 dark:text-amber-200/90">{text}</p>
      </div>
    </div>
  );
};

export const DataFreshnessTag: React.FC<{ timestamp: string; isStale?: boolean }> = ({ timestamp, isStale }) => {
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md ${
      isStale 
        ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/30 dark:text-rose-300' 
        : 'bg-surface-warm text-kisan-muted border border-surface-border dark:bg-forest-900 dark:text-forest-200'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isStale ? 'bg-rose-500' : 'bg-emerald-500'}`} />
      <span>{timestamp}</span>
      {isStale && <span className="text-[10px] uppercase font-bold">(Stale)</span>}
    </span>
  );
};
