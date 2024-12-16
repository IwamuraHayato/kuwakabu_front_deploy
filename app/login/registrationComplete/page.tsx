"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../../component/Button";
import { Suspense } from "react";

export default function RegistrationCompletePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationContent />
    </Suspense>
  );
}

function RegistrationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // クエリパラメータから値を取得
  const userId = searchParams.get("user_id");
  const password = searchParams.get("password");

  return (
    <div className="bg-[#ECEAD8] min-h-screen flex flex-col items-center justify-center text-gray-900 font-roboto">
      <header className="flex justify-center items-center mb-6">
        <img
          src="/src/logo.png"
          alt="クワカブトリタイ"
          className="h-[133px]"
        />
      </header>
      <main className="w-full max-w-md px-4 text-center">
        <h1 className="text-xl font-bold mb-4">会員登録が完了しました</h1>
        <p className="text-sm font-semibold mb-6">あなたのIDとパスワード</p>
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <p className="text-sm font-bold">ID: {userId}</p>
          <p className="text-sm font-bold">パスワード: {password}</p>
        </div>
        <p className="text-xs mb-6">
          無くさないようにスクリーンショットを撮るかメモに保管してください。
        </p>
        <div className="space-y-4">
        <Button
          title="ホームに戻る"
          onClick={() => router.push("/")}
          href="/"
        />
        </div>
      </main>
    </div>
  );
}
