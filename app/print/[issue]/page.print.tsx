import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Outfit } from "next/font/google";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Callout, Gallery, Photo } from "@/components/Gallery";
import emergency from "@/content/emergency.json";
import { formatEventDate, formatMonthYear } from "@/lib/dates";
import { getIssue } from "@/lib/issues";
import { getPrintExtras, getPrintSlugs, splitSections, type DirectoryGroup } from "@/lib/print";
import "./print.css";

/**
 * Print edition of an issue, laid out like the Elbow Lake Chatter and meant to
 * be saved as a PDF (scripts/print-issue.py). Only generated where the private
 * ../newsletter-print/<slug>/ extras exist, so it never deploys.
 */

const display = Outfit({ subsets: ["latin"], weight: ["300", "500", "700"], variable: "--nl-display" });

export const dynamicParams = false;

export function generateStaticParams() {
  return getPrintSlugs()
    .filter((slug) => getIssue(slug))
    .map((issue) => ({ issue }));
}

export const metadata: Metadata = {
  title: "Print edition",
  robots: { index: false, follow: false },
};

const mdx = { Gallery, Photo, Callout };
const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } };

function Bar({ children }: { children: React.ReactNode }) {
  return <h2 className="nl-bar">{children}</h2>;
}

function YouNeedToKnow() {
  return (
    <aside className="nl-ynk" aria-label="You need to know">
      <p className="nl-ynk__title">You Need to Know</p>
      {emergency.numbers.map((n) => (
        <p key={n.label}>
          <strong>{n.label}</strong>
          <br />
          {n.phone}
        </p>
      ))}
      {emergency.equipment.map((g) => (
        <div key={g.label}>
          <p className="nl-ynk__group">{g.label}</p>
          {g.people.map((p) => (
            <p key={p.name}>
              {p.name}
              <br />
              {p.address}
              {p.phones.map((ph) => (
                <span key={ph}>
                  <br />
                  {ph}
                </span>
              ))}
            </p>
          ))}
        </div>
      ))}
    </aside>
  );
}

function Directory({ title, groups }: { title: string; groups: DirectoryGroup[] }) {
  return (
    <section className="nl-page-break nl-directory">
      <Bar>{title}</Bar>
      <div className="nl-dir">
        {groups.map((g) => (
          <div key={g.label} className={`nl-dir__group nl-dir__group--${g.tone}`}>
            <p className="nl-dir__band">
              <span>{g.label.split(" ")[0]}</span>
              <span>{g.label.split(" ").slice(1).join(" ")}</span>
            </p>
            <dl className="nl-dir__list">
              {g.people.map((p, i) => (
                <div key={`${p.name}-${i}`} className="nl-dir__row">
                  <dt>
                    {p.role ? <strong className="nl-dir__role">{p.role}</strong> : null}
                    {p.name}
                  </dt>
                  <dd>{p.phone}</dd>
                  <dd>{p.email}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function PrintIssuePage({
  params,
}: {
  params: Promise<{ issue: string }>;
}) {
  const { issue: slug } = await params;
  const issue = getIssue(slug);
  if (!issue) notFound();
  const extras = getPrintExtras(slug);

  const { intro, sections } = splitSections(issue.body);
  const kept = sections.filter((s) => !extras.omitSections.includes(s.heading));
  const textSections = kept.filter((s) => !s.body.includes("<Gallery"));
  const photoSections = kept.filter((s) => s.body.includes("<Gallery"));
  const days = [...new Set(issue.events.map((e) => e.date))];
  const year = issue.date.slice(0, 4);

  const flyer = extras.flyer;
  const flyerPage = flyer ? (
    <section className="nl-page-break nl-flyer">
      <p className="nl-flyer__kicker">{flyer.kicker}</p>
      <p className="nl-flyer__headline">{flyer.headline}</p>
      {flyer.label ? <p className="nl-flyer__label">{flyer.label}</p> : null}
      <p className="nl-flyer__when">{flyer.when}</p>
      {flyer.lines.map((l, i) => (
        <p key={i} className={i === 0 ? "nl-flyer__prize" : "nl-flyer__line"}>
          {l}
        </p>
      ))}
      {flyer.footer ? <p className="nl-flyer__footer">{flyer.footer}</p> : null}
    </section>
  ) : null;

  return (
    <div className={`nl ${display.variable}`}>
      <p className="nl-screen-note">
        Print preview. The PDF is made by <code>scripts/print-issue.py</code>.
      </p>

      {/* ── Cover ─────────────────────────────────────────── */}
      <section className="nl-cover">
        <div className="nl-cover__photo">
          {issue.cover ? <img src={issue.cover.src} alt={issue.cover.alt} /> : null}
          <p className="nl-cover__date">
            {issue.pdf?.title ?? formatMonthYear(issue.date)}
            {extras.tagline ? <span>{extras.tagline}</span> : null}
          </p>
          <p className="nl-cover__masthead">Elbow Lake Chatter</p>
        </div>
        {issue.cover?.credit ? (
          <p className="nl-credit">Photo Courtesy: {issue.cover.credit}</p>
        ) : null}
        <p className="nl-divider" aria-hidden="true">
          · · · · · • • • ● ● • • • · · · · ·
        </p>
        <div className="nl-cover__grid">
          <div className="nl-lead">
            <h1>{issue.title}</h1>
            <MDXRemote source={intro} components={mdx} options={mdxOptions} />
          </div>
          <YouNeedToKnow />
        </div>
      </section>

      {flyer?.position !== "back" ? flyerPage : null}

      {/* ── Community news (text sections, two columns) ──── */}
      <section className="nl-page-break">
        <Bar>Community News</Bar>
        <div className="nl-cols">
          {days.length ? (
            <div className="nl-dates">
              <h3>{year} Dates to Remember</h3>
              <ul>
                {days.map((d) => (
                  <li key={d}>
                    <strong>{formatEventDate(d)}</strong>
                    <ul>
                      {issue.events
                        .filter((e) => e.date === d)
                        .map((e, i) => (
                          <li key={i}>
                            {e.title}
                            {e.time ? `, ${e.time}` : ""}
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {textSections.map((s) => (
            <div key={s.heading} className="nl-story">
              {/* The bar already says "Community News"; don't repeat it. */}
              {s.heading.toLowerCase() !== "community news" ? (
                <h3 className="nl-story__title">{s.heading}</h3>
              ) : null}
              <MDXRemote source={s.body} components={mdx} options={mdxOptions} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Activities (photo sections) ──────────────────── */}
      {photoSections.map((s) => (
        <section key={s.heading} className="nl-page-break nl-activities">
          <Bar>Activities</Bar>
          <h3 className="nl-story__title">{s.heading}</h3>
          <MDXRemote source={s.body} components={mdx} options={mdxOptions} />
        </section>
      ))}

      {/* ── Minutes ──────────────────────────────────────── */}
      {extras.minutes ? (
        <section className="nl-page-break nl-minutes">
          <Bar>{extras.minutesTitle ?? "Board Meeting Minutes"}</Bar>
          <MDXRemote source={extras.minutes} options={mdxOptions} />
        </section>
      ) : null}

      {/* ── Contact directory ────────────────────────────── */}
      {extras.directory.length ? (
        <Directory
          title={extras.directoryTitle ?? "Contact Information"}
          groups={extras.directory}
        />
      ) : null}

      {flyer?.position === "back" ? flyerPage : null}
    </div>
  );
}
