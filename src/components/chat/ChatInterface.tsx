/**
 * ChatInterface Component
 * Main chat interface combining all chat components
 */

import { Card } from '@/components/ui';
import { Conversation } from '@/lib/types';
import { Box } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { MessageArea } from './MessageArea';
import { MessageInput } from './MessageInput';

interface ChatInterfaceProps {
  conversation: Conversation | null;
  isLoading?: boolean;
  onSendMessage: (content: string) => Promise<void>;
  onCopyMessage?: (content: string) => void;
  onDeleteMessage?: (messageId: string) => void;
  className?: string;
  disabled?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversation,
  isLoading = false,
  onSendMessage,
  onCopyMessage,
  onDeleteMessage,
  className,
  disabled = false,
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  // Handle sending a new message
  const handleSendMessage = useCallback(async (content: string) => {
    if (disabled || isLoading || isTyping) return;

    try {
      setPendingMessage(content);
      setIsTyping(true);
      
      await onSendMessage(content);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Could show an error toast here
    } finally {
      setPendingMessage(null);
      setIsTyping(false);
    }
  }, [disabled, isLoading, isTyping, onSendMessage]);

  // Handle message copy with user feedback
  const handleCopyMessage = useCallback((content: string) => {
    if (onCopyMessage) {
      onCopyMessage(content);
    }
    // Could show a toast notification here
  }, [onCopyMessage]);

  // Handle message deletion with confirmation
  const handleDeleteMessage = useCallback((messageId: string) => {
    if (onDeleteMessage) {
      // In a real app, you might want to show a confirmation dialog
      onDeleteMessage(messageId);
    }
  }, [onDeleteMessage]);

  const messages = conversation?.messages || [];
  const isEmpty = messages.length === 0 && !pendingMessage;

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}
      className={className}
    >
      {/* Chat Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        {/* Conversation Info */}
        {conversation && (
          <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
            {conversation.metadata?.model && (
              <Box>النموذج: {conversation.metadata.model}</Box>
            )}
            {conversation.metadata?.totalTokens && (
              <Box>العدد الكلي: {conversation.metadata.totalTokens} tokens</Box>
            )}
          </Box>
        )}
      </Box>

      {/* Messages Area */}
      <Box sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <MessageArea
          messages={messages}
          isLoading={isLoading}
          isTyping={isTyping}
          onCopyMessage={handleCopyMessage}
          onDeleteMessage={handleDeleteMessage}
          emptyStateMessage={
            conversation 
              ? 'ابدأ محادثة مع AI Assistant' 
              : 'ابدأ محادثة جديدة'
          }
          className="flex-1"
        />
      </Box>

      {/* Message Input */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', p: 2 }}>
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={disabled || isLoading || isTyping}
          placeholder={
            isTyping 
              ? 'AI يكتب رد...' 
              : conversation 
                ? 'اكتب رسالتك هنا...'
                : 'ابدأ محادثة جديدة'
          }
          autoFocus={!isEmpty}
        />

        {/* Status indicators */}
        {(isLoading || isTyping) && (
          <Box sx={{ 
            mt: 1, 
            fontSize: '0.75rem', 
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <Box sx={{ 
              width: 12,
              height: 12,
              border: '2px solid',
              borderColor: 'text.secondary',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }} />
            <Box component="span">
              {isTyping ? 'AI يعد الرد...' : 'جاري الإرسال...'}
            </Box>
          </Box>
        )}

        {pendingMessage && (
          <Box sx={{ mt: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
            آخر رسالة: {pendingMessage.slice(0, 50)}
            {pendingMessage.length > 50 ? '...' : ''}
          </Box>
        )}
      </Box>
    </Card>
  );
};

ChatInterface.displayName = 'ChatInterface';

export { ChatInterface };
