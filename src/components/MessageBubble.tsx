import { useState, useEffect } from 'react';
import { Message } from '../types';
import { User, Volume2, Square, Code2, GraduationCap } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { parseMarkdown } from '../utils/markdown';

interface MessageBubbleProps {
  message: Message;
  onSpeak?: (text: string) => void;
  isSpeaking?: boolean;
  onStopSpeaking?: () => void;
}

export function MessageBubble({ message, onSpeak, isSpeaking, onStopSpeaking }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(!isUser);

  useEffect(() => {
    if (isUser) {
      setDisplayedContent(message.content);
      return;
    }

    setDisplayedContent('');
    setIsTyping(true);
    let currentIndex = 0;
    const typingSpeed = 10;

    const interval = setInterval(() => {
      if (currentIndex < message.content.length) {
        setDisplayedContent(message.content.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [message.content, isUser]);

  const parsedContent = parseMarkdown(displayedContent);

  return (
    <div className={`flex gap-3 sm:gap-4 animate-fade-in ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-blue-500 shadow-blue-600/30'
            : 'glass-effect border-blue-500/20 shadow-blue-500/10 bg-blue-600/20'
        }`}
      >
        {isUser ? (
          <User size={16} className="sm:w-5 sm:h-5" />
        ) : (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )}
      </div>

      <div
        className={`flex-1 max-w-3xl ${isUser ? 'flex justify-end' : 'flex justify-start'}`}
      >
        <div
          className={`px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:shadow-xl ${
            isUser
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/20'
              : 'glass-effect text-gray-100 border-blue-500/10 shadow-lg'
          }`}
        >
          <div className="leading-relaxed text-sm sm:text-base">
            {parsedContent.map((part, index) => {
              if (part.type === 'code') {
                return <CodeBlock key={index} code={part.content} language={part.language} />;
              }
              return (
                <div key={index} className="whitespace-pre-wrap">
                  {part.content}
                </div>
              );
            })}
            {isTyping && <span className="inline-block w-1 h-4 bg-blue-400 animate-pulse ml-1"></span>}
          </div>

          {!isUser && !isTyping && (
            <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                {message.modelType && (
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                    message.modelType === 'coding'
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'bg-green-500/10 text-green-400 border border-green-500/20'
                  }`}>
                    {message.modelType === 'coding' ? (
                      <>
                        <Code2 size={12} />
                        <span>Qwen Coder</span>
                      </>
                    ) : (
                      <>
                        <GraduationCap size={12} />
                        <span>Tongyi Research</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {onSpeak && (
                <div className="flex items-center gap-2">
                  {!isSpeaking ? (
                    <button
                      onClick={() => onSpeak(message.content)}
                      className="flex items-center gap-2 text-xs text-gray-400 hover:text-blue-400 transition-all duration-300 hover:gap-3 group"
                    >
                      <Volume2 size={14} className="group-hover:scale-110 transition-transform" />
                      <span>Read aloud</span>
                    </button>
                  ) : (
                    <button
                      onClick={onStopSpeaking}
                      className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-all duration-300 hover:gap-3 group animate-pulse"
                    >
                      <Square size={14} className="group-hover:scale-110 transition-transform" />
                      <span>Stop speaking</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
