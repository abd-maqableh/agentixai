/**
 * MUI Theme Provider Component
 * Provides  -themed MUI styling context to the entire app
 */

"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import Theme from "./theme";

// Create RTL cache for Arabic/RTL layout
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProviderApp: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={ Theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProviderApp;
