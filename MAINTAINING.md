# Maintaining the site

Everything here can be done from the GitHub web UI or a local clone.

## Add a new newsletter

1. **Name the PDF** `YYYY-MM-month.pdf` — e.g. `2026-09-september.pdf`. Lower
   case, no spaces.
2. **Put it in** `public/newsletters/`.
3. **Add an entry** to the top of `content/newsletters.json`:

   ```json
   {
     "slug": "2026-09",
     "title": "September 2026",
     "season": "Fall",
     "year": 2026,
     "month": 9,
     "file": "/newsletters/2026-09-september.pdf",
     "summary": "One or two sentences of highlights. Optional but encouraged — it is the part screen readers and phones read most easily."
   }
   ```

   - `slug` is `YYYY-MM` and must be unique.
   - `season` is one of `Winter`, `Spring`, `Summer`, `Fall`.
   - The list re-sorts itself by date; order in the file doesn't matter, but
     newest-first keeps it readable.

4. Commit. The deploy runs automatically; the new issue shows up in the dropdown
   and the archive, and it becomes the "Latest newsletter" on the home page.

### Make the PDF accessible before you upload it

When exporting from Word / Docs / your layout tool:

- Set the document **Title** and **Language** in the file properties.
- Use real heading styles, not just big bold text.
- Add alt text to images.
- Export as a **tagged PDF** ("PDF/A" or "best for accessibility").

### Shrink it first

Newsletters straight out of Word are often 20&ndash;40 MB. Run them through the
bundled compressor before committing &mdash; it downsamples the photos and keeps
the text selectable:

```bash
pip install pymupdf pillow          # one time
python scripts/compress-newsletter.py "September 2026 Newsletter.pdf"
```

That writes `September 2026 Newsletter-web.pdf` (typically 3&ndash;8 MB). Rename it
to `2026-09-september.pdf` and put that in `public/newsletters/`. The 27 existing
issues were compressed this way; originals are kept off the repo.

## Publish the web edition (home page content)

The home page shows the **latest web edition**: the community news, event
recaps, and photos from the newest issue, written as a web page instead of a
PDF. Each issue gets one file: `content/issues/<slug>.mdx`, where `<slug>`
matches the newsletter's entry in `newsletters.json` (e.g. `2026-10`).

1. **Photos** go in `public/issues/<slug>/`. Resize to about 1600 px on the long
   edge and strip location data (EXIF). Short lowercase names:
   `sub-crawl-01.jpg`, `cover.jpg`.
2. **Create `content/issues/<slug>.mdx`:**

   ```mdx
   ---
   title: "Fall Fun at the Lake"            # the issue's headline
   date: "2026-10-01"                        # when the issue went out
   summary: "One sentence for previews and the newsletter dropdown."
   cover:
     src: /issues/2026-10/cover.jpg
     alt: "Describe the photo for someone who can't see it."
     credit: Photographer Name              # optional
   events:                                   # powers "Coming up" + the Events page
     - date: "2026-10-10"
       time: "1:00 PM"
       title: "Hayride, trunk-or-treat & chili cook-off"
       place: "Boat Launch"                 # optional
       details: "Cook-off entries due Oct 1." # optional
   ---

   Opening paragraph...

   ## Community news

   ### A story headline

   Story text. **Bold**, [links](https://example.com), and lists work.

   ## Sub Crawl recap

   <Gallery label="Sub Crawl 2026 photos">
     <Photo src="/issues/2026-10/sub-crawl-01.jpg" alt="What's in the picture." />
     <Photo src="/issues/2026-10/sub-crawl-02.jpg" alt="..." caption="Optional caption" />
   </Gallery>

   <Callout title="Safety">A highlighted reminder.</Callout>
   ```

   - List same-day events in the order they happen; the site keeps that order.
   - Past events drop off "Coming up" automatically, in each visitor's browser.
   - Every `<Photo>` needs `alt` text.
3. Commit. The newest `date` becomes the home page; older issues stay at
   `/news/<slug>/`, and the newsletter dropdown links to them.

**Leave off the web edition:** the contact directory (personal phone numbers
and emails are easy to scrape from a web page), news photos you don't own
(link to the source instead), and personal details from the minutes. Summarize
board decisions only.

## Add event photos

1. Make a folder `public/events/<event-slug>/` (e.g. `public/events/hayride-2026/`).
2. Resize images to about 1600 px on the long edge and strip location data.
3. Reference them from the relevant page in `app/events/`.

## Update page text

Each page is a file under `app/<route>/page.tsx`. The text is plain HTML-ish
JSX — edit between the tags and commit.

## Replace a PDF (bylaws, membership form)

Drop the new file in `public/docs/` using the same name as the old one, or update
the link in the page that points to it.
