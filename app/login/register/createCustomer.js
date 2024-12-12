// フォームから渡された formData を元に顧客情報を作成し、API（バックエンド）にデータを送信

// import { revalidatePath } from 'next/cache';

const createCustomer = async (data) => {
    try{
        const creating_name = data.name;
        const creating_collection_start_at = data.collection_start_at;
    
        const body_msg = JSON.stringify({
            name: creating_name,
            collection_start_at: creating_collection_start_at,
        })
    
        console.log("Request Body:", body_msg); // デバッグ用ログ
    
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body_msg,
        });
        
        if (!res.ok) {
            const errorData = await res.json(); // バックエンドから返されたエラーメッセージを取得
            console.error("Error Response:", errorData);
            throw new Error('Failed to create customer');
        }
    
        console.log("Customer created successfully!");
    }  catch (error){
        console.error("Error in createCustomer:", error);
        throw error;
    }
    };

export default createCustomer;
