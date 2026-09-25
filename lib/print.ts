import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Print-only extras for the newsletter PDF. These live OUTSIDE the repo in
 * ../newsletter-print/<slug>/ because they carry things we don't publish on the
 * web (full minutes, the contact directory with personal phones and emails).
 *
 * If the folder is missing (e.g. on the CI build server), there are no print
 * pages at all.
 */

export const PRINT_ROOT = path.join(process.cwd(), "..", "newsletter-print");

export interface Flyer {
  kicker: string;
  headline: string;
  when: string;
  lines: string[];
  footer?: string;
}

export interface DirectoryPerson {
  role?: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface DirectoryGroup {
  /** Band label, e.g. "ELCOA Officers". */
  label: string;
  tone: "blue" | "olive" | "red";
  people: DirectoryPerson[];
}

export interface PrintExtras {
  tagline?: string;
  flyer?: Flyer;
  /** Web-edition "##" sections to leave out of the PDF (e.g. a condensed
   *  minutes summary when the full minutes are included). */
  omitSections: string[];
  minutesTitle?: string;
  /** Full minutes, Markdown. */
  minutes?: string;
  directoryTitle?: string;
  directory: DirectoryGroup[];
  /** PDFs (paths under public/) appended after the generated pages. */
  appendPdfs: string[];
}

export function hasPrintExtras(slug: string): boolean {
  return fs.existsSync(path.join(PRINT_ROOT, slug, "print.mdx"));
}

export function getPrintSlugs(): string[] {
  if (!fs.existsSync(PRINT_ROOT)) return [];
  return fs.readdirSync(PRINT_ROOT).filter(hasPrintExtras);
}

export function getPrintExtras(slug: string): PrintExtras {
  const dir = path.join(PRINT_ROOT, slug);
  const { data, content } = matter(fs.readFileSync(path.join(dir, "print.mdx"), "utf8"));
  const dirFile = path.join(dir, "directory.json");
  const directory: DirectoryGroup[] = fs.existsSync(dirFile)
    ? JSON.parse(fs.readFileSync(dirFile, "utf8"))
    : [];
  return {
    tagline: data.tagline,
    flyer: data.flyer,
    omitSections: data.omitSections ?? [],
    minutesTitle: data.minutesTitle,
    minutes: content.trim() || undefined,
    directoryTitle: data.directoryTitle,
    directory,
    appendPdfs: data.appendPdfs ?? [],
  };
}

export interface MdxSection {
  heading: string;
  body: string;
}

/** Split an MDX body into the intro (before the first "## ") and its sections. */
export function splitSections(body: string): { intro: string; sections: MdxSection[] } {
  const parts = body.split(/^## +/m);
  const intro = parts.shift() ?? "";
  const sections = parts.map((p) => {
    const nl = p.indexOf("\n");
    return {
      heading: (nl === -1 ? p : p.slice(0, nl)).trim(),
      body: nl === -1 ? "" : p.slice(nl + 1),
    };
  });
  return { intro, sections };
}
