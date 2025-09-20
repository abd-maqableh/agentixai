/**
 * MUI Theme Configuration with   Design
 * Supports RTL layout and Arabic typography
 */

import { createTheme, ThemeOptions } from '@mui/material/styles';
import { Amiri, Cairo, Noto_Sans_Arabic } from 'next/font/google';

// Font configurations
const notoSansArabic = Noto_Sans_Arabic({
  weight: ['400', '500', '600', '700'],
  subsets: ['arabic'],
  display: 'swap',
});

const cairo = Cairo({
  weight: ['400', '500', '600', '700'],
  subsets: ['arabic'],
  display: 'swap',
});

const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ['arabic'],
  display: 'swap',
});

//   color palette
const  Colors = {
  primary: {
    main: '#2d5016', //   green
    light: '#4a7c25',
    dark: '#1a3009',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#d4af37', //   gold
    light: '#f1d55f',
    dark: '#b8961e',
    contrastText: '#000000',
  },
  background: {
    default: '#fafafa',
    paper: '#ffffff',
    gradient: 'linear-gradient(135deg, #2d5016 0%, #4a7c25 100%)',
  },
  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    disabled: '#999999',
  },
  divider: '#e0e0e0',
  success: {
    main: '#2d5016',
    light: '#4a7c25',
    dark: '#1a3009',
  },
  warning: {
    main: '#d4af37',
    light: '#f1d55f',
    dark: '#b8961e',
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
  },
};

// Base theme options
const baseThemeOptions: ThemeOptions = {
  direction: 'rtl',
  palette:  Colors,
  typography: {
    fontFamily: [
      notoSansArabic.style.fontFamily,
      cairo.style.fontFamily,
      'system-ui',
      '-apple-system',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: amiri.style.fontFamily,
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      color:  Colors.primary.main,
    },
    h2: {
      fontFamily: amiri.style.fontFamily,
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      color:  Colors.primary.main,
    },
    h3: {
      fontFamily: cairo.style.fontFamily,
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color:  Colors.primary.main,
    },
    h4: {
      fontFamily: cairo.style.fontFamily,
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      color:  Colors.primary.dark,
    },
    h5: {
      fontFamily: cairo.style.fontFamily,
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: cairo.style.fontFamily,
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    body1: {
      fontFamily: notoSansArabic.style.fontFamily,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: notoSansArabic.style.fontFamily,
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: cairo.style.fontFamily,
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
};

// Component customizations
const componentOverrides = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin' as const,
        scrollbarColor: `${ Colors.primary.light} transparent`,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background:  Colors.primary.light,
          borderRadius: '3px',
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 25,
        textTransform: 'none' as const,
        fontWeight: 500,
        padding: '8px 24px',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(45, 80, 22, 0.3)',
        },
      },
      contained: {
        background: `linear-gradient(135deg, ${ Colors.primary.main} 0%, ${ Colors.primary.light} 100%)`,
        boxShadow: '0 2px 8px rgba(45, 80, 22, 0.2)',
        '&:hover': {
          background: `linear-gradient(135deg, ${ Colors.primary.dark} 0%, ${ Colors.primary.main} 100%)`,
        },
      },
      outlined: {
        borderColor:  Colors.primary.main,
        color:  Colors.primary.main,
        '&:hover': {
          borderColor:  Colors.primary.dark,
          backgroundColor: `${ Colors.primary.main}10`,
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 12,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor:  Colors.primary.light,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor:  Colors.primary.main,
            borderWidth: 2,
          },
        },
        '& .MuiInputLabel-root': {
          '&.Mui-focused': {
            color:  Colors.primary.main,
          },
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        backgroundImage: 'none',
      },
      elevation1: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      },
      elevation2: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
      elevation3: {
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        background: `linear-gradient(135deg, ${ Colors.primary.main} 0%, ${ Colors.primary.light} 100%)`,
        boxShadow: '0 2px 12px rgba(45, 80, 22, 0.2)',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: '0 16px 16px 0',
        background: `linear-gradient(180deg, ${ Colors.background.paper} 0%, #f8fdf6 100%)`,
        borderRight: `1px solid ${ Colors.secondary.main}20`,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 20,
        fontWeight: 500,
      },
      filled: {
        backgroundColor: `${ Colors.primary.main}15`,
        color:  Colors.primary.main,
        '&:hover': {
          backgroundColor: `${ Colors.primary.main}25`,
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          backgroundColor: `${ Colors.primary.main}10`,
        },
      },
    },
  },
};

// Create the theme
export const  Theme = createTheme({
  ...baseThemeOptions,
  components: componentOverrides,
});

// Theme types for TypeScript
declare module '@mui/material/styles' {
  interface Palette {
    gradient: {
      primary: string;
      secondary: string;
    };
  }

  interface PaletteOptions {
    gradient?: {
      primary?: string;
      secondary?: string;
    };
  }
}

export default  Theme;