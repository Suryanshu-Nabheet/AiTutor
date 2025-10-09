import { AnswerMode } from '../types';
import { FileText, BookOpen, Image, LucideIcon } from 'lucide-react';

interface AnswerModeSelectorProps {
  selectedMode: AnswerMode;
  onModeChange: (mode: AnswerMode) => void;
}

export function AnswerModeSelector({ selectedMode, onModeChange }: AnswerModeSelectorProps) {
  const modes: { value: AnswerMode; label: string; icon: LucideIcon; description: string }[] = [
    { value: 'short', label: 'Short', icon: FileText, description: 'Quick summary' },
    { value: 'detailed', label: 'Detailed', icon: BookOpen, description: 'In-depth explanation' },
    { value: 'visual', label: 'Visual', icon: Image, description: 'Diagram description' }
  ];

  return (
    <div className="flex gap-2">
      {modes.map(mode => {
        const Icon = mode.icon;
        const isSelected = selectedMode === mode.value;

        return (
          <button
            key={mode.value}
            onClick={() => onModeChange(mode.value)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium ${
              isSelected
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'glass-effect text-gray-400 hover:bg-white/[0.05] hover:text-gray-200'
            }`}
          >
            <Icon size={14} className="sm:w-4 sm:h-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">{mode.label}</span>
            <span className="sm:hidden">{mode.label.slice(0, 1)}</span>
          </button>
        );
      })}
    </div>
  );
}
