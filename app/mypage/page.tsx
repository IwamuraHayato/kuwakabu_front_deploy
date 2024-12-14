"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { differenceInYears, differenceInMonths } from 'date-fns';

interface Post {
  id: number;
  user_name: string;
  location_name: string;
  collected_at: string;
  description: string;
  user_icon: string;
  species_name: string;
  collection_start_at: string;
  post_count: string;
}

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  // user_id を手動で設定
  const user_id: number = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // 例: http://127.0.0.1:5000
        // const response = await fetch(`${backendUrl}/mypage?user_id=${user_id}`);
        const response = await fetch(`https://tech0-gen-8-step3-app-py-16.azurewebsites.net/mypage?user_id=${user_id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err: any) { // TypeScript の場合、エラーメッセージの型を明確にする
        setError(err.message || "Unknown error");
      }
    };

    fetchPosts();
  }, [user_id]);

  // posts が空でない場合、最初の post からユーザー情報を取得
  const user = posts.length > 0 ? posts[0] : null;

  // 経過年月を計算する関数
  const calculateElapsedMonths = (startDate: string): string => {
    const start = new Date(startDate);
    const today = new Date();
    let years = differenceInYears(today, start);
    let months = differenceInMonths(today, start) - years * 12;
    // 両方がゼロの場合
    if (years === 0 && months === 0) {
      return "0ヶ月";
    }
    // 表示用の文字列を作成
    const yearText = years > 0 ? `${years}年` : "";
    const monthText = months > 0 ? `${months}ヶ月` : "";
    return `${yearText} ${monthText}`.trim();
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pb-[106px] min-h-screen bg-[#ECEADA] font-roboto">
      {/* ヘッダーセクション */}
      {user && (
        <div className="flex justify-between items-start pt-4 pb-4 pl-5 pr-5">
          {/* 左セクション */}
          <div className="flex flex-col items-start space-y-2">
            {/* 左上: user_icon */}
            <Image
              src={user.user_icon !== '-' ? user.user_icon : '/icons/user.svg'}
              alt={user.user_name || 'ユーザー'}
              width={117}  // 大きめに設定
              height={117}
              className="rounded-full" // 円形にする場合
            />
            {/* 左下: user_name */}
            <p className="text-black text-[16px] font-semibold pl-4">{user.user_name}</p>
          </div>

          {/* 中セクション */}
          <div className="flex flex-col items-center space-y-2">
            {/* 中上: post_count */}
            <p className="text-black text-[16px] font-bold">{user.post_count}</p>
            {/* 中下: 投稿数 */}
            <p className="text-black text-[12px] font-bold">投稿数</p>
          </div>

          {/* 右セクション */}
          <div className="flex flex-col items-center space-y-2">
            {/* 右上: collection_start_at */}
            <p className="text-black text-[16px] font-bold">
              {calculateElapsedMonths(user.collection_start_at)}
            </p>
            {/* 右下: 採集歴 */}
            <p className="text-black text-[12px] font-bold pr-4">採集歴</p>
          </div>
        </div>
      )}

      {/* ボーダー */}
      <div className="w-full border-b-4 border-gray-400"></div>

      {/* 記事一覧 */}
      <div className="pt-4 pb-[106px] pl-5 min-h-screen bg-[#ffffff] font-roboto">
        <div className="flex flex-wrap gap-4 justify-start">
          {posts.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <div
                className="bg-white rounded-[4px] shadow-lg w-[185px] h-[279px] cursor-pointer hover:shadow-xl transition-shadow"
              >
                <Image
                  src={"/gataro_images/IMG_9174.jpg"}
                  alt={post.species_name}
                  width={185}  // Image コンポーネントの width を設定
                  height={185} // Image コンポーネントの height を設定
                  className="w-full h-[185px] object-cover rounded-[4px] mb-2"
                />
                <div className="px-1">
                  <h2 className="text-[14px] text-black font-semibold mb-0">
                    {post.species_name.length > 11
                      ? `${post.species_name.slice(0, 11)}...`
                      : post.species_name}
                  </h2>
                  <h2 className="text-[12px] text-black font-semibold mb-0">
                    {post.location_name.length > 13
                      ? `${post.location_name.slice(0, 13)}...`
                      : post.location_name}
                  </h2>
                  <p className="text-[10px] text-black mb-0">{post.collected_at}</p>
                  <p className="text-[10px] text-black">
                    {post.description.length > 32
                      ? `${post.description.slice(0, 32)}...`
                      : post.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
