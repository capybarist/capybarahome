import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The home page is now the services page, so the old /services URL lands there.
  async redirects() {
    return [{ source: "/services", destination: "/#services", permanent: false }];
  },
};

export default nextConfig;
