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
- Keep it under ~5 MB if you can — large PDFs are slow on phones.

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
