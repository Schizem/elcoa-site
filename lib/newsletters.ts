import data from "@/content/newsletters.json";

export interface Newsletter {
  /** Stable id, `YYYY-MM`. Used in the ?issue= query param. */
  slug: string;
  /** Human label, e.g. "June 2025". */
  title: string;
  season: "Winter" | "Spring" | "Summer" | "Fall";
  year: number;
  month: number;
  /** Public path to the PDF, e.g. "/newsletters/2025-06-june.pdf". */
  file: string;
  /** Optional plain-text highlights shown above the embedded PDF. */
  summary?: string;
}

/** All newsletters, newest first. */
export const newsletters: Newsletter[] = [...(data as Newsletter[])].sort(
  (a, b) => b.year - a.year || b.month - a.month,
);

export function getNewsletter(slug: string): Newsletter | undefined {
  return newsletters.find((n) => n.slug === slug);
}

/** Newsletters grouped by year, years descending. */
export function newslettersByYear(): { year: number; items: Newsletter[] }[] {
  const years = [...new Set(newsletters.map((n) => n.year))].sort(
    (a, b) => b - a,
  );
  return years.map((year) => ({
    year,
    items: newsletters.filter((n) => n.year === year),
  }));
}
