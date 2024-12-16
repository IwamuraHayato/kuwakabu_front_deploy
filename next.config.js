const nextConfig = {
    reactStrictMode: true,
    output: `standalone`,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '127.0.0.1',
          port: '5000',
          pathname: '/static/images/**',
        },
      ],
      domains: process.env.NODE_ENV === 'development'
            ? ['127.0.0.1'] // 開発環境
            : ['tech0-gen-8-step3-app-py-16.azurewebsites.net'], // 本番環境
    },
  };
  
  module.exports = nextConfig;
