import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Next 16 defaults this to true; file log flush can throw ENOENT on WSL/DrvFs
  // when creating `.next/dev/logs`. Disable unless you rely on Next's dev MCP server.
  experimental: {
    mcpServer: false,
  },
};

export default nextConfig;
