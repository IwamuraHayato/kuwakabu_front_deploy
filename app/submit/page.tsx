// `frontend/app/post/page.tsx` is the UI for the `/post` URL
"use client";

import { useState } from 'react';

export default function PostPage() {
  const [rows, setRows] = useState([ 
    { type: '', gender: '', count: '', maxSize: '' },
  ]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [collectionDate, setCollectionDate] = useState('');
  const [collectionPlace, setCollectionPlace] = useState('');
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState('');
  const [collectionMethod, setCollectionMethod] = useState('');
  const [capturedTree, setCapturedTree] = useState('');
  const [dangerousAnimals, setDangerousAnimals] = useState('');
  const [surroundingFacilities, setSurroundingFacilities] = useState('');
  const [memo, setMemo] = useState('');
  const [crowdLevel, setCrowdLevel] = useState<'少ない' | '普通' | '多い' | '未選択'>('未選択');
  const [forbiddenArea, setForbiddenArea] = useState<'該当する' | '該当しない' | '未選択'>('未選択'); // 採集禁止エリア

  const handleChange = (index: number, field: string, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    console.log('Updated rows:', updatedRows); // デバッグ用
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length > 3) {
        alert('写真は最大3枚まで選択可能です。');
        return;
      }
      setPhotos(selectedFiles);
    }
  };

  const addRow = () => {
    setRows([...rows, { type: '', gender: '', count: '', maxSize: '' }]);
  };

  const handleGenderChange = (index: number, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index].gender = value;
    setRows(updatedRows);
  };
  

  const removeRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const fetchWeatherData = async (place: string) => {
    try {
      // Google Maps Geocoding APIキー
      const geocodingApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!geocodingApiKey) {
        console.error('Google Maps APIキーが設定されていません');
        setWeather('APIキーがありません');
        setTemperature('APIキーがありません');
        return;
      }
  
      // Geocoding APIを使用して住所から緯度と経度を取得
      const geocodingResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place)}&key=${geocodingApiKey}`
      );
      const geocodingData = await geocodingResponse.json();
  
      if (geocodingData.status !== 'OK' || !geocodingData.results.length) {
        console.error('住所から緯度・経度を取得できませんでした:', geocodingData.error_message);
        setWeather('住所が無効です');
        setTemperature('住所が無効です');
        return;
      }
  
      const { lat, lng } = geocodingData.results[0].geometry.location;
  
      // OpenWeatherMap APIキー
      const weatherApiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      if (!weatherApiKey) {
        console.error('OpenWeatherMap APIキーが設定されていません');
        setWeather('APIキーがありません');
        setTemperature('APIキーがありません');
        return;
      }
  
      // OpenWeatherMap APIを使用して天気情報を取得 (日本語対応)
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&lang=ja&appid=${weatherApiKey}`
        );

      const weatherData = await weatherResponse.json();
  
      if (!weatherData || !weatherData.weather || !weatherData.main) {
        console.error('天気データを取得できませんでした:', weatherData.message);
        setWeather('天気取得失敗');
        setTemperature('気温取得失敗');
        return;
      }
  
      // ステートに天気と気温を設定
      setWeather(weatherData.weather[0].description); // 天気 (日本語)
      setTemperature(weatherData.main.temp.toFixed(1)); // 気温（小数点1桁）
    } catch (error) {
      console.error('天気データの取得中にエラーが発生しました:', error);
      setWeather('エラーが発生');
      setTemperature('エラーが発生');
    }
  };

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const place = e.target.value;
    setCollectionPlace(place);
    fetchWeatherData(place);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('rows', JSON.stringify(rows));
    formData.append('collectionDate', collectionDate);
    formData.append('collectionPlace', collectionPlace);
    formData.append('weather', weather);
    formData.append('temperature', temperature);
    formData.append('collectionMethod', collectionMethod);
    formData.append('capturedTree', capturedTree);
    formData.append('dangerousAnimals', dangerousAnimals);
    formData.append('surroundingFacilities', surroundingFacilities);
    formData.append('memo', memo);
    formData.append('crowdLevel', crowdLevel); // 追加
    formData.append('forbiddenArea', forbiddenArea); // 採集禁止エリア
    photos.forEach((photo, index) => {
      formData.append(`photo${index + 1}`, photo);
    });

    // デバッグ用のconsole.logを追加
      console.log('FormData rows:', JSON.stringify(rows));
      console.log('FormData collectionDate:', collectionDate);
      console.log('FormData collectionPlace:', collectionPlace);
      console.log('FormData weather:', weather);
      console.log('FormData temperature:', temperature);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('投稿が成功しました！');
        setRows([{ type: '', gender: '', count: '', maxSize: '' }]);
        setPhotos([]);
        setCollectionDate('');
        setCollectionPlace('');
        setWeather('');
        setTemperature('');
        setCollectionMethod('');
        setCapturedTree('');
        setDangerousAnimals('');
        setSurroundingFacilities('');
        setMemo('');
        setCrowdLevel('未選択'); // リセット
        setForbiddenArea('未選択'); // リセット
      } else {
        alert('エラーが発生しました。');
      }
    } catch (error) {
      alert('投稿に失敗しました。');
    }
  };

  return (
  <div className="p-5 grid items-center justify-items-center bg-[#ECEAD8]">
    <h1 className="text-2xl font-bold mb-8"></h1>
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="mt-4">
        <label className="block mb-2">写真を添付*（最大3枚）</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          className="block w-full mb-4"
        />
        <div className="grid grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative bg-gray-200 rounded flex items-center justify-center w-32 h-32"
            >
              <span className="absolute top-2 left-2 bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                {index + 1}
              </span>
              <img
                src={URL.createObjectURL(photo)}
                alt={`photo-${index + 1}`}
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
          {Array.from({ length: 3 - photos.length }).map((_, index) => (
            <div
              key={index + photos.length}
              className="bg-gray-200 rounded flex items-center justify-center w-32 h-32"
            />
          ))}
        </div>
      </div>

      {rows.map((row, index) => (
        <div key={index} className="mb-4">
          <div className="flex space-x-2 items-center mb-2">
            <div className="w-2/3 text-center font-semibold">種類*</div>
            <div className="w-1/4 text-center font-semibold">性別*</div>
            <div className="w-1/4 text-center font-semibold">数*</div>
            <div className="w-2/3 text-center font-semibold">最大サイズ</div>
          </div>
          <div className="flex space-x-2 items-center">
            <select
              value={row.type}
              onChange={(e) => handleChange(index, "type", e.target.value)}
              className="p-2 border rounded w-2/3"
              required
            >
              <option value="" disabled>
                種類を選択
              </option>
              <option value="カブトムシ">カブトムシ</option>
              <option value="コクワガタ">コクワガタ</option>
              <option value="ノコギリクワガタ">ノコギリクワガタ</option>
              <option value="スジクワガタ">スジクワガタ</option>
              <option value="ヒラタクワガタ">ヒラタクワガタ</option>
              <option value="ミヤマクワガタ">ミヤマクワガタ</option>
              <option value="アカアシクワガタ">アカアシクワガタ</option>
              <option value="その他">その他</option>
            </select>
            <select
              value={row.gender}
              onChange={(e) => handleGenderChange(index, e.target.value)}
              className="p-2 border rounded w-4/7"
              required
            >
              <option value="オス">オス</option>
              <option value="メス">メス</option>
              <option value="両方">両方</option>
            </select>
            <input
              type="number"
              value={row.count}
              onChange={(e) => handleChange(index, "count", e.target.value)}
              className="p-2 border rounded w-1/3"
              required
            />
            <div className="relative">
              <input
                type="text"
                value={row.maxSize}
                onChange={(e) => handleChange(index, "maxSize", e.target.value)}
                className="p-2 border rounded w-full pr-10"
                required
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                ㎜
              </span>
            </div>
            <button
              type="button"
              onClick={() => removeRow(index)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              －
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={addRow}
          className="w-10 h-10 bg-gray-200 text-black text-xl font-bold rounded-full shadow-md hover:bg-gray-300 transition-transform transform hover:scale-110 flex items-center justify-center"
        >
          ＋
        </button>
      </div>

      <div>
        <label className="block mb-2">採集日時*</label>
        <input
          type="datetime-local"
          value={collectionDate}
          onChange={(e) => setCollectionDate(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
      </div>

      <div>
        <label className="block mb-2">採集場所*</label>
        <input
          type="text"
          value={collectionPlace}
          onChange={handlePlaceChange}
          className="p-2 border rounded w-full"
          placeholder="例: 東京都新宿区"
          required
        />
      </div>

      <div>
        <label className="block mb-2">天気</label>
        <input
          type="text"
          value={weather}
          readOnly
          className="p-2 border rounded w-full bg-gray-100"
        />
      </div>

      <div>
        <label className="block mb-2">気温 (°C)</label>
        <input
          type="text"
          value={temperature}
          readOnly
          className="p-2 border rounded w-full bg-gray-100"
        />
      </div>

      <div>
        <label className="block mb-2">採集方法</label>
        <input
          type="text"
          value={collectionMethod}
          onChange={(e) => setCollectionMethod(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-2">捕まえた樹木</label>
        <input
          type="text"
          value={capturedTree}
          onChange={(e) => setCapturedTree(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-2">危険動物</label>
        <input
          type="text"
          value={dangerousAnimals}
          onChange={(e) => setDangerousAnimals(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-2">周辺施設</label>
        <input
          type="text"
          value={surroundingFacilities}
          onChange={(e) => setSurroundingFacilities(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-2">メモ</label>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-2">人の混み具合</label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setCrowdLevel("少ない")}
            className={`px-4 py-2 rounded ${
              crowdLevel === "少ない" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            少ない
          </button>
          <button
            type="button"
            onClick={() => setCrowdLevel("普通")}
            className={`px-4 py-2 rounded ${
              crowdLevel === "普通" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            普通
          </button>
          <button
            type="button"
            onClick={() => setCrowdLevel("多い")}
            className={`px-4 py-2 rounded ${
              crowdLevel === "多い" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            多い
          </button>
        </div>
      </div>

      <div>
        <label className="block mb-2">昆虫採集禁止エリア</label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setForbiddenArea("該当する")}
            className={`px-4 py-2 rounded ${
              forbiddenArea === "該当する"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            該当する
          </button>
          <button
            type="button"
            onClick={() => setForbiddenArea("該当しない")}
            className={`px-4 py-2 rounded ${
              forbiddenArea === "該当しない"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            該当しない
          </button>
        </div>
        </div>
        
        <div className="text-center">
        <button
        type="submit"
        className="w-full mb-20 px-6 py-3 rounded-full bg-[#2C5F2D] text-white shadow-lg transition-transform transform hover:scale-105"
        >
        投稿する
        </button>
        </div>
    </form>
  </div>
);
}