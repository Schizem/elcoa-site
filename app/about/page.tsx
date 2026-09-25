import type { Metadata } from "next";
import board from "@/content/board.json";
import { formatLongDate } from "@/lib/dates";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About ELCOA",
  description:
    "The Elbow Lake Cottage Owners Association: history, purpose, board of directors, and bylaws.",
};

export default function AboutPage() {
  return (
    <div className="prose-wrap prose">
      <h1 className="page-title">About ELCOA</h1>
      <p className="page-lead">
        The Elbow Lake Cottage Owners Association was incorporated in Michigan on
        September 8, 1967.
      </p>

      <h2>Purpose</h2>
      <p>
        ELCOA represents property owners around Elbow Lake in Harrison, Michigan.
        The association works to protect water quality, keep the neighborhood
        safe and attractive, and support shared amenities (docks, the boat
        ramp, the swim area, playground equipment, security lighting, and
        emergency equipment), along with seasonal lake weed treatment and
        tree work.
      </p>

      {/* Names and roles only. Personal phone numbers and emails stay in the
          printed newsletter directory, never on the website. */}
      <h2>Board of directors</h2>
      <p>
        Board meetings are open to everyone; see <a href="/events/">Events</a>{" "}
        for dates. To reach the board, email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h3>Officers</h3>
      <dl className="roster">
        {board.officers.map((o) => (
          <div key={o.role} className="roster__row">
            <dt>{o.role}</dt>
            <dd>{o.name}</dd>
          </div>
        ))}
      </dl>

      <h3>Directors</h3>
      <ul className="roster-names">
        {board.directors.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <h3>Committee chairs</h3>
      <dl className="roster">
        {board.committees.map((c) => (
          <div key={c.role} className="roster__row">
            <dt>{c.role}</dt>
            <dd>{c.names.join(" & ")}</dd>
          </div>
        ))}
      </dl>

      <p className="roster-asof">
        As of the {formatLongDate(board.asOf)} board meeting.
      </p>

      <h2>Bylaws</h2>
      <p>
        <a href="/docs/elcoa-bylaws-2024.pdf" target="_blank" rel="noopener noreferrer">
          ELCOA Bylaws and Agreements (2024, PDF)
        </a>
      </p>
    </div>
  );
}
