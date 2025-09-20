/**
 * ConversationList Component
 * List of conversations with search filtering and selection
 */

import { Icons } from '@/components/ui';
import { Conversation } from '@/lib/types';
import { cn, formatTimestamp, searchInConversation } from '@/lib/utils';
import React, { useMemo } from 'react';

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  searchTerm: string;
  onClick: (conversation: Conversation) => void;
  onDelete?: (conversationId: string) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isSelected,
  searchTerm,
  onClick,
  onDelete,
}) => {
  // Get preview text (first user message or title)
  const previewText = useMemo(() => {
    const firstUserMessage = conversation.messages.find(msg => msg.role === 'user');
    return firstUserMessage?.content.slice(0, 60) + '...' || conversation.title;
  }, [conversation]);

  // Highlight search terms
  const highlightText = (text: string, term: string): React.ReactNode => {
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 rounded-sm px-1">
          {part}
        </mark>
      ) : part
    );
  };

  // Handle delete conversation
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(conversation.id);
    }
  };

  return (
    <div
      onClick={() => onClick(conversation)}
      className={cn(
        'group relative flex cursor-pointer flex-col gap-2 rounded-xl p-4  -card',
        'border border-transparent transition-all duration-300',
        'hover:border- -gold-light hover:shadow-lg',
        isSelected && 'border- -gold bg- -green-50 shadow-md',
        'focus-within:ring-2 focus-within:ring- -gold/30'
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(conversation);
        }
      }}
      aria-label={`محادثة: ${conversation.title}`}
    >
      {/* Title */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="truncate text-sm font-semibold  -text-primary">
          {highlightText(conversation.title, searchTerm)}
        </h3>
        
        {/* Delete Button */}
        {onDelete && (
          <button
            onClick={handleDelete}
            className={cn(
              'opacity-0 transition-all duration-300',
              'group-hover:opacity-100 focus:opacity-100',
              'flex h-7 w-7 items-center justify-center rounded-full text-gray-400',
              'hover:bg-red-100 hover:text-red-600 hover:scale-110 focus:outline-none',
              'focus:ring-2 focus:ring-red-500/20'
            )}
            aria-label="حذف المحادثة"
          >
            <Icons.Trash sx={{ fontSize: 14 }} />
          </button>
        )}
      </div>

      {/* Preview */}
      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
        {highlightText(previewText, searchTerm)}
      </p>

      {/* Metadata */}
      <div className="flex items-center justify-between text-xs">
        <span className="text- -green-700 font-medium bg- -green-50 px-2 py-1 rounded-full">
          {conversation.messages.length} رسالة
        </span>
        <time 
          dateTime={conversation.lastUpdated?.toISOString() || conversation.updatedAt}
          className="text-gray-500"
        >
          {formatTimestamp(conversation.lastUpdated || new Date(conversation.updatedAt || '2024-01-15T10:00:00Z'))}
        </time>
      </div>

      {/* Tags */}
      {conversation.tags && conversation.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {conversation.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg- -gold-100 text- -gold-800 border border- -gold-200"
            >
              {tag}
            </span>
          ))}
          {conversation.tags.length > 2 && (
            <span className="text-xs text-slate-500">
              +{conversation.tags.length - 2}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId?: string;
  searchTerm: string;
  onSelectConversation: (conversation: Conversation) => void;
  onDeleteConversation?: (conversationId: string) => void;
  className?: string;
  emptyStateMessage?: string;
  isLoading?: boolean;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversationId,
  searchTerm,
  onSelectConversation,
  onDeleteConversation,
  className,
  emptyStateMessage = 'لا توجد محادثات',
  isLoading = false,
}) => {
  // Filter and sort conversations
  const filteredConversations = useMemo(() => {
    let filtered = conversations;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = conversations.filter(conversation =>
        searchInConversation(conversation, searchTerm)
      );
    }

    // Sort by updated date (most recent first)
    return filtered.sort((a, b) => {
      const dateA = a.lastUpdated || new Date(a.updatedAt || 0);
      const dateB = b.lastUpdated || new Date(b.updatedAt || 0);
      return dateB.getTime() - dateA.getTime();
    });
  }, [conversations, searchTerm]);

  // Loading state
  if (isLoading) {
    return (
      <div className={cn('space-y-3', className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border border-slate-200 p-3"
          >
            <div className="h-4 bg-slate-200 rounded mb-2" />
            <div className="h-3 bg-slate-100 rounded mb-2" />
            <div className="flex justify-between">
              <div className="h-3 bg-slate-100 rounded w-16" />
              <div className="h-3 bg-slate-100 rounded w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (filteredConversations.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-8 text-center', className)}>
        <Icons.MessageCircle className="h-12 w-12 text-slate-300 mb-3" />
        <p className="text-sm text-slate-600 mb-1">
          {searchTerm ? `لا توجد نتائج للبحث عن "${searchTerm}"` : emptyStateMessage}
        </p>
        {searchTerm && (
          <p className="text-xs text-slate-500">
            جرب البحث بكلمات أخرى أو امسح البحث لرؤية جميع المحادثات
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      {filteredConversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isSelected={conversation.id === selectedConversationId}
          searchTerm={searchTerm}
          onClick={onSelectConversation}
          onDelete={onDeleteConversation}
        />
      ))}
    </div>
  );
};

ConversationList.displayName = 'ConversationList';

export { ConversationItem, ConversationList };
