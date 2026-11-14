import { useState, useRef } from 'react';
import { searchSongs } from '../data/songLibrary';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';

export default function SongSelector({ onConfirm }) {
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioName, setAudioName] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [hasSearched, setHasSearched] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setAudioName(file.name);
    setSelectedSong(null);
  };

  const handleSearch = () => {
    setResults(searchSongs(query));
    setHasSearched(true);
    setSelectedSong(null);
  };

  const confirm = () => {
    if (activeTab === 'upload' && audioUrl) {
      onConfirm({ type: 'upload', audioUrl, name: audioName, song: null });
    } else if (activeTab === 'search' && selectedSong) {
      onConfirm({
        type: 'search',
        audioUrl: null,
        name: `${selectedSong.title} - ${selectedSong.artist}`,
        song: selectedSong,
      });
    }
  };

  const canConfirm =
    (activeTab === 'upload' && audioUrl) || (activeTab === 'search' && selectedSong);

  return (
    <div>
      <h2 className="text-2xl font-semibold">第一步：确定要扒的音乐</h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        从练习曲库选择，或上传自己的音频自由练习
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upload">上传音频</TabsTrigger>
          <TabsTrigger value="search">练习曲库</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <Button
                variant="outline"
                className="w-full border-dashed py-8"
                onClick={() => fileInputRef.current?.click()}
              >
                {audioUrl ? '重新选择文件' : '选择音频文件'}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFile}
              />
              {audioUrl && (
                <div className="mt-4">
                  <p className="mb-2 text-sm break-all">{audioName}</p>
                  <audio controls src={audioUrl} className="w-full" />
                </div>
              )}
              <p className="mt-3 text-xs text-muted-foreground">
                支持 mp3 / wav / m4a / ogg 等格式，浏览器本地播放。此模式为「自由练习」，
                无标准答案判分，需自行判断并完成四步。
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="搜索歌曲名 / 歌手 / 风格（如：卡农、Adele、民谣）"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch}>搜索</Button>
              </div>

              <ul className="mt-4 space-y-2">
                {(hasSearched ? results : searchSongs('')).map((song) => (
                  <li
                    key={song.id}
                    className={
                      'cursor-pointer rounded-lg border px-4 py-3 transition-colors ' +
                      (selectedSong?.id === song.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:bg-muted')
                    }
                    onClick={() => setSelectedSong(song)}
                  >
                    <div className="font-semibold">{song.title}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {song.artist} · {song.genre}
                    </div>
                  </li>
                ))}
              </ul>

              {hasSearched && results.length === 0 && (
                <p className="mt-4 text-xs text-muted-foreground">
                  没有找到匹配的曲目，试试其它关键词
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button size="lg" className="mt-6" disabled={!canConfirm} onClick={confirm}>
        确定音乐，开始扒谱 →
      </Button>
    </div>
  );
}
