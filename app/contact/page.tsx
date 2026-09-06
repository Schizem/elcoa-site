import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Emergency Info",
  description:
    "How to reach ELCOA, plus emergency phone numbers and the location of shared oxygen, AED, and radio equipment around Elbow Lake.",
};

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
        <li>Sheriff &mdash; 989-539-7166</li>
        <li>Fire Department &mdash; 989-539-7145</li>
      </ul>

      <h2>Shared equipment around the lake</h2>
      <ul>
        <li>
          <strong>Walkie-talkies, oxygen &amp; AED</strong> &mdash; Charlie &amp;
          Deb Smith, 9895 Toohy Trail. 989-560-5811 or 989-424-8633.
        </li>
        <li>
          <strong>Oxygen</strong> &mdash; Mary Ann Wood, 10385 N. Athey Ave.
          989-274-4315.
        </li>
        <li>
          <strong>Oxygen</strong> &mdash; Frank DeVuono, 9982 South Shore.
          586-482-0907.
        </li>
      </ul>

      <h2>Quiet hours</h2>
      <p>10:00 p.m. to 7:00 a.m., per township ordinance.</p>

      <p>
        <em>Draft page &mdash; confirm names, addresses, and numbers with the board before publishing.</em>
      </p>
    </div>
  );
}
