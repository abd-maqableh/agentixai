/**
 * Loading Wrapper Component
 * Provides progressive loading states and prevents FOUC
 */

'use client';

import { AppSkeleton, HydrationSafeWrapper } from '@/components/ui';
import { Box, Fade, Grow } from '@mui/material';
import Image from 'next/image';
import React, { Suspense, useEffect, useState } from 'react';

interface LoadingWrapperProps {
  children: React.ReactNode;
  showSkeleton?: boolean;
  minLoadTime?: number;
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  children,
  showSkeleton = true,
  minLoadTime = 800, // Minimum loading time to prevent flashing
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Ensure minimum loading time for smooth UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minLoadTime);

    // Check for hydration
    setIsHydrated(true);

    return () => clearTimeout(timer);
  }, [minLoadTime]);

  // Server-side or initial render - show skeleton
  if (!isHydrated || isLoading) {
    return showSkeleton ? <AppSkeleton /> : null;
  }

  // Client-side after hydration - show content with transition
  return (
    <Fade in={!isLoading} timeout={600}>
      <Box>
        <Grow in={!isLoading} timeout={400}>
          <Box>
            <HydrationSafeWrapper fallback={<AppSkeleton />}>
              <Suspense fallback={<AppSkeleton />}>
                {children}
              </Suspense>
            </HydrationSafeWrapper>
          </Box>
        </Grow>
      </Box>
    </Fade>
  );
};

// Progressive Image Loading Component
interface ProgressiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  placeholder?: string;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  width = 100,
  height = 100,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjY2NjIi8+PC9zdmc+',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Box
      sx={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        placeholder={placeholder ? 'blur' : 'empty'}
        blurDataURL={placeholder}
        onLoad={() => setIsLoaded(true)}
        style={{
          objectFit: 'cover',
          transition: 'opacity 0.3s ease-in-out',
          opacity: isLoaded ? 1 : 0.7,
        }}
      />
    </Box>
  );
};

// Lazy Component Wrapper
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
}

export const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback = <AppSkeleton />,
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  );
};