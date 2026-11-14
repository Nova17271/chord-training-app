// Mock 曲库：用于「搜索音乐」占位。
// 每首歌包含标准答案（调性、和弦），用于四步练习的判分。
// 后续可替换为真实曲谱/和弦库 API 的返回结果。

export const songLibrary = [
  {
    id: 'song-canon-in-c',
    title: '卡农（示例曲目）',
    artist: '示例',
    genre: '古典 / 流行',
    // 标准答案
    answer: {
      mode: 'major', // 'major' | 'minor'
      key: 'C 大调',
      scaleNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      diatonicChords: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
      progression: ['I', 'V', 'vi', 'iii', 'IV', 'I', 'IV', 'V'],
      progressionChords: ['C', 'G', 'Am', 'Em', 'F', 'C', 'F', 'G'],
      melodyHint: '旋律围绕 C、E、G 展开，主音落在 C',
    },
    audio: null, // 占位，无真实音频
  },
  {
    id: 'song-moon-river',
    title: '月亮河（Moon River）',
    artist: 'Henry Mancini',
    genre: '爵士 / 抒情',
    answer: {
      mode: 'major',
      key: 'C 大调',
      scaleNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      diatonicChords: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
      progression: ['I', 'iii', 'vi', 'V', 'IV', 'I', 'IV', 'V'],
      progressionChords: ['C', 'Em', 'Am', 'G', 'F', 'C', 'F', 'G'],
      melodyHint: '经典爵士抒情，开头三度上行',
    },
    audio: null,
  },
  {
    id: 'song-house-of-rising-sun',
    title: '日升之屋（House of the Rising Sun）',
    artist: 'The Animals',
    genre: '民谣 / 摇滚',
    answer: {
      mode: 'minor',
      key: 'A 小调',
      scaleNotes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      diatonicChords: ['Am', 'Bdim', 'C', 'Dm', 'Em', 'F', 'G'],
      progression: ['i', 'III', 'IV', 'VI', 'i', 'III', 'V', 'i'],
      progressionChords: ['Am', 'C', 'D', 'F', 'Am', 'C', 'E', 'Am'],
      melodyHint: '小调进行，主音 A，情绪阴郁',
    },
    audio: null,
  },
];

// 简单搜索：按标题/歌手做关键字匹配
export function searchSongs(query) {
  const q = query.trim().toLowerCase();
  if (!q) return songLibrary;
  return songLibrary.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q) ||
      s.genre.toLowerCase().includes(q)
  );
}
