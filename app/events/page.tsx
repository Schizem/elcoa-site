import type { Metadata } from "next";
import Link from "next/link";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { getAllEvents, getAllIssues } from "@/lib/issues";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming Elbow Lake community events and board meetings, plus annual traditions and photos from past gatherings.",
};

const BUILT_ON = new Date().toISOString().slice(0, 10);

export default function EventsPage() {
  const events = getAllEvents().filter((e) => e.date >= BUILT_ON);
  const recaps = getAllIssues().filter((i) => i.cover);

  return (
    <div className="prose-wrap">
      <h1 className="page-title">Events</h1>
      <p className="page-lead">
        Board meetings are open to the public and everyone is welcome. Dates come
        from the latest issue of the Chatter.
      </p>

      <section className="card" aria-labelledby="upcoming">
        <h2 id="upcoming" className="side-title">
          Upcoming
        </h2>
        <UpcomingEvents events={events} builtOn={BUILT_ON} />
      </section>

      <div className="prose">
        <h2>Annual traditions</h2>
        <ul>
          <li>Spring and fall neighborhood cleanups</li>
          <li>Memorial Day golf cart &amp; ATV parade</li>
          <li>Fourth of July boat parade, flares around the lake, and fireworks</li>
          <li>Annual meeting and picnic in August</li>
          <li>Halloween hayride, trunk-or-treat, and chili cook-off</li>
        </ul>

        <h2>Photos &amp; recaps</h2>
        <ul>
          {recaps.map((i) => (
            <li key={i.slug}>
              <Link href={`/news/${i.slug}/`}>
                {i.pdf?.title ?? i.date}: {i.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
