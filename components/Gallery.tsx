import type { ReactNode } from "react";

/**
 * Photo grid for MDX. Usage:
 *
 *   <Gallery label="Memorial Day parade photos">
 *     <Photo src="/issues/2026-07/memorial-day-01.jpg" alt="..." />
 *   </Gallery>
 *
 * Each thumbnail links to the full-size image. `alt` is required — describe
 * what's in the picture, not "photo of".
 */
export function Gallery({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <ul className="gallery" aria-label={label}>
      {children}
    </ul>
  );
}

export function Photo({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <li className="gallery__item">
      <figure>
        <a href={src} target="_blank" rel="noopener noreferrer">
          <img src={src} alt={alt} loading="lazy" decoding="async" />
          <span className="sr-only"> (opens full-size image in a new tab)</span>
        </a>
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    </li>
  );
}

/** Highlighted note inside an issue, e.g. a safety reminder. */
export function Callout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="callout">
      {title ? <p className="callout__title">{title}</p> : null}
      {children}
    </aside>
  );
}
