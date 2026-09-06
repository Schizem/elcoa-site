import Link from "next/link";
import { newsletters } from "@/lib/newsletters";

export default function HomePage() {
  const latest = newsletters[0];

  return (
    <>
      <section className="hero">
        <h1>Elbow Lake</h1>
        <p>
          A little slice of heaven in Harrison, Michigan. News, events, and the
          seasonal <em>Elbow Lake Chatter</em> from the Elbow Lake Cottage Owners
          Association.
        </p>
      </section>

      <div className="home-grid">
        <article className="card">
          <h2>Latest newsletter</h2>
          {latest ? (
            <p>
              <Link href={`/newsletters?issue=${latest.slug}`}>
                {latest.title} &mdash; Elbow Lake Chatter
              </Link>
            </p>
          ) : (
            <p>Newsletters are being migrated over. Check back soon.</p>
          )}
          <p>
            <Link href="/newsletters">Browse the full archive &rarr;</Link>
          </p>
        </article>

        <article className="card">
          <h2>Upcoming events</h2>
          <p>
            Board meetings are open to all. See the season&rsquo;s calendar and
            past event photos.
          </p>
          <p>
            <Link href="/events">Events &amp; photos &rarr;</Link>
          </p>
        </article>

        <article className="card">
          <h2>Join ELCOA</h2>
          <p>
            Annual membership runs August through July and funds lake and
            neighborhood upkeep.
          </p>
          <p>
            <Link href="/membership">Membership &amp; dues &rarr;</Link>
          </p>
        </article>
      </div>

      <section className="callout" style={{ marginTop: "2.5rem" }}>
        <h2 style={{ marginTop: 0 }}>Good to know</h2>
        <ul style={{ marginBottom: 0, paddingLeft: "1.4rem" }}>
          <li>Quiet hours are 10:00 p.m. to 7:00 a.m. (township ordinance).</li>
          <li>
            Emergency numbers and equipment locations are on the{" "}
            <Link href="/contact">Contact</Link> page.
          </li>
          <li>
            Community discussion happens in the{" "}
            <a
              href="https://www.facebook.com/groups/206299797470224"
              target="_blank"
              rel="noopener noreferrer"
            >
              Elbow Lake Facebook group
            </a>
            .
          </li>
        </ul>
      </section>
    </>
  );
}
