import { MessageCircle } from 'lucide-react';

interface WelcomeScreenProps {
  onStartNewChat: () => void;
}

export function WelcomeScreen({ onStartNewChat }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center space-y-6">  {/* Added h-full: explicit full-height for static centering; no bg/padding interference */}
      {/* Centered icon */}
      <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center">
        <MessageCircle className="w-10 h-10 text-blue-400" />
      </div>

      {/* Simple title and prompt - no clutter */}
      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">AiTutor</h1>
        <p className="text-gray-400 text-base leading-relaxed">
          Hello! Ready to dive into learning? Ask me anything.
        </p>
      </div>
    </div>
  );
}
