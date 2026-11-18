"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

/** Adds the "scrolled" style to the header once the page is scrolled. */
export function HeaderScrollState({ targetId, className }: { targetId: string; className: string }) {
  useEffect(() => {
    const header = document.getElementById(targetId);
    if (!header) return;
    const onScroll = () => header.classList.toggle(className, window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [targetId, className]);
  return null;
}

/**
 * Lightweight accessible mobile menu (replaces the Ant Design Drawer, saving its JavaScript on
 * every page). The menu contents are server-rendered and passed in as children.
 */
export function MobileMenu({
  children,
  title,
  openIcon,
  closeIcon,
}: {
  children: ReactNode;
  title: ReactNode;
  /** Icons are rendered on the server and passed in, so no icon code ships to the browser. */
  openIcon: ReactNode;
  closeIcon: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const burger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    burger.current?.focus();
  }, []);

  // Close when the route changes (a link inside the menu was followed).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={burger}
        type="button"
        className={styles.burger}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        {openIcon}
      </button>

      <div className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`} onClick={close} aria-hidden="true" />
      <div
        id="mobile-menu"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        onClick={(event) => {
          // Close after following any link inside the menu (including same-page links).
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        <div className={styles.panelHead}>
          {title}
          <button ref={closeButton} type="button" className={styles.closeButton} aria-label="Close menu" onClick={close}>
            {closeIcon}
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
