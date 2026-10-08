import type { Metadata } from "next";
import Link from "next/link";
import { formatLongDate } from "@/lib/dates";
import { getAllMinutes } from "@/lib/minutes";
import { newsletters } from "@/lib/newsletters";

export const metadata: Metadata = {
  title: "Board Meeting Minutes",
  description:
    "The full, official minutes of ELCOA Board of Directors meetings, word for word as recorded by the secretary.",
};

export default function MinutesIndexPage() {
  const all = getAllMinutes();

  return (
    <div className="prose-wrap prose">
      <h1 className="page-title">Board meeting minutes</h1>
      <p className="page-lead">
        The full minutes of every ELCOA Board of Directors meeting, word for word
        as recorded by the secretary. Board meetings are open to the public.
      </p>

      <ul>
        {all.map((m) => {
          const issue = newsletters.find((n) => n.slug === m.issue);
          return (
            <li key={m.date}>
              <Link href={`/minutes/${m.date}/`}>{formatLongDate(m.date)}</Link>
              {issue ? <> (printed in the {issue.title} Chatter)</> : null}
            </li>
          );
        })}
      </ul>

      <p>
        Minutes from earlier meetings are printed inside each issue in the{" "}
        <Link href="/newsletters/">newsletter archive</Link>.
      </p>
    </div>
  );
}
