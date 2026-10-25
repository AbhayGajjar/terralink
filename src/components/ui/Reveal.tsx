"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance to slide up from, in px */
  y?: number;
  x?: number;
}

/** Fades and slides its children in once they scroll into view. */
export default function Reveal({ children, className, delay = 0, y = 28, x = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

/** Parent for staggered card reveals – pair with <StaggerItem>. */
export function Stagger({ children, className, stagger = 0.1 }: { children: ReactNode; className?: string; stagger?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      variants={containerVariants}
      custom={stagger}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
