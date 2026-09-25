import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IssueArticle } from "@/components/IssueArticle";
import { getAllIssues, getIssue } from "@/lib/issues";

// Static export: only the issues that exist at build time get a page.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllIssues().map((i) => ({ issue: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ issue: string }>;
}): Promise<Metadata> {
  const issue = getIssue((await params).issue);
  if (!issue) return {};
  return {
    title: `${issue.title} (${issue.pdf?.title ?? issue.date})`,
    description: issue.summary,
  };
}

export default async function IssuePage({
  params,
}: {
  params: Promise<{ issue: string }>;
}) {
  const issue = getIssue((await params).issue);
  if (!issue) notFound();

  return (
    <div className="prose-wrap">
      <p className="back-link">
        <Link href="/news/">&larr; All issues</Link>
      </p>
      <IssueArticle issue={issue} variant="page" />
    </div>
  );
}
