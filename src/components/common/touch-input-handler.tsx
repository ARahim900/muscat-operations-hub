"use client";

import { useEffect } from 'react';

export default function TouchInputHandler() {
  useEffect(() => {
    const handleFirstInteraction = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      document.body.setAttribute('data-input-type', isTouch ? 'touch' : 'mouse');
    };

    // Handle both touch and mouse events
    const events = ['touchstart', 'mousedown'];
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, []);

  return null;
} 