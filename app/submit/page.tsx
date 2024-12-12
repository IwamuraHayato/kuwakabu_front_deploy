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

  const handleChange = (index: number, field: string, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
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

  const removeRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const fetchWeatherData = async (place: string) => {
    try {
      // ここで場所を基に緯度と経度を取得 (Google Maps APIや他のジオコーディングサービスを使用)
      const lat = 35.6895; // 仮の緯度
      const lon = 139.6917; // 仮の経度

      // OpenWeatherMap APIを使って天気と気温を取得
      const apiKey = 'c777ac6e80762c1fc32251893221ad75';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      setWeather(data.weather[0].description); // 天気
      setTemperature(data.main.temp); // 気温
    } catch (error) {
      console.error('天気データの取得に失敗しました:', error);
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
    photos.forEach((photo, index) => {
      formData.append(`photo${index + 1}`, photo);
    });

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
      } else {
        alert('エラーが発生しました。');
      }
    } catch (error) {
      alert('投稿に失敗しました。');
    }
  };

  const CollectionForm = () => {
    return (
      <form 
        onSubmit={handleSubmit} 
        style={{ backgroundColor: '#ECEAD8'}} // 背景色を指定
        className="p-5"
      >
        {/* フォーム内容 */}
      </form>
    );
  };

  return (
    <div className="p-5 grid items-center justify-items-center">
      <h1>投稿フォーム</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div className="mt-4">
          <label className="block mb-2">写真を添付（最大3枚）</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
            className="block w-full"
          />
        </div>

        {rows.map((row, index) => (
          <div key={index} className="flex space-x-2 items-center">
            <input
              type="text"
              placeholder="種類"
              value={row.type}
              onChange={(e) => handleChange(index, 'type', e.target.value)}
              className="p-2 border rounded w-1/4"
              required
            />
            <select
              value={row.gender}
              onChange={(e) => handleChange(index, 'gender', e.target.value)}
              className="p-2 border rounded w-1/4"
              required
            >
              <option value="">性別</option>
              <option value="オス">オス</option>
              <option value="メス">メス</option>
            </select>
            <input
              type="number"
              placeholder="数"
              value={row.count}
              onChange={(e) => handleChange(index, 'count', e.target.value)}
              className="p-2 border rounded w-1/4"
              required
            />
            <input
              type="text"
              placeholder="最大サイズ"
              value={row.maxSize}
              onChange={(e) => handleChange(index, 'maxSize', e.target.value)}
              className="p-2 border rounded w-1/4"
              required
            />
            <button
              type="button"
              onClick={() => removeRow(index)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              －
            </button>
          </div>
        ))}
                <button
          type="button"
          onClick={addRow}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          ＋
        </button>
        

        <div>
          <label className="block mb-2">採集日時</label>
          <input
            type="datetime-local"
            value={collectionDate}
            onChange={(e) => setCollectionDate(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2">採集場所</label>
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


        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded w-full mt-4"
        >
          投稿
        </button>
      </form>
    </div>
  );
}
