import { useState, useRef, useEffect } from 'react';
import { searchSongs } from '../data/songLibrary';
import { searchHooktheory, hooktheoryToSong, checkProxyHealth } from '../data/hooktheory';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

export default function SongSelector({ onConfirm }) {
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioName, setAudioName] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [source, setSource] = useState('local'); // 'local' | 'hooktheory'
  const [proxyStatus, setProxyStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // 检测后端代理状态
  useEffect(() => {
    checkProxyHealth().then(setProxyStatus);
  }, []);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setAudioName(file.name);
    setSelectedSong(null);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      if (source === 'local') {
        setResults(searchSongs(query));
      } else {
        const data = await searchHooktheory(query);
        const songs = (data.results || data || []).map(hooktheoryToSong);
        setResults(songs);
      }
      setSelectedSong(null);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
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
        youtubeId: selectedSong.youtubeId,
      });
    }
  };

  const canConfirm =
    (activeTab === 'upload' && audioUrl) || (activeTab === 'search' && selectedSong);

  return (
    <div>
      <h2 className="text-2xl font-semibold">第一步：确定要扒的音乐</h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        上传本地音频，或搜索已知曲目
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upload">上传音频</TabsTrigger>
          <TabsTrigger value="search">搜索音乐</TabsTrigger>
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
                支持 mp3 / wav / m4a / ogg 等常见格式，浏览器本地播放
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              {/* 数据源切换 */}
              <div className="mb-4 flex items-center gap-2">
                <Button
                  variant={source === 'local' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSource('local')}
                >
                  示例曲库
                </Button>
                <Button
                  variant={source === 'hooktheory' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSource('hooktheory')}
                >
                  Hooktheory 曲库
                </Button>
                {source === 'hooktheory' && proxyStatus && (
                  <Badge variant={proxyStatus.hasCreds ? 'default' : 'secondary'}>
                    {proxyStatus.hasCreds ? '已连接' : '后端未配置凭据'}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder={
                    source === 'local'
                      ? '输入歌曲名 / 歌手 / 风格'
                      : '输入英文歌曲名或歌手（如 Imagine、Adele）'
                  }
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={loading}>
                  {loading ? '搜索中...' : '搜索'}
                </Button>
              </div>

              {error && (
                <p className="mt-3 text-sm text-red-500">{error}</p>
              )}

              <ul className="mt-4 space-y-2">
                {results.map((song) => (
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

              {!loading && results.length === 0 && !error && (
                <p className="mt-4 text-xs text-muted-foreground">
                  {source === 'local'
                    ? '暂无结果（示例曲库）'
                    : '输入关键词搜索，或先在后端配置 Hooktheory 凭据'}
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
