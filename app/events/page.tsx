import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Elbow Lake community events: board meetings, the boat parade, annual picnic, hayride, and photos from past gatherings.",
};

export default function EventsPage() {
  return (
    <div className="prose-wrap prose">
      <h1 className="page-title">Events</h1>
      <p className="page-lead">
        Board meetings are open to the public and everyone is welcome. Photo
        galleries from recent events are on the way.
      </p>

      <h2>2026 dates to remember</h2>
      <ul>
        <li>
          <strong>July 4</strong> &mdash; Board meeting 10:00 a.m.; parade
          registration and flare sales 11:00 a.m.; boat parade 8:00 p.m.
        </li>
        <li>
          <strong>August 1</strong> &mdash; Annual meeting 10:00 a.m.; annual
          picnic 12:00 p.m.
        </li>
        <li>
          <strong>August 2</strong> &mdash; Board meeting 10:00 a.m.
        </li>
        <li>
          <strong>September 5</strong> &mdash; Board meeting 10:00 a.m.
        </li>
        <li>
          <strong>October 10</strong> &mdash; Board meeting 10:00 a.m.; hayride
          (time to be announced).
        </li>
      </ul>

      <h2>Annual traditions</h2>
      <ul>
        <li>Spring and fall neighborhood cleanups</li>
        <li>Memorial Day golf cart &amp; ATV parade</li>
        <li>Fourth of July boat parade, flares around the lake, and fireworks</li>
        <li>Annual picnic and membership meeting</li>
        <li>Halloween bonfire and hayride</li>
      </ul>

      <p>
        <em>
          Draft page &mdash; dates confirmed from the July 2026 Chatter; photo
          galleries still to be added.
        </em>
      </p>
    </div>
  );
}
