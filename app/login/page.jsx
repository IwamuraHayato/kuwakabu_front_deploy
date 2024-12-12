// ログインするページ
"use client"
import { useRef, useState } from 'react';
import SignIn from '../component/header_component/Signin-button';
import { useSession } from "next-auth/react"; 
import SignOut from '../component/header_component/Signout-button';
import Button from '../component/Button';

export default function Page() {
  const formRef = useRef();
  const { data: session } = useSession();
  
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues,[name]: value });
  //   // console.log(formValues);
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    console.log(formData.get("collection_start_at"));
    
    // データを作成して送信
    const requestData = {
        collection_start_at: formData.get("collection_start_at")
    };

    console.log("Request Data:", requestData); // デバッグ用

    // createCustomer を呼び出し
    await createCustomer(requestData);
    // router.push(`./create/confirm?customer_id=${formData.get("id")}`);
};

  if(session?.user){
    console.log(session.user.name);
    console.log(session.user.id);
    console.log(session.user.email);
  }


  return (
      <div className="p-5 grid items-center justify-items-center">
        <h1>Hello, login Page!</h1>
        <div className="">
                <div className="">
                    <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                        <div className="">
                            <p className='flex justify-center'>いつから最終を開始しましたか？:
                              <input 
                                type="date" 
                                name="collection_start_at" 
                                placeholder="30" 
                                className="" 
                                />
                            </p>
                        </div>
                    </form>
                  <div className='flex flex-col justify-center'>
                    {session?.user ? (
                      <>
                        <p>Signed in as {session.user.name}</p>
                        <p>User ID: {session.user.id}</p>
                        <p>mail: {session.user.email}</p>
                        {session.user.image && (
                          <img src={session.user.image} alt="User avatar" className="avatar inline-block size-16 rounded-full ring-2 ring-white " />
                        )}
                        <div className="flex justify-center">
                          <SignOut />
                        </div>
                        <div>
                          <Button title="ホームに戻る" href="/" />
                        </div>
                      </>
                    ) : (
                      <>
                      <div className="flex justify-center">
                        <SignIn />
                      </div>
                      <div>
                        <Button title="ホームに戻る" href="/" />
                      </div>
                      </>
                    )}
                  </div>
                </div>
            </div>
      </div>
  
      );
    }