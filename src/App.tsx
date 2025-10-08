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
        {/* ChatArea: flex-1 for full height, no extra wrappers */}
        <div className="flex-1 overflow-hidden">
          <ChatArea
            messages={currentConversation?.messages || []}
            isLoading={isLoading}
            onSpeak={handleSpeak}
            isSpeaking={isSpeaking}
            onStopSpeaking={handleStopSpeaking}
          />
        </div>

        {/* InputArea wrapper: No border-t/line, minimal padding, no bg for seamless merge */}
        <div className="p-2 sm:p-3">  {/* Removed border-t border-gray-800/50 and bg-black/40 backdrop-blur-xl: no line/gap */}
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
