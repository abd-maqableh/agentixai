/**
 * MUI Card Component
 * Flexible container component using Material-UI Card
 */

import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';
import React from 'react';

export interface CardProps extends MuiCardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, sx, ...props }) => {
  return (
    <MuiCard
      sx={{
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiCard>
  );
};

Card.displayName = 'Card';

// Export MUI Card subcomponents
export {
  CardContent,
  CardActions as CardFooter, CardHeader
} from '@mui/material';

// Create custom CardTitle and CardDescription using MUI Typography
import { Typography, TypographyProps } from '@mui/material';

export interface CardTitleProps extends TypographyProps {
  children: React.ReactNode;
}

const CardTitle: React.FC<CardTitleProps> = ({ children, ...props }) => (
  <Typography variant="h6" component="h3" gutterBottom {...props}>
    {children}
  </Typography>
);

CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends TypographyProps {
  children: React.ReactNode;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ children, ...props }) => (
  <Typography variant="body2" color="text.secondary" {...props}>
    {children}
  </Typography>
);

CardDescription.displayName = 'CardDescription';

export {
  Card, CardDescription, CardTitle
};

