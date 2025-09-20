/**
 * Header Component
 * Application header with navigation and controls - MUI Version
 */

import { Conversation } from "@/lib/types";
import {
  AppBar,
  Box,
  Toolbar,
  Typography
} from "@mui/material";
import React from "react";

interface HeaderProps {
  currentConversation?: Conversation;
  onNewConversation?: () => void;
  onToggleSidebar?: () => void;
  onClearConversation?: () => void;
  isSidebarCollapsed?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  currentConversation,
  onNewConversation,
  onToggleSidebar,
  onClearConversation,
  isSidebarCollapsed = false,
}) => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: "center", px: 2 }}>
        {/* Left Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* {onToggleSidebar && (
            <IconButton
              onClick={onToggleSidebar}
              size="small"
              color="inherit"
              sx={{
                display: { xs: "inline-flex", md: "none" },
                p: 1,
              }}
              aria-label={
                isSidebarCollapsed
                  ? "إظهار الشريط الجانبي"
                  : "إخفاء الشريط الجانبي"
              }
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          )} */}

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="h6"
              component="h1"
              sx={{
                fontWeight: "bold",
                color: "inherit",
                fontSize: "1.25rem",
              }}
            >
              🕌 المساعد الذكي الإسلامي
            </Typography>
          </Box>
        </Box>

        {/* Right Section */}
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {currentConversation &&
            currentConversation.messages.length > 0 &&
            onClearConversation && (
              <Button
                onClick={onClearConversation}
                variant="outlined"
                size="small"
                startIcon={<DeleteIcon />}
                sx={{
                  color: "error.light",
                  borderColor: "error.light",
                  "&:hover": {
                    borderColor: "error.main",
                    backgroundColor: "error.main",
                    color: "white",
                  },
                }}
                aria-label="مسح المحادثة الحالية"
              >
                <Box
                  component="span"
                  sx={{ display: { xs: "none", sm: "inline" } }}
                >
                  مسح
                </Box>
              </Button>
            )}

          {onNewConversation && (
            <Button
              onClick={onNewConversation}
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "secondary.main",
                color: "secondary.contrastText",
                "&:hover": {
                  backgroundColor: "secondary.dark",
                },
              }}
              aria-label="بدء محادثة جديدة"
            >
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                محادثة جديدة
              </Box>
            </Button>
          )}

          <IconButton
            size="small"
            color="inherit"
            aria-label="الإعدادات"
            sx={{ p: 1 }}
          >
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

Header.displayName = "Header";

export { Header };
