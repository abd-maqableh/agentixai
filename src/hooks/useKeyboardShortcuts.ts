/**
 * useKeyboardShortcuts Hook
 * Custom hook for managing keyboard shortcuts
 */

import { useCallback, useEffect, useRef } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  callback: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
  disabled?: boolean;
  description?: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]): void {
  const shortcutsRef = useRef(shortcuts);

  // Update shortcuts ref when shortcuts change
  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  // Check if keyboard event matches shortcut
  const matchesShortcut = useCallback((event: KeyboardEvent, shortcut: KeyboardShortcut): boolean => {
    if (shortcut.disabled) return false;

    const key = event.key.toLowerCase();
    const shortcutKey = shortcut.key.toLowerCase();

    return (
      key === shortcutKey &&
      !!event.ctrlKey === !!shortcut.ctrlKey &&
      !!event.altKey === !!shortcut.altKey &&
      !!event.shiftKey === !!shortcut.shiftKey &&
      !!event.metaKey === !!shortcut.metaKey
    );
  }, []);

  // Handle keydown events
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Skip if user is typing in an input field
    const target = event.target as HTMLElement;
    const isInputField = target.tagName === 'INPUT' || 
                        target.tagName === 'TEXTAREA' || 
                        target.contentEditable === 'true';
    
    if (isInputField) {
      // Only allow specific shortcuts when in input fields
      const allowedInInputs = shortcutsRef.current.filter(shortcut => 
        shortcut.key === 'enter' || 
        shortcut.key === 'escape' ||
        (shortcut.ctrlKey && ['s', 'z', 'y'].includes(shortcut.key))
      );
      
      for (const shortcut of allowedInInputs) {
        if (matchesShortcut(event, shortcut)) {
          if (shortcut.preventDefault) {
            event.preventDefault();
          }
          shortcut.callback(event);
          break;
        }
      }
      return;
    }

    // Check all shortcuts
    for (const shortcut of shortcutsRef.current) {
      if (matchesShortcut(event, shortcut)) {
        if (shortcut.preventDefault) {
          event.preventDefault();
        }
        shortcut.callback(event);
        break; // Only execute first matching shortcut
      }
    }
  }, [matchesShortcut]);

  // Attach event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

/**
 * Common keyboard shortcuts for chat application
 */
export const createChatShortcuts = (actions: {
  onNewConversation?: () => void;
  onSendMessage?: () => void;
  onClearChat?: () => void;
  onToggleSidebar?: () => void;
  onFocusInput?: () => void;
  onEscape?: () => void;
}) => {
  const shortcuts: KeyboardShortcut[] = [];

  if (actions.onNewConversation) {
    shortcuts.push({
      key: 'n',
      ctrlKey: true,
      callback: actions.onNewConversation,
      preventDefault: true,
      description: 'محادثة جديدة (Ctrl+N)',
    });
  }

  if (actions.onSendMessage) {
    shortcuts.push({
      key: 'enter',
      ctrlKey: true,
      callback: actions.onSendMessage,
      preventDefault: true,
      description: 'إرسال الرسالة (Ctrl+Enter)',
    });
  }

  if (actions.onClearChat) {
    shortcuts.push({
      key: 'k',
      ctrlKey: true,
      shiftKey: true,
      callback: actions.onClearChat,
      preventDefault: true,
      description: 'مسح المحادثة (Ctrl+Shift+K)',
    });
  }

  if (actions.onToggleSidebar) {
    shortcuts.push({
      key: 'b',
      ctrlKey: true,
      callback: actions.onToggleSidebar,
      preventDefault: true,
      description: 'إظهار/إخفاء الشريط الجانبي (Ctrl+B)',
    });
  }

  if (actions.onFocusInput) {
    shortcuts.push({
      key: '/',
      callback: actions.onFocusInput,
      preventDefault: true,
      description: 'التركيز على حقل الإدخال (/)',
    });
  }

  if (actions.onEscape) {
    shortcuts.push({
      key: 'escape',
      callback: actions.onEscape,
      preventDefault: true,
      description: 'إلغاء/خروج (Escape)',
    });
  }

  return shortcuts;
};