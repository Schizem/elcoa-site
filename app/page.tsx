import Link from "next/link";
import { IssueArticle } from "@/components/IssueArticle";
import { LakeMapBanner } from "@/components/LakeMapBanner";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { getAllEvents, getLatestIssue } from "@/lib/issues";

// Evaluated at build time; the client refines "upcoming" to the viewer's today.
const BUILT_ON = new Date().toISOString().slice(0, 10);

export default function HomePage() {
  const latest = getLatestIssue();
  const events = getAllEvents().filter((e) => e.date >= BUILT_ON);

  return (
    <>
      <section className="hero">
        {/* The map already shows "Elbow Lake"; the h1 carries it for screen readers. */}
        <h1 className="sr-only">Elbow Lake Cottage Owners Association</h1>
        <LakeMapBanner />
        <p>
          A little slice of heaven in Harrison, Michigan. News, events, and the
          seasonal <em>Elbow Lake Chatter</em> from the Elbow Lake Cottage Owners
          Association.
        </p>
      </section>

      <div className="home-layout">
        <div className="home-main">
          {latest ? (
            <IssueArticle issue={latest} variant="home" />
          ) : (
            <p>The latest news is on its way.</p>
          )}
          <p className="home-more">
            <Link href="/news/">More news from past issues &rarr;</Link>
          </p>
        </div>

        <aside className="home-side" aria-label="At a glance">
          <section className="card" aria-labelledby="coming-up">
            <h2 id="coming-up" className="side-title">
              Coming up
            </h2>
            <UpcomingEvents events={events} builtOn={BUILT_ON} />
            <p className="side-link">
              <Link href="/events/">All events &rarr;</Link>
            </p>
          </section>

          <section className="card" aria-labelledby="join">
            <h2 id="join" className="side-title">
              Join ELCOA
            </h2>
            <p>
              Membership runs August through July and funds lake and
              neighborhood upkeep.
            </p>
            <p className="side-link">
              <Link href="/membership/">Membership &amp; dues &rarr;</Link>
            </p>
          </section>

          <section className="card" aria-labelledby="know">
            <h2 id="know" className="side-title">
              Good to know
            </h2>
            <ul className="side-list">
              <li>Quiet hours: 10 PM to 7 AM (township ordinance).</li>
              <li>
                <Link href="/contact/">Emergency numbers &amp; equipment</Link>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/groups/206299797470224"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Elbow Lake Facebook group
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}
