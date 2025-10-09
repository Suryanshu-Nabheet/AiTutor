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
  const [isTyping, setIsTyping] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isUser) {
      setDisplayedContent(message.content);
      setHasAnimated(true);
      return;
    }

    // Only animate typing for new messages (not when switching between chats)
    if (!hasAnimated) {
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
          setHasAnimated(true);
          clearInterval(interval);
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    } else {
      // For existing messages, show content immediately
      setDisplayedContent(message.content);
      setIsTyping(false);
    }
  }, [message.content, isUser, hasAnimated]);

  const parsedContent = parseMarkdown(displayedContent);

  return (
    <div className={`flex gap-2 xs:gap-3 sm:gap-4 animate-fade-in w-full max-w-full ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`flex-shrink-0 w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-blue-500 shadow-blue-600/30'
            : 'glass-effect border-blue-500/20 shadow-blue-500/10 bg-blue-600/20'
        }`}
      >
        {isUser ? (
          <User size={14} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
        ) : (
          <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )}
      </div>

      <div
        className={`flex-1 min-w-0 max-w-full ${isUser ? 'flex justify-end' : 'flex justify-start'}`}
      >
        <div
          className={`px-3 xs:px-4 sm:px-6 py-2.5 xs:py-3 sm:py-4 rounded-xl xs:rounded-2xl sm:rounded-3xl transition-all duration-300 hover:shadow-xl max-w-full overflow-hidden ${
            isUser
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/20'
              : 'glass-effect text-gray-100 border-blue-500/10 shadow-lg'
          }`}
        >
          <div className="leading-relaxed text-sm sm:text-base break-words overflow-wrap-anywhere">
            {parsedContent.map((part, index) => {
              if (part.type === 'code') {
                return <CodeBlock key={index} code={part.content} language={part.language} />;
              }
              return (
                <div key={index} className="whitespace-pre-wrap text-gray-100 leading-relaxed">
                  {part.content}
                </div>
              );
            })}
            {isTyping && <span className="inline-block w-1 h-4 bg-blue-400 animate-pulse ml-1"></span>}
          </div>

          {!isUser && !isTyping && (
            <div className="mt-2 xs:mt-3 flex items-center justify-between gap-2 xs:gap-3 flex-wrap max-w-full">
              <div className="flex items-center gap-1.5 xs:gap-2 min-w-0">
                {message.modelType && (
                  <div className={`flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
                    message.modelType === 'coding'
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'bg-green-500/10 text-green-400 border border-green-500/20'
                  }`}>
                    {message.modelType === 'coding' ? (
                      <>
                        <Code2 size={10} className="xs:w-3 xs:h-3" />
                        <span className="hidden xs:inline">AiTutor</span>
                        <span className="xs:hidden">Code</span>
                      </>
                    ) : (
                      <>
                        <GraduationCap size={10} className="xs:w-3 xs:h-3" />
                        <span className="hidden xs:inline">AiTutor</span>
                        <span className="xs:hidden">Academic</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {onSpeak && (
                <div className="flex items-center gap-1.5 xs:gap-2 min-w-0">
                  {!isSpeaking ? (
                    <button
                      onClick={() => onSpeak(message.content)}
                      className="flex items-center gap-1.5 xs:gap-2 text-xs text-gray-400 hover:text-blue-400 transition-all duration-300 hover:gap-2 xs:hover:gap-3 group min-h-[32px] px-2 py-1 rounded-lg hover:bg-blue-500/10 touch-manipulation whitespace-nowrap"
                    >
                      <Volume2 size={12} className="xs:w-3.5 xs:h-3.5 group-hover:scale-110 transition-transform" />
                      <span className="hidden xs:inline">Read aloud</span>
                      <span className="xs:hidden">Read</span>
                    </button>
                  ) : (
                    <button
                      onClick={onStopSpeaking}
                      className="flex items-center gap-1.5 xs:gap-2 text-xs text-red-400 hover:text-red-300 transition-all duration-300 hover:gap-2 xs:hover:gap-3 group animate-pulse min-h-[32px] px-2 py-1 rounded-lg hover:bg-red-500/10 touch-manipulation whitespace-nowrap"
                    >
                      <Square size={12} className="xs:w-3.5 xs:h-3.5 group-hover:scale-110 transition-transform" />
                      <span className="hidden xs:inline">Stop speaking</span>
                      <span className="xs:hidden">Stop</span>
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
