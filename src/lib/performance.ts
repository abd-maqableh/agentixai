/**
 * Performance Testing Utilities
 * Tools for testing and measuring loading performance improvements
 */

// Performance measurement utilities
export const measurePerformance = () => {
  if (typeof window === 'undefined') return null;

  const perf = performance;
  const paintEntries = perf.getEntriesByType('paint');
  const navigationEntry = perf.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  return {
    // Core Web Vitals
    firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
    largestContentfulPaint: 0, // Will be measured separately
    cumulativeLayoutShift: 0, // Will be measured separately
    firstInputDelay: 0, // Will be measured separately

    // Loading Performance
    domContentLoaded: navigationEntry?.domContentLoadedEventEnd - navigationEntry?.domContentLoadedEventStart || 0,
    loadComplete: navigationEntry?.loadEventEnd - navigationEntry?.loadEventStart || 0,
    totalLoadTime: navigationEntry?.loadEventEnd - navigationEntry?.fetchStart || 0,

    // Network Performance
    dnsLookup: navigationEntry?.domainLookupEnd - navigationEntry?.domainLookupStart || 0,
    tcpConnection: navigationEntry?.connectEnd - navigationEntry?.connectStart || 0,
    serverResponse: navigationEntry?.responseEnd - navigationEntry?.requestStart || 0,

    // Resource timing
    resourceLoadTime: perf.getEntriesByType('resource').reduce((total, resource) => {
      const resourceTiming = resource as PerformanceResourceTiming;
      return total + (resourceTiming.responseEnd - resourceTiming.startTime);
    }, 0),

    // Bundle analysis
    jsHeapSizeUsed: (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize || 0,
    jsHeapSizeTotal: (performance as unknown as { memory?: { totalJSHeapSize: number } }).memory?.totalJSHeapSize || 0,
  };
};

// Log performance metrics to console
export const logPerformance = () => {
  if (typeof window === 'undefined') return;

  setTimeout(() => {
    const metrics = measurePerformance();
    console.group('🚀 Performance Metrics');
    console.log('First Contentful Paint:', metrics?.firstContentfulPaint + 'ms');
    console.log('DOM Content Loaded:', metrics?.domContentLoaded + 'ms');
    console.log('Load Complete:', metrics?.loadComplete + 'ms');
    console.log('Total Load Time:', metrics?.totalLoadTime + 'ms');
    console.log('DNS Lookup:', metrics?.dnsLookup + 'ms');
    console.log('Server Response:', metrics?.serverResponse + 'ms');
    console.log('JS Heap Used:', Math.round((metrics?.jsHeapSizeUsed || 0) / 1024 / 1024) + 'MB');
    console.groupEnd();
  }, 1000);
};

// Simulate 3G network conditions for testing
export const simulate3G = () => {
  if (typeof window === 'undefined') return;
  
  console.warn('⚠️ Simulating 3G Network Conditions');
  console.log('Use Chrome DevTools > Network > Slow 3G to test real conditions');
  
  // Measure performance under slow conditions
  const startTime = performance.now();
  
  return {
    measureLoadTime: () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      console.log(`📊 3G Load Time: ${loadTime.toFixed(2)}ms`);
      return loadTime;
    }
  };
};

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

// Web Vitals measurement (simplified)
export const measureWebVitals = (callback: (metric: WebVitalMetric) => void) => {
  if (typeof window === 'undefined') return;

  // Measure CLS (Cumulative Layout Shift)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const layoutShift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
      if (!layoutShift.hadRecentInput) {
        clsValue += layoutShift.value || 0;
      }
    }
  });
  
  try {
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch {
    // Layout shift not supported
  }

  // Measure LCP (Largest Contentful Paint)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    callback({
      name: 'LCP',
      value: lastEntry.startTime,
      rating: lastEntry.startTime > 2500 ? 'poor' : lastEntry.startTime > 1200 ? 'needs-improvement' : 'good'
    });
  });

  try {
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {
    // LCP not supported
  }

  // Report CLS after page load
  window.addEventListener('beforeunload', () => {
    callback({
      name: 'CLS',
      value: clsValue,
      rating: clsValue > 0.25 ? 'poor' : clsValue > 0.1 ? 'needs-improvement' : 'good'
    });
  });
};

// Performance testing hook
export const usePerformanceTest = () => {
  if (typeof window === 'undefined') return { startTest: () => {}, endTest: () => {} };

  let testStartTime = 0;

  const startTest = (testName: string) => {
    testStartTime = performance.now();
    console.time(`🧪 ${testName}`);
  };

  const endTest = (testName: string) => {
    const endTime = performance.now();
    const duration = endTime - testStartTime;
    console.timeEnd(`🧪 ${testName}`);
    console.log(`⏱️ ${testName} completed in ${duration.toFixed(2)}ms`);
    return duration;
  };

  return { startTest, endTest };
};