import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Turbopack walks up the tree for lockfiles. A stray package-lock.json in a parent
// folder makes the dev root wrong (wrong modules / 500). Pin to this repo.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Next 16 defaults this to true; file log flush can throw ENOENT on WSL/DrvFs
  // when creating `.next/dev/logs`. Disable unless you rely on Next's dev MCP server.
  experimental: {
    mcpServer: false,
  },
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
