/**
 * Message Component
 * Displays individual chat messages with formatting and actions
 */

import { Button, Icons } from "@/components/ui";
import { Message as MessageType } from "@/lib/types";
import { cn, formatTime } from "@/lib/utils";
import React, { memo, useState } from "react";

interface MessageProps {
  message: MessageType;
  onCopy?: (content: string) => void;
  onDelete?: (messageId: string) => void;
  isTyping?: boolean;
  className?: string;
}

const Message: React.FC<MessageProps> = memo(
  ({ message, onCopy, isTyping = false, className }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      if (onCopy) {
        onCopy(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    const isUser = message.role === "user";
    const isCodeContent =
      message.type === "code" || message.content.includes("```");

    return (
      <div
        className={cn(
          "group relative flex w-full px-2 py-2 sm:px-4 sm:py-3",
          isUser ? "justify-end" : "justify-start",
          "overflow-hidden", // Prevent horizontal overflow
          className
        )}
      >
        <div className={cn(
          "flex items-start gap-2 sm:gap-3 w-full",
          "max-w-[95%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%]",
          isUser ? "flex-row-reverse" : "flex-row"
        )}>
          {/* Avatar */}
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 shadow-sm">
            {isUser ? (
              <Icons.User sx={{ fontSize: 16 }} className="text-blue-600 sm:text-lg" />
            ) : (
              <Icons.Bot sx={{ fontSize: 16 }} className="text-emerald-600 sm:text-lg" />
            )}
          </div>

          {/* Message Content */}
          <div
            className={cn(
              "relative rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm",
              "transition-all duration-200 min-w-0 flex-1",
              "break-words overflow-wrap-anywhere word-break-break-all",
              "text-xs sm:text-sm leading-relaxed",
              isUser
                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                : "bg-white border border-gray-200 text-gray-800",
              isTyping && "animate-pulse"
            )}
          >
            {/* Message Text/Code Content */}
            <div className="space-y-2">
              {isCodeContent ? (
                <MessageCodeContent content={message.content} />
              ) : (
                <MessageTextContent content={message.content} />
              )}
            </div>

            {/* Timestamp */}
            <div className={cn(
              "mt-1.5 sm:mt-2 text-[10px] sm:text-xs opacity-70 font-medium",
              "truncate", // Prevent timestamp overflow
              isUser ? "text-blue-100" : "text-gray-500"
            )}>
              {formatTime(message.timestamp)}
              {message.metadata?.tokens && (
                <span className="ml-1 sm:ml-2 hidden sm:inline">• {message.metadata.tokens} tokens</span>
              )}
            </div>

            {/* Copy Button for AI messages */}
            {!isTyping && !isUser && (
              <div className="mt-1.5 sm:mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-5 w-5 sm:h-6 sm:w-6 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="نسخ الرسالة"
                >
                  {copied ? (
                    <Icons.Check sx={{ fontSize: 11 }} className="sm:text-xs" />
                  ) : (
                    <Icons.Copy sx={{ fontSize: 11 }} className="sm:text-xs" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Message.displayName = "Message";

// Component for rendering text content
const MessageTextContent: React.FC<{ content: string }> = ({ content }) => {
  // Simple formatting - can be enhanced with a markdown parser
  const formattedContent = content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /`(.*?)`/g,
      '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>'
    )
    .replace(/\n/g, "<br>");

  return (
    <div
      className="prose prose-sm max-w-none leading-relaxed"
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  );
};

// Component for rendering code content
const MessageCodeContent: React.FC<{ content: string }> = ({ content }) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: content.slice(lastIndex, match.index),
      });
    }

    // Add code block
    parts.push({
      type: "code",
      language: match[1] || "text",
      content: match[2],
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: "text",
      content: content.slice(lastIndex),
    });
  }

  return (
    <div className="space-y-3">
      {parts.map((part, index) => (
        <div key={index}>
          {part.type === "code" ? (
            <CodeBlock
              language={part.language || "text"}
              content={part.content}
            />
          ) : (
            <MessageTextContent content={part.content} />
          )}
        </div>
      ))}
    </div>
  );
};

// Code block component
const CodeBlock: React.FC<{ language: string; content: string }> = ({
  language,
  content,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="relative my-1.5 sm:my-2 max-w-full">
      {/* Language badge and copy button */}
      <div className="flex items-center justify-between rounded-t-lg bg-gray-800 px-2 sm:px-4 py-1.5 sm:py-2.5">
        <span className="text-[10px] sm:text-xs font-semibold text-gray-300 uppercase tracking-wide truncate">
          {language || "code"}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-5 w-5 sm:h-7 sm:w-7 p-0 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors flex-shrink-0"
          aria-label="نسخ الكود"
        >
          {copied ? (
            <Icons.Check sx={{ fontSize: 11 }} className="sm:text-sm" />
          ) : (
            <Icons.Copy sx={{ fontSize: 11 }} className="sm:text-sm" />
          )}
        </Button>
      </div>

      {/* Code content */}
      <pre className="overflow-x-auto rounded-b-lg bg-gray-900 p-2 sm:p-4 text-xs sm:text-sm leading-relaxed">
        <code className="text-gray-100 font-mono whitespace-pre-wrap break-all">{content}</code>
      </pre>
    </div>
  );
};

export { Message };
