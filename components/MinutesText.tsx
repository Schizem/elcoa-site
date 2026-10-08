import { MDXRemote } from "next-mdx-remote/rsc";
import type { Minutes } from "@/lib/minutes";

/**
 * Renders official minutes as plain Markdown ("md", not MDX) so text like
 * "<" or "{" in the secretary's wording can never be read as code.
 */
export function MinutesText({ minutes }: { minutes: Minutes }) {
  return (
    <div className="minutes">
      <MDXRemote source={minutes.body} options={{ mdxOptions: { format: "md" } }} />
      {minutes.source ? <p className="minutes__source">Source: {minutes.source}</p> : null}
    </div>
  );
}
