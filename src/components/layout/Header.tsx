"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Drawer } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { company } from "@/data/company";
import Icon from "@/components/ui/Icon";
import Logo from "./Logo";
import ActiveNavList, { NavList } from "./NavLinks";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  const desktopNavProps = {
    className: styles.navList,
    linkClassName: styles.navLink,
    activeClassName: styles.navLinkActive,
  };

  const drawerNavProps = {
    className: styles.drawerList,
    linkClassName: styles.drawerLink,
    activeClassName: styles.drawerLinkActive,
    onNavigate: close,
  };

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Logo />

        <nav aria-label="Main" className={styles.nav}>
          <Suspense fallback={<NavList {...desktopNavProps} />}>
            <ActiveNavList {...desktopNavProps} />
          </Suspense>
        </nav>

        <div className={styles.actions}>
          <a href={company.phone.href} className={styles.phone}>
            <span className={styles.phoneIcon}>
              <Icon name="phone" />
            </span>
            <span>
              <span className={styles.phoneLabel}>Call us</span>
              {company.phone.display}
            </span>
          </a>
          <Link href="/contact" className={`btn btn--cta btn--sm ${styles.quote}`}>
            Get a Quote
          </Link>
          <button
            type="button"
            className={styles.burger}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <MenuOutlined />
          </button>
        </div>
      </div>

      <Drawer
        id="mobile-menu"
        open={open}
        onClose={close}
        placement="right"
        size={340}
        closeIcon={<CloseOutlined aria-label="Close menu" />}
        title={<Logo />}
        rootClassName={styles.drawer}
      >
        <nav aria-label="Mobile">
          <Suspense fallback={<NavList {...drawerNavProps} />}>
            <ActiveNavList {...drawerNavProps} />
          </Suspense>
        </nav>
        <div className={styles.drawerFooter}>
          <a href={company.phone.href} className="btn btn--outline-light btn--block">
            <Icon name="phone" /> {company.phone.display}
          </a>
          <Link href="/contact" className="btn btn--cta btn--block" onClick={close}>
            Get a Free Quote <Icon name="arrowRight" />
          </Link>
          <p className={styles.drawerNote}>{company.openingHours[0].days}: {company.openingHours[0].hours}</p>
        </div>
      </Drawer>
    </header>
  );
}
