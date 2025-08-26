import { useEffect } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}
// tetkjj

export function useFrameworkReady() {
  useEffect(() => {
    window.frameworkReady?.();
  });
}
