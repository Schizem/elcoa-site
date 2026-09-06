import type { Metadata } from "next";
import { newsletters } from "@/lib/newsletters";
import { NewsletterBrowser } from "./NewsletterBrowser";

export const metadata: Metadata = {
  title: "Newsletters",
  description:
    "Read the current and past editions of the Elbow Lake Chatter, the seasonal newsletter of the Elbow Lake Cottage Owners Association.",
};

export default function NewslettersPage() {
  return (
    <div className="prose-wrap">
      <h1 className="page-title">Elbow Lake Chatter</h1>
      <p className="page-lead">
        The seasonal newsletter of ELCOA. Choose an edition to read it here, or
        open it in a new tab to download.
      </p>
      <NewsletterBrowser newsletters={newsletters} />
    </div>
  );
}
