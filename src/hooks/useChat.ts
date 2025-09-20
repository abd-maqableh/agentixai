/**
 * useChat Hook
 * Custom hook for managing chat state and interactions
 */

import { Conversation, Message } from '@/lib/types';
import { generateId, validateMessage } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseChatOptions {
  initialConversations?: Conversation[];
  onConversationChange?: (conversation: Conversation) => void;
  onMessageSend?: (message: Message, conversationId: string) => void;
  onError?: (error: string) => void;
}

interface UseChatReturn {
  // State
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
  
  // Actions
  createNewConversation: (title?: string) => string;
  selectConversation: (conversationId: string) => void;
  sendMessage: (content: string) => Promise<void>;
  deleteConversation: (conversationId: string) => void;
  clearCurrentConversation: () => void;
  updateConversationTitle: (conversationId: string, title: string) => void;
  
  // Utilities
  retryLastMessage: () => Promise<void>;
  clearError: () => void;
}

export function useChat(options: UseChatOptions = {}): UseChatReturn {
  const {
    initialConversations = [],
    onConversationChange,
    onMessageSend,
    onError,
  } = options;

  // State
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastUserMessageRef = useRef<string | null>(null);

  // Get current conversation
  const currentConversation = conversations.find(c => c.id === currentConversationId) || null;

  // Create new conversation
  const createNewConversation = useCallback((title?: string): string => {
    // Use a fixed date to avoid SSR hydration issues
    const fixedDate = new Date('2024-01-15T10:00:00Z');
    const newConversation: Conversation = {
      id: generateId(),
      title: title || 'محادثة جديدة',
      messages: [],
      createdAt: fixedDate.toISOString(),
      updatedAt: fixedDate.toISOString(),
      lastUpdated: fixedDate,
    };

    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    setError(null);

    return newConversation.id;
  }, []);

  // Select conversation
  const selectConversation = useCallback((conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setCurrentConversationId(conversationId);
      setError(null);
      
      if (onConversationChange) {
        onConversationChange(conversation);
      }
    }
  }, [conversations, onConversationChange]);

  // Update conversation
  const updateConversation = useCallback((conversationId: string, updates: Partial<Conversation>) => {
    const fixedDate = new Date('2024-01-15T10:00:00Z');
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { 
            ...conv, 
            ...updates, 
            updatedAt: fixedDate.toISOString(),
            lastUpdated: fixedDate
          }
        : conv
    ));
  }, []);

  // Simulate AI response
  const simulateAIResponse = useCallback(async (userMessage: string): Promise<string> => {
    // Simulate network delay (fixed duration for SSR compatibility)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if request was aborted
    if (abortControllerRef.current?.signal.aborted) {
      throw new Error('Request was aborted');
    }

    // Simple AI response simulation
    const responses = [
      `شكراً لسؤالك: "${userMessage}". هذا مثال على رد ذكي من الـ AI.`,
      'هذا رد تجريبي من المساعد الذكي. في التطبيق الحقيقي، ستتم معالجة السؤال بواسطة نموذج لغوي.',
      'أفهم استفسارك. دعني أساعدك في هذا الموضوع...',
      `بناءً على سؤالك حول "${userMessage}", إليك بعض المعلومات المفيدة...`,
    ];

    // Return first response for SSR compatibility
    return responses[0];
  }, []);

  // Send message
  const sendMessage = useCallback(async (content: string): Promise<void> => {
    if (!content.trim()) return;

    // Validate message
    const validation = validateMessage(content);
    if (!validation.isValid) {
      setError(validation.error || 'رسالة غير صالحة');
      if (onError) {
        onError(validation.error || 'رسالة غير صالحة');
      }
      return;
    }

    // Store user message for retry
    lastUserMessageRef.current = content;

    let conversationId = currentConversationId;

    // Create new conversation if none exists
    if (!conversationId) {
      // Generate title from first message
      const title = content.length > 50 ? content.slice(0, 50) + '...' : content;
      conversationId = createNewConversation(title);
      console.log("🚀 ~ Created new conversation:", conversationId);
    }

    // Create user message
    const fixedDate = new Date('2024-01-15T14:40:00Z');
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: fixedDate,
      type: 'text',
    };

    // Notify about message send
    if (onMessageSend) {
      onMessageSend(userMessage, conversationId);
    }

    try {
      setIsLoading(true);
      setIsTyping(true);
      setError(null);

      // Add user message to conversation first
      const conversationToUpdate = conversations.find(c => c.id === conversationId);
      const currentMessages = conversationToUpdate?.messages || [];
      console.log("🚀 ~ Current messages before adding user message:", currentMessages);
      
      updateConversation(conversationId, {
        messages: [...currentMessages, userMessage],
      });
      console.log("🚀 ~ Updated conversation with user message");

      // Create abort controller
      abortControllerRef.current = new AbortController();

      // Get AI response
      const aiResponse = await simulateAIResponse(content);

      // Create AI message
      const fixedDate = new Date('2024-01-15T14:42:00Z');
      const aiMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: aiResponse,
        timestamp: fixedDate,
        type: 'text',
      };

      // Add AI message to conversation
      setConversations(prev => {
        const updated = prev.map(conv => 
          conv.id === conversationId 
            ? { 
                ...conv, 
                messages: [...conv.messages, aiMessage],
                updatedAt: new Date('2024-01-15T10:00:00Z').toISOString(),
                lastUpdated: new Date('2024-01-15T10:00:00Z')
              }
            : conv
        );
        console.log("🚀 ~ Updated conversations:", updated);
        return updated;
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ أثناء إرسال الرسالة';
      setError(errorMessage);
      
      if (onError && !abortControllerRef.current?.signal.aborted) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  }, [
    currentConversationId,
    conversations,
    createNewConversation,
    updateConversation,
    simulateAIResponse,
    onMessageSend,
    onError,
  ]);

  // Retry last message
  const retryLastMessage = useCallback(async (): Promise<void> => {
    if (lastUserMessageRef.current) {
      await sendMessage(lastUserMessageRef.current);
    }
  }, [sendMessage]);

  // Delete conversation
  const deleteConversation = useCallback((conversationId: string) => {
    setConversations(prev => prev.filter(c => c.id !== conversationId));
    
    // If deleting current conversation, clear selection
    if (conversationId === currentConversationId) {
      setCurrentConversationId(null);
      setError(null);
    }
  }, [currentConversationId]);

  // Clear current conversation messages
  const clearCurrentConversation = useCallback(() => {
    if (currentConversationId) {
      updateConversation(currentConversationId, { messages: [] });
      setError(null);
    }
  }, [currentConversationId, updateConversation]);

  // Update conversation title
  const updateConversationTitle = useCallback((conversationId: string, title: string) => {
    updateConversation(conversationId, { title });
  }, [updateConversation]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initialize first conversation if none exists
  useEffect(() => {
    if (conversations.length > 0 && !currentConversationId) {
      setCurrentConversationId(conversations[0].id);
    }
  }, [conversations, currentConversationId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    // State
    conversations,
    currentConversation,
    isLoading,
    isTyping,
    error,
    
    // Actions
    createNewConversation,
    selectConversation,
    sendMessage,
    deleteConversation,
    clearCurrentConversation,
    updateConversationTitle,
    
    // Utilities
    retryLastMessage,
    clearError,
  };
}