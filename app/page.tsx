"use client"; // Next.js 13以降の"app"ディレクトリで使用する`use client`ディレクティブ。クライアントサイドでレンダリングするための指示。

import dynamic from 'next/dynamic';// Next.jsの`dynamic`関数をインポート。動的にコンポーネントをインポートするために使用します。
import { useEffect, useState } from 'react';// Reactのフック`useEffect`と`useState`をインポート。状態管理と副作用の処理に使用します。
import Button from './component/Button'; // ボタンコンポーネント
import { useRouter } from "next/navigation"; // ルーティング機能

export default function Home() {
  const [data, setData] = useState(null);  // `data`状態変数を定義。バックエンドから取得したデータを保存します。
  const router = useRouter();

// 検索欄の入力情報を保持する
  const [searchTerm, setSearchTerm] = useState("");

// 位置情報取得失敗時に表示するダイアログ制御用ステート
  const [showLocationError, setShowLocationError] = useState(false);

// 入力検索の関数
  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      // 検索欄が空の場合は全投稿を表示
      router.push(`/map`);
    } else {
      // 検索結果をGoogleMapページに渡す
      router.push(`/map?search=${encodeURIComponent(searchTerm)}`);
    }
  };

// 「現在地を使用」ボタンクリック時の処理
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      // Geolocation API非対応ブラウザの場合
      alert("お使いのブラウザでは位置情報を取得できません。");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // 取得成功時、latとlngをクエリに付けて/mapへ遷移
        router.push(`/map?lat=${latitude}&lng=${longitude}`);
      },
      (error) => {
        // 許可が得られなかった場合など
        console.error("位置情報の取得に失敗しました:", error);
        setShowLocationError(true);
      }
    );
  };

// 1つ目のクワカブ記事データを定義
  const magazine = {
    id: 1,
    title: "服装・道具を準備しよう",
    date: "2024.12.18",
    description:
      "カブクワ採集をするための服装や道具を紹介します。特に初心者や初めての場所に行くときは、事前にしっかりと準備をしておきましょう。",
    image: "/magazine/1/images/magazine_1_top.jpg",
  };

// PWAアプリのインストール状態の変数
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

  // PWAインストールイベントを監視
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // デフォルト動作を抑止
      setInstallPromptEvent(event); // イベントを保存
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // インストールプロンプトを表示
  const handleInstallClick = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt(); // プロンプトを表示
      installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA installed");
        } else {
          console.log("PWA installation dismissed");
        }
        setInstallPromptEvent(null); // イベントをクリア
      });
    } else {
      alert("インストールバナーは現在利用できません。");
    }
  };

  return (
    <div className="bg-[#ECEAD8] text-gray-900 min-h-screen">

      {/* 検索セクション */}
      <section className="text-center py-12">
        <p className="text-sm text-center font-bold mb-6">
          全国のクワガタ・カブトムシの採集場所が見つかる検索サイト
        </p>
        <img
          src="/src/logo.png"
          alt="クワカブトリタイ"
          className="mx-auto mb-6 h-[133px]"
        />
        <div className="flex flex-col items-center">
        {/* 虫眼鏡アイコン付きの検索欄 */}
        <div className="flex w-[calc(100%-40px)] max-w-[400px] border rounded-lg bg-white">
          {/* 虫眼鏡アイコン */}
          <span className="flex items-center px-3">
            <img
              src="/src/search-icon.svg"
              alt="search icon"
            />
          </span>
          {/* 入力欄 */}
          <input
            type="text"
            placeholder="地名・種類など"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 bg-white text-black focus:outline-none rounded-l"
          />
          {/* 検索ボタン */}
          <button
            onClick={handleSearch}
            className="bg-yellow-500 text-white font-bold px-6 rounded-r"
          >
            検索
          </button>
        </div>

        {/* 位置情報アイコン付きのボタン */}
        <button
          onClick={handleUseCurrentLocation}
          className="w-[calc(100%-40px)] max-w-[400px] h-[52px] mx-auto flex items-center justify-center gap-2 rounded-lg font-bold text-center shadow transition-all duration-300 my-5 bg-[#3D6E55] text-white hover:bg-[#2F5544]"
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.95)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <img
            src="/src/location-icon.svg"
            alt="location icon"
            className="h-5 w-5"
          />
          現在地から探す
        </button>
      </div>
      </section>
      {/* MAGAZINEセクション */}
      <section className="py-8 px-4">
        <h2 className="text-3xl font-bold mb-2 text-center text-[#3D6E55]">MAGAZINE</h2>
        <p className="text-sm text-center font-bold mb-6">クワカブ情報をお届け</p>
        {/* マガジンの記事カード */}
        <div
          onClick={() => router.push(`/magazine/${magazine.id}`)} // クリック時にページ遷移
          className="max-w-4xl  mx-auto bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
        >
          <img
            src={magazine.image}
            alt={magazine.title}
            className="w-full h-56 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-black mb-2">{magazine.title}</h3>
            <p className="text-xs text-gray-500 mb-2">{magazine.date}</p>
            <p className="text-sm text-gray-700">{magazine.description}</p>
          </div>
        </div>
        {/* 「もっと見る」ボタン */}
        <div className="flex justify-center mt-3">
          <Button title="もっと見る" href="/magazine" />
        </div>
      </section>
      {/* ABOUTセクション */}
      <section className="py-8 px-4 bg-white">
        <h2 className="text-3xl font-bold mb-2 text-center text-[#3D6E55]">ABOUT</h2>
        <p className="text-sm text-center font-bold mb-6">できること</p>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-lg font-bold mb-2">全国の採集場所を検索できる</h3>
            <p className="text-gray-700 px-4">
            日本全国のクワカブ採集スポットを簡単に検索できます。採集場所の周辺情報もわかるので安心！
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-bold mb-2">自分の採集記録を保存できる</h3>
            <p className="text-gray-700 px-4">
            採集したクワカブの記録を写真やコメントで残せます。あなただけの採集記録を作りましょう！
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-bold mb-2">
              安全に採集を楽しむ知識が学べる
            </h3>
            <p className="text-gray-700 px-4">
            マガジンで昆虫採集のマナーや採集方法を学べます。初心者でも安心して楽しめる情報が満載です！
            </p>
          </div>
        </div>
      </section>

      {/* APPセクション */}
      <section className="py-8 px-4">
        <h2 className="text-3xl font-bold mb-2 text-center text-[#3D6E55]">APP</h2>
        <p className="text-sm text-center font-bold mb-6">アプリで探そう</p>
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-4 px-4">
            インストールすると<br></br>
            アプリをより手軽に利用できます
          </p>
          <Button
            title="無料インストール"
            href="/"
            bgColor="#F1B300"
            textColor="#000000"
            hoverColor="#C88F00"
            onClick={handleInstallClick} // PWAインストールプロンプトを呼び出す
          />
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-6 text-center">
      </footer>
    </div>
  );
}
