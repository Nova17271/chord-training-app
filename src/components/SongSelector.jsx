import { useState, useRef } from 'react';
import { searchSongs } from '../data/songLibrary';

// 音乐选择阶段：上传本地音频 或 搜索音乐
export default function SongSelector({ onConfirm }) {
  const [tab, setTab] = useState('upload'); // 'upload' | 'search'
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioName, setAudioName] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setAudioName(file.name);
    // 上传音频没有标准答案，练习时判分会提示「无标准答案」
    setSelectedSong(null);
  };

  const handleSearch = () => {
    setResults(searchSongs(query));
  };

  const confirm = () => {
    if (tab === 'upload' && audioUrl) {
      onConfirm({
        type: 'upload',
        audioUrl,
        name: audioName,
        song: null, // 无标准答案
      });
    } else if (tab === 'search' && selectedSong) {
      onConfirm({
        type: 'search',
        audioUrl: selectedSong.audio, // mock 里为 null
        name: `${selectedSong.title} - ${selectedSong.artist}`,
        song: selectedSong,
      });
    }
  };

  return (
    <div className="song-selector">
      <h2>第一步：确定要扒的音乐</h2>
      <p className="subtitle">上传本地音频，或搜索已知曲目</p>

      <div className="tabs">
        <button
          className={tab === 'upload' ? 'tab active' : 'tab'}
          onClick={() => setTab('upload')}
        >
          上传音频
        </button>
        <button
          className={tab === 'search' ? 'tab active' : 'tab'}
          onClick={() => setTab('search')}
        >
          搜索音乐
        </button>
      </div>

      {tab === 'upload' && (
        <div className="upload-panel">
          <button className="upload-btn" onClick={() => fileInputRef.current?.click()}>
            {audioUrl ? '重新选择文件' : '选择音频文件'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            hidden
            onChange={handleFile}
          />
          {audioUrl && (
            <div className="audio-preview">
              <p className="audio-name">{audioName}</p>
              <audio controls src={audioUrl} />
            </div>
          )}
          <p className="hint">支持 mp3 / wav / m4a / ogg 等常见格式，浏览器本地播放</p>
        </div>
      )}

      {tab === 'search' && (
        <div className="search-panel">
          <div className="search-row">
            <input
              type="text"
              placeholder="输入歌曲名 / 歌手 / 风格"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}>搜索</button>
          </div>
          <ul className="song-list">
            {results.map((song) => (
              <li
                key={song.id}
                className={selectedSong?.id === song.id ? 'selected' : ''}
                onClick={() => setSelectedSong(song)}
              >
                <div className="song-title">{song.title}</div>
                <div className="song-meta">{song.artist} · {song.genre}</div>
              </li>
            ))}
          </ul>
          {results.length === 0 && (
            <p className="hint">暂无结果（当前为示例曲库，后续接入真实曲谱库）</p>
          )}
        </div>
      )}

      <button
        className="primary-btn"
        disabled={tab === 'upload' ? !audioUrl : !selectedSong}
        onClick={confirm}
      >
        确定音乐，开始扒谱 →
      </button>
    </div>
  );
}
