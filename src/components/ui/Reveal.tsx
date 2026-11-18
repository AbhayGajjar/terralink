import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll-reveal wrappers, implemented with CSS scroll-driven animations (see `.reveal` in
 * globals.css). No JavaScript: content is always present and visible in the HTML, so search
 * engines and users without JS see everything. Browsers without scroll-timeline support (or
 * with reduced motion) simply show the content without animating.
 */
interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility – the animation is tied to scroll position instead of time. */
  delay?: number;
  y?: number;
  x?: number;
}

export default function Reveal({ children, className }: RevealProps) {
  return <div className={`reveal ${className ?? ""}`}>{children}</div>;
}

export function Stagger({ children, className }: { children: ReactNode; className?: string; stagger?: number }) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`reveal ${className ?? ""}`} style={style}>
      {children}
    </div>
  );
}
