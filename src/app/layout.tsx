import ThemeProviderApp from "@/lib/ThemeProviderApp";
import type { Metadata } from "next";
import { Amiri, Cairo, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

// Optimized font loading with display swap to prevent FOUC
const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  preload: false, // Secondary font, load after primary
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "مساعد الذكي AI - تطبيق دردشة متقدم",
  description:
    "تطبيق دردشة ذكي متقدم مبني بـ Next.js 15 و TypeScript. يوفر واجهة حديثة وتجربة مستخدم متميزة للتفاعل مع الذكاء الاصطناعي.",
  keywords: [
    "AI",
    "Chat",
    "ذكاء اصطناعي",
    "دردشة",
    "Next.js",
    "TypeScript",
    "  AI",
    "Arabic AI",
  ],
  authors: [{ name: "AgentixAI Team" }],
  creator: "AgentixAI",
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "google-site-verification-code",
  },
  openGraph: {
    title: "مساعد الذكي AI - تطبيق دردشة متقدم",
    description:
      "تطبيق دردشة ذكي متقدم مبني بـ Next.js 15 و TypeScript. تجربة مستخدم متميزة مع تحميل سريع وأداء محسن.",
    type: "website",
    locale: "ar_SA",
    url: "/",
    siteName: "مساعد الذكي AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "مساعد الذكي AI - تطبيق دردشة متقدم",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "مساعد الذكي AI - تطبيق دردشة متقدم",
    description: "تطبيق دردشة ذكي مع تحميل سريع وأداء محسن للشبكات البطيئة",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#059669",
    "color-scheme": "light",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Preconnect to external origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Performance optimizations */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Resource hints for better loading */}
        <link rel="prefetch" href="/api/chat" />

        {/* Inline critical CSS to prevent FOUC */}
        <style>{`
          body {
            font-family: var(--font-noto-arabic), var(--font-cairo), system-ui, -apple-system, sans-serif;
            background-color: #ffffff;
            color: #1a1a1a;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Loading state styles */
          .app-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: linear-gradient(135deg, #f0f9f4 0%, #ffffff 50%, #fef7e0 100%);
          }
          
          /* Prevent layout shift */
          * {
            box-sizing: border-box;
          }
          
          /* Hide scrollbars during loading */
          html {
            overflow-x: hidden;
          }
        `}</style>
      </head>
      <body
        className={`${notoSansArabic.variable} ${cairo.variable} ${amiri.variable} antialiased font-sans`}
        style={{ visibility: "visible" }} // Prevent flash
      >
        <ThemeProviderApp>
          <div id="app-root" style={{ minHeight: "100vh" }}>
            {children}
          </div>
        </ThemeProviderApp>
      </body>
    </html>
  );
}
