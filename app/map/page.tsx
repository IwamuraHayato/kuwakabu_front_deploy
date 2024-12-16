"use client";

import { useSearchParams, useRouter } from "next/navigation";
import GoogleMap from "../component/GoogleMap";
import { useState } from "react";

export const dynamic = "force-dynamic";

export default function MapPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSearchTerm = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [noResults, setNoResults] = useState(false); // 検索結果がない状態を管理

  // ホームから緯度経度が渡されていれば取得
  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");

  // 現在地取得が成功していた場合は緯度経度をfloatに変換
  const lat = latParam ? parseFloat(latParam) : null;
  const lng = lngParam ? parseFloat(lngParam) : null;

  // Navigation の高さを考慮
  const headerHeight = "3.5rem"; // Header の高さ (14)
  const navigationHeight = "5rem"; // Navigation の高さ (20)
  const mapHeight = `calc(100vh - ${headerHeight} - ${navigationHeight})`;

  // 検索ボタンクリック時の処理
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set("search", searchTerm);
    }
    if (lat !== null && lng !== null) {
      params.set("lat", lat.toString());
      params.set("lng", lng.toString());
    }
    router.push(`/map?${params.toString()}`);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* ヘッダー */}
      <header className="flex items-center justify-between p-3 h-14 bg-white z-10">
        {/* 戻るボタン */}
        <button
          onClick={() => router.back()}
          className="text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 検索入力欄 */}
        <div className="flex flex-1 mx-2 items-center bg-[#ECEAD8] rounded-lg px-3 py-2">
          <img src="/src/search-icon.svg" alt="Search" className="h-5 w-5 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 入力内容をステートに反映
            placeholder="地名・種類など"
            className="flex-1 bg-transparent focus:outline-none text-black"
          />
          <button
            onClick={handleSearch} // 検索ボタンのクリックで検索を実行
            className="bg-[#3D6E55] text-white px-3 py-1 ml-2 rounded-lg"
          >
            検索
          </button>
        </div>
      </header>

      {/* 検索結果がない場合のメッセージ */}
      {noResults && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-20">
          <p className="text-xl font-bold text-gray-700">
            検索結果がありませんでした
          </p>
        </div>
      )}

      {/* Googleマップ */}
      <div
        className="flex-grow relative"
        style={{
          height: mapHeight, // Header と Navigation を除いた高さを計算して指定
        }}
      >
        {/* 検索ボタンを押した時にのみ反映される */}
        <GoogleMap
          searchTerm={initialSearchTerm} // 初期のクエリパラメータのみを渡す
          centerLat={lat}
          centerLng={lng}
          defaultZoom={lat && lng ? 12 : 13}
        />
      </div>
    </div>
  );
}