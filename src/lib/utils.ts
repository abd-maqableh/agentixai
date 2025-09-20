/**
 * Utility functions for the AI Chat Application
 * Provides helper functions for common operations
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Conversation, Message, SearchResult } from './types';

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a unique ID for messages and conversations
 * Using a simple counter to avoid SSR hydration issues
 */
let idCounter = 1;
export function generateId(): string {
  return `id-${idCounter++}`;
}

/**
 * Formats a date for display in the UI
 * SSR-safe version that avoids client/server mismatches
 */
export function formatDate(date: Date): string {
  // For SSR compatibility, use a simpler format that doesn't depend on current time
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${day}/${month}/${year}`;
}



/**
 * Truncates text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Generates a preview text from conversation messages
 */
export function generateConversationPreview(messages: Message[]): string {
  if (messages.length === 0) return 'محادثة جديدة';
  
  const lastMessage = messages[messages.length - 1];
  return truncateText(lastMessage.content, 100);
}

/**
 * Generates a title for a conversation based on the first user message
 */
export function generateConversationTitle(messages: Message[]): string {
  const firstUserMessage = messages.find(msg => msg.role === 'user');
  if (!firstUserMessage) return 'محادثة جديدة';
  
  return truncateText(firstUserMessage.content, 50);
}

/**
 * Searches through conversations and messages
 */
export function searchConversations(
  conversations: Conversation[],
  query: string
): SearchResult[] {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase();

  conversations.forEach(conversation => {
    // Search in conversation title
    if (conversation.title.toLowerCase().includes(lowerQuery)) {
      results.push({
        conversation,
        messageIndex: -1,
        matchText: conversation.title,
        relevanceScore: 0.9
      });
    }

    // Search in messages
    conversation.messages.forEach((message, index) => {
      if (message.content.toLowerCase().includes(lowerQuery)) {
        const startIndex = message.content.toLowerCase().indexOf(lowerQuery);
        const matchText = message.content.slice(
          Math.max(0, startIndex - 20),
          Math.min(message.content.length, startIndex + query.length + 20)
        );

        results.push({
          conversation,
          messageIndex: index,
          matchText: matchText.trim(),
          relevanceScore: 0.7
        });
      }
    });
  });

  // Sort by relevance score (highest first)
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for scroll events
 */
export function throttle<T extends (...args: never[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

/**
 * Validates message content
 */
export function validateMessage(content: string): {
  isValid: boolean;
  error?: string;
} {
  if (!content.trim()) {
    return { isValid: false, error: 'لا يمكن إرسال رسالة فارغة' };
  }
  
  if (content.length > 4000) {
    return { isValid: false, error: 'الرسالة طويلة جداً (الحد الأقصى 4000 حرف)' };
  }
  
  return { isValid: true };
}

/**
 * Formats message content for display (handles code blocks, etc.)
 */
export function formatMessageContent(content: string): string {
  // Basic formatting - can be extended with markdown parsing
  return content
    .replace(/\n/g, '<br>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

/**
 * Detects if content contains code
 */
export function detectCodeInMessage(content: string): boolean {
  const codePatterns = [
    /```[\s\S]*```/,  // Code blocks
    /`[^`\n]+`/,      // Inline code
    /function\s+\w+\s*\(/,  // Function declarations
    /class\s+\w+/,    // Class declarations
    /import\s+.*from/,  // Import statements
    /export\s+(default\s+)?/,  // Export statements
  ];
  
  return codePatterns.some(pattern => pattern.test(content));
}

/**
 * Extracts code language from code blocks
 */
export function extractCodeLanguage(content: string): string | null {
  const match = content.match(/```(\w+)/);
  return match ? match[1] : null;
}

/**
 * Calculates reading time for message content
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = wordCount / wordsPerMinute;
  return Math.ceil(minutes);
}

/**
 * Time formatting
 */
export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  
  // Less than a minute
  if (diff < 60 * 1000) {
    return 'الآن';
  }
  
  // Less than an hour
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    return `منذ ${minutes} دقيقة`;
  }
  
  // Less than a day
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `منذ ${hours} ساعة`;
  }
  
  // Format as date
  return d.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Timestamp formatting for conversations
 */
export function formatTimestamp(date: Date | string): string {
  return formatTime(date);
}

/**
 * Search within a single conversation
 */
export function searchInConversation(
  conversation: Conversation,
  query: string
): boolean {
  if (!query.trim()) return true;
  
  const lowerQuery = query.toLowerCase();
  
  // Search in title
  if (conversation.title.toLowerCase().includes(lowerQuery)) {
    return true;
  }
  
  // Search in tags
  if (conversation.tags?.some(tag => 
    tag.toLowerCase().includes(lowerQuery)
  )) {
    return true;
  }
  
  // Search in messages
  return conversation.messages.some(message =>
    message.content.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Sanitizes HTML content for safe display
 */
export function sanitizeHtml(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Checks if device supports touch
 */
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}



/**
 * Generates a color palette based on a base color
 */
export function generateColorPalette(baseColor: string): Record<string, string> {
  // This would typically use a color manipulation library
  return {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: baseColor,
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  };
}

/**
 * Stores data in localStorage with error handling
 */
export function setLocalStorage(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('localStorage.setItem failed:', error);
    return false;
  }
}

/**
 * Retrieves data from localStorage with error handling
 */
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('localStorage.getItem failed:', error);
    return defaultValue;
  }
}

/**
 * Removes data from localStorage
 */
export function removeLocalStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('localStorage.removeItem failed:', error);
    return false;
  }
}