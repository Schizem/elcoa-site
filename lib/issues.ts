import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getNewsletter, type Newsletter } from "@/lib/newsletters";

/**
 * Web editions of the Elbow Lake Chatter: one MDX file per issue in
 * content/issues/<slug>.mdx, where <slug> matches content/newsletters.json.
 */

const ISSUES_DIR = path.join(process.cwd(), "content", "issues");

export interface IssueEvent {
  /** "YYYY-MM-DD" */
  date: string;
  title: string;
  /** Free text, e.g. "10:00 AM" or "Dusk". */
  time?: string;
  place?: string;
  details?: string;
}

export interface Issue {
  slug: string;
  title: string;
  /** "YYYY-MM-DD" the issue went out. */
  date: string;
  summary: string;
  cover?: { src: string; alt: string; credit?: string };
  events: IssueEvent[];
  /** The matching PDF entry, if one exists. */
  pdf?: Newsletter;
  /** Raw MDX body. */
  body: string;
}

function readIssue(file: string): Issue {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(ISSUES_DIR, file), "utf8");
  const { data, content } = matter(raw);

  if (!data.title || !data.date) {
    throw new Error(`content/issues/${file}: "title" and "date" are required`);
  }

  const events = ((data.events ?? []) as IssueEvent[])
    .map((e) => ({ ...e, date: String(e.date) }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    slug,
    title: String(data.title),
    date: String(data.date),
    summary: String(data.summary ?? ""),
    cover: data.cover,
    events,
    pdf: getNewsletter(slug),
    body: content,
  };
}

/** All web editions, newest first. */
export function getAllIssues(): Issue[] {
  if (!fs.existsSync(ISSUES_DIR)) return [];
  return fs
    .readdirSync(ISSUES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readIssue)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getIssue(slug: string): Issue | undefined {
  return getAllIssues().find((i) => i.slug === slug);
}

export function getLatestIssue(): Issue | undefined {
  return getAllIssues()[0];
}

/** Slugs of issues that have a web edition (used to cross-link from the PDF archive). */
export function getIssueSlugs(): string[] {
  return getAllIssues().map((i) => i.slug);
}

/**
 * Every dated event across all issues, oldest first. The newest issue that
 * lists a given date owns that whole day: older issues' entries for the same
 * date are dropped (e.g. July's "Hayride, TBA" gives way to October's full
 * schedule for Oct 10).
 */
export function getAllEvents(): (IssueEvent & { issue: string })[] {
  const claimed = new Set<string>();
  const out: (IssueEvent & { issue: string })[] = [];
  for (const issue of getAllIssues()) {
    // newest first
    const days = new Set(issue.events.map((e) => e.date));
    for (const e of issue.events) {
      if (!claimed.has(e.date)) out.push({ ...e, issue: issue.slug });
    }
    days.forEach((d) => claimed.add(d));
  }
  // Sort by date only; Array.sort is stable, so same-day entries keep the order
  // they were written in (comparing "9:00 AM" / "10:00 AM" as text would be wrong).
  return out.sort((a, b) => a.date.localeCompare(b.date));
}
