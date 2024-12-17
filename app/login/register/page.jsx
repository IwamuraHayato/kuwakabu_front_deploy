"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "../../component/Button";
import createCustomer from "./createCustomer";

export default function CreatePage() {
  const formRef = useRef();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

    if (formData.get("name") === "") {
      alert("ニックネームを入力してください！！");
      return;
    }

    const requestData = {
      name: formData.get("name"),
      collection_start_at: formData.get("collection_start_at"),
    };

    console.log("Request Data:", requestData);

    try {
      const response = await createCustomer(requestData);
      router.push(`/login/registrationComplete?user_id=${response.user_id}&password=${response.password}`);
    } catch (error) {
      console.error("Error during registration:", error);
      alert("登録に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <header className="flex items-center justify-between p-3 h-14 bg-white text-black z-10">
        <button onClick={() => router.push("/")} className="text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </header>
      <div className="p-5 grid items-center justify-items-center bg-[#ECEAD8] !text-black min-h-screen">
        <img
          src="/src/logo.png"
          alt="クワカブトリタイ"
          className="mx-auto mb-6 h-[133px]"
        />
        <div className="flex flex-col justify-center w-96">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium !text-black"
              >
                ニックネーム:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="クワカブ太郎"
                className="mt-1 block w-full px-3 py-2 border !border-gray-300 rounded-md shadow-sm bg-white !text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="collection_start_at"
                className="block text-sm font-medium !text-black"
              >
                いつから採集を開始しましたか？:
              </label>
              <input
                type="date"
                name="collection_start_at"
                id="collection_start_at"
                placeholder="2024-12-18"
                className="mt-1 block w-full px-3 py-2 border !border-gray-300 rounded-md shadow-sm bg-white !text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex justify-center">
              <Button
                title="登録する"
                type="submit"
                bgColor="#3D6E55"
                textColor="white"
                hoverColor="#2F5544"
                activeScale={0.95}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
