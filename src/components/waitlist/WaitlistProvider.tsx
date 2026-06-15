"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { WaitlistModal } from "./WaitlistModal";

type WaitlistContextValue = { open: (source?: string) => void };

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist(): WaitlistContextValue {
  const ctx = useContext(WaitlistContext);
  if (!ctx) {
    throw new Error("useWaitlist must be used within <WaitlistProvider>");
  }
  return ctx;
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("cta");

  const open = useCallback((s?: string) => {
    setSource(s ?? "cta");
    setIsOpen(true);
  }, []);

  return (
    <WaitlistContext.Provider value={{ open }}>
      {children}
      <WaitlistModal
        open={isOpen}
        source={source}
        onClose={() => setIsOpen(false)}
      />
    </WaitlistContext.Provider>
  );
}
