import React, { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'low' | 'moderate' | 'elevated' | 'high' | 'critical' | 'neutral' | 'success' | 'blue';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
  dot = false,
}) => {
  const styles = {
    low: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    moderate: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    elevated: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    high: 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800',
    critical: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800',
    neutral: 'bg-surface-warm text-kisan-muted border-surface-border dark:bg-forest-900 dark:text-gray-300 dark:border-forest-800',
    success: 'bg-fresh/10 text-forest-700 border-fresh/30 dark:bg-forest-900 dark:text-fresh dark:border-forest-700',
    blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800',
  };

  const dotColors = {
    low: 'bg-emerald-500',
    moderate: 'bg-blue-500',
    elevated: 'bg-amber-500',
    high: 'bg-orange-500',
    critical: 'bg-red-500',
    neutral: 'bg-gray-400',
    success: 'bg-fresh',
    blue: 'bg-blue-500',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[variant]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
