'use client';

import { useEffect } from 'react';

export function ErrorHandler() {
  useEffect(() => {
    // Global error handler for browser extension conflicts
    const handleUnhandledError = (event: ErrorEvent) => {
      const error = event.error || event.message || '';
      const filename = event.filename || '';
      
      // Suppress errors from browser extensions
      if (
        filename.includes('chrome-extension://') ||
        filename.includes('moz-extension://') ||
        filename.includes('safari-extension://') ||
        error.toString().includes('onMessage') ||
        error.toString().includes('sendMessage') ||
        error.toString().includes('chrome.runtime') ||
        error.toString().includes('browser.runtime')
      ) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.toString() || '';
      
      // Suppress promise rejections from browser extensions
      if (
        reason.includes('chrome-extension://') ||
        reason.includes('moz-extension://') ||
        reason.includes('onMessage') ||
        reason.includes('sendMessage') ||
        reason.includes('chrome.runtime') ||
        reason.includes('browser.runtime')
      ) {
        event.preventDefault();
        return false;
      }
    };

    // Override console.error temporarily to suppress extension errors
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      const message = args[0]?.toString() || '';
      const stack = args[0]?.stack?.toString() || '';
      
      if (
        message.includes('onMessage') ||
        message.includes('sendMessage') ||
        message.includes('chrome-extension://') ||
        message.includes('moz-extension://') ||
        stack.includes('chrome-extension://') ||
        stack.includes('moz-extension://')
      ) {
        return; // Suppress extension errors
      }
      
      originalConsoleError.apply(console, args);
    };

    // Add event listeners
    window.addEventListener('error', handleUnhandledError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleUnhandledError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      console.error = originalConsoleError;
    };
  }, []);

  return null; // This component doesn't render anything
}