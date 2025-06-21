"use client";

import { useEffect } from 'react';

export function PwaHandler() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.service-worker.register('/sw.js').then(registration => {
          console.log('Service Worker registered: ', registration);
        }).catch(registrationError => {
          console.log('Service Worker registration failed: ', registrationError);
        });
      });
    }
  }, []);

  return null; // This component does not render anything.
}
