// フォームから渡された formData を元に顧客情報を作成し、API（バックエンド）にデータを送信

// import { revalidatePath } from 'next/cache';

// フォームから渡された formData を元に顧客情報を作成し、API（バックエンド）にデータを送信
const createCustomer = async (data) => {
    try {
        const creating_name = data.name;
        const creating_collection_start_at = data.collection_start_at;

        const body_msg = JSON.stringify({
            name: creating_name,
            collection_start_at: creating_collection_start_at,
        });

        console.log("Request Body:", body_msg); // デバッグ用ログ

        const res = await fetch("https://tech0-gen-8-step3-app-py-16.azurewebsites.net/user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body_msg,
        });

        if (!res.ok) {
            const errorData = await res.json(); // バックエンドから返されたエラーメッセージを取得
            console.error("Error Response:", errorData);
            throw new Error('Failed to create customer');
        }

        const responseData = await res.json(); // バックエンドのレスポンスを取得
        console.log("Customer created successfully!", responseData);

        return responseData; // バックエンドのレスポンスを返す
    } catch (error) {
        console.error("Error in createCustomer:", error);
        throw error;
    }
};

export default createCustomer;
