/**
 * Skeleton Loading Components
 * Provides skeleton screens to prevent layout shifts and improve UX on slow networks
 */

import { Box, Skeleton as MuiSkeleton, SxProps, Theme } from '@mui/material';
import React from 'react';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'rectangular' | 'circular' | 'rounded' | 'text';
  animation?: 'pulse' | 'wave' | false;
  sx?: SxProps<Theme>;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  variant = 'rectangular',
  animation = 'wave',
  sx,
}) => (
  <MuiSkeleton
    variant={variant}
    width={width}
    height={height}
    animation={animation}
    sx={{
      bgcolor: 'grey.100',
      '&::after': {
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      },
      ...sx,
    }}
  />
);

// Chat Message Skeleton
export const MessageSkeleton: React.FC = () => (
  <Box sx={{ display: 'flex', gap: 2, p: 2, maxWidth: '80%' }}>
    <Skeleton variant="circular" width={32} height={32} />
    <Box sx={{ flex: 1 }}>
      <Skeleton width="60%" height={16} sx={{ mb: 0.5 }} />
      <Skeleton width="100%" height={14} />
      <Skeleton width="80%" height={14} />
    </Box>
  </Box>
);

// Chat Area Skeleton
export const ChatAreaSkeleton: React.FC = () => (
  <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
    {/* Welcome message skeleton */}
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Skeleton variant="circular" width={64} height={64} sx={{ mx: 'auto', mb: 2 }} />
      <Skeleton width={200} height={24} sx={{ mx: 'auto', mb: 1 }} />
      <Skeleton width={300} height={16} sx={{ mx: 'auto' }} />
    </Box>
    
    {/* Message skeletons */}
    <MessageSkeleton />
    <Box sx={{ alignSelf: 'flex-end' }}>
      <MessageSkeleton />
    </Box>
    <MessageSkeleton />
  </Box>
);

// Input Area Skeleton
export const InputAreaSkeleton: React.FC = () => (
  <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'grey.200' }}>
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
      <Skeleton width="100%" height={56} sx={{ borderRadius: 1 }} />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
      </Box>
    </Box>
  </Box>
);

// Full App Skeleton
export const AppSkeleton: React.FC = () => (
  <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>  
    {/* Main Content Skeleton */}
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Header Skeleton */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'grey.200' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton width={150} height={20} />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="circular" width={32} height={32} />
          </Box>
        </Box>
      </Box>
      
      {/* Chat Area Skeleton */}
      <ChatAreaSkeleton />
      
      {/* Input Area Skeleton */}
      <InputAreaSkeleton />
    </Box>
  </Box>
);

// Loading Screen with   Theme
export const LoadingScreen: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      bgcolor: 'background.default',
      gap: 3,
    }}
  >
    {/*   Pattern Loader */}
    <Box
      sx={{
        width: 80,
        height: 80,
        border: '4px solid',
        borderColor: 'primary.light',
        borderTopColor: 'primary.main',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        '@keyframes spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}
    />
    
    {/* Loading Message */}
    <Box sx={{ textAlign: 'center' }}>
      <Skeleton width={200} height={24} sx={{ mx: 'auto', mb: 1 }} />
      <Skeleton width={150} height={16} sx={{ mx: 'auto' }} />
    </Box>
  </Box>
);

// Hydration-safe loading wrapper
export const HydrationSafeWrapper: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ children, fallback = <AppSkeleton /> }) => {
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};