// `登録フォームのページ
"use client"
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

import createCustomer from './createCustomer';

export default function CreatePage() {
    const formRef = useRef();
    const router = useRouter();

    // const handleClick = (e) => {
    //     if(e.target.value.length = 0 ){
    //         alert("IDを入力してください！！");
    //         return;
    //     }
    //     SetText(e.target.value);
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        console.log(formData.get("name"));
        console.log(formData.get("collection_start_at"));
        //追加したコード↓
        if(formData.get("name") === ""){
            alert("ニックネームを入力してください！！");
            return
        }
        //追加したコード↑
        
        // データを作成して送信
        const requestData = {
            name: formData.get("name"),
            collection_start_at: formData.get("collection_start_at")
        };

        console.log("Request Data:", requestData); // デバッグ用

        // createCustomer を呼び出し
        await createCustomer(requestData);
        // router.push(`./create/confirm?customer_id=${formData.get("id")}`);
    };

    return (
        <>
            <div className="">
                <div className="">
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="">
                            <h2 className="flex justify-center">
                                <p>ニックネーム:<input type="text" name="name" placeholder="クワカブ" className="" /></p>
                            </h2>
                            <p className='flex justify-center'>いつから最終を開始しましたか？:<input type="date" name="collection_start_at" placeholder="30" className="" /></p>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="btn">
                                登録する
                            </button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </>
    )}