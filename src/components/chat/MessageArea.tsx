/**
 * MessageArea Component
 * Container for displaying chat messages with auto-scroll
 */

import { Icons, LoadingScreen, TypingIndicator } from '@/components/ui';
import { Message as MessageType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Box } from '@mui/material';
import React, { useCallback, useEffect, useRef } from 'react';
import { Message } from './Message';

interface MessageAreaProps {
  messages: MessageType[];
  isLoading?: boolean;
  isTyping?: boolean;
  onCopyMessage?: (content: string) => void;
  onDeleteMessage?: (messageId: string) => void;
  className?: string;
  emptyStateMessage?: string;
  showScrollToBottom?: boolean;
}

const MessageArea: React.FC<MessageAreaProps> = ({
  messages,
  isLoading = false,
  isTyping = false,
  onCopyMessage,
  onDeleteMessage,
  className,
  emptyStateMessage = 'ابدأ محادثة جديدة',
  showScrollToBottom = true,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = React.useState(false);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: smooth ? 'smooth' : 'auto' 
    });
  }, []);

  // Check if user has scrolled up
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !showScrollToBottom) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;
    setShowScrollButton(!isNearBottom);
  }, [showScrollToBottom]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (messages.length > 0) {
      // Scroll immediately for the first message, smoothly for subsequent ones
      const isFirstMessage = messages.length === 1;
      scrollToBottom(!isFirstMessage);
    }
  }, [messages.length, scrollToBottom]);

  // Auto-scroll when typing indicator appears
  useEffect(() => {
    if (isTyping) {
      scrollToBottom();
    }
  }, [isTyping, scrollToBottom]);

  // Handle message copy with feedback
  const handleCopyMessage = useCallback(async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      if (onCopyMessage) {
        onCopyMessage(content);
      }
      // Could add a toast notification here
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  }, [onCopyMessage]);

  // Loading state
  if (isLoading && messages.length === 0) {
    return (
      <div className={cn('flex-1 flex items-center justify-center', className)}>
        <LoadingScreen message="جاري تحميل المحادثة..." />
      </div>
    );
  }

  // Empty state
  if (messages.length === 0) {
    return (
      <div className={cn('flex-1 flex flex-col items-center justify-center space-y-4 p-8', className)}>
        <div className="text-center space-y-3">
          <Icons.MessageCircle sx={{ fontSize: 48 }} className="text-slate-300 mx-auto" />
          <h3 className="text-lg font-medium text-slate-600">لا توجد رسائل بعد</h3>
          <p className="text-sm text-slate-500 max-w-md">
            {emptyStateMessage}. اكتب رسالتك في الأسفل لبدء المحادثة.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Box sx={{ 
      flexGrow: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      position: 'relative',
      height: '100%',
      overflow: 'hidden'
    }} 
    className={className}
    >
      {/* Messages Container */}
      <Box
        ref={containerRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          scrollBehavior: 'smooth',
          height: '100%'
        }}
        onScroll={handleScroll}
      >
        <div className="space-y-1 py-4">
          {messages.map((message, index) => (
            <Message
              key={message.id}
              message={message}
              onCopy={handleCopyMessage}
              onDelete={onDeleteMessage}
              className={cn(
                'animate-fade-in',
                index === messages.length - 1 && 'animate-slide-in-right'
              )}
            />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start px-4 py-3 animate-fade-in">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100">
                  <Icons.Bot sx={{ fontSize: 16 }} className="text-slate-600" />
                </div>
                <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <TypingIndicator />
                </div>
              </div>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </Box>

      {/* Scroll to bottom button */}
      {showScrollButton && showScrollToBottom && (
        <button
          onClick={() => scrollToBottom()}
          className={cn(
            'absolute bottom-4 right-4 h-10 w-10 rounded-full',
            'bg-white border border-slate-300 shadow-md',
            'flex items-center justify-center',
            'text-slate-600 hover:text-slate-900',
            'hover:bg-slate-50 hover:border-slate-400',
            'transition-all duration-200',
            'opacity-90 hover:opacity-100'
          )}
          aria-label="التمرير إلى الأسفل"
        >
          <Icons.ChevronDown sx={{ fontSize: 20 }} />
        </button>
      )}
    </Box>
  );
};

MessageArea.displayName = 'MessageArea';

export { MessageArea };
