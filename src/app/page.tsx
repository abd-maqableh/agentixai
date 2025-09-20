/**
 * Main Chat Application Page
 * Advanced AI Chat Application built with Next.js 15, TypeScript, and Material-UI
 * Optimized for performance and SEO with proper loading states
 */

"use client";

import { AppSkeleton, LoadingWrapper } from "@/components/ui";
import {
  createChatShortcuts,
  useChat,
  useKeyboardShortcuts,
  useLocalStorage,
} from "@/hooks";
import { mockConversations } from "@/lib/data";
import { logPerformance, measureWebVitals } from "@/lib/performance";
import { Conversation } from "@/lib/types";
import { Box, Container, CssBaseline } from "@mui/material";
import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useRef } from "react";

// Dynamic imports to reduce initial bundle size and improve loading
const ChatInterface = dynamic(
  () =>
    import("@/components/chat").then((mod) => ({ default: mod.ChatInterface })),
  {
    ssr: false,
    loading: () => <AppSkeleton />,
  }
);

const MainLayout = dynamic(
  () =>
    import("@/components/layout").then((mod) => ({ default: mod.MainLayout })),
  {
    ssr: false,
    loading: () => <AppSkeleton />,
  }
);

export default function Home() {
  // Local storage for conversations persistence
  const { value: savedConversations, setValue: setSavedConversations } =
    useLocalStorage<Conversation[]>("ai-chat-conversations", mockConversations);

  // Chat state management
  const {
    conversations,
    currentConversation,
    isLoading,
    createNewConversation,
    selectConversation,
    sendMessage,
    deleteConversation,
    clearCurrentConversation,
  } = useChat({
    initialConversations: savedConversations,
    onConversationChange: () => {
      // Update local storage when conversation changes
      setSavedConversations(conversations);
    },
  });
  console.log("🚀 ~ Home ~ currentConversation:", conversations);

  // Refs for keyboard shortcuts
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Handle conversation selection
  const handleSelectConversation = useCallback(
    (conversation: Conversation) => {
      selectConversation(conversation.id);
    },
    [selectConversation]
  );

  // Handle new conversation
  const handleNewConversation = useCallback(() => {
    createNewConversation();
  }, [createNewConversation]);

  // Handle send message
  const handleSendMessage = useCallback(
    async (content: string) => {
      await sendMessage(content);
      // Save conversations after sending message
      setSavedConversations(conversations);
    },
    [sendMessage, conversations, setSavedConversations]
  );

  // Handle delete conversation
  const handleDeleteConversation = useCallback(
    (conversationId: string) => {
      deleteConversation(conversationId);
      // Update local storage after deletion
      const updatedConversations = conversations.filter(
        (c) => c.id !== conversationId
      );
      setSavedConversations(updatedConversations);
    },
    [deleteConversation, conversations, setSavedConversations]
  );

  // Handle clear conversation
  const handleClearConversation = useCallback(() => {
    clearCurrentConversation();
    setSavedConversations(conversations);
  }, [clearCurrentConversation, conversations, setSavedConversations]);

  // Focus input field
  const focusMessageInput = useCallback(() => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, []);

  // Handle escape
  const handleEscape = useCallback(() => {
    if (messageInputRef.current) {
      messageInputRef.current.blur();
    }
  }, []);

  // Keyboard shortcuts
  const shortcuts = createChatShortcuts({
    onNewConversation: handleNewConversation,
    onClearChat: handleClearConversation,
    onFocusInput: focusMessageInput,
    onEscape: handleEscape,
  });

  useKeyboardShortcuts(shortcuts);

  // Performance monitoring (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      logPerformance();
      measureWebVitals((metric) => {
        console.log(
          `${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`
        );
      });
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <LoadingWrapper showSkeleton={true} minLoadTime={400}>
        <Container
          maxWidth={false}
          sx={{
            height: "100vh",
            p: 0,
            background:
              "linear-gradient(135deg, #f0f9f4 0%, #ffffff 50%, #fef7e0 100%)",
          }}
        >
          <Suspense fallback={<AppSkeleton />}>
            <MainLayout
              conversations={conversations}
              currentConversation={currentConversation || undefined}
              selectedConversationId={currentConversation?.id}
              onSelectConversation={handleSelectConversation}
              onNewConversation={handleNewConversation}
              onDeleteConversation={handleDeleteConversation}
              onClearConversation={handleClearConversation}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ChatInterface
                  conversation={currentConversation}
                  isLoading={isLoading}
                  onSendMessage={handleSendMessage}
                  className="border-0"
                />
              </Box>
            </MainLayout>
          </Suspense>
        </Container>
      </LoadingWrapper>
    </>
  );
}
