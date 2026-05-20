"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import {
  Home,
  User,
  Briefcase,
  Send,
  Download,
  Copy,
  Check,
  Camera,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "About", icon: User, href: "/about" },
  { label: "Work", icon: Briefcase, href: "/work" },
  { label: "Other Things", icon: Camera, href: "/other-things" },
  { label: "Hire Me", icon: Send, href: "/hire-me" },
] as const;

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // Toggle on Cmd+K / Ctrl+K
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent Lenis scroll when palette is open
  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("lenis-stopped");
    } else {
      document.documentElement.classList.remove("lenis-stopped");
    }
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [open]);

  const navigateTo = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText("divyanshbaghel26@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1400);
  };

  const handleDownloadResume = () => {
    setOpen(false);
    window.open("/Divyansh_Baghel_Resume.pdf", "_blank");
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Palette"
      container={typeof window !== "undefined" ? document.body : undefined}
    >
      {/* Visually-hidden title satisfies Radix Dialog a11y requirement */}
      <Dialog.Title className="sr-only">Command Palette</Dialog.Title>
      {/* --- Overlay --- */}
      {open && (
        <div
          className="fixed inset-0 z-[49] bg-[#2a4756]/20 backdrop-blur-md"
          aria-hidden
          onClick={() => setOpen(false)}
        />
      )}

      {/* --- Palette Container --- */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none">
        <div
          className="pointer-events-auto mt-[15vh] w-full max-w-xl mx-4 rounded-2xl border border-[#2a4756]/12 bg-[#f8edd1]/90 backdrop-blur-xl shadow-2xl overflow-hidden"
          style={{
            boxShadow:
              "0 32px 80px rgba(42,71,86,0.18), 0 0 0 1px rgba(42,71,86,0.06)",
          }}
        >
          {/* Search Input */}
          <Command.Input
            placeholder="Type a command or search…"
            className="w-full px-6 py-4 text-lg bg-transparent text-[#2a4756] placeholder:text-[#2a4756]/35 focus:outline-none border-b border-[#2a4756]/10 font-gilroyRegular"
          />

          {/* Command List */}
          <Command.List className="max-h-[320px] overflow-y-auto p-2" data-lenis-prevent>
            <Command.Empty className="py-8 text-center text-sm text-[#2a4756]/40 font-gilroyRegular">
              No results found.
            </Command.Empty>

            {/* Navigation Group */}
            <Command.Group
              heading="Navigation"
              className="[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-gilroyBold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.15em] [&_[cmdk-group-heading]]:text-[#2a4756]/35"
            >
              {NAV_ITEMS.map(({ label, icon: Icon, href }) => (
                <Command.Item
                  key={href}
                  value={label}
                  onSelect={() => navigateTo(href)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-[#2a4756] cursor-pointer transition-colors font-gilroyRegular
                    aria-selected:bg-[#a2f991] aria-selected:text-[#2a4756]
                    data-[selected=true]:bg-[#a2f991] data-[selected=true]:text-[#2a4756]"
                >
                  <Icon
                    size={15}
                    strokeWidth={1.75}
                    className="opacity-60 shrink-0"
                  />
                  <span>{label}</span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Separator */}
            <div className="mx-4 my-1 h-px bg-[#2a4756]/8" />

            {/* Actions Group */}
            <Command.Group
              heading="Actions"
              className="[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-gilroyBold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.15em] [&_[cmdk-group-heading]]:text-[#2a4756]/35"
            >
              <Command.Item
                value="Download Resume"
                onSelect={handleDownloadResume}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-[#2a4756] cursor-pointer transition-colors font-gilroyRegular
                  aria-selected:bg-[#a2f991] aria-selected:text-[#2a4756]
                  data-[selected=true]:bg-[#a2f991] data-[selected=true]:text-[#2a4756]"
              >
                <Download
                  size={15}
                  strokeWidth={1.75}
                  className="opacity-60 shrink-0"
                />
                <span>Download Resume</span>
              </Command.Item>

              <Command.Item
                value="Copy Email"
                onSelect={handleCopyEmail}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-[#2a4756] cursor-pointer transition-colors font-gilroyRegular
                  aria-selected:bg-[#a2f991] aria-selected:text-[#2a4756]
                  data-[selected=true]:bg-[#a2f991] data-[selected=true]:text-[#2a4756]"
              >
                {copied ? (
                  <Check
                    size={15}
                    strokeWidth={1.75}
                    className="text-green-600 shrink-0"
                  />
                ) : (
                  <Copy
                    size={15}
                    strokeWidth={1.75}
                    className="opacity-60 shrink-0"
                  />
                )}
                <span>{copied ? "Copied!" : "Copy Email"}</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer hint */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#2a4756]/8">
            <span className="text-[10px] text-[#2a4756]/30 font-gilroyRegular tracking-wide">
              ↑↓ navigate · ↵ select · esc close
            </span>
            <kbd className="text-[10px] text-[#2a4756]/30 font-gilroyBold tracking-wider">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
    </Command.Dialog>
  );
}
