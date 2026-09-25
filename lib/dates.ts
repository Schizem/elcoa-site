// Pure date helpers, safe to import from both server and client components.
// Event dates are plain "YYYY-MM-DD" strings (no time zone). We format them in
// UTC so a July 4 date never renders as July 3 on a machine west of Greenwich.

function toUTC(date: string): Date {
  return new Date(`${date}T00:00:00Z`);
}

/** "Saturday, July 4", or "Saturday, July 4, 2026" with `withYear`. */
export function formatEventDate(date: string, withYear = false): string {
  return toUTC(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    ...(withYear ? { year: "numeric" } : {}),
  });
}

/** "June 29, 2026" */
export function formatLongDate(date: string): string {
  return toUTC(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** "October 2026" */
export function formatMonthYear(date: string): string {
  return toUTC(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    year: "numeric",
  });
}

/** Today's date in the viewer's local time zone, as "YYYY-MM-DD". */
export function localToday(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}
