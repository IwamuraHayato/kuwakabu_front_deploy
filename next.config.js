const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
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
        hostname: 'tech0-gen-8-step3-app-py-16.azurewebsites.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kuwakabu-backend-deploy.onrender.com',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
