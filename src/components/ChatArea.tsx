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
        <WelcomeScreen onStartNewChat={() => {}} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden pt-2 xs:pt-3 sm:pt-4 md:pt-6 lg:pt-8 pb-0 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 overscroll-behavior-contain custom-scrollbar scroll-smooth chat-container scroll-container no-horizontal-scroll">
      <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 w-full">
        {messages.map((message) => (
          <div key={`${message.id}-${message.timestamp}`} className="message-container w-full">
            <MessageBubble
              message={message}
              onSpeak={onSpeak}
              isSpeaking={isSpeaking}
              onStopSpeaking={onStopSpeaking}
            />
          </div>
        ))}
        {isLoading && (
          <div className="message-container w-full">
            <LoadingIndicator />
          </div>
        )}
        <div ref={messagesEndRef} className="h-2 xs:h-3 sm:h-4" />
      </div>
    </div>
  );
}
