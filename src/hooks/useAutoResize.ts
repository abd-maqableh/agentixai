/**
 * useAutoResize Hook
 * Custom hook for auto-resizing textarea elements
 */

import { RefObject, useCallback, useEffect } from 'react';

interface UseAutoResizeOptions {
  minHeight?: number;
  maxHeight?: number;
  dependencies?: unknown[];
}

export function useAutoResize(
  textareaRef: RefObject<HTMLTextAreaElement>,
  value: string,
  options: UseAutoResizeOptions = {}
): void {
  const { minHeight = 40, maxHeight = 200, dependencies = [] } = options;

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Calculate new height based on content
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    
    // Set the new height
    textarea.style.height = `${newHeight}px`;
    
    // Add overflow-y if content exceeds maxHeight
    if (textarea.scrollHeight > maxHeight) {
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }
  }, [textareaRef, minHeight, maxHeight]);

  // Adjust height when value changes
  useEffect(() => {
    adjustHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, adjustHeight, ...dependencies]);

  // Adjust height on window resize
  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [adjustHeight]);

  // Initial adjustment
  useEffect(() => {
    adjustHeight();
  }, [adjustHeight]);
}