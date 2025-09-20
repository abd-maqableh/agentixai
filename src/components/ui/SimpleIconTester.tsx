'use client';

/**
 * Simple Icon Verification Component
 * Displays icons to verify they're working correctly
 */

import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import * as IconExports from './Icons';
import { Icons } from './Icons';

const SimpleIconTester: React.FC = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#2d5016', fontWeight: 'bold' }}>
        🎨 Icon Verification
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Icons Object Test</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <Icons.User sx={{ fontSize: 32, color: '#2d5016' }} />
            <Icons.Bot sx={{ fontSize: 32, color: '#d4af37' }} />
            <Icons.MessageCircle sx={{ fontSize: 32, color: '#2d5016' }} />
            <Icons.Plus sx={{ fontSize: 32, color: '#d4af37' }} />
            <Icons.Search sx={{ fontSize: 32, color: '#2d5016' }} />
            <Icons.Menu sx={{ fontSize: 32, color: '#d4af37' }} />
            <Icons.Check sx={{ fontSize: 32, color: '#2d5016' }} />
            <Icons.Copy sx={{ fontSize: 32, color: '#d4af37' }} />
            <Icons.Trash sx={{ fontSize: 32, color: '#2d5016' }} />
            <Icons.X sx={{ fontSize: 32, color: '#d4af37' }} />
          </Box>
          <Typography variant="body2" sx={{ mt: 2, color: 'success.main' }}>
            ✅ All core icons are rendering correctly
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Named Exports Test</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <IconExports.User sx={{ fontSize: 32, color: '#2d5016' }} />
            <IconExports.Bot sx={{ fontSize: 32, color: '#d4af37' }} />
            <IconExports.MessageCircle sx={{ fontSize: 32, color: '#2d5016' }} />
            <IconExports.Plus sx={{ fontSize: 32, color: '#d4af37' }} />
            <IconExports.Search sx={{ fontSize: 32, color: '#2d5016' }} />
            <IconExports.Menu sx={{ fontSize: 32, color: '#d4af37' }} />
          </Box>
          <Typography variant="body2" sx={{ mt: 2, color: 'success.main' }}>
            ✅ Named exports are working correctly
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          This page verifies that all icons are properly exported and can be rendered without errors.
          All tests are passing if you can see the icons above.
        </Typography>
      </Box>
    </Box>
  );
};

export default SimpleIconTester;