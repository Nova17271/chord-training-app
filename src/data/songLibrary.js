// 练习曲库：内置标准答案（调性、音阶、和弦、进行）。
// 这是「练习扒谱能力」的核心数据源——每首歌人工维护，开源可 PR 贡献。
// 数据说明：
//   - mode: 'major' | 'minor'
//   - key: 调名（与 chordLibrary.js 的 majorScales/minorScales 键一致）
//   - scaleNotes: 音阶构成音
//   - diatonicChords: 顺阶三和弦
//   - progression / progressionChords: 和弦进行（罗马级数 + 实际和弦名）
//   - chordOptions: 步骤3的候选和弦池（顺阶 + 常见借用和弦），确保正确答案可选
//   - melodyHint: 旋律/听感提示

export const songLibrary = [
  {
    id: 'canon-in-c',
    title: '卡农 (Canon in C)',
    artist: 'Pachelbel',
    genre: '古典 / 流行',
    answer: {
      mode: 'major',
      key: 'C 大调',
      scaleNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      diatonicChords: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
      progression: ['I', 'V', 'vi', 'iii', 'IV', 'I', 'IV', 'V'],
      progressionChords: ['C', 'G', 'Am', 'Em', 'F', 'C', 'F', 'G'],
      chordOptions: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
      melodyHint: '最经典的循环进行，旋律平稳流畅，主音落在 C',
    },
    audio: null,
  },
  {
    id: 'moon-river',
    title: '月亮河 (Moon River)',
    artist: 'Henry Mancini',
    genre: '爵士 / 抒情',
    answer: {
      mode: 'major',
      key: 'C 大调',
      scaleNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      diatonicChords: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
      progression: ['I', 'iii', 'vi', 'V', 'IV', 'I', 'IV', 'V'],
      progressionChords: ['C', 'Em', 'Am', 'G', 'F', 'C', 'F', 'G'],
      chordOptions: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
      melodyHint: '经典爵士抒情，开头三度上行，情绪温柔',
    },
    audio: null,
  },
  {
    id: 'house-of-rising-sun',
    title: '日升之屋 (House of the Rising Sun)',
    artist: 'The Animals',
    genre: '民谣 / 摇滚',
    answer: {
      mode: 'minor',
      key: 'A 小调',
      scaleNotes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      diatonicChords: ['Am', 'Bdim', 'C', 'Dm', 'Em', 'F', 'G'],
      progression: ['i', 'III', 'IV', 'VI', 'i', 'III', 'V', 'i'],
      progressionChords: ['Am', 'C', 'D', 'F', 'Am', 'C', 'E', 'Am'],
      // 含借用和弦 D、E（来自平行大调）
      chordOptions: ['Am', 'Bdim', 'C', 'Dm', 'Em', 'F', 'G', 'D', 'E'],
      melodyHint: '小调进行，主音 A，情绪阴郁，V 和弦用大 E 制造张力',
    },
    audio: null,
  },
  {
    id: 'let-it-be',
    title: '顺其自然 (Let It Be)',
    artist: 'The Beatles',
    genre: '流行 / 摇滚',
    answer: {
      mode: 'major',
      key: 'C 大调',
      scaleNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      diatonicChords: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
      progression: ['I', 'V', 'vi', 'IV', 'I', 'V', 'IV', 'I'],
      progressionChords: ['C', 'G', 'Am', 'F', 'C', 'G', 'F', 'C'],
      chordOptions: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
      melodyHint: 'I-V-vi-IV 黄金进行，明亮温暖，副歌记忆点强',
    },
    audio: null,
  },
  {
    id: 'someone-like-you',
    title: '像你这样的人 (Someone Like You)',
    artist: 'Adele',
    genre: '流行 / 抒情',
    answer: {
      mode: 'major',
      key: 'A 大调',
      scaleNotes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
      diatonicChords: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
      progression: ['I', 'V', 'vi', 'IV', 'I', 'V', 'vi', 'IV'],
      progressionChords: ['A', 'E', 'F#m', 'D', 'A', 'E', 'F#m', 'D'],
      chordOptions: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
      melodyHint: '钢琴抒情，I-V-vi-IV 循环，副歌情绪爆发',
    },
    audio: null,
  },
  {
    id: 'shape-of-you',
    title: '你的轮廓 (Shape of You)',
    artist: 'Ed Sheeran',
    genre: '流行',
    answer: {
      mode: 'minor',
      key: 'C# 小调',
      scaleNotes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'],
      diatonicChords: ['C#m', 'D#dim', 'E', 'F#m', 'G#m', 'A', 'B'],
      progression: ['i', 'VI', 'III', 'VII', 'i', 'VI', 'III', 'VII'],
      progressionChords: ['C#m', 'A', 'E', 'B', 'C#m', 'A', 'E', 'B'],
      chordOptions: ['C#m', 'D#dim', 'E', 'F#m', 'G#m', 'A', 'B'],
      melodyHint: '小调循环，节奏感强，主音 C#，带异域色彩',
    },
    audio: null,
  },
  {
    id: 'happy-birthday',
    title: '生日快乐歌 (Happy Birthday)',
    artist: '传统歌曲',
    genre: '民谣 / 儿歌',
    answer: {
      mode: 'major',
      key: 'G 大调',
      scaleNotes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
      diatonicChords: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
      progression: ['I', 'V', 'V', 'I', 'I', 'IV', 'V', 'I'],
      progressionChords: ['G', 'D', 'D', 'G', 'G', 'C', 'D', 'G'],
      chordOptions: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
      melodyHint: '最熟悉的旋律，I-V-V-I 基础进行，适合入门练习',
    },
    audio: null,
  },
  {
    id: 'blowin-in-the-wind',
    title: '答案在风中飘 (Blowin\' in the Wind)',
    artist: 'Bob Dylan',
    genre: '民谣',
    answer: {
      mode: 'major',
      key: 'D 大调',
      scaleNotes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
      diatonicChords: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
      progression: ['I', 'V', 'vi', 'IV', 'I', 'V', 'I', 'V'],
      progressionChords: ['D', 'A', 'Bm', 'G', 'D', 'A', 'D', 'A'],
      chordOptions: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
      melodyHint: '民谣经典，I-V-vi-IV 变体，吉他分解和弦伴奏',
    },
    audio: null,
  },
  {
    id: 'autumn-leaves',
    title: '秋叶 (Autumn Leaves)',
    artist: 'Joseph Kosma',
    genre: '爵士',
    answer: {
      mode: 'minor',
      key: 'E 小调',
      scaleNotes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
      diatonicChords: ['Em', 'F#dim', 'G', 'Am', 'Bm', 'C', 'D'],
      progression: ['ii', 'V', 'i', 'IV', 'VII', 'III', 'VI', 'i'],
      progressionChords: ['F#m7b5', 'B7', 'Em', 'Am7', 'D7', 'G', 'C', 'Em'],
      chordOptions: ['Em', 'F#dim', 'G', 'Am', 'Bm', 'C', 'D', 'F#m7b5', 'B7', 'Am7', 'D7'],
      melodyHint: '爵士标准曲，II-V-I 进行，含大量七和弦与副属和弦',
    },
    audio: null,
  },
  {
    id: 'ode-to-joy',
    title: '欢乐颂 (Ode to Joy)',
    artist: 'Beethoven',
    genre: '古典',
    answer: {
      mode: 'major',
      key: 'C 大调',
      scaleNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      diatonicChords: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
      progression: ['I', 'V', 'I', 'V', 'I', 'IV', 'V', 'I'],
      progressionChords: ['C', 'G', 'C', 'G', 'C', 'F', 'G', 'C'],
      chordOptions: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
      melodyHint: '主和弦与属和弦的经典对话，主音 C，进行极规整',
    },
    audio: null,
  },
];

// 简单搜索：按标题/歌手/风格做关键字匹配（支持中英文关键词）
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
