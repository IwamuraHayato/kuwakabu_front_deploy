// ログインするページ
"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import SignOut from "../component/header_component/Signout-button";
import Button from "../component/Button";
import { useRouter } from "next/navigation"; // 正しい useRouter をインポート

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter(); // useRouter を正しく初期化

  const [id, setId] = useState(""); // ID用のステート
  const [password, setPassword] = useState(""); // パスワード用のステート
  const [error, setError] = useState(""); // エラーメッセージ用のステート

  const handleSubmit = async (e) => {
    e.preventDefault(); // フォームのデフォルト送信を防ぐ

    // NextAuthのsignIn関数を使用
    const result = await signIn("credentials", {
      id,
      password,
      redirect: false, // ログイン成功時にリダイレクトを防ぐ
    });

    if (result?.error) {
      setError("ログインに失敗しました。IDまたはパスワードを確認してください。");
    } else {
      setError(""); // エラーをクリア
      console.log("ログイン成功:", result);
      router.push("/login"); // ホームにリダイレクト
    }
  };

  if (session?.user) {
    // ログイン済みの表示
    return (
      <div className="h-screen flex flex-col bg-white">
        <header className="flex items-center justify-between p-3 h-14 bg-white z-10">
          <button onClick={() => router.push("/")} className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </header>
        <div className="grid items-center bg-[#ECEAD8] text-gray-900 min-h-screen">
          <img
            src="/src/logo.png"
            alt="クワカブトリタイ"
            className="mx-auto mb-6 h-[133px]"
          />
          <div className="p-5 grid">
            <div className="flex flex-col">
              <h1>ようこそ　{session.user.name}　さん</h1>
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt="User avatar"
                  className="avatar inline-block size-16 rounded-full ring-2 ring-white"
                />
              )}
            </div>
            <div className="space-y-4">
            <Button
              title="ホームに戻る"
              onClick={() => router.push("/")}
              href="/"
            />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ログインフォームの表示
  return (
    <div>
      <header className="flex items-center justify-between p-3 h-14 bg-white z-10">
          <button onClick={() => router.push("/")} className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </header>
      <div className="p-5 grid items-center justify-items-center bg-[#ECEAD8] text-gray-900 min-h-screen">
        <img
          src="/src/logo.png"
          alt="クワカブトリタイ"
          className="mx-auto mb-6 h-[133px]"
        />
        <div className="flex flex-col justify-center w-96">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                ID:
              </label>
              <input
                type="text"
                id="id"
                placeholder="半角数字"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                placeholder="半角英数字と記号"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-center">
              <Button
                title="ログイン"
                type="submit"
                bgColor="#3D6E55"
                textColor="white"
                hoverColor="#2F5544"
                activeScale={0.95}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
