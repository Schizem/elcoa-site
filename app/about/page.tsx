import type { Metadata } from "next";

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

      <h2>Bylaws</h2>
      <p>
        <a href="/docs/elcoa-bylaws-2024.pdf" target="_blank" rel="noopener noreferrer">
          ELCOA Bylaws and Agreements (2024, PDF)
        </a>
      </p>

      <h2>Board of directors</h2>
      <p>
        <em>
          Draft: roster to be confirmed against the current membership
          year before publishing.
        </em>
      </p>

      <p>
        Questions for the board:{" "}
        <a href="mailto:elbowlakecoa@gmail.com">elbowlakecoa@gmail.com</a>.
      </p>
    </div>
  );
}
