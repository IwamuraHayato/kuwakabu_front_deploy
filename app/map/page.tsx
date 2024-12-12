"use client";

import { useSearchParams, useRouter } from "next/navigation";
import GoogleMap from "../component/GoogleMap";
import { useState, useEffect } from "react";

// Next.js にクライアントサイド専用ページであることを明示
export const dynamic = "force-dynamic";

export default function MapPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  useEffect(() => {
    const initialSearchTerm = searchParams.get("search") || "";
    const latParam = searchParams.get("lat");
    const lngParam = searchParams.get("lng");

    setSearchTerm(initialSearchTerm);
    setLat(latParam ? parseFloat(latParam) : null);
    setLng(lngParam ? parseFloat(lngParam) : null);
  }, [searchParams]);

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
      <header className="flex items-center justify-between p-3 h-14 bg-white z-10">
        <button onClick={() => router.back()} className="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex flex-1 mx-2 items-center bg-[#ECEAD8] rounded-lg px-3 py-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="地名・種類など"
            className="flex-1 bg-transparent focus:outline-none text-black"
          />
          <button onClick={handleSearch} className="bg-[#3D6E55] text-white px-3 py-1 ml-2 rounded-lg">
            検索
          </button>
        </div>
      </header>
      <div className="flex-grow">
        <GoogleMap searchTerm={searchTerm} centerLat={lat} centerLng={lng} />
      </div>
    </div>
  );
}

