'use client';

import * as React from 'react';

import { ChevronDown, X } from 'lucide-react';

import { cn } from '@/lib/utils';

//@ts-expect-error TODO: Fix typings
export interface FloatingLabelSearchableSelectProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  clearable?: boolean;
  error?: boolean;
  name?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
  isLoading?: boolean;
}

const FloatingLabelSearchableSelect = React.forwardRef<
  HTMLInputElement,
  FloatingLabelSearchableSelectProps
>(
  (
    {
      label,
      options,
      value,
      defaultValue,
      onChange,
      onBlur,
      disabled = false,
      className,
      searchPlaceholder = 'Search options...',
      emptyMessage = 'No options found.',
      clearable = false,
      error = false,
      name,
      onValueChange,
      onSearchChange,
      isLoading = false,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const [internalValue, setInternalValue] = React.useState(
      value || defaultValue || ''
    );
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const [isFocused, setIsFocused] = React.useState(false);
    const [isFilled, setIsFilled] = React.useState(false);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Use controlled value if provided, otherwise use internal state
    const currentValue = value !== undefined ? value : internalValue;
    const displayValue = options.find(
      o => o.value === String(currentValue)
    )?.label;

    // Update isFilled based on current value and focus state
    React.useEffect(() => {
      setIsFilled(!!currentValue || currentValue === 0 || currentValue === '0');
    }, [currentValue]);

    const filteredOptions = React.useMemo(() => {
      if (!searchValue.trim()) return options;
      return options.filter(
        option =>
          option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
          option.value.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [options, searchValue]);

    // Handle input focus
    const handleInputFocus = () => {
      setIsFocused(true);
      setIsOpen(true);
      setSearchValue('');
      setHighlightedIndex(-1);
    };

    // Handle input blur
    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Don't close if clicking on dropdown
      if (dropdownRef.current?.contains(e.relatedTarget as Node)) {
        return;
      }

      setIsFocused(false);
      setIsOpen(false);
      setSearchValue('');
      setHighlightedIndex(-1);
      onBlur?.();
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchValue = e.target.value;
      setSearchValue(newSearchValue);
      setIsOpen(true);
      setHighlightedIndex(-1);

      if (typeof onSearchChange === 'function') {
        onSearchChange(newSearchValue);
      }
    };

    // Handle option selection
    const handleOptionSelect = (option: { value: string; label: string }) => {
      const newValue = option.value;

      // Update internal state if not controlled
      if (value === undefined) {
        setInternalValue(newValue);
      }

      if (typeof onValueChange === 'function') {
        onValueChange(newValue);
      }

      // Call onChange callback
      onChange?.(newValue);

      setSearchValue('');
      setIsOpen(false);
      setIsFocused(false);
      inputRef.current?.blur();
    };

    // Handle clear
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      // Update internal state if not controlled
      if (value === undefined) {
        setInternalValue('');
      }

      // Call onChange callback
      onChange?.('');

      setSearchValue('');
      inputRef.current?.focus();
    };

    // Handle dropdown toggle
    const handleDropdownToggle = () => {
      if (disabled) return;

      if (isOpen) {
        setIsOpen(false);
        setSearchValue('');
        inputRef.current?.blur();
      } else {
        inputRef.current?.focus();
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          setIsOpen(true);
          return;
        }
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleOptionSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setSearchValue('');
          inputRef.current?.blur();
          break;
        case 'Tab':
          setIsOpen(false);
          setSearchValue('');
          break;
      }
    };

    // Handle click outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchValue('');
          setIsFocused(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLInputElement) => {
        inputRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    return (
      <div ref={containerRef} className={cn('relative w-full', className)}>
        <input
          ref={combinedRef}
          tabIndex={0}
          type="text"
          name={name}
          value={isOpen ? searchValue : displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={isFocused ? searchPlaceholder : ''}
          className={cn(
            'flex w-full h-14 rounded-md border bg-background-secondary px-3 pt-4 pb-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            {
              'border-primary': isFocused && !error,
              'border-gray': !isFocused && !error,
              'border-red-500': error,
            },
            {
              'placeholder:text-sm': isFilled,
              'placeholder:text-xs': !isFilled,
            }
          )}
        />

        <label
          className={cn(
            'absolute transition-all duration-200 pointer-events-none',
            {
              'text-xs left-3 top-2 text-muted-foreground':
                isFilled || isFocused,
              'text-base text-black/50 left-3 top-1/2 -translate-y-1/2':
                !isFilled && !isFocused,
            },
            {
              'text-red-500': error && (isFilled || isFocused),
            }
          )}
        >
          {label}
        </label>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {clearable && currentValue && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded-sm transition-colors"
              tabIndex={-1}
            >
              <X className="h-4 w-4 opacity-50 hover:opacity-100" />
            </button>
          )}
          <button
            type="button"
            onClick={handleDropdownToggle}
            className="p-1 hover:bg-gray-100 rounded-sm transition-colors"
            tabIndex={-1}
          >
            <ChevronDown
              className={cn(
                'h-4 w-4 opacity-50 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            />
          </button>
        </div>

        {isOpen && (
          <div
            ref={dropdownRef}
            className={cn(
              'absolute top-full left-0 right-0 z-50 mt-1',
              'bg-white border border-gray rounded-md shadow-lg',
              'max-h-60 overflow-auto'
            )}
          >
            {isLoading ? (
              <div className="px-3 py-2 text-sm text-black/50">
                Loading...
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-black/50">
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <button
                  type="button"
                  key={option.value}
                  className={cn(
                    'flex w-full items-center px-4 py-2 text-sm cursor-pointer',
                    'hover:bg-gray-50',
                    highlightedIndex === index && 'bg-gray-50',
                    currentValue === option.value && 'bg-primary/10 text-black'
                  )}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleOptionSelect(option);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <span className="truncate">{option.label}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    );
  }
);

FloatingLabelSearchableSelect.displayName = 'FloatingLabelSearchableSelect';

export { FloatingLabelSearchableSelect };
