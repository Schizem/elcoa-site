"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Newsletter } from "@/lib/newsletters";
import styles from "./newsletters.module.css";

/** One meeting's full minutes, already rendered on the server. */
export interface IssueMinutes {
  date: string;
  label: string;
  content: ReactNode;
}

interface Props {
  newsletters: Newsletter[];
  /** Slugs that also have a web edition at /news/<slug>/. */
  webEditions?: string[];
  /** Full board minutes printed in each issue, keyed by issue slug. */
  minutesByIssue?: Record<string, IssueMinutes[]>;
}

function groupByYear(items: Newsletter[]) {
  const years = [...new Set(items.map((n) => n.year))].sort((a, b) => b - a);
  return years.map((year) => ({
    year,
    items: items.filter((n) => n.year === year),
  }));
}

export function NewsletterBrowser({
  newsletters,
  webEditions = [],
  minutesByIssue = {},
}: Props) {
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
        {webEditions.includes(current.slug) ? (
          <a className="button button--ghost" href={`/news/${current.slug}/`}>
            Read the web version
          </a>
        ) : null}
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

      <section className={styles.minutes} aria-labelledby="minutes-heading">
        <h2 id="minutes-heading" className={styles.minutesHeading}>
          Board meeting minutes in {current.title}
        </h2>
        {(minutesByIssue[current.slug] ?? []).length ? (
          <>
            <p className={styles.minutesNote}>
              The full, official minutes, word for word as recorded by the
              secretary.
            </p>
            {minutesByIssue[current.slug].map((m) => (
              <details key={m.date} className={styles.minutesItem} open>
                <summary>{m.label} board meeting</summary>
                {m.content}
                <p>
                  <a href={`/minutes/${m.date}/`}>Link to these minutes</a>
                </p>
              </details>
            ))}
          </>
        ) : (
          <p className={styles.minutesNote}>
            This issue&rsquo;s board meeting minutes are printed inside the
            newsletter above. See all <a href="/minutes/">board meeting minutes</a>.
          </p>
        )}
      </section>

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
