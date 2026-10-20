import React from 'react';
import { useApp } from '../../context/AppContext';
import { WifiOff, RefreshCw } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOnline, pendingSyncCount, triggerSync } = useApp();

  if (isOnline && pendingSyncCount === 0) return null;

  return (
    <div className="bg-amber-600 text-white px-4 py-2 text-xs font-medium flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 shrink-0 animate-pulse" />
        <span>
          {!isOnline
            ? "Offline Mode Active: Local farm cache loaded. Real-time satellite & live weather paused."
            : `${pendingSyncCount} changes saved locally, ready for synchronization.`}
        </span>
      </div>
      <button
        onClick={triggerSync}
        className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-md text-xs transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Sync Now</span>
      </button>
    </div>
  );
};
