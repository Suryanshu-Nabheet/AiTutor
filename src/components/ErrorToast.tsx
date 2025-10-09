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
    <div className="fixed top-3 xs:top-4 right-3 xs:right-4 left-3 xs:left-4 sm:left-auto max-w-sm xs:max-w-md bg-gradient-to-r from-red-600 to-red-500 text-white px-3 xs:px-4 sm:px-6 py-2.5 xs:py-3 sm:py-4 rounded-xl xs:rounded-2xl shadow-2xl flex items-start gap-2 xs:gap-3 animate-slide-in z-[100] border border-red-400/30 backdrop-blur-xl">
      <div className="flex-shrink-0 p-1.5 xs:p-2 bg-white/10 rounded-md xs:rounded-lg">
        <AlertCircle size={16} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold mb-1 text-xs xs:text-sm sm:text-base">Error</p>
        <p className="text-xs xs:text-sm opacity-95 break-words leading-relaxed">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:bg-white/20 rounded-md xs:rounded-lg p-1 xs:p-1.5 sm:p-2 transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation min-h-[32px] min-w-[32px] flex items-center justify-center"
        aria-label="Close error message"
      >
        <X size={14} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
