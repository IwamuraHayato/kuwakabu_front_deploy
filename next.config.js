// frontend/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: `standalone`,
    images: {
        domains: process.env.NODE_ENV === 'development'
            ? ['127.0.0.1'] // 開発環境
            : ['tech0-gen-8-step3-app-py-16.azurewebsites.net'], // 本番環境
    },
};

module.exports = nextConfig;



// エラー対応で下記一度コメントアウト
// import withPWA from "next-pwa";

// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// };

// export default withPWA({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
// });
