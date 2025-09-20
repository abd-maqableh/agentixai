/**
 * MUI Button Component with   styling
 * Wraps Material-UI Button with custom theming
 */

import { CircularProgress, Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import React from 'react';

export interface ButtonProps extends Omit<MuiButtonProps, 'size' | 'variant'> {
  size?: 'small' | 'medium' | 'large' | 'sm' | 'md' | 'lg';
  variant?: 'text' | 'outlined' | 'contained' | 'ghost' | 'primary' | 'secondary' | 'default' | 'danger';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  size = 'medium', 
  variant = 'contained',
  isLoading = false,
  disabled,
  children,
  sx,
  ...props 
}) => {
  // Map custom size props to MUI sizes
  const muiSize = size === 'sm' ? 'small' : size === 'lg' ? 'large' : size;
  
  // Map custom variant to MUI variant and styles
  let muiVariant: 'text' | 'outlined' | 'contained' = 'contained';
  let customSx = {};
  
  switch (variant) {
    case 'ghost':
      muiVariant = 'text';
      customSx = {
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      };
      break;
    case 'default':
      muiVariant = 'outlined';
      break;
    case 'primary':
      muiVariant = 'contained';
      customSx = {
        backgroundColor: 'primary.main',
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
      };
      break;
    case 'secondary':
      muiVariant = 'contained';
      customSx = {
        backgroundColor: 'secondary.main',
        '&:hover': {
          backgroundColor: 'secondary.dark',
        },
      };
      break;
    case 'danger':
      muiVariant = 'contained';
      customSx = {
        backgroundColor: 'error.main',
        '&:hover': {
          backgroundColor: 'error.dark',
        },
      };
      break;
    default:
      muiVariant = variant as 'text' | 'outlined' | 'contained';
  }

  return (
    <MuiButton
      size={muiSize as 'small' | 'medium' | 'large'}
      variant={muiVariant}
      disabled={disabled || isLoading}
      sx={{
        ...customSx,
        position: 'relative',
        ...sx,
      }}
      {...props}
    >
      {isLoading && (
        <CircularProgress
          sx={{
            fontSize: 16,
            position: 'absolute',
            color: 'inherit',
          }}
        />
      )}
      <span style={{ opacity: isLoading ? 0 : 1 }}>
        {children}
      </span>
    </MuiButton>
  );
};

Button.displayName = 'Button';

export { Button };
