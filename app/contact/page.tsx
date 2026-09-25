import type { Metadata } from "next";
import emergency from "@/content/emergency.json";

export const metadata: Metadata = {
  title: "Contact & Emergency Info",
  description:
    "How to reach ELCOA, plus emergency phone numbers and the location of shared oxygen, AED, and radio equipment around Elbow Lake.",
};

// Emergency info lives in content/emergency.json, shared with the newsletter's
// "You Need to Know" sidebar so the two never drift apart.

export default function ContactPage() {
  return (
    <div className="prose-wrap prose">
      <h1 className="page-title">Contact &amp; emergency info</h1>

      <h2>Reach ELCOA</h2>
      <p>
        Email <a href="mailto:elbowlakecoa@gmail.com">elbowlakecoa@gmail.com</a>,
        or post in the{" "}
        <a
          href="https://www.facebook.com/groups/206299797470224"
          target="_blank"
          rel="noopener noreferrer"
        >
          Elbow Lake Facebook group
        </a>
        . Board meetings are open to the public &mdash; see{" "}
        <a href="/events/">Events</a> for dates.
      </p>

      <h2>Emergency numbers</h2>
      <ul>
        {emergency.numbers.map((n) => (
          <li key={n.label}>
            {n.label} &mdash; <a href={`tel:${n.phone}`}>{n.phone}</a>
          </li>
        ))}
      </ul>

      <h2>Shared equipment around the lake</h2>
      <ul>
        {emergency.equipment.flatMap((g) =>
          g.people.map((p) => (
            <li key={`${g.label}-${p.name}`}>
              <strong>{g.label}</strong> &mdash; {p.name}, {p.address}.{" "}
              {p.phones.map((ph, i) => (
                <span key={ph}>
                  {i > 0 ? " or " : ""}
                  <a href={`tel:${ph}`}>{ph}</a>
                </span>
              ))}
            </li>
          )),
        )}
      </ul>

      <h2>Quiet hours</h2>
      <p>10:00 p.m. to 7:00 a.m., per township ordinance.</p>
    </div>
  );
}
