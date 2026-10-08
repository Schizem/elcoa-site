import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MinutesText } from "@/components/MinutesText";
import { formatLongDate } from "@/lib/dates";
import { getAllMinutes, getMinutes } from "@/lib/minutes";
import { newsletters } from "@/lib/newsletters";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllMinutes().map((m) => ({ date: m.date }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const m = getMinutes((await params).date);
  if (!m) return {};
  return {
    title: `Board Meeting Minutes, ${formatLongDate(m.date)}`,
    description: `Full minutes of the ELCOA Board of Directors meeting on ${formatLongDate(m.date)}.`,
  };
}

export default async function MinutesPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const m = getMinutes((await params).date);
  if (!m) notFound();
  const issue = newsletters.find((n) => n.slug === m.issue);

  return (
    <div className="prose-wrap prose">
      <p className="back-link">
        <Link href="/minutes/">&larr; All board minutes</Link>
      </p>
      <h1 className="page-title">Board meeting minutes: {formatLongDate(m.date)}</h1>
      <MinutesText minutes={m} />
      {issue ? (
        <p>
          These minutes were printed in the{" "}
          <Link href={`/newsletters/?issue=${issue.slug}`}>{issue.title} Chatter</Link>.
        </p>
      ) : null}
    </div>
  );
}
