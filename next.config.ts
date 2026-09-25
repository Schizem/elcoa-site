import fs from "fs";
import path from "path";
import type { NextConfig } from "next";

// The print edition (app/print/[issue]/page.print.tsx) is a local tool for making
// the newsletter PDF. It only becomes a route when the private
// ../newsletter-print folder exists, so it never builds or deploys on CI.
const hasPrintExtras = fs.existsSync(path.join(process.cwd(), "..", "newsletter-print"));

const nextConfig: NextConfig = {
  // Static HTML export — deploys to GitHub Pages (or any static host) with no server.
  output: "export",

  // GitHub Pages serves directories; trailing slashes emit `/newsletters/index.html`.
  trailingSlash: true,

  // next/image optimization needs a server; disable it for the static export.
  images: {
    unoptimized: true,
  },

  pageExtensions: hasPrintExtras
    ? ["tsx", "ts", "jsx", "js", "print.tsx"]
    : ["tsx", "ts", "jsx", "js"],
};

export default nextConfig;
