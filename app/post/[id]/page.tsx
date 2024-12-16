"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // URL のパラメータ取得
import Script from "next/script";
import GoogleMap from "./GoogleMap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

// 型定義を明確に記述
interface PostImage {
    position: number;
    url: string;
}

interface Post {
    post_id: number;
    user_id: number;
    description: string;
    collected_at: string;
    user_name: string;
    user_icon: string;
    dangerous_species_names: string;
    dangerous_species_other: string;
    whether: string;
    temperature: number;
    crowd_level: number;
    is_restricted_area: boolean;
    free_memo: string;
    facilities: string;
    facility_other: string;
    location_name: string;
    latitude: number;
    longitude: number;
    methods: string;
    method_other: string;
    species_data: string | null;
    species_info_species_other: string | null;
    trees: string;
    tree_other: string;
    images: PostImage[];
}

const PostPage = () => {
    const { id } = useParams(); // 動的ルートから `id` を取得
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState<string | null>(null); // エラーステートを追加

    // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const backendUrl = "https://tech0-gen-8-step3-app-py-16.azurewebsites.net";    

    // デフォルトの緯度経度を定義
    const DEFAULT_LATITUDE = 35.6895; // 東京の緯度
    const DEFAULT_LONGITUDE = 139.6917; // 東京の経度

    useEffect(() => {
        if (!backendUrl) {
            console.error('バックエンドURLが設定されていません');
            setError('バックエンドURLが設定されていません');
            return;
        }

        // `id` に基づいて投稿データをフェッチ
        const fetchPost = async () => {
            try {
                const response = await fetch(`${backendUrl}/post/${id}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'ネットワーク応答に問題があります');
                }
                const data: Post = await response.json();
                setPost(data);
            } catch (error) {
                console.error('投稿の取得中にエラーが発生しました:', error);
                setError('投稿の取得に失敗しました。後ほど再試行してください。');
            }
        };
        fetchPost();
    }, [id, backendUrl]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>読み込み中...</div>;
    }

    const fullUrl = (relativePath: string) =>
        `${backendUrl}${relativePath.startsWith("/") ? relativePath : `/${relativePath}`}`;

    // カルーセル設定
    const sliderSettings = {
        dots: true,
        infinite: post.images.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        swipe: true,
    };

    return (
        <div
            className="pb-[106px] min-h-screen py-0 px-0 overflow-x-hidden"
            style={{ maxWidth: "100%", backgroundColor: "#FFFFFF", color: "#000000" }} // 背景色: 白、テキスト色: 黒
        >
            {/* ユーザー */}
            <div className="flex items-center space-x-2 text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl font-roboto mb-2 mt-2 ml-5">
                <Image
                    src={fullUrl(post.user_icon || '/static/images/icon_images/face-icon.svg')}
                    alt={post.user_name || 'ユーザー'}
                    width={30}
                    height={30}
                    className="rounded-full"
                />
                <p>{post.user_name}</p>
            </div>
            {/* カルーセル */}
            <div className="pb-[20px] bg-[#EEEEEE]">
                <div className="mx-auto" style={{ maxWidth: "800px" }}> {/* 画面幅に応じた最大幅 */}
                    <Slider
                        {...sliderSettings}
                        infinite={post.images.length > 1} // 画像が1枚のときは無限スクロールを無効化
                        className="flex items-center justify-center"
                    >
                        {post.images && post.images.length > 0 ? (
                            post.images.map((image, index) => (
                                <div key={index} className="flex items-center justify-center h-120">
                                    <img
                                        src={fullUrl(image.url)}
                                        alt={`Image position ${image.position}`}
                                        style={{
                                            width: "100%",
                                            maxWidth: "100%",
                                            maxHeight: "500px", // 最大高さを設定
                                            objectFit: "contain",
                                            margin: "0 auto",
                                        }}
                                        className="object-contain max-h-full"
                                    />
                                </div>
                            ))
                        ) : (
                            // 画像がない場合のデフォルト画像
                            <div className="flex items-center justify-center h-120">
                                <img
                                    src={fullUrl('/static/images/post_images/no-image-icon.svg')}
                                    alt="No Image Available"
                                    style={{
                                        width: "100%",
                                        maxWidth: "100%",
                                        maxHeight: "500px", // 最大高さを設定
                                        objectFit: "contain",
                                    }}
                                    className="object-contain max-h-full"
                                />
                            </div>
                        )}
                    </Slider>
                </div>
            </div>
            <div className="text-sm sm:text-base md:text-base lg:text-xl xl:text-xl font-roboto mt-4 px-5">
                {/* コメント */}
                <p className="mb-8">{post.description}</p>
                <p className="mb-8 border-b border-gray-300"></p>
                {/* 採集成果 */}
                <p className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl font-roboto mb-4"><strong>採集成果</strong></p>

                <div className="overflow-hidden rounded-sm">
                    <table className="table-auto border-collapse border border-gray-200 w-full text-sm sm:text-base">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-2 py-1 text-left">種類</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">性別</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">採集数</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">最大サイズ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {post.species_data && post.species_data.trim()
                                ? post.species_data
                                    .split(",")
                                    .reduce<string[][]>((result, _, index, array) => {
                                        if (index % 4 === 0) result.push(array.slice(index, index + 4));
                                        return result;
                                    }, [])
                                    .map((data, idx) => (
                                        <tr key={idx} className="border-b border-gray-200">
                                            <td className="border border-gray-300 px-2 py-1">{data[0]}</td>
                                            <td className="border border-gray-300 px-2 py-1">{data[1]}</td>
                                            <td className="border border-gray-300 px-2 py-1">{data[2]}</td>
                                            <td className="border border-gray-300 px-2 py-1">{data[3]} mm</td>
                                        </tr>
                                    ))
                                : (
                                    <tr>
                                        <td colSpan={4} className="border border-gray-300 text-center py-2">
                                            採集データがありません
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                {/* 採集情報 */}
                <p className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl font-roboto mt-8 mb-4"><strong>採集情報</strong></p>
                <div className="grid grid-cols-2">
                    <p>採集日時</p>
                    <p className="-mx-16">
                        {
                            post.collected_at
                                ? new Intl.DateTimeFormat('ja-JP', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                }).format(new Date(post.collected_at))
                                : "不明"
                        }
                    </p>

                    <p>採集場所</p>
                    <p className="-mx-16">{post.location_name}</p>
                    <p>採集方法</p>
                    <p className="-mx-16">{post.methods}</p>
                    <p>採集方法 その他</p>
                    <p className="-mx-16">{post.method_other}</p>
                    <p>樹木</p>
                    <p className="-mx-16">{post.trees}</p>
                    <p>樹木情報 その他</p>
                    <p className="-mx-16">{post.tree_other}</p>
                </div>
                {/* GoogleMap */}
                <div
                    className="h-auto w-full mt-8 mb-2" // h-screen を h-auto に変更
                    style={{
                        width: "100%",
                        height: "240px", // 必要に応じて高さを調整
                    }}
                >
                    <GoogleMap
                        latitude={isFinite(post.latitude) ? post.latitude : DEFAULT_LATITUDE}
                        longitude={isFinite(post.longitude) ? post.longitude : DEFAULT_LONGITUDE}
                        mapWidth="100%"
                        mapHeight="100%"
                    />
                </div>
                {/* GoogleMapリンクボタン */}
                <button
                    className="bg-white text-[#0073D1] border-2 border-[#0073D1] px-2 py-1 rounded-md float-right hover:bg-[#003878]"
                    onClick={() =>
                        window.open(
                            `https://www.google.com/maps?q=${post.latitude},${post.longitude}`,
                            "_blank"
                        )
                    }
                >
                    地図アプリで開く
                </button>
                {/* 環境情報 */}
                <p className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl font-roboto mt-16 mb-4"><strong>環境情報</strong></p>
                <div className="grid grid-cols-2">
                    <p>天気</p><p className="-mx-16">{post.whether}</p>
                    <p>気温</p><p className="-mx-16">{post.temperature}℃</p>
                    <p>遭遇した危険生物</p><p className="-mx-16">{post.dangerous_species_names}</p>
                    <p>危険 その他</p><p className="-mx-16">{post.dangerous_species_other}</p>
                    <p>人の混み具合</p>
                    <p className="-mx-16">
                        {{
                            1: "少",
                            2: "中",
                            3: "多",
                        }[post.crowd_level] || "不明"}
                    </p>
                    <p>周辺施設</p><p className="-mx-16">{post.facilities}</p>
                    <p>周辺施設 その他</p><p className="-mx-16">{post.facility_other}</p>
                    <p>進入禁止エリア</p>
                    <p className="-mx-16">
                        {post.is_restricted_area ? "対象" : "対象外"}
                    </p>
                </div>
                <p className="mt-4">フリーコメント</p><p className="ml-4">{post.free_memo}</p>
            </div>
        </div>
    );
};

export default PostPage;