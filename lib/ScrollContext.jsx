// lib/ScrollContext.jsx
'use client';

import { createContext, useContext } from 'react';
import { useScroll } from 'framer-motion';

const ScrollContext = createContext(null);

export function ScrollProvider({ children }) {
  const { scrollY } = useScroll();
  return (
    <ScrollContext.Provider value={scrollY}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollY() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error('useScrollY must be used inside <ScrollProvider>');
  return ctx;
}
