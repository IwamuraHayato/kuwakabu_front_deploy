"use client";

import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  Pin,
} from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";

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
  const [mapZoom, setMapZoom] = useState(defaultZoom); // ズームレベルの状態管理
  const [selectedPost, setSelectedPost] = useState<PostDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false); // 検索結果がないかどうか
  const router = useRouter();

  const DEFAULT_LAT = 35.681236;
  const DEFAULT_LNG = 139.767125;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/map/posts`;
      let url = "https://tech0-gen-8-step3-app-py-16.azurewebsites.net/map/posts";

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

        if (posts.length === 0) {
          setNoResults(true);
          setMapZoom(defaultZoom);
          if (!centerLat || !centerLng) {
            setMapCenter({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
          }
        } else {
          setNoResults(false);
          if (centerLat !== null && centerLng !== null) {
            setMapCenter({ lat: centerLat, lng: centerLng });
            setMapZoom(12);
          } else if (max_post) {
            const maxPost = posts.find((post) => post.id === max_post);
            if (maxPost) {
              setMapCenter({ lat: maxPost.latitude, lng: maxPost.longitude });
              setMapZoom(12);
            }
          } else {
            setMapCenter({ lat: posts[0].latitude, lng: posts[0].longitude });
            setMapZoom(12);
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

  const fetchPostDetails = async (postId: number) => {
    try {
      const res = await fetch(`https://tech0-gen-8-step3-app-py-16.azurewebsites.net/map/post/${postId}`);
      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/map/post/${postId}`);
      if (!res.ok) {
        console.error("Failed to fetch post details");
        return;
      }

      const data: PostDetails = await res.json();

      // バックエンドURLを補完して画像パスを修正
      // data.user.icon = `${process.env.NEXT_PUBLIC_API_BASE_URL}${data.user.icon}`;
      // data.image_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${data.image_url}`;
      data.user.icon = `https://tech0-gen-8-step3-app-py-16.azurewebsites.net${data.user.icon}`;
      data.image_url = `https://tech0-gen-8-step3-app-py-16.azurewebsites.net${data.image_url}`;


      setSelectedPost(data);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  return (
    <div style={{ height: "90%", width: "100%", position: "relative" }}>
      {noResults && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <p style={{ fontSize: "16px", color: "#555", fontWeight: "bold" }}>
            検索結果がありませんでした
          </p>
        </div>
      )}

      <APIProvider
        apiKey="AIzaSyBMfzoWS9VrllIqFtNGERqBsVknX-9O9fM"
        // apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} // 環境変数から API キーを取得
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          mapId={"8527f8af06fe26a9"}
          zoom={mapZoom}
          center={mapCenter || { lat: DEFAULT_LAT, lng: DEFAULT_LNG }}
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

          {selectedPost && (
            <InfoWindow
              position={{
                lat: selectedPost.location.latitude,
                lng: selectedPost.location.longitude,
              }}
              onCloseClick={() => setSelectedPost(null)}
            >
              <div
                style={{
                  display: "flex",
                  maxWidth: "320px",
                  padding: "10px",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => router.push(`/post/${selectedPost.id}`)}
              >
                <div
                  style={{
                    flex: "0 0 100px",
                    height: "100px",
                    overflow: "hidden",
                    borderRadius: "8px",
                    marginRight: "10px",
                  }}
                >
                  <img
                    src={selectedPost.image_url}
                    alt="投稿画像"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 5px 0",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#333",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {selectedPost.location.name}
                  </h4>
                  <p
                    style={{
                      margin: "5px 0",
                      fontSize: "14px",
                      color: "#555",
                      lineHeight: "1.4",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {selectedPost.species_names.join(" / ") || "種情報なし"}
                  </p>
                  <p
                    style={{
                      margin: "5px 0",
                      fontSize: "12px",
                      color: "#888",
                    }}
                  >
                    {selectedPost.collected_at || "不明な採集日"}
                  </p>
                  <p
                    style={{
                      margin: "5px 0",
                      fontSize: "12px",
                      color: "#666",
                    }}
                  >
                    {selectedPost.description || "説明がありません"}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <img
                      src={selectedPost.user.icon}
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
                        fontSize: "14px",
                        color: "#333",
                        fontWeight: "500",
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