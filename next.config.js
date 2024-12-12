// frontend/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: `standalone`
}
    module.exports = nextConfig



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
