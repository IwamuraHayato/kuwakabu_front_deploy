'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const MagazinePage1 = () => {
    const router = useRouter();

    return (
        <div className="pb-[106px] bg-[#ECEADA] min-h-screen py-0 px-0">

            {/* 戻るボタン */}
            <button
                onClick={() => router.back()}
                className="flex text-gray-500 py-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <div className="flex justify-center">
                <img
                    src="/magazine/1/images/magazine_1_top.jpg"
                    alt="クワカブマガジン トップ画像"
                    className="w-full h-64 object-cover mb-3 max-w-screen-md"
                />
            </div>
            {/* メインコンテナ */}
            <div className="bg-white mx-auto max-w-screen-md font-roboto">
                {/* コンテンツセクション */}
                <div className=" p-5">
                    {/* タイトル */}
                    <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl font-bold mb-2">服装・道具を準備しよう</h1>

                    {/* 日時 */}
                    <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg font-roboto text-[#929292] mb-4">2024.12.18</p>

                    {/* 本文 */}
                    <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg font-roboto leading-relaxed mb-4">
                        カブクワ採集をするための服装や道具を紹介します。<br />
                        特に初心者や初めての場所に行くときは、事前にしっかりと準備をしておきましょう。
                    </p>

                    {/* 小見出し */}
                    <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl font-bold mb-2">安全面にも配慮した服装</h2>

                    {/* 追加本文 */}
                    <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg font-roboto leading-relaxed">
                        クワカブ採集をするときのお勧めの服装を紹介します。<br />
                        カブクワ採集の時期は高温多湿な気候であることが多いため、通気性が良く肌を露出しない服装がお勧めです。<br />
                        ・帽子<br />
                        ・袖の長いTシャツ<br />
                        ・長ズボン<br />
                        ・長靴orトレッキングシューズ<br />
                        ・全身に虫除けスプレーをかけます<br />
                        クワカブの生息しているような場所は、他の動植物もたくさん生息しています。<br />
                        スズメバチややぶ蚊、マダニ、ヘビなど、人間の体に危険を及ぼす生物がいるかもしれません。<br />
                        特にスズメバチは良く遭遇する危険生物です。黒色（黒髪を含む）はスズメバチが攻撃対象と認識しやすいので避けましょう。<br />
                        長靴を履いておくとヘビやマダニからの被害を避けやすくなります。<br />
                        <br />
                    </p>
                    {/* 小見出し */}
                    <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl font-bold mb-2">最低限の持ち物</h2>

                    {/* 追加本文 */}
                    <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg font-roboto leading-relaxed">
                        最低限これだけはもっておきたい持ち物を紹介します。
                    </p>

                    {/* サブ画像 */}
                    <img
                        src="/magazine/1/images/magazine_1_1.jpg"
                        alt="画像"
                        className="w-full h-auto object-cover rounded-[4px] my-3"
                    />
                    {/* 追加本文 */}
                    <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg font-roboto leading-relaxed">
                        ・タオル<br />
                        ・水筒 or ペットボトル<br />
                        ・虫ケース or パーツケース<br />
                        ・虫網<br />
                        ・ライト<br />
                        とにかく暑いです。汗拭きタオルと飲料は必須です。<br />
                        虫ケース、パーツケース、虫網は100均でも手に入ります。<br />
                        複数のクワカブをケンカさせずに収納できるパーツケースは重宝します。<br />
                        意外と虫のいる場所は暗いところが多いです。昼間でもライトは持っていきましょう。夜間の場合は一人一つ必要です。<br />
                        <br />
                    </p>
                    {/* 小見出し */}
                    <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl font-bold mb-2">その他あると安心な持ち物</h2>

                    {/* 追加本文 */}
                    <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg font-roboto leading-relaxed">
                        もっと準備万端にしたい場合はこんな物もあると安心です。ご参考に！<br />
                        ・虫除けスプレー<br />
                        ・スズメバチ避けスプレー<br />
                        ・熊除けベル<br />
                        ・手袋<br />
                        ・かき出し棒<br />
                        ・高輝度ライト<br />
                        ・ノギス or 定規<br />
                        かき出し棒は、木の隙間や穴に入り込んだクワガタを取り出すときに便利です。木や昆虫を傷つけないように注意しましょう。大切なマナーです。<br />
                        夜間の採集では高輝度ライトが大活躍します。遠くや高い場所を照らすためには必要アイテムです。そこそこ高価（数千円）です。照射エリアを広域/スポットと切り替えられるタイプが扱いやすいです。<br />
                        採集した虫のサイズが気になって気になって夜しか眠れないような人は、ノギスや定規を持っていくと良いでしょう。<br />
                    </p>
                </div>
            </div>
        </div>

    );
};

export default MagazinePage1;


