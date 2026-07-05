/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production-level browser caching controls
  async headers() {
    return [
      {
        // Static assets (hashed JS, CSS, media in _next/static) can be cached immutably
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Dynamic next static data route requests should always validate
        source: '/_next/data/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        // Public images and icons can cache, but must revalidate to reflect any updates
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
      {
        // HTML pages/app routes must NEVER store stale references to old JS chunks
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
