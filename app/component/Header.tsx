"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態を管理

  // ログイン状態の確認（ここは実際の認証方法に合わせて変更する）
  useEffect(() => {
    // 仮の認証チェックロジック
    const userToken = localStorage.getItem("userToken"); // ローカルストレージからトークンを取得（例）
    setIsLoggedIn(!!userToken); // トークンが存在すればログイン済みと判定
  }, []);

  const handleLogoClick = () => {
    if (window.location.pathname === "/") {
      // 現在ホームページにいる場合、スムーズスクロールでページトップへ移動
      window.scrollTo({
        top: 0,
        behavior: "smooth", // スムーズスクロール
      });
    } else {
      // ホームページ以外の場合はルートに遷移
      router.push("/");
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b h-16 sticky top-0 z-50">
      {/* 左側：クワガタアイコンとテキスト */}
      <div
        className="flex items-center cursor-pointer"
        onClick={handleLogoClick}
      >
        <img
          src="../icon-192x192.png"
          alt="クワガタアイコン"
          className="w-8 h-8 mr-2"
        />
        <div className="text-sm font-bold text-gray-800 leading-tight">
          クワカブ
          <br />
          トリタイ
        </div>
      </div>

      {/* 右側：未ログイン状態で表示 */}
      {!isLoggedIn && (
        <div className="flex items-center space-x-4">
          <button
            className="px-4 py-2 text-sm font-bold text-gray-800 bg-transparent border rounded hover:bg-gray-100"
            onClick={() => router.push("/login")}
          >
            ログイン
          </button>
          <button
            className="px-4 py-2 text-sm font-bold text-white rounded bg-[#3D6E55] hover:bg-[#2F5544]"
            onClick={() => router.push("/login/register")}
          >
            会員登録
          </button>
        </div>
      )}
    </header>
  );
}