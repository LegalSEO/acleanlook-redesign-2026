/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Old WordPress URL redirects
  async redirects() {
    return [
      {
        source: '/exterior-painting-services',
        destination: '/services/exterior-painting',
        permanent: true,
      },
      {
        source: '/interior-painting-services',
        destination: '/services/interior-painting',
        permanent: true,
      },
      {
        source: '/home-improvement-services/power-washing',
        destination: '/services/power-washing',
        permanent: true,
      },
      {
        source: '/chicago-gutter-cleaning-services',
        destination: '/services/gutter-cleaning',
        permanent: true,
      },
      {
        source: '/about-2',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/work-photos',
        destination: '/gallery',
        permanent: true,
      },
      // Common WordPress patterns
      {
        source: '/wp-admin',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: '/',
        permanent: true,
      },
    ]
  },

  // Security & caching headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
