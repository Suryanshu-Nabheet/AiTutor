import { Conversation, Message } from '../types';

const STORAGE_KEY = 'aitutor_conversations';

export class StorageService {
  static getConversations(): Conversation[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load conversations:', error);
      return [];
    }
  }

  static saveConversations(conversations: Conversation[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch (error) {
      console.error('Failed to save conversations:', error);
    }
  }

  static createConversation(firstMessage: string): Conversation {
    return {
      id: crypto.randomUUID(),
      title: firstMessage.substring(0, 50) + (firstMessage.length > 50 ? '...' : ''),
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
  }

  static addMessage(conversation: Conversation, message: Message): Conversation {
    return {
      ...conversation,
      messages: [...conversation.messages, message],
      updatedAt: Date.now()
    };
  }

  static deleteConversation(conversationId: string): void {
    const conversations = this.getConversations();
    const filtered = conversations.filter(c => c.id !== conversationId);
    this.saveConversations(filtered);
  }

  static clearAllConversations(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
