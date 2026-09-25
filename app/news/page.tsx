import type { Metadata } from "next";
import Link from "next/link";
import { formatMonthYear } from "@/lib/dates";
import { getAllIssues } from "@/lib/issues";

export const metadata: Metadata = {
  title: "News",
  description:
    "Community news and event recaps from each issue of the Elbow Lake Chatter.",
};

export default function NewsIndexPage() {
  const issues = getAllIssues();

  return (
    <div className="prose-wrap">
      <h1 className="page-title">News</h1>
      <p className="page-lead">
        Community news and event photos from each issue of the Elbow Lake
        Chatter. For older issues, see the{" "}
        <Link href="/newsletters/">newsletter archive</Link>.
      </p>

      <ul className="issue-list">
        {issues.map((i) => (
          <li key={i.slug} className="issue-list__item">
            {i.cover ? (
              <img src={i.cover.src} alt="" className="issue-list__thumb" loading="lazy" />
            ) : null}
            <div>
              <p className="issue__kicker">
                <time dateTime={i.date}>{i.pdf?.title ?? formatMonthYear(i.date)}</time>
              </p>
              <h2 className="issue-list__title">
                <Link href={`/news/${i.slug}/`}>{i.title}</Link>
              </h2>
              {i.summary ? <p>{i.summary}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
