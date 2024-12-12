"use client";

import localFont from "next/font/local";
import "./globals.css";
import Header from "./component/Header";
import Navigation from "./component/Navigation";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ヘッダーとフッターを非表示にするページ
  const hideBothPaths = ["/post", "/login", "/login/register"];
  // ヘッダーのみ非表示にするページ
  const hideHeaderPaths = ["/map","/map/filter"];

  // 判定ロジック
  const isBothHidden = hideBothPaths.includes(pathname);
  const isHeaderHidden = hideHeaderPaths.includes(pathname) || isBothHidden;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-512x512.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          {/* ヘッダー */}
          {!isHeaderHidden && <Header />}

          {/* ページ固有のコンテンツ */}
          <main>{children}</main>

          {/* フッター */}
          {!isBothHidden && <Navigation />}
        </SessionProvider>
      </body>
    </html>
  );
}