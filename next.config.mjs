// frontend/next.config.mjs
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;



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
