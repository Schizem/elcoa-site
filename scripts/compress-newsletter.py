#!/usr/bin/env python3
"""Shrink a newsletter PDF for the web without rasterizing the text.

Embedded photos are downsampled and re-encoded as JPEG; the text layer,
links, and bookmarks are left intact. Images with real transparency keep
their soft mask (it is re-attached after recompression), so nothing turns
into a black rectangle.

Usage:
    python scripts/compress-newsletter.py  path/to/big.pdf  [out.pdf]

If no output path is given, writes "<name>-web.pdf" next to the input.
Needs:  pip install pymupdf pillow
"""

import io
import sys
from pathlib import Path

import pymupdf
from PIL import Image

MAX_EDGE = 1500        # px on the long side of any image
JPEG_Q = 74
MIN_EDGE_TO_TOUCH = 700
BIG_BYTES = 150_000    # also re-encode smaller images heavier than this
OPAQUE_CUTOFF = 248    # a soft mask darker than this actually does something


def mask_is_opaque(doc: pymupdf.Document, smask_xref: int) -> bool:
    try:
        m = pymupdf.Pixmap(doc, smask_xref)
        return (
            Image.frombytes("L", (m.width, m.height), m.samples).getextrema()[0]
            >= OPAQUE_CUTOFF
        )
    except Exception:
        return False


def opaque_pil(raw: bytes) -> Image.Image | None:
    try:
        im = Image.open(io.BytesIO(raw))
        im.load()
    except Exception:
        return None
    if im.mode in ("RGBA", "LA", "PA", "P") or "transparency" in im.info:
        return None
    if im.mode == "CMYK":
        im = im.convert("RGB")
    elif im.mode not in ("RGB", "L"):
        return None
    return im


def shrink(im: Image.Image, raw_len: int) -> bytes | None:
    long_edge = max(im.size)
    resize = long_edge > MAX_EDGE
    if not resize and long_edge <= MIN_EDGE_TO_TOUCH and raw_len <= BIG_BYTES:
        return None
    if resize:
        s = MAX_EDGE / long_edge
        im = im.resize(
            (max(1, round(im.width * s)), max(1, round(im.height * s))),
            Image.LANCZOS,
        )
    out = io.BytesIO()
    im.save(out, format="JPEG", quality=JPEG_Q, optimize=True, progressive=True)
    return out.getvalue()


def compress(src: Path, dst: Path) -> None:
    doc = pymupdf.open(src)

    xref_page: dict[int, int] = {}
    for pno in range(len(doc)):
        for info in doc.get_page_images(pno, full=True):
            xref_page.setdefault(info[0], pno)

    for xref, pno in xref_page.items():
        try:
            ext = doc.extract_image(xref)
        except Exception:
            continue
        im = opaque_pil(ext["image"])
        if im is None:
            continue
        new_bytes = shrink(im, len(ext["image"]))
        if not new_bytes or len(new_bytes) >= len(ext["image"]):
            continue
        smask = ext.get("smask", 0)
        try:
            doc[pno].replace_image(xref, stream=new_bytes)
            if smask and mask_is_opaque(doc, smask):
                doc.xref_set_key(xref, "SMask", "null")
            elif smask:
                doc.xref_set_key(xref, "SMask", f"{smask} 0 R")
        except Exception:
            pass

    try:
        doc.subset_fonts()
    except Exception:
        pass

    doc.save(dst, garbage=4, deflate=True, clean=True)
    doc.close()

    if dst.stat().st_size >= src.stat().st_size:
        dst.write_bytes(src.read_bytes())  # no win; keep the original

    print(
        f"{src.name}: {src.stat().st_size / 1e6:.1f} MB -> "
        f"{dst.stat().st_size / 1e6:.1f} MB"
    )


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = Path(sys.argv[1])
    dst = Path(sys.argv[2]) if len(sys.argv) > 2 else src.with_name(
        f"{src.stem}-web.pdf"
    )
    compress(src, dst)


if __name__ == "__main__":
    main()
