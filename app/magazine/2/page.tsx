import React from 'react';

const MagazinePage1 = () => {
    return (
        <div className="pb-[106px] bg-[#ECEADA] min-h-screen py-0 px-0">
            <div className="flex justify-center">
                <img
                    src="/magazine/2/images/magazine_2_top.jpg"
                    alt="クワカブマガジン トップ画像"
                    className="w-full h-64 object-cover mb-3 max-w-screen-md"
                />
            </div>
            {/* メインコンテナ */}
            <div className="bg-white mx-auto max-w-screen-md font-roboto">
                {/* コンテンツセクション */}
                <div className=" p-5">
                    {/* タイトル */}
                    <h1 className="text-[20px] text-black font-bold mb-2">森や山の危険を知っておこう</h1>

                    {/* 日時 */}
                    <p className="text-[10px] text-[#929292] mb-4">2024.12.18</p>

                    {/* 本文 */}
                    <p className="text-[10px] text-black leading-relaxed mb-4">
                        カブクワが生息している豊かな森や山には人に危害を与えることができる生物も住んでいます。<br />
                        クワカブ採集で遭遇する危険の一部をご紹介します。
                    </p>

                    {/* 小見出し */}
                    <h2 className="text-[16px] text-black font-semibold mb-2">彼ら生物たちの場所</h2>

                    {/* 追加本文 */}
                    <p className="text-[10px] text-black leading-relaxed">
                        前提として、森や山にクワカブ採集に行くとき、そこで生活している生物たちの場所・住処にお邪魔させていただいています。<br />
                        彼らにむやみに攻撃したり、巣を破壊するなどの行為は絶対にやめましょう。<br />
                        <br />
                    </p>

                    {/* 小見出し */}
                    <h2 className="text-[16px] text-black font-semibold mb-2">人間に危害を与える生物たち</h2>

                    {/* 追加本文 */}
                    <p className="text-[10px] text-black leading-relaxed">
                        クワカブ採集をしているときに遭遇する人間に危害を与えることができる生物を紹介します。<br />
                        できるだけ遭遇しないように、遭遇しても危険な状態にならないようにするために対策を学んでおきましょう。<br />
                        また、本アプリの投稿情報から危険情報もしっかり確認しましょう。<br />
                        <br />
                        ・蚊<br />
                        森や山に生息する蚊は刺されると大きく腫れることがあります。痒みや痛みを伴うことがあります。<br />
                        <br />
                        ・スズメバチ<br />
                    </p>
                    {/* サブ画像 */}
                    <img
                        src="/magazine/2/images/magazine_2_1.jpg"
                        alt="画像"
                        className="w-full h-auto object-cover rounded-[4px] my-3"
                    />
                    {/* 追加本文 */}
                    <p className="text-[10px] text-black leading-relaxed">
                        クワカブ採集していると高い確率で遭遇します。<br />
                        近づいただけで攻撃をしてくることは滅多にありませんが、怒らせると仲間を呼び集団で襲ってくることもあります。特に9月～10月は攻撃性が最も高いと言われています。<br />
                        攻撃性が高く、毒性も強いため、人が刺されると急性アレルギー反応を起こし、最悪の場合は死に至ることもあります。<br />
                        見つけたら、その場をそっと離れましょう。<br />
                        とはいえ、スズメバチがいる木にはクワカブがいることも多いです。数分待って姿が見えなくなってから慎重に木に近づきましょう。<br />
                        <br />
                        ・マダニ<br />
                    </p>
                    
                    {/* サブ画像 */}
                    <img
                        src="/magazine/2/images/magazine_2_2.jpg"
                        alt="画像"
                        className="w-full h-auto object-cover rounded-[4px] my-3"
                    />
                    {/* 追加本文 */}
                    <p className="text-[10px] text-black leading-relaxed">
                        体長3～8ｍｍで草むらや藪で待機しています。動物が近づくと体に付き吸血します。<br />
                        野生動物が生息するエリアで比較的多く遭遇します。<br />
                        人間が森内を歩いても体に付いてきます。足元や下半身を定期的にチェックしましょう。<br />
                        マダニを最も恐れる理由は、吸血されると重症熱性血小板減少症候群や日本紅斑熱を発症する可能性があることです。<br />
                        長靴や長袖、手袋を使い、肌を露出しないようにしましょう。<br />
                        <br />
                        ・ムカデ<br />
                    </p>

                    {/* サブ画像 */}
                    <img
                        src="/magazine/2/images/magazine_2_3.jpg"
                        alt="画像"
                        className="w-full h-auto object-cover rounded-[4px] my-3"
                    />
                    {/* 追加本文 */}
                    <p className="text-[10px] text-black leading-relaxed">
                        特に画像のトビズムカデはカブクワ採集の場で良く遭遇します。<br />
                        咬まれると痛みやアレルギー反応を起こします。<br />
                        触らないようにしましょう。<br />
                        手袋を付けておくと安心です。<br />
                        <br />
                        ・マムシ<br />
                    </p>

                    {/* サブ画像 */}
                    <img
                        src="/magazine/2/images/magazine_2_4.jpg"
                        alt="画像"
                        className="w-full h-auto object-cover rounded-[4px] my-3"
                    />
                    {/* 追加本文 */}
                    <p className="text-[10px] text-black leading-relaxed">
                        マムシは生息範囲も広く、強い毒性を持ちます。<br />
                        枯葉と色が同化して目立ちません。誤って踏まないように注意しましょう。<br />
                        長靴を履いて咬まれるリスクを低減しましょう。<br />
                        <br />
                        ・イノシシや熊<br />
                        生息するエリアを良く調べ、遭遇しないよう対策しましょう。<br />
                        <br />
                    </p>
                    {/* 小見出し */}
                    <h2 className="text-[16px] text-black font-semibold mb-2">その他危険</h2>

                    {/* 追加本文 */}
                    <p className="text-[10px] text-black leading-relaxed">
                        クワカブ採集は高温多湿の環境の場合が多いです。<br />
                        熱中症、脱水症の対策は十分に。適度な休憩や給水をしましょう。<br />
                        <br />
                    </p>

                </div>
            </div>
        </div>

    );
};

export default MagazinePage1;