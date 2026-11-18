import { Suspense } from "react";
import Link from "next/link";
import { company } from "@/data/company";
import Icon from "@/components/ui/Icon";
import Logo from "./Logo";
import ActiveNavList, { NavList } from "./NavLinks";
import { HeaderScrollState, MobileMenu } from "./HeaderClient";
import styles from "./Header.module.css";

const desktopNavProps = {
  className: styles.navList,
  linkClassName: styles.navLink,
  activeClassName: styles.navLinkActive,
};

const mobileNavProps = {
  className: styles.drawerList,
  linkClassName: styles.drawerLink,
  activeClassName: styles.drawerLinkActive,
};

/** Site header – server-rendered; only the scroll state and mobile menu toggle run in the browser. */
export default function Header() {
  return (
    <header id="site-header" className={styles.header}>
      <HeaderScrollState targetId="site-header" className={styles.scrolled} />
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
          <MobileMenu title={<Logo />} openIcon={<Icon name="menu" />} closeIcon={<Icon name="close" />}>
            <nav aria-label="Mobile">
              <Suspense fallback={<NavList {...mobileNavProps} />}>
                <ActiveNavList {...mobileNavProps} />
              </Suspense>
            </nav>
            <div className={styles.drawerFooter}>
              <a href={company.phone.href} className="btn btn--outline-light btn--block">
                <Icon name="phone" /> {company.phone.display}
              </a>
              <Link href="/contact" className="btn btn--cta btn--block">
                Get a Free Quote <Icon name="arrowRight" />
              </Link>
              <p className={styles.drawerNote}>
                {company.openingHours[0].days}: {company.openingHours[0].hours}
              </p>
            </div>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
