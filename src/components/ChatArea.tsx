import { useEffect, useRef } from 'react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { LoadingIndicator } from './LoadingIndicator';
import { WelcomeScreen } from './WelcomeScreen';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
}

export function ChatArea({ messages, isLoading, onSpeak, isSpeaking, onStopSpeaking }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="h-full">  {/* Simplified: h-full for static full-screen centering; removed overflow/p-0 (unneeded for WelcomeScreen) */}
        <WelcomeScreen />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pt-3 pb-0 px-3 sm:pt-4 sm:pb-0 sm:px-4 md:pt-6 md:pb-0 md:px-6 lg:pt-8 lg:pb-0 lg:px-8 overscroll-behavior-contain custom-scrollbar scroll-smooth">
      <div className="max-w-3xl xl:max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onSpeak={onSpeak}
            isSpeaking={isSpeaking}
            onStopSpeaking={onStopSpeaking}
          />
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </div>
  );
}
