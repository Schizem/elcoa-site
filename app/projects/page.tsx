import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Reports",
  description:
    "Water quality testing, fish stocking, emergency equipment, and other ELCOA projects around Elbow Lake.",
};

export default function ProjectsPage() {
  return (
    <div className="prose-wrap prose">
      <h1 className="page-title">Projects &amp; Reports</h1>
      <p className="page-lead">
        Where membership dues and donations go, and how the lake and neighborhood
        are cared for.
      </p>

      <h2>Water quality</h2>
      <p>
        The lake is tested each summer. July 2025 results were rated excellent,
        with E. coli levels well below the safety threshold for full-body
        contact.
      </p>

      <h2>Fish stocking</h2>
      <p>
        Nearly 1,000 crappie and walleye were added in November 2025, funded by
        $1,911 in community donations plus $500 from ELCOA. Another stocking is
        planned for 2026.
      </p>

      <h2>Emergency equipment</h2>
      <p>
        ELCOA maintains long-range walkie-talkies, oxygen, and an AED for
        search-and-rescue situations. Locations and contacts are listed on the{" "}
        <a href="/contact/">Contact</a> page.
      </p>

      <h2>Trash service</h2>
      <p>
        GFL collects weekly on Thursdays: one tote plus two tied bags per
        household. Leave four feet of clearance around bins. Lost-bin replacement
        is $50. GFL: 989-588-6000.
      </p>

      <p>
        <em>Draft page: content carried over from the old site; figures to be refreshed each season.</em>
      </p>
    </div>
  );
}
