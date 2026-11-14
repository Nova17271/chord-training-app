// Hooktheory API 客户端（通过本地后端代理）
// 后端地址默认 http://localhost:3001
import { majorScales, minorScales, getDiatonicChordNames } from './chordLibrary';

const PROXY_BASE = import.meta.env.VITE_PROXY_URL || 'http://localhost:3001';

// 搜索歌曲：返回 { id, song, artist, key, section, youtube_id, chords_relative, ... }
export async function searchHooktheory(query, limit = 10) {
  const res = await fetch(
    `${PROXY_BASE}/api/search?query=${encodeURIComponent(query)}&limit=${limit}`
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `搜索失败 (${res.status})`);
  }
  return res.json();
}

// 获取歌曲详情（按 artist + song slug）
export async function getHooktheorySong(artist, song) {
  const res = await fetch(
    `${PROXY_BASE}/api/song?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}`
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `获取歌曲失败 (${res.status})`);
  }
  return res.json();
}

// 检查后端代理是否可用 + 是否已配置凭据
export async function checkProxyHealth() {
  try {
    const res = await fetch(`${PROXY_BASE}/api/health`);
    return await res.json();
  } catch {
    return { ok: false, hasCreds: false };
  }
}

// 将 Hooktheory 的搜索结果转换为应用内部的歌曲格式（带标准答案）
// Hooktheory 返回的 key 形如 "C major"、"A minor"，chords_relative 是罗马级数
export function hooktheoryToSong(hit) {
  const keyLower = (hit.key || '').toLowerCase();
  const isMajor = keyLower.includes('major');
  const isMinor = keyLower.includes('minor');

  // "C major" -> "C 大调"
  const keyNote = (hit.key || '').split(' ')[0];
  const keyName = isMajor
    ? `${keyNote} 大调`
    : isMinor
    ? `${keyNote} 小调`
    : hit.key || '';

  // 从 chordLibrary 计算音阶构成音与顺阶和弦
  const scale = isMajor ? majorScales[keyName] : minorScales[keyName];
  const scaleNotes = scale?.notes || [];
  const diatonicChords = getDiatonicChordNames(keyName);

  // chords_relative 形如 "qqIqqIqqIV..."，q 是占位分隔
  // 提取实际和弦级数序列
  const relativeRaw = (hit.chords_relative || '').replace(/q/g, ' ').trim();
  const progression = relativeRaw ? relativeRaw.split(/\s+/).filter(Boolean) : [];
  const progressionChords = (hit.chords_absolute || '')
    .replace(/q/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return {
    id: `hooktheory-${hit.id}`,
    title: hit.song,
    artist: hit.artist,
    genre: hit.section || '未知段落',
    youtubeId: hit.youtube_id,
    answer: {
      mode: isMinor ? 'minor' : 'major',
      key: keyName,
      scaleNotes,
      diatonicChords,
      progression,
      progressionChords,
      melodyHint: `调性 ${hit.key}，来自 Hooktheory 曲库`,
    },
  };
}
