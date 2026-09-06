"use client";

import { useEffect, useMemo, useState } from "react";
import type { Newsletter } from "@/lib/newsletters";
import styles from "./newsletters.module.css";

interface Props {
  newsletters: Newsletter[];
}

function groupByYear(items: Newsletter[]) {
  const years = [...new Set(items.map((n) => n.year))].sort((a, b) => b - a);
  return years.map((year) => ({
    year,
    items: items.filter((n) => n.year === year),
  }));
}

export function NewsletterBrowser({ newsletters }: Props) {
  const groups = useMemo(() => groupByYear(newsletters), [newsletters]);
  const [slug, setSlug] = useState<string>(newsletters[0]?.slug ?? "");

  // Preselect from ?issue= on first load (kept out of render for SSG safety).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("issue");
    if (requested && newsletters.some((n) => n.slug === requested)) {
      setSlug(requested);
    }
  }, [newsletters]);

  // Reflect the current selection in the URL so it can be linked/bookmarked.
  useEffect(() => {
    if (!slug) return;
    const url = new URL(window.location.href);
    url.searchParams.set("issue", slug);
    window.history.replaceState(null, "", url);
  }, [slug]);

  const current =
    newsletters.find((n) => n.slug === slug) ?? newsletters[0] ?? null;

  if (!current) {
    return <p>Newsletters are being added. Please check back soon.</p>;
  }

  return (
    <div>
      <div className={styles.controls}>
        <label htmlFor="issue-select" className={styles.label}>
          Choose a newsletter
        </label>
        <select
          id="issue-select"
          className={styles.select}
          value={current.slug}
          onChange={(e) => setSlug(e.target.value)}
        >
          {groups.map((g) => (
            <optgroup key={g.year} label={String(g.year)}>
              {g.items.map((n) => (
                <option key={n.slug} value={n.slug}>
                  {n.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className={styles.actions}>
        <a
          className="button"
          href={current.file}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open {current.title} in a new tab (PDF)
        </a>
        <a className="button button--ghost" href={current.file} download>
          Download PDF
        </a>
      </div>

      {current.summary ? (
        <div className="callout" style={{ marginTop: "1.25rem" }}>
          <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>
            In {current.title}
          </h2>
          <p style={{ marginBottom: 0 }}>{current.summary}</p>
        </div>
      ) : null}

      <object
        className={styles.viewer}
        data={current.file}
        type="application/pdf"
        aria-label={`${current.title} newsletter, PDF document`}
      >
        <p className={styles.fallback}>
          This browser can&rsquo;t show the PDF inline.{" "}
          <a href={current.file} target="_blank" rel="noopener noreferrer">
            Open {current.title} in a new tab
          </a>
          .
        </p>
      </object>

      <h2 className={styles.archiveHeading}>All editions</h2>
      <p className={styles.archiveNote}>
        Newest first. Each link opens the PDF in a new tab.
      </p>
      {groups.map((g) => (
        <section key={g.year} className={styles.archiveYear}>
          <h3>{g.year}</h3>
          <ul className={styles.archiveList}>
            {g.items.map((n) => (
              <li key={n.slug}>
                <a href={n.file} target="_blank" rel="noopener noreferrer">
                  {n.title}
                </a>
                <button
                  type="button"
                  className={styles.inlineLink}
                  onClick={() => {
                    setSlug(n.slug);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  read here
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
