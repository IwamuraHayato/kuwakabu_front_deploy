
export async function GET(request) {
    // ダミーデータの定義
    const articles = [
      { id: "1", title: "記事タイトル1", date: "2024-11-24" },
      { id: "2", title: "記事タイトル2", date: "2024-11-23" }
    ];
  
    // JSON形式でデータを返す
    return new Response(JSON.stringify(articles), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  