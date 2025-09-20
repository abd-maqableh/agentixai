/**
 * Sidebar Component
 * Collapsible sidebar with conversation list and search
 */

import { Button, Icons } from '@/components/ui';
import { Conversation } from '@/lib/types';
import { cn } from '@/lib/utils';
import React, { useCallback, useState } from 'react';
import { ConversationList } from './ConversationList';
import { SearchBar } from './SearchBar';

interface SidebarProps {
  conversations: Conversation[];
  selectedConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
  onNewConversation: () => void;
  onDeleteConversation?: (conversationId: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  isCollapsed = false,
  onToggleCollapse,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search term change
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Clear search
  const handleSearchClear = useCallback(() => {
    setSearchTerm('');
  }, []);

  // Handle new conversation
  const handleNewConversation = useCallback(() => {
    onNewConversation();
    // Clear search when creating new conversation
    setSearchTerm('');
  }, [onNewConversation]);

  return (
    <div
      className={cn(
        'flex h-full flex-col border-r-4 border- -gold  -bg-pattern transition-all duration-300',
        'bg-gradient-to-b from- -green-50 to-white',
        isCollapsed ? 'w-16' : 'w-80',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border- -gold-200 p-4 bg-white/80 backdrop-blur-sm">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="p-2 bg- -green-100 rounded-full">
              <Icons.MessageCircle className="h-5 w-5 text- -green-700" />
            </div>
            <div>
              <h1 className="text-lg font-bold  -text-primary">المحادثات</h1>
              <p className="text-xs text- -gold-700">بسم الله نبدأ</p>
            </div>
          </div>
        )}
        
        {/* Toggle Button */}
        {onToggleCollapse && (
          <Button
            onClick={onToggleCollapse}
            variant="ghost"
            size="sm"
            className={cn(
              'h-8 w-8 p-0',
              isCollapsed && 'mx-auto'
            )}
            aria-label={isCollapsed ? 'توسيع الشريط الجانبي' : 'طي الشريط الجانبي'}
          >
            <Icons.Menu sx={{ fontSize: 16 }} />
          </Button>
        )}
      </div>

      {!isCollapsed && (
        <>
          {/* New Conversation Button */}
          <div className="p-4 border-b border- -gold-200">
            <Button
              onClick={handleNewConversation}
              className="w-full justify-start gap-3  -button text-white font-semibold"
              size="sm"
            >
              <Icons.Plus sx={{ fontSize: 18 }} />
              <span>بسم الله نبدأ محادثة جديدة</span>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-slate-200">
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              onClear={handleSearchClear}
              placeholder="البحث في المحادثات..."
            />
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              <ConversationList
                conversations={conversations}
                selectedConversationId={selectedConversationId}
                searchTerm={searchTerm}
                onSelectConversation={onSelectConversation}
                onDeleteConversation={onDeleteConversation}
                emptyStateMessage="لا توجد محادثات بعد"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 p-4">
            <div className="text-xs text-slate-500 text-center">
              {conversations.length} محادثة
            </div>
          </div>
        </>
      )}

      {/* Collapsed State - Show only new conversation button */}
      {isCollapsed && (
        <div className="flex flex-col items-center gap-2 p-2">
          <Button
            onClick={handleNewConversation}
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0"
            aria-label="محادثة جديدة"
          >
            <Icons.Plus sx={{ fontSize: 18 }} />
          </Button>
          
          {/* Show conversation count */}
          <div className="text-xs text-slate-500 writing-mode-vertical-rl text-center">
            {conversations.length}
          </div>
        </div>
      )}
    </div>
  );
};

Sidebar.displayName = 'Sidebar';

export { Sidebar };
