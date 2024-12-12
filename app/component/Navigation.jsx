"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname(); // 現在のページのパスを取得

  const Menus = [
    { name: "ホーム", href: "/", icon: "/icons/home.svg", activeIcon: "/icons/home-active.svg" },
    { name: "投稿", href: "/submit", icon: "/icons/post.svg", activeIcon: "/icons/post-active.svg" },
    { name: "マイページ", href: "/mypage", icon: "/icons/mypage.svg", activeIcon: "/icons/mypage-active.svg" },
  ];

  // ページトップへのスムーズスクロール関数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="btm-nav flex justify-around bg-white border-t h-20 py-2">
      {Menus.map((menu, index) => {
        const isActive = pathname === menu.href; // 現在のページがメニューのリンクと一致するか

        return (
          <Link key={index} href={menu.href}>
            <button
              className="flex flex-col items-center"
              onClick={(e) => {
                if (isActive) {
                  e.preventDefault(); // ページリロードを防止
                  scrollToTop(); // 現在のページならスムーズスクロール
                }
              }}
            >
              <img
                src={isActive ? menu.activeIcon : menu.icon} // active 状態によってアイコンを切り替える
                alt={`${menu.name} アイコン`}
                className="w-10 h-10"
              />
              <span
                className={`text-sm ${
                  isActive ? "text-[#3D6E55] font-bold" : "text-gray-500"
                }`}
              >
                {menu.name}
              </span>
            </button>
          </Link>
        );
      })}
    </div>
  );
}