import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — deploys to GitHub Pages (or any static host) with no server.
  output: "export",

  // GitHub Pages serves directories; trailing slashes emit `/newsletters/index.html`.
  trailingSlash: true,

  // next/image optimization needs a server; disable it for the static export.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
