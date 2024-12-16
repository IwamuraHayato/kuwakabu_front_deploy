export default async function getUserFromDb(id: string, password: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/authenticate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password }),
    });

    if (!response.ok) {
      return null; // 認証失敗
    }

    const data = await response.json();
    return data.user; // ユーザー情報を返す
  } catch (error) {
    console.error("Error in getUserFromDb:", error);
    return null;
  }
}