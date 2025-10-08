import { AlertCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface ErrorToastProps {
  message: string;
  onClose: () => void;
}

export function ErrorToast({ message, onClose }: ErrorToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 7000);
    return () => clearTimeout(timer);
  }, [onClose, message]);

  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto max-w-md bg-gradient-to-r from-red-600 to-red-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl flex items-start gap-3 animate-slide-in z-[100] border border-red-400/30 backdrop-blur-xl">
      <div className="flex-shrink-0 p-2 bg-white/10 rounded-lg">
        <AlertCircle size={20} className="sm:w-6 sm:h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold mb-1 text-sm sm:text-base">Error</p>
        <p className="text-xs sm:text-sm opacity-95 break-words leading-relaxed">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:bg-white/20 rounded-lg p-1.5 sm:p-2 transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
        aria-label="Close error message"
      >
        <X size={16} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
