import Link from "next/link";
import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Callout, Gallery, Photo } from "@/components/Gallery";
import { formatMonthYear } from "@/lib/dates";
import type { Issue } from "@/lib/issues";

const mdxComponents = { Gallery, Photo, Callout };

// On the home page the issue title is an <h2>, so the MDX's "##" sections must
// drop a level to keep the outline valid (h1 > h2 > h3). On /news/<issue> the
// title is the <h1> and the MDX headings render as written.
const shiftedHeadings = {
  h2: (p: ComponentProps<"h3">) => <h3 {...p} />,
  h3: (p: ComponentProps<"h4">) => <h4 {...p} />,
  h4: (p: ComponentProps<"h5">) => <h5 {...p} />,
};

interface Props {
  issue: Issue;
  /** "page" = standalone /news/<issue> page; "home" = embedded on the home page. */
  variant: "page" | "home";
}

export function IssueArticle({ issue, variant }: Props) {
  const Title = variant === "page" ? "h1" : "h2";
  const titleId = `issue-${issue.slug}-title`;
  const components =
    variant === "home" ? { ...mdxComponents, ...shiftedHeadings } : mdxComponents;

  return (
    <article className="issue" aria-labelledby={titleId}>
      <header className="issue__header">
        <p className="issue__kicker">
          Elbow Lake Chatter &middot;{" "}
          <time dateTime={issue.date}>{issue.pdf?.title ?? formatMonthYear(issue.date)}</time>
        </p>
        <Title id={titleId} className="issue__title">
          {variant === "home" ? (
            <Link href={`/news/${issue.slug}/`}>{issue.title}</Link>
          ) : (
            issue.title
          )}
        </Title>
        {issue.summary ? <p className="issue__summary">{issue.summary}</p> : null}
        {issue.pdf ? (
          <p className="issue__pdf">
            <Link href={`/newsletters/?issue=${issue.slug}`}>
              Read the full {issue.pdf.title} newsletter (PDF)
            </Link>
          </p>
        ) : null}
      </header>

      {issue.cover ? (
        <figure className="issue__cover">
          <img src={issue.cover.src} alt={issue.cover.alt} />
          {issue.cover.credit ? (
            <figcaption>Photo: {issue.cover.credit}</figcaption>
          ) : null}
        </figure>
      ) : null}

      <div className="prose issue__body">
        <MDXRemote
          source={issue.body}
          components={components}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
        />
      </div>
    </article>
  );
}
