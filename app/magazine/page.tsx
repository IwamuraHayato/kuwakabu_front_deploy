"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const magazines = [
  {
    id: 1,
    title: "服装・道具を準備しよう",
    date:"2024.12.18",
    description:
      "カブクワ採集をするための服装や道具を紹介します。特に初心者や初めての場所に行くときは、事前にしっかりと準備をしておきましょう。",
    image: "/magazine/1/images/magazine_1_top.jpg",
  },
  {
    id: 2,
    title: "森や山の危険を知っておこう",
    date: "2024.12.18",
    description: "カブクワが生息している豊かな森や山には人に危害を与えることができる生物も住んでいます。クワカブ採集で遭遇する危険の一部をご紹介します。",
    image: "/magazine/2/images/magazine_2_top.jpg",
  },
  {
    id: 3,
    title: "いろいろな採集方法の紹介",
    date: "2024.12.18",
    description: "クワカブを採集する方法は、場所や時間帯、時期によっていろいろな選択肢があります。ここでは良く知られている方法やコツをご紹介します。",
    image: "/magazine/3/images/magazine_3_top.jpg",
  },
];

export default function PageMenu() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 430);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // 初回実行
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // ページ遷移時にトップにスクロール
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pb-[106px] min-h-screen bg-[#ECEADA] py-6 px-4 font-roboto">
      {/* ヘッダーセクション */}
      <div className="text-center mb-6">
        <h1 className="text-[#3D6E55] text-[28px] font-bold mb-0">MAGAZINE</h1>
        <p className="text-black text-[12px] font-bold">クワカブ情報をお届け</p>
      </div>

      {/* 記事一覧 */}
      <div className="flex flex-wrap gap-4 justify-center">
        {magazines.map((magazine) => (
          <Link href={`/magazine/${magazine.id}`} key={magazine.id}>
            <div
              className={`bg-white rounded-[10px] shadow-lg ${isMobile ? "w-full max-w-[390px]" : "w-[390px]"
                } h-[328px] cursor-pointer hover:shadow-xl transition-shadow`}
            >
              <img
                src={magazine.image}
                alt={magazine.title}
                className="w-full h-[200px] object-cover rounded-t-[10px] mb-4"
              />
              <div className="px-4">
                <h2 className="text-[16px] text-black font-semibold mb-2">
                  {magazine.title}
                </h2>
                <p className="text-[10px] text-[#929292] mb-2">{magazine.date}</p>
                <p className="text-[10px] text-black">{magazine.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
