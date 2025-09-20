/**
 * MessageInput Component - MUI Version
 * Input area for typing and sending messages using Material-UI components
 */

import { Textarea } from "@/components/ui/Textarea";
import { validateMessage } from "@/lib/utils";
import {
  ReportProblem as AlertCircleIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { Alert, Box, IconButton, Typography } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  autoFocus?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder,
  maxLength = 4000,
  autoFocus = false,
}) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLDivElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      // Focus the input inside the MUI TextField
      const input = textareaRef.current.querySelector("textarea");
      if (input) {
        input.focus();
      }
    }
  }, [autoFocus]);

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setMessage(value);

      // Clear error when user starts typing
      if (error) {
        setError(null);
      }

      // Check length limit
      if (value.length > maxLength) {
        setError(`الرسالة طويلة جداً (الحد الأقصى ${maxLength} حرف)`);
      }
    },
    [error, maxLength]
  );

  // Handle form submission
  const handleSubmit = useCallback(() => {
    if (disabled) return;

    const validation = validateMessage(message);
    if (!validation.isValid) {
      setError(validation.error || "خطأ في الرسالة");
      return;
    }

    onSendMessage(message.trim());
    setMessage("");
    setError(null);

    // Focus back to textarea after sending
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  }, [disabled, message, onSendMessage]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      // Enter to send (without Shift)
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }

      // Ctrl/Cmd + Enter alternative
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSubmit();
      }

      // Escape to clear
      if (e.key === "Escape") {
        setMessage("");
        setError(null);
      }
    },
    [handleSubmit]
  );

  const isMessageValid =
    message.trim().length > 0 && message.length <= maxLength;
  const characterCount = message.length;

  return (
    <Box sx={{ position: "relative", p: 2 }}>
      {/* Main Input Container */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          backgroundColor: "background.paper",
          borderRadius: "25px",
          px: 2,
          py: 1.5,
          maxWidth: "800px",
          mx: "auto",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          backdropFilter: "blur(8px)",
          border: "1px solid",
          borderColor: "divider",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        {/* Text Input */}
        <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "اكتب سؤالك هنا..."}
            disabled={disabled}
            autoResize
            minRows={1}
            maxRows={6}
            variant="standard"
            sx={{
              width: "100%",
              "& .MuiInput-underline:before": { display: "none" },
              "& .MuiInput-underline:after": { display: "none" },
              "& .MuiInputBase-input": {
                textAlign: "left",
                fontSize: "0.95rem",
                lineHeight: 1.4,
                padding: "2px 0",
                width: "100%",
              },
            }}
            aria-label="رسالة جديدة"
          />
        </Box>

        {/* Send Button */}
        <IconButton
          onClick={handleSubmit}
          disabled={disabled || !isMessageValid}
          sx={{
            backgroundColor: isMessageValid ? "#4a7c25" : "action.disabled",
            color: "white",
            width: 32,
            height: 32,
            transition: "all 0.2s ease",
            transform: isMessageValid ? "scale(-1)" : "scale(-0.9)",
            opacity: isMessageValid ? 1 : 0.4,
            "&:hover": {
              backgroundColor: isMessageValid ? "#2d5016" : "action.disabled",
              transform: isMessageValid ? "scale(-1.05)" : "scale(-0.9)",
            },
            "&:disabled": {
              backgroundColor: "action.disabled",
              color: "text.disabled",
            },
          }}
          aria-label="إرسال الرسالة"
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Error Message */}
      {error && (
        <Alert
          severity="error"
          icon={<AlertCircleIcon />}
          sx={{
            mt: 1,
            borderRadius: 2,
            fontSize: "0.875rem",
          }}
        >
          {error}
        </Alert>
      )}

      {/* Character Count */}
      {characterCount > maxLength * 0.8 && (
        <Box sx={{ mt: 0.5, textAlign: "right" }}>
          <Typography
            variant="caption"
            sx={{
              color:
                characterCount >= maxLength
                  ? "error.main"
                  : characterCount > maxLength * 0.9
                  ? "warning.main"
                  : "text.secondary",
              fontWeight: characterCount >= maxLength ? 500 : 400,
            }}
          >
            {characterCount}/{maxLength}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

MessageInput.displayName = "MessageInput";

export { MessageInput };
