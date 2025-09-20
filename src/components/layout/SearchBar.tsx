/**
 * SearchBar Component
 * Search input with debouncing for conversation search
 */

import { Button, Icons } from '@/components/ui';
import { cn, debounce } from '@/lib/utils';
import React, { useCallback, useEffect, useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  onClear?: () => void;
  className?: string;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'البحث في المحادثات...',
  debounceMs = 300,
  onClear,
  className,
  disabled = false,
}) => {
  const [localValue, setLocalValue] = useState(value);

  // Debounced onChange callback
  const debouncedOnChange = useCallback(
    (searchValue: string) => {
      const debouncedFn = debounce((value: string) => {
        onChange(value);
      }, debounceMs);
      debouncedFn(searchValue);
    },
    [onChange, debounceMs]
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      debouncedOnChange(newValue);
    },
    [debouncedOnChange]
  );

  // Clear search
  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange('');
    if (onClear) {
      onClear();
    }
  }, [onChange, onClear]);

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  }, [handleClear]);

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icons.Search sx={{ fontSize: 16 }} />
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={localValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full rounded-md border border-slate-300 bg-white pl-10 pr-10 py-2',
            'text-sm placeholder:text-slate-500',
            'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all duration-200'
          )}
          aria-label="البحث في المحادثات"
        />

        {/* Clear Button */}
        {localValue && (
          <Button
            onClick={handleClear}
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-slate-400 hover:text-slate-600"
            aria-label="مسح البحث"
          >
            <Icons.X sx={{ fontSize: 14 }} />
          </Button>
        )}
      </div>

      {/* Search Suggestions or Status */}
      {localValue && (
        <div className="mt-1 text-xs text-slate-500">
          البحث عن: &ldquo;{localValue}&rdquo;
        </div>
      )}
    </div>
  );
};

SearchBar.displayName = 'SearchBar';

export { SearchBar };
