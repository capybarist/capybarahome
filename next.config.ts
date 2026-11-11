import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // games.capybaralabs.tech is the Capybara Game Labs landing (app/games). The
  // subdomain's root shows /games; any other path on it falls through to the
  // normal routes (e.g. /lumen-rise/privacidad).
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", has: [{ type: "host", value: "games.capybaralabs.tech" }], destination: "/games" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  // The home page is now the services page, so the old /services URL lands there.
  async redirects() {
    return [{ source: "/services", destination: "/#services", permanent: false }];
  },
};

export default nextConfig;
