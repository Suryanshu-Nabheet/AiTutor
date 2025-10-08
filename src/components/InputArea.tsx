import { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, Loader2 } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  onStartListening: () => void;
  onStopListening: () => void;
  isListening: boolean;
  isLoading: boolean;
  voiceSupported: boolean;
  voiceInput: string;
  onVoiceInputChange: (value: string) => void;
}

export function InputArea({
  onSendMessage,
  onStartListening,
  onStopListening,
  isListening,
  isLoading,
  voiceSupported,
  voiceInput,
  onVoiceInputChange
}: InputAreaProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (voiceInput) {
      setInput(voiceInput);
      onVoiceInputChange('');
    }
  }, [voiceInput, onVoiceInputChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.style.height = '44px';
      }
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '44px';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Single curved container - ChatGPT-like: full-width rounded box with subtle glass effect */}
      <div className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl p-3 sm:p-4 focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 disabled:opacity-50">
        <div className="flex items-center gap-2 sm:gap-3">  {/* Inner flex: straight rhythm, no outer boxes */}
          {/* Textarea: Flex-1, no border (blends into container), auto-resize within curve */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              const target = e.target as HTMLTextAreaElement;
              setInput(target.value);
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 120) + 'px';  // Reduced max for compact bar
            }}
            onKeyDown={handleKeyDown}
            placeholder="Message AiTutor..."
            disabled={isLoading}
            rows={1}
            className="flex-1 px-0 py-0 m-0 bg-transparent border-0 outline-none text-gray-100 placeholder-gray-500 text-sm sm:text-base leading-relaxed resize-none min-h-[44px] max-h-[120px]"  // No padding/border: seamless in container; reduced max-h
            style={{ overflowY: 'auto' }}  // Scroll enabled, hidden via CSS
          />
          
          {/* Voice button: Compact inside container, no extra border/padding */}
          {voiceSupported && (
            <button
              type="button"
              onClick={isListening ? onStopListening : onStartListening}
              disabled={isLoading}
              className={`p-2 sm:p-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 flex-shrink-0 touch-manipulation relative h-10 w-10 flex items-center justify-center ${  // Compact h-10/w-10: fits curve; no full rounded-xl
                isListening
                  ? 'bg-red-600/80 hover:bg-red-700/80 text-white shadow-md shadow-red-600/20'
                  : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-gray-300 border border-gray-600/50'
              }`}
              aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
            >
              {isListening ? (
                <>
                  <MicOff size={16} className="sm:w-4 sm:h-4" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">  {/* Smaller pulse to fit compact button */}
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                </>
              ) : (
                <Mic size={16} className="sm:w-4 sm:h-4" />
              )}
            </button>
          )}

          {/* Send button: Small icon-only, inside container for unity */}
          <button
            type="submit"
            aria-label="Send message"
            className="p-2 sm:p-2.5 h-10 w-10 flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 transition-all duration-200 disabled:cursor-not-allowed"  // Compact h-10/w-10, rounded-lg to match voice
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}
