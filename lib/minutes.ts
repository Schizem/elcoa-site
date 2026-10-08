import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Official board meeting minutes, word for word, one file per meeting:
 * content/minutes/<YYYY-MM-DD>.md. These are the secretary's record and are
 * never summarized or edited here; only line wraps and bold labels are
 * formatting. Both the website and the print newsletter read from these files.
 */

const MINUTES_DIR = path.join(process.cwd(), "content", "minutes");

export interface Minutes {
  /** Meeting date, "YYYY-MM-DD". Also the URL slug: /minutes/<date>/. */
  date: string;
  /** Newsletter issue slug that printed these minutes, e.g. "2026-10". */
  issue?: string;
  /** Where the text came from (shown under the minutes). */
  source?: string;
  /** Markdown body. */
  body: string;
}

function read(file: string): Minutes {
  const { data, content } = matter(fs.readFileSync(path.join(MINUTES_DIR, file), "utf8"));
  return {
    date: String(data.date ?? file.replace(/\.md$/, "")),
    issue: data.issue ? String(data.issue) : undefined,
    source: data.source ? String(data.source) : undefined,
    body: content.trim(),
  };
}

/** All minutes, newest meeting first. */
export function getAllMinutes(): Minutes[] {
  if (!fs.existsSync(MINUTES_DIR)) return [];
  return fs
    .readdirSync(MINUTES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(read)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getMinutes(date: string): Minutes | undefined {
  return getAllMinutes().find((m) => m.date === date);
}

/** Minutes printed in a given newsletter issue, oldest meeting first. */
export function getMinutesForIssue(issue: string): Minutes[] {
  return getAllMinutes()
    .filter((m) => m.issue === issue)
    .sort((a, b) => a.date.localeCompare(b.date));
}
