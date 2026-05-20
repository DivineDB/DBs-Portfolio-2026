"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/20 backdrop-blur-[2px]"
          />

          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-black/10 bg-[#f5eeeb] shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-black/10 px-5 py-4">
              <div className="min-w-0">
                {title ? <p className="truncate font-gilroyBold text-sm text-gray-800">{title}</p> : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/40 text-gray-800 transition hover:bg-white/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[78vh] overflow-auto p-5 no-scrollbar">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

