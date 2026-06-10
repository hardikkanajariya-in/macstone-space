"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasVisited = sessionStorage.getItem("macstone_visited");
    if (hasVisited) {
      setIsLoading(false);
    } else {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "";
        sessionStorage.setItem("macstone_visited", "true");
      }, 2600); // 2.6 seconds animation duration

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
  }, []);

  if (!isMounted || !isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
          {/* Top Panel Curtain */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
            className="absolute top-0 left-0 w-full h-1/2 bg-charcoal border-b border-border/10"
          />
          {/* Bottom Panel Curtain */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-charcoal border-t border-border/10"
          />

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Elegant Logo Mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-16 mb-6 rounded-full border border-accent/40 flex items-center justify-center bg-surface/30 backdrop-blur-md shadow-[0_0_25px_rgba(122,158,159,0.15)]"
            >
              <span className="font-display text-xl text-accent font-semibold tracking-wider">M</span>
            </motion.div>

            {/* Brand Typography */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.2em", filter: "blur(5px)" }}
              animate={{ opacity: 1, letterSpacing: "0.45em", filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center text-center font-display text-2xl md:text-3xl font-semibold mb-4 text-foreground pl-[0.45em]"
            >
              <span>MACSTONE</span>
              <span className="text-accent ml-2 font-light">SPACE</span>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-[9px] uppercase tracking-[0.3em] text-muted mb-8 text-center"
            >
              Curating Quiet Luxury Real Estate
            </motion.p>

            {/* Premium Progress Line */}
            <div className="relative w-48 md:w-64 h-[1px] bg-border/20 overflow-hidden">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "0%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-accent to-accent-light shadow-[0_0_10px_rgba(122,158,159,0.5)]"
              />
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
