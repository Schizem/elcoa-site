import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Reports",
  description:
    "Water quality testing, fish stocking, boat launch upkeep, emergency equipment, and other ELCOA projects around Elbow Lake.",
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
        The lake is tested for E. coli every summer, with samples taken in front
        of the old bar and at the swim area. The summer 2026 results were the
        same as 2025: excellent, and far below 300, the level where the water
        would be a concern for swimming. Charlie Smith handles water testing.
      </p>

      <h2>Fish stocking</h2>
      <p>
        Frank DeVuono coordinates fish planting. Fish go in once the water cools
        to about 55&deg;F, so stocking happens in the fall.
      </p>
      <ul>
        <li>
          <strong>Fall 2024:</strong> nearly 1,000 crappie and walleye were
          stocked, paid for by $1,911 in donations from residents plus $500 from
          ELCOA.
        </li>
        <li>
          <strong>2025:</strong> no stocking was planned; the next planting was
          set for fall 2026.
        </li>
        <li>
          <strong>2026:</strong> fish are in this year&rsquo;s budget. As of the
          August 2 board meeting the fish fund stood at $1,900, and Frank is
          getting pricing for a fall planting.
        </li>
      </ul>
      <p>
        To chip in, add a Fish Fund donation on your{" "}
        <a href="/membership/">membership form</a>. Fish donations are kept in their
        own fund, separate from ELCOA&rsquo;s general money.
      </p>

      <h2>Boat launch</h2>
      <p>
        ELCOA put in new gravel at the boat launch in late 2025 to keep runoff
        from wearing the launch down. Boat Launch Gravel donations can be added on
        the membership form too.
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
    </div>
  );
}
