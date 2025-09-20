/**
 * UI Components Index
 * Centralized export for all UI components
 */

export { Button } from "./Button";
export type { ButtonProps } from "./Button";

export { Input } from "./Input";
export type { InputProps } from "./Input";

// Note: Textarea is imported directly where needed due to TypeScript resolution issue
// export { Textarea } from './Textarea';
// export type { TextareaProps } from './Textarea';

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./Card";
export type { CardDescriptionProps, CardProps, CardTitleProps } from "./Card";

export { LoadingScreen, Skeleton, Spinner, TypingIndicator } from "./Loading";
export type {
  LoadingScreenProps,
  SkeletonProps,
  SpinnerProps,
  TypingIndicatorProps
} from "./Loading";

// Enhanced Skeleton System
export {
  AppSkeleton,
  ChatAreaSkeleton,
  Skeleton as EnhancedSkeleton,
  HydrationSafeWrapper,
  InputAreaSkeleton, LoadingScreen as IslamicLoadingScreen, MessageSkeleton
} from "./Skeleton";

// Loading Wrappers
export {
  LazyWrapper,
  LoadingWrapper,
  ProgressiveImage
} from "./LoadingWrapper";

export * from "./Icons";
// Icons are exported directly from Icons.tsx
