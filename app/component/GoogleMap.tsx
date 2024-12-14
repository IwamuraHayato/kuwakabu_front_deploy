// frontend/app/component/GoogleMap.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  Pin,
} from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation"; // 修正: useRouter をインポート

// const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

type PostData = {
  id: number;
  user_id: number;
  description: string | null;
  collected_at: string | null;
  latitude: number;
  longitude: number;
  location_name: string | null;
  prefecture: string | null;
  city: string | null;
  species_names: string[];
};

type PostDetails = {
  id: number;
  description: string | null;
  collected_at: string | null;
  location: { name: string; latitude: number; longitude: number };
  species_names: string[];
  user: { name: string; icon: string | null };
  image_url: string | null; // 投稿画像
};

interface GoogleMapProps {
  searchTerm?: string;
  centerLat?: number | null;
  centerLng?: number | null;
  defaultZoom?: number;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  searchTerm = "",
  centerLat = null,
  centerLng = null,
  defaultZoom = 16,
}) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [selectedPost, setSelectedPost] = useState<PostDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // 修正: router を初期化

  // 投稿データを取得
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
      let url = "https://tech0-gen-8-step3-app-py-16.azurewebsites.net/map/posts";
      // let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/map/posts`;
      // let url = "http://127.0.0.1:5000/map/posts";
      const params = new URLSearchParams();

      if (searchTerm.trim() !== "") {
        params.set("search", searchTerm);
      }

      if (Array.from(params).length > 0) {
        url += `?${params.toString()}`;
      }

      try {
        const res = await fetch(url);
        if (!res.ok) {
          console.error("Failed to fetch posts");
          return;
        }

        const { posts = [], max_post } = await res.json();
        setPosts(posts);

        if (centerLat !== null && centerLng !== null) {
          setMapCenter({ lat: centerLat, lng: centerLng });
        } else if (max_post) {
          const maxPost = posts.find((post) => post.id === max_post);
          if (maxPost) {
            setMapCenter({ lat: maxPost.latitude, lng: maxPost.longitude });
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, centerLat, centerLng]);

  // 投稿詳細を取得
  const fetchPostDetails = async (postId: number) => {
    try {
      let url = "https://tech0-gen-8-step3-app-py-16.azurewebsites.net/map/posts";
      // let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/map/posts`;
      const res = await fetch(`https://tech0-gen-8-step3-app-py-16.azurewebsites.net/map/posts/${postId}`);
      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/map/posts/${postId}`);
      if (!res.ok) {
        console.error("Failed to fetch post details");
        return;
      }

      const data: PostDetails = await res.json();
      setSelectedPost(data);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  // ローディング中
  if (loading || !mapCenter) {
    return <p>マップを読み込んでいます...</p>;
  }

  return (
    <div style={{ height: "90%", width: "100%" }}>
      <APIProvider
        apiKey={"AIzaSyBMfzoWS9VrllIqFtNGERqBsVknX-9O9fM"}
        // apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          mapId={"8527f8af06fe26a9"}
          defaultZoom={defaultZoom}
          defaultCenter={mapCenter}
        >
          {posts.map((post) => (
            <AdvancedMarker
              key={post.id}
              position={{ lat: post.latitude, lng: post.longitude }}
              onClick={() => fetchPostDetails(post.id)}
            >
              <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
            </AdvancedMarker>
          ))}

          {/* 吹き出し（InfoWindow） */}
          {selectedPost && (
            <InfoWindow
              position={{
                lat: selectedPost.location.latitude,
                lng: selectedPost.location.longitude,
              }}
              onCloseClick={() => setSelectedPost(null)} // 吹き出しを閉じる
            >
              <div
                style={{
                  display: "flex",
                  maxWidth: "300px",
                  alignItems: "stretch",
                  cursor: "pointer", // クリック可能なデザイン
                }}
                onClick={() => router.push(`/post/${selectedPost.id}`)} // 修正: クリックで詳細ページへ遷移
              >
                {/* 画像部分 */}
                <div style={{ flex: "1", marginRight: "10px", display: "flex", alignItems: "center" }}>
                  <img
                    src={selectedPost.image_url || "/src/no-image-icon.svg"}
                    alt="投稿画像"
                    style={{
                      width: "100px",
                      height: "auto",
                      maxHeight: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                {/* テキスト部分 */}
                <div style={{ flex: "2", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <h4
                    style={{
                      margin: "0",
                      fontWeight: "bold",
                      fontSize: "medium",
                      color: "black",
                    }}
                  >
                    {selectedPost.location.name}
                  </h4>
                  <p
                    style={{
                      margin: "5px 0",
                      fontWeight: "bold",
                      fontSize: "small",
                      color: "black",
                    }}
                  >
                    {selectedPost.species_names.join(" / ") || "種情報なし"}
                  </p>
                  <p
                    style={{
                      margin: "5px 0",
                      fontWeight: "normal",
                      fontSize: "small",
                      color: "black",
                    }}
                  >
                    {selectedPost.collected_at || "不明な採集日"}
                  </p>
                  <p
                    style={{
                      margin: "5px 0",
                      fontWeight: "normal",
                      fontSize: "small",
                      color: "black",
                    }}
                  >
                    {selectedPost.description || "説明がありません"}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                    <img
                      src={selectedPost.user.icon || "/src/face-icon.svg"}
                      alt="ユーザーアイコン"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginRight: "8px",
                      }}
                    />
                    <span
                      style={{
                        fontWeight: "normal",
                        fontSize: "small",
                        color: "black",
                      }}
                    >
                      {selectedPost.user.name || "匿名"}
                    </span>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default GoogleMap;