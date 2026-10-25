"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, isActivePath } from "@/data/navigation";

interface NavListProps {
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
  onNavigate?: () => void;
}

/** Static fallback – rendered during prerendering before the pathname is known. */
export function NavList({ className, linkClassName, activeClassName, onNavigate, pathname = null }: NavListProps & { pathname?: string | null }) {
  return (
    <ul className={className}>
      {mainNav.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`${linkClassName ?? ""} ${active ? activeClassName ?? "" : ""}`}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Nav list that highlights the current route. Wrap in <Suspense> with a <NavList> fallback. */
export default function ActiveNavList(props: NavListProps) {
  const pathname = usePathname();
  return <NavList {...props} pathname={pathname} />;
}
