"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/other-things", label: "Other Things" },
  { href: "/hire-me", label: "Hire Me" },
];

export default function PageFooter({ showOfferButton = false }: { showOfferButton?: boolean }) {
  const pathname = usePathname();

  return (
    <section className="relative flex min-h-[30vh] w-full flex-col justify-end px-6 md:px-12">
      <div className="mx-auto w-full max-w-[1000px] flex flex-col items-center">
        {showOfferButton && (
          <div className="mb-12 flex justify-center">
            <motion.a
              href="mailto:divyanshbaghel456@gmail.com?subject=Opportunity%20for%20Divyansh%20Baghel&body=Hi%20Divyansh%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20was%20impressed%20by%20your%20design%20engineering%20work.%20I'd%20love%20to%20chat%20about%20potential%20opportunities%20we%20have.%0A%0ABest%20regards%2C%0A%5BName%5D"
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              className="relative w-[150px] h-[40px] rounded-full bg-[#2A4756] text-xs font-gilroyBold tracking-widest text-[#F8EDD1] shadow-md transition-colors duration-300 hover:bg-[#2A4756]/90 cursor-pointer flex items-center justify-center"
            >
              {/* Text clip container */}
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none flex items-center justify-center">
                {/* NOW! text (enters from left on hover) */}
                <motion.span
                  variants={{
                    rest: { opacity: 0, x: -30 },
                    hover: { opacity: 1, x: 0 },
                  }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  className="absolute w-full text-center z-10"
                >
                  CONTACT ME!
                </motion.span>

                {/* MAKE OFFER text (disappears to right on hover) */}
                <motion.span
                  variants={{
                    rest: { opacity: 1, x: 0 },
                    hover: { opacity: 0, x: 30 },
                  }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  className="absolute w-full text-center z-10"
                >
                  MAKE OFFER
                </motion.span>
              </div>
            </motion.a>
          </div>
        )}

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
