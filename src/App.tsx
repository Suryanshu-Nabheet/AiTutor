import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { InputArea } from './components/InputArea';
import { ErrorToast } from './components/ErrorToast';
import { Conversation, Message } from './types';
import { StorageService } from './services/storageService';
import { getAIResponse, getModelInfo } from './services/aiService';
import { voiceService } from './services/voiceService';

function App() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');

  useEffect(() => {
    const loadedConversations = StorageService.getConversations();
    setConversations(loadedConversations);
    if (loadedConversations.length > 0) {
      setCurrentConversation(loadedConversations[0]);
    }
  }, []);

  const saveCurrentConversation = (updated: Conversation) => {
    const updatedConversations = conversations.map(c =>
      c.id === updated.id ? updated : c
    );
    if (!conversations.find(c => c.id === updated.id)) {
      updatedConversations.unshift(updated);
    }
    setConversations(updatedConversations);
    setCurrentConversation(updated);
    StorageService.saveConversations(updatedConversations);
  };

  const handleNewConversation = () => {
    setCurrentConversation(null);
  };

  const handleSelectConversation = (id: string) => {
    const conversation = conversations.find(c => c.id === id);
    if (conversation) {
      setCurrentConversation(conversation);
    }
  };

  const handleDeleteConversation = (id: string) => {
    StorageService.deleteConversation(id);
    const filtered = conversations.filter(c => c.id !== id);
    setConversations(filtered);
    if (currentConversation?.id === id) {
      setCurrentConversation(filtered.length > 0 ? filtered[0] : null);
    }
  };

  const handleSendMessage = async (messageText: string) => {
    try {
      setIsLoading(true);
      setError(null);

      let conversation = currentConversation;
      if (!conversation) {
        conversation = StorageService.createConversation(messageText);
      }

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: messageText,
        timestamp: Date.now()
      };

      conversation = StorageService.addMessage(conversation, userMessage);
      saveCurrentConversation(conversation);

      const conversationHistory = conversation.messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const modelInfo = getModelInfo(messageText);
      const aiResponse = await getAIResponse(messageText, conversationHistory);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now(),
        modelType: modelInfo.type
      };

      conversation = StorageService.addMessage(conversation, assistantMessage);
      saveCurrentConversation(conversation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartListening = () => {
    setIsListening(true);
    voiceService.startListening(
      (transcript) => {
        setIsListening(false);
        if (transcript) {
          setVoiceInput(transcript);
        }
      },
      (error) => {
        setIsListening(false);
        setError(`Voice recognition error: ${error}`);
      }
    );
  };

  const handleStopListening = () => {
    voiceService.stopListening();
    setIsListening(false);
  };

  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    voiceService.speak(text, () => {
      setIsSpeaking(false);
    });
  };

  const handleStopSpeaking = () => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversation?.id || null}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="border-b border-gray-800/50 bg-black/40 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center justify-between p-3 sm:p-4 md:p-5">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pl-12 lg:pl-0">
              <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg shadow-lg shadow-blue-600/30 flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-sm sm:text-base md:text-lg font-semibold text-white truncate">
                  AiTutor
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">Dual AI Learning Assistant</p>
              </div>
            </div>
          </div>
        </div>

        <ChatArea
          messages={currentConversation?.messages || []}
          isLoading={isLoading}
          onSpeak={handleSpeak}
          isSpeaking={isSpeaking}
          onStopSpeaking={handleStopSpeaking}
        />

        <div className="border-t border-gray-800/50 p-3 sm:p-4 bg-black/40 backdrop-blur-xl">
          <div className="max-w-3xl mx-auto">
            <InputArea
              onSendMessage={handleSendMessage}
              onStartListening={handleStartListening}
              onStopListening={handleStopListening}
              isListening={isListening}
              isLoading={isLoading}
              voiceSupported={voiceService.isVoiceSupported()}
              voiceInput={voiceInput}
              onVoiceInputChange={setVoiceInput}
            />
          </div>
        </div>
      </div>

      {error && <ErrorToast message={error} onClose={() => setError(null)} />}
    </div>
  );
}

export default App;
