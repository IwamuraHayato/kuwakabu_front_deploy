const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      // /images/ に対応するパターン
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'kuwakabu-backend-deploy.onrender.com',
        pathname: '/images/**',
      },

      // /static/images/ に対応するパターン
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/static/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/static/images/**',
      },
      {
        protocol: 'https',
        hostname: 'kuwakabu-backend-deploy.onrender.com',
        pathname: '/static/images/**',
      },
      {
        protocol: 'https',
        hostname: 'kuwakabu0images.blob.core.windows.net',
        port: '',
        pathname: '/icon-images/**',
      },
      {
        protocol: 'https',
        hostname: 'kuwakabu0images.blob.core.windows.net',
        port: '',
        pathname: '/post-images/**',
      },
    ],
  },
};

module.exports = nextConfig;