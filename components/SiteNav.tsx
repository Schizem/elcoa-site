"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/newsletters", label: "Newsletters" },
  { href: "/events", label: "Events" },
  { href: "/projects", label: "Projects & Reports" },
  { href: "/about", label: "About" },
  { href: "/membership", label: "Membership" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Primary">
      <ul className="site-nav__list">
        {LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={isActive(pathname, href) ? "page" : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
