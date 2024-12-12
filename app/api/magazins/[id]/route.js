
export async function GET(request, { params }) {
    const { id } = params;
  
    // ダミーデータの定義
    const articles = [
      {
        id: "1",
        title: "記事タイトル1",
        date: "2024-11-24",
        content: "この記事の詳細内容がここに表示されます。",
      },
      {
        id: "2",
        title: "記事タイトル2",
        date: "2024-11-23",
        content: "この記事の詳細内容がここに表示されます。",
      },
    ];
  
    // IDに基づいて該当記事を検索
    const article = articles.find((a) => a.id === id);
  
    // 該当記事が見つからない場合は404を返す
    if (!article) {
      return new Response(JSON.stringify({ error: "Article not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  
    // 該当記事を返す
    return new Response(JSON.stringify(article), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  