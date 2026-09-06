import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";
import "@/styles/theme.css";

export const metadata: Metadata = {
  title: {
    default: "Elbow Lake Cottage Owners Association",
    template: "%s | ELCOA",
  },
  description:
    "News, events, and the seasonal Elbow Lake Chatter newsletter for the Elbow Lake community in Harrison, Michigan.",
};

// Runs before paint to set the theme and avoid a flash of the wrong colors.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="page">
          <a className="skip-link" href="#main">
            Skip to main content
          </a>

          <header className="site-header">
            <div className="site-header__inner">
              <Link href="/" className="brand">
                <span className="brand__mark" aria-hidden="true">
                  ~
                </span>
                <span>
                  Elbow Lake <span className="brand__sub">ELCOA</span>
                </span>
              </Link>
              <SiteNav />
              <ThemeToggle />
            </div>
          </header>

          <main id="main" className="site-main">
            {children}
          </main>

          <footer className="site-footer">
            <div className="site-footer__inner">
              <span>
                Elbow Lake Cottage Owners Association &middot; Harrison, Michigan
              </span>
              <span>
                <a href="mailto:elbowlakecoa@gmail.com">elbowlakecoa@gmail.com</a>
                {" · "}
                <a
                  href="https://www.facebook.com/groups/206299797470224"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook group
                </a>
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
