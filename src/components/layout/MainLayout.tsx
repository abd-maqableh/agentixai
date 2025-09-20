/**
 * MainLayout Component
 * Main application layout with sidebar, header, and content area - MUI Version
 */

import { Conversation } from "@/lib/types";
import { Box, useTheme } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Header } from "./Header";

interface MainLayoutProps {
  conversations: Conversation[];
  currentConversation?: Conversation;
  selectedConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
  onNewConversation: () => void;
  onDeleteConversation?: (conversationId: string) => void;
  onClearConversation?: () => void;
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  // conversations, // TODO: Implement conversation management
  currentConversation,
  // selectedConversationId, // TODO: Implement conversation selection
  // onSelectConversation, // TODO: Implement conversation selection
  onNewConversation,
  // onDeleteConversation, // TODO: Implement conversation deletion
  onClearConversation,
  children,
}) => {
  const theme = useTheme();
  // TODO: Implement mobile responsive behavior and sidebar collapse
  const isSidebarCollapsed = false; // Default to expanded sidebar
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toggle mobile sidebar
  const handleToggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen((prev) => !prev);
  }, []);

  // Close mobile sidebar when conversation is selected
  // const handleSelectConversation = useCallback(
  //   (conversation: Conversation) => {
  //     onSelectConversation(conversation);
  //     setIsMobileSidebarOpen(false);
  //   },
  //   [onSelectConversation]
  // ); // TODO: Implement conversation selection with mobile sidebar

  // Handle new conversation
  const handleNewConversation = useCallback(() => {
    onNewConversation();
    setIsMobileSidebarOpen(false);
  }, [onNewConversation]);

  return (
    <Box
      sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}
    >
      {/* Mobile Sidebar */}
      {/* <Drawer
        variant="temporary"
        anchor="right"
        open={isMobileSidebarOpen}
        onClose={handleToggleMobileSidebar}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 320,
            maxWidth: '85vw',
          },
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: 'background.paper',
            },
          },
        }}
            >
        <Box sx={{ p: 2 }}>
        </Box>
      </Drawer> */}

      {/* Desktop Sidebar */}
      {/* <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: isSidebarCollapsed ? 60 : 280,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          },
        }}
        open
      >
        <Box sx={{ p: 2 }}>
        </Box>
      </Drawer> */}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          width: { sm: `calc(100% - ${isSidebarCollapsed ? 60 : 280}px)` },
        }}
      >
        {/* Header */}
        <Header
          currentConversation={currentConversation}
          onNewConversation={handleNewConversation}
          onToggleSidebar={handleToggleMobileSidebar}
          onClearConversation={onClearConversation}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

MainLayout.displayName = "MainLayout";

export { MainLayout };
