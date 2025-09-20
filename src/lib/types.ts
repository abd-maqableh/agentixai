/**
 * Core TypeScript interfaces for the AI Chat Application
 * Provides comprehensive type safety for all chat functionality
 */

// Message role types
export type MessageRole = "user" | "assistant";

// Message content types
export type MessageType = "text" | "code" | "list" | "image";

// Message interface with comprehensive typing
export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
  type?: MessageType;
  metadata?: {
    language?: string; // For code blocks
    tokens?: number; // AI response tokens
    model?: string; // AI model used
    error?: string; // Error message if any
  };
}

// Conversation interface
export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt?: string;
  lastUpdated?: Date;
  updatedAt?: string;
  category?: string;
  preview?: string;
  tags?: string[];
  metadata?: {
    model?: string;
    tags?: string[];
    totalTokens?: number;
    temperature?: number;
    maxTokens?: number;
    messageCount?: number;
  };
}

// Chat application state interface
export interface ChatState {
  conversations: Conversation[];
  currentConversation: string | null;
  isLoading: boolean;
  searchQuery: string;
  error: string | null;
  sidebarOpen: boolean;
  typingIndicator: boolean;
}

// Search results interface
export interface SearchResult {
  conversation: Conversation;
  messageIndex: number;
  matchText: string;
  relevanceScore: number;
}

// Theme interface for dark/light mode
export interface Theme {
  name: "light" | "dark";
  colors: {
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      accent: string;
    };
    text: {
      primary: string;
      secondary: string;
      accent: string;
      muted: string;
    };
    border: {
      primary: string;
      secondary: string;
      focus: string;
    };
    interactive: {
      primary: string;
      secondary: string;
      hover: string;
      active: string;
    };
  };
}

// Component props interfaces
export interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
}

export interface MessageProps {
  message: Message;
  onCopy?: () => void;
  onDelete?: () => void;
  isTyping?: boolean;
}

export interface ConversationListProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  searchQuery: string;
}

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  onClear?: () => void;
}

// API Response interfaces
export interface ChatResponse {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: string;
  model?: string;
  tokens?: number;
}

export interface APIError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

// Custom hook return types
export interface UseChatReturn {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  createNewConversation: () => void;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  clearError: () => void;
}

export interface UseSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isSearching: boolean;
  clearSearch: () => void;
}

export interface UseThemeReturn {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

// Utility types for better type safety
export type ConversationId = string;
export type MessageId = string;
export type SearchQuery = string;

// Event handler types
export type MessageHandler = (content: string) => void;
export type ConversationHandler = (id: ConversationId) => void;
export type SearchHandler = (query: SearchQuery) => void;

// Keyboard shortcut types
export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  description: string;
  action: () => void;
}

// Performance and accessibility interfaces
export interface A11yProps {
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  role?: string;
  tabIndex?: number;
}

export interface PerformanceMetrics {
  renderTime: number;
  messageCount: number;
  memoryUsage?: number;
  searchTime?: number;
}

// Configuration interfaces
export interface AppConfig {
  maxMessageLength: number;
  maxConversations: number;
  searchDebounceMs: number;
  typingAnimationDuration: number;
  autoSaveInterval: number;
  theme: {
    defaultTheme: "light" | "dark";
    enableSystemTheme: boolean;
  };
  ai: {
    defaultModel: string;
    maxTokens: number;
    temperature: number;
  };
}

// All types are already exported above with their definitions
