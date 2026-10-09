import type { Metadata } from "next";
import sponsors from "@/content/sponsors.json";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Sponsors",
  description:
    "Local businesses that support ELCOA community events around Elbow Lake in Harrison, Michigan.",
};

// Sponsors live in content/sponsors.json; the home page card reads the same file.

export default function SponsorsPage() {
  return (
    <div className="prose-wrap prose">
      <h1 className="page-title">Thank you to our sponsors</h1>
      <p className="page-lead">
        These local businesses help make ELCOA events happen. When you need
        their services, please give them your business and let them know you
        appreciate it.
      </p>

      {sponsors.groups.map((group) => (
        <section key={group.title}>
          <h2>{group.title}</h2>
          <ul className="sponsor-list">
            {group.sponsors.map((s) => (
              <li key={s.name}>
                <strong>{s.name}</strong>
                {"gift" in s && s.gift ? <>: {s.gift}</> : null}
                {"returning" in s && s.returning ? (
                  <> A returning sponsor: they gave last year too and have come through every time we&rsquo;ve asked.</>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Become a sponsor</h2>
      <p>
        Want to support an ELCOA event or sponsor a raffle basket? Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </div>
  );
}
