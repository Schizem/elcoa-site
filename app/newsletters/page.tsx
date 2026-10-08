import type { Metadata } from "next";
import { MinutesText } from "@/components/MinutesText";
import { formatLongDate } from "@/lib/dates";
import { getIssueSlugs } from "@/lib/issues";
import { getAllMinutes } from "@/lib/minutes";
import { newsletters } from "@/lib/newsletters";
import { NewsletterBrowser, type IssueMinutes } from "./NewsletterBrowser";

export const metadata: Metadata = {
  title: "Newsletters",
  description:
    "Read the current and past editions of the Elbow Lake Chatter, the seasonal newsletter of the Elbow Lake Cottage Owners Association, with the full board meeting minutes.",
};

export default function NewslettersPage() {
  // Full board minutes for each issue, rendered here on the server and shown
  // as readable text under the PDF for whichever issue is selected.
  const minutesByIssue: Record<string, IssueMinutes[]> = {};
  for (const m of [...getAllMinutes()].reverse()) {
    if (!m.issue) continue;
    (minutesByIssue[m.issue] ??= []).push({
      date: m.date,
      label: formatLongDate(m.date),
      content: <MinutesText minutes={m} />,
    });
  }

  return (
    <div className="prose-wrap">
      <h1 className="page-title">Elbow Lake Chatter</h1>
      <p className="page-lead">
        The seasonal newsletter of ELCOA. Choose an edition to read it here, or
        open it in a new tab to download. Each issue&rsquo;s full board meeting
        minutes are below the newsletter.
      </p>
      <NewsletterBrowser
        newsletters={newsletters}
        webEditions={getIssueSlugs()}
        minutesByIssue={minutesByIssue}
      />
    </div>
  );
}
