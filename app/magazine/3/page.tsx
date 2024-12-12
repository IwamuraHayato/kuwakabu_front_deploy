import React from 'react';

const MagazinePage1 = () => {
    return (
        <div className="pb-[106px] bg-[#ECEADA] min-h-screen py-0 px-0">
            <div className="flex justify-center">
                <img
                    src="/magazine/3/images/magazine_3_top.jpg"
                    alt="クワカブマガジン トップ画像"
                    className="w-full h-64 object-cover mb-3 max-w-screen-md"
                />
            </div>
            {/* メインコンテナ */}
            <div className="bg-white mx-auto max-w-screen-md font-roboto">
                {/* コンテンツセクション */}
                <div className=" p-5">
                    {/* タイトル */}
                    <h1 className="text-[20px] text-black font-bold mb-2">いろいろな採集方法の紹介</h1>

                    {/* 日時 */}
                    <p className="text-[10px] text-[#929292] mb-4">2024.12.18</p>

                    {/* 本文 */}
                    <p className="text-[10px] text-black leading-relaxed mb-4">
                        クワカブを採集する方法は、場所や時間帯、時期によっていろいろな選択肢があります。<br />
                        いろいろな採集方法やポイントをご紹介します。<br />
                        <br />
                        クワカブの天敵は鳥です。鳥の活動する明るい時間に目立つところにいると食べられてしまう危険にされされます。この危険から避けるように主に夜間に活動するクワカブ達。<br />
                        夜はどう過ごしている？昼はどこに隠れている？鳥の気配を感じたらどうする？クワカブは暑さや乾燥が苦手。休憩するならどんなところ？などクワカブの気持ちになって探すと、居場所を見つけやすいです。<br />
                        いろいろな採集方法を試してクワカブの気持ちを探索しよう！<br />
                        また、いずれの方法でも共通した注意事項としては、飼育できる最低限の虫だけを持ち帰りましょう。持ち帰らない虫は採集した場所にリリースしましょう。違う場所の森などへリリースすることは、その場の生態系へ影響を与える危険があるため避けましょう。<br />
                    </p>

                    {/* 小見出し */}
                    <h2 className="text-[16px] text-black font-semibold mb-2">樹液</h2>

                    {/* サブ画像 */}
                    <img
                        src="/magazine/3/images/magazine_3_1.jpg"
                        alt="画像"
                        className="w-full h-auto object-cover rounded-[4px] my-3"
                    />
                    {/* 追加本文 */}
                    <p className="text-[10px] text-black leading-relaxed">
                        木の幹から染み出る樹液に集まるクワカブを探します。<br />
                        昼も夜も楽しめる方法ですが、カブクワが活発になる夜間の方がクワカブに出会いやすいです。<br />
                        発酵した樹液は甘酸っぱい独特の香りを森に放ちます。クヌギやコナラの木を見つけ、この香りのもとを探してみよう。また、蛾やカナブンが飛んでいる木の近くに樹液場があることが多いです。目、耳、鼻などの感覚に集中して樹液場を探そう。<br />
                        不思議なことに、樹液場が複数ある森などでは、全く虫のつかないところ、多くの虫が集まるところがあり、同じように見える樹液場でも人気が集中する傾向になります。その森での人気のスポット（御神木）を探してみよう。<br />
                        昼間は御神木の根本の落ち葉の下も探してみよう。休んでいるクワカブに出会えるかも！？移動した落ち葉は元に戻しておきましょう。<br />
                        <br />
                    </p>

                    {/* 小見出し */}
                    <h2 className="text-[16px] text-black font-semibold mb-2">木蹴り</h2>

                    {/* 追加本文 */}
                    <p className="text-[10px] text-black leading-relaxed">
                        木を蹴ってクワカブを落とす方法です。ポイントは力ずくで木を揺らすのではなく、鳥が木に止まったような振動を木全体に伝えること。力まずにトントンと2-3回の振動を木に伝えます。<br />
                        木で休んでいるノコギリクワガタやミヤマクワガタに有効です。<br />
                        昼も夜も楽しめますが、落ちてきた虫を探すことに苦労しますので昼にお勧めの方法です。<br />
                        落下地点に草がたくさん生えている場所などでは、レジャーシートや開いた傘を置いておくと見つけやすいです。<br />
                        <br />
                    </p>

                    {/* 小見出し */}
                    <h2 className="text-[16px] text-black font-semibold mb-2">果実トラップ</h2>

                    {/* サブ画像 */}
                    <img
                        src="/magazine/3/images/magazine_3_2.jpg"
                        alt="画像"
                        className="w-full h-auto object-cover rounded-[4px] my-3"
                    />
                    {/* 追加本文 */}
                    <p className="text-[10px] text-black leading-relaxed">
                        発酵させた果実を森に仕掛け、そこに集まる虫を採集する方法です。<br />
                        腐らせたバナナをネットに入れて木に結びつける方法がメジャーです。人が食べるバナナよりも十分ドロドロに発酵が進んだ状態の方が虫は好みます。発酵を進めるために、果実を焼酎漬けにする工夫や、ペットボトルを使って虫が抜け出せないトラップ型にする工夫をすることもあります。<br />
                        クワカブが活発な夜間～明け方に回収に行くのが良いでしょう。<br />
                        仕掛けたトラップは責任をもって必ず回収し森に残さないようにしましょう。放置すると森のゴミになります。また、トラップにかかった生物が逃げられずその場で絶命してしまいます。<br />
                        <br />
                    </p>

                    {/* 小見出し */}
                    <h2 className="text-[16px] text-black font-semibold mb-2">ライトトラップ</h2>

                    {/* サブ画像 */}
                    <img
                        src="/magazine/3/images/magazine_3_3.jpg"
                        alt="画像"
                        className="w-full h-auto object-cover rounded-[4px] my-3"
                    />
                    {/* 追加本文 */}
                    <p className="text-[10px] text-black leading-relaxed">
                        夜間に光に集まるクワカブを採集する方法です。<br />
                        画像のように専用装置を使っておびき寄せます。非常に強力で数時間で多くの虫が集まってきます。禁止されている場所もありますので、事前に良く確認しましょう。<br />
                        その他にも、自動販売機やコンビニ、街灯などの光に集まる虫を拾って回る方法もあります。<br />
                        ポイントは、近頃増えているLED照明ではなく、減りつつある水銀灯照明など波長帯の豊富な照明を見つけることです。蛾がたくさん集まる場所はねらい目です。<br />
                        <br />
                    </p>

                    {/* 小見出し */}
                    <h2 className="text-[16px] text-black font-semibold mb-2">朽木探索</h2>

                    {/* サブ画像 */}
                    <img
                        src="/magazine/3/images/magazine_3_4.jpg"
                        alt="画像"
                        className="w-full h-auto object-cover rounded-[4px] my-3"
                    />
                    {/* 追加本文 */}
                    <p className="text-[10px] text-black leading-relaxed">
                        成虫になって朽木から出てきたクワガタを採集する方法です。<br />
                        クヌギやコナラの倒木があったら、夏の夜中に周辺を良く探してみましょう。成虫になったばかりのクワガタに出会えるかも！？<br />
                        ポイントは、クワガタが産卵場として好む場所と木の状態を見極めることです。湿気があり、キノコや白色腐朽菌（白いカビのようなもの）の寄生した朽木が狙い目です。<br />
                        <br />
                    </p>

                    {/* 小見出し */}
                    <h2 className="text-[16px] text-black font-semibold mb-2">材割</h2>

                    {/* サブ画像 */}
                    <img
                        src="/magazine/3/images/magazine_3_5.jpg"
                        alt="画像"
                        className="w-full h-auto object-cover rounded-[4px] my-3"
                    />
                    {/* 追加本文 */}
                    <p className="text-[10px] text-black leading-relaxed">
                        上記の朽木探索で見つけた朽木を壊し、中からクワガタの幼虫やサナギ、成虫を採集する方法です。<br />
                        すべての季節で楽しめます。<br />
                        朽木の選定や壊し方など、知識と経験が必要になります。<br />
                        木から割り出した生物は責任をもって飼育しましょう。その場に放置すると生きていけません。<br />
                        また、朽木という生物にとって大切な環境を壊している認識も持ちましょう。この方法は、賛否両論、人によりさまざまな意見があります。<br />
                        <br />
                    </p>
                </div>
            </div>
        </div>

    );
};

export default MagazinePage1;