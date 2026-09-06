import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "How to join the Elbow Lake Cottage Owners Association: annual dues, the membership form, and where to send it.",
};

export default function MembershipPage() {
  return (
    <div className="prose-wrap prose">
      <h1 className="page-title">Membership</h1>
      <p className="page-lead">
        Membership runs one year, August through July, and funds lake and
        neighborhood upkeep.
      </p>

      <h2>Dues</h2>
      <p>
        Dues for August 2026 through July 2027 are <strong>$60.00</strong>. Dues
        must be paid on or before the annual meeting to vote. Payments received
        by July 10, 2026 are entered in the Early Bird drawing for a $100 prize.
      </p>

      <h2>How to join</h2>
      <ol>
        <li>
          Download and fill out the{" "}
          <a
            href="/docs/membership-form-2026-27.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            2026&ndash;2027 membership form (PDF)
          </a>
          .
        </li>
        <li>
          Make your check payable to <strong>ELCOA</strong>. You can combine dues
          and any Fish Fund or Boat Launch Gravel donation on one check.
        </li>
        <li>
          Mail the form and check to the membership chair (address on the form).
        </li>
      </ol>

      <p>
        Questions:{" "}
        <a href="mailto:elbowlakecoa@gmail.com">elbowlakecoa@gmail.com</a>.
      </p>

      <p>
        <em>Draft page &mdash; verify the current dues year and mailing address before publishing.</em>
      </p>
    </div>
  );
}
