"use client";

import { motion } from "framer-motion";

type MotionInViewProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof motion;
  delay?: number;
};

export function MotionInView({ children, className, as = "div", delay = 0 }: MotionInViewProps) {
  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </Comp>
  );
}

