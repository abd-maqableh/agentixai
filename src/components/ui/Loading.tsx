/**
 * Loading Spinner Component
 * Various loading states and indicators
 */

import { cn } from '@/lib/utils';
import React from 'react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
}

const Spinner: React.FC<SpinnerProps> = ({ 
  className, 
  size = 'md', 
  color = 'primary',
  ...props 
}) => {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-transparent',
        // Sizes
        {
          'h-4 w-4 border-2': size === 'sm',
          'h-6 w-6 border-2': size === 'md',
          'h-8 w-8 border-3': size === 'lg',
        },
        // Colors
        {
          'border-t-blue-600': color === 'primary',
          'border-t-slate-600': color === 'secondary',
          'border-t-white': color === 'white',
        },
        className
      )}
      {...props}
    />
  );
};

Spinner.displayName = 'Spinner';

export interface TypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  dotCount?: number;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ 
  className, 
  dotCount = 3,
  ...props 
}) => {
  return (
    <div
      className={cn('flex items-center space-x-1', className)}
      {...props}
    >
      {Array.from({ length: dotCount }).map((_, index) => (
        <div
          key={index}
          className="h-2 w-2 bg-slate-400 rounded-full animate-pulse"
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1.4s',
          }}
        />
      ))}
    </div>
  );
};

TypingIndicator.displayName = 'TypingIndicator';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  height?: string | number;
  width?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  lines = 1,
  height,
  width,
  ...props 
}) => {
  if (lines > 1) {
    return (
      <div className="space-y-3" {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'h-4 bg-slate-200 rounded animate-pulse',
              index === lines - 1 && 'w-3/4', // Last line is shorter
              className
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-slate-200 rounded animate-pulse',
        !height && 'h-4',
        !width && 'w-full',
        className
      )}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
      }}
      {...props}
    />
  );
};

Skeleton.displayName = 'Skeleton';

export interface LoadingScreenProps {
  message?: string;
  showSpinner?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'جاري التحميل...',
  showSpinner = true,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      {showSpinner && <Spinner size="lg" />}
      <p className="text-slate-600 text-sm">{message}</p>
    </div>
  );
};

LoadingScreen.displayName = 'LoadingScreen';

export { LoadingScreen, Skeleton, Spinner, TypingIndicator };
