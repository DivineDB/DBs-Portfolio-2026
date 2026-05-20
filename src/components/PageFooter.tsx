"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/other-things", label: "Other Things" },
  { href: "/hire-me", label: "Hire Me" },
];

export default function PageFooter() {
  const pathname = usePathname();

  return (
    <section className="relative flex min-h-[30vh] w-full flex-col justify-end px-6 md:px-12">
      <div className="mx-auto w-full max-w-[1000px]">
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex w-full justify-between border-t border-dashed border-text_primary/40 pt-8 pb-12 text-sm font-gilroyBold will-change-transform"
        >
          <nav className="flex gap-8">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`transition-opacity ${
                    isActive
                      ? "opacity-30 pointer-events-none"
                      : "hover:opacity-70"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <p className="font-gilroyRegular text-text_primary/40">© 2026 | Divyansh Baghel.</p>
        </motion.footer>
      </div>
    </section>
  );
}
