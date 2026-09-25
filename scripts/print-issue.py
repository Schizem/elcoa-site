#!/usr/bin/env python3
"""Save an issue's print edition as a PDF.

Prints /print/<slug>/ from a running dev server with headless Chrome (or Edge),
then appends any PDFs listed under `appendPdfs:` in the issue's print.mdx
(e.g. the membership form).

Usage (with `npm run dev` running):
    python scripts/print-issue.py 2026-07
    python scripts/print-issue.py 2026-07 --base http://localhost:3000

Output: ../newsletter-print/<slug>/<slug>-chatter.pdf
Needs:  pip install pymupdf
"""

import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path

import pymupdf

REPO = Path(__file__).resolve().parent.parent
PRINT_ROOT = REPO.parent / "newsletter-print"

BROWSERS = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
]


def find_browser() -> str:
    for b in BROWSERS:
        if Path(b).exists():
            return b
    for name in ("google-chrome", "chromium", "chrome", "msedge"):
        if shutil.which(name):
            return shutil.which(name)
    sys.exit("No Chrome or Edge found.")


def append_list(print_mdx: Path) -> list[str]:
    """Read the `appendPdfs:` list from print.mdx front matter."""
    text = print_mdx.read_text(encoding="utf8")
    m = re.search(r"^appendPdfs:\s*\n((?:\s+-\s+.+\n?)+)", text, re.M)
    if not m:
        return []
    return [re.sub(r'^\s*-\s*["\']?|["\']?\s*$', "", line) for line in m.group(1).splitlines()]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("slug")
    ap.add_argument("--base", default="http://localhost:3000")
    args = ap.parse_args()

    issue_dir = PRINT_ROOT / args.slug
    if not (issue_dir / "print.mdx").exists():
        sys.exit(f"Missing {issue_dir / 'print.mdx'}")

    pages_pdf = issue_dir / f"{args.slug}-pages.pdf"
    out_pdf = issue_dir / f"{args.slug}-chatter.pdf"
    url = f"{args.base}/print/{args.slug}/"

    subprocess.run(
        [
            find_browser(),
            "--headless=new",
            "--disable-gpu",
            "--no-pdf-header-footer",
            "--virtual-time-budget=15000",
            f"--print-to-pdf={pages_pdf}",
            url,
        ],
        check=True,
        capture_output=True,
    )

    doc = pymupdf.open(pages_pdf)
    for rel in append_list(issue_dir / "print.mdx"):
        extra = REPO / "public" / rel
        if extra.exists():
            with pymupdf.open(extra) as e:
                doc.insert_pdf(e)
        else:
            print(f"warning: {extra} not found, skipped")
    doc.set_metadata(
        {**doc.metadata, "title": f"Elbow Lake Chatter {args.slug}", "author": "ELCOA"}
    )
    doc.save(out_pdf, garbage=3, deflate=True)
    doc.close()
    pages_pdf.unlink()
    print(f"{out_pdf}  ({out_pdf.stat().st_size / 1e6:.1f} MB)")


if __name__ == "__main__":
    main()
