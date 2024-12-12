// 各ページでボタンを呼び出すときは以下で使えます。titleとhrefは必須。
// <Button
//   title="検索する"
//   href="/search"
//   type="button"
//   bgColor="#FF5722"
//   textColor="#FFFFFF"
//   hoverColor="#D1401A"
//   activeScale={0.9}
//   onClick={hogehoge}
// />
"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Button = ({
  title,
  href,
  type = "button",
  bgColor = "#3D6E55",
  textColor = "white",
  hoverColor = "#2F5544",// ホバー時の背景色
  activeScale = 0.95, // クリック時の縮小率
  onClick = null, // オプションとして初期値をnullに設定
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      // カスタムクリックイベントがあれば優先して実行
      onClick();
    } else if (href) {
      // hrefが指定されている場合、ルーティング処理を実行
      router.push(href);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`w-[calc(100%-40px)] max-w-[400px] h-[52px] mx-auto block rounded-lg font-bold text-center shadow transition-all duration-300 my-5`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hoverColor; // ホバー時の背景色
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = bgColor; // ホバー解除時に元の色に戻す
        e.currentTarget.style.transform = "scale(1)"; // 元のサイズに戻す
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = `scale(${activeScale})`; // 押し込んだ時の縮小
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)"; // 離した時に元のサイズ
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)"; // 要素外にカーソルが移動した時もリセット
      }}
    >
      {title}
    </button>
  );
};

export default Button;