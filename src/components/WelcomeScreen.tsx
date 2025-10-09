import { MessageCircle } from 'lucide-react';

interface WelcomeScreenProps {
  onStartNewChat: () => void;
}

export function WelcomeScreen({ onStartNewChat: _onStartNewChat }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-3 xs:px-4 text-center space-y-4 xs:space-y-6">  {/* Added h-full: explicit full-height for static centering; no bg/padding interference */}
      {/* Centered icon */}
      <div className="w-16 h-16 xs:w-20 xs:h-20 bg-blue-500/10 rounded-xl xs:rounded-2xl flex items-center justify-center">
        <MessageCircle className="w-8 h-8 xs:w-10 xs:h-10 text-blue-400" />
      </div>

      {/* Simple title and prompt - no clutter */}
      <div className="space-y-1.5 xs:space-y-2 max-w-sm xs:max-w-md">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-100">AiTutor</h1>
        <p className="text-gray-400 text-sm xs:text-base leading-relaxed px-2">
          Hello! Ready to dive into learning? Ask me anything.
        </p>
      </div>
    </div>
  );
}
