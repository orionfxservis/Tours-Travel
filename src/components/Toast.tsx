import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, CloudOff, Cloud, Bell, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useApp();

  if (!toast.visible) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] sm:w-auto animate-bounce-short">
      <div className="bg-surface-container-lowest text-on-surface px-4 py-3 rounded-2xl shadow-2xl border border-surface-container-high/60 flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
        <span className="text-xs font-semibold leading-tight">
          {toast.message}
        </span>
        <button
          onClick={hideToast}
          className="text-on-surface-variant hover:text-on-surface ml-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
