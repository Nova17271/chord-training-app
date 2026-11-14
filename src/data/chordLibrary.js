// 常用和弦套路库（和弦进行模板）
// 每个套路：name 名称、progression 罗马数字级数进行、description 说明、style 风格标签

export const chordProgressions = [
  {
    id: 'canon',
    name: '卡农进行 (Canon)',
    progression: ['I', 'V', 'vi', 'iii', 'IV', 'I', 'IV', 'V'],
    description: '最经典的循环进行，流行歌曲中出现率极高',
    style: '流行 / 抒情',
  },
  {
    id: 'pop-1-4-5-1',
    name: '流行基础进行',
    progression: ['I', 'IV', 'V', 'I'],
    description: '最基础的走向，童谣、民谣、简单流行歌常见',
    style: '民谣 / 简单流行',
  },
  {
    id: 'pop-1-5-6-4',
    name: '1-5-6-4 (Pop Punk)',
    progression: ['I', 'V', 'vi', 'IV'],
    description: '欧美大热单曲的黄金进行，情绪饱满',
    style: '流行 / 摇滚',
  },
  {
    id: 'pop-6-4-1-5',
    name: '6-4-1-5 循环',
    progression: ['vi', 'IV', 'I', 'V'],
    description: 'I-V-vi-IV 的旋转版本，同样是热门套路',
    style: '流行',
  },
  {
    id: 'blues-12',
    name: '12 小节布鲁斯',
    progression: ['I', 'I', 'I', 'I', 'IV', 'IV', 'I', 'I', 'V', 'IV', 'I', 'V'],
    description: '布鲁斯/摇滚的基础框架',
    style: '布鲁斯 / 摇滚',
  },
  {
    id: 'jazz-2-5-1',
    name: '爵士 II-V-I',
    progression: ['ii', 'V', 'I'],
    description: '爵士乐最核心的终止式，也常插入流行歌',
    style: '爵士',
  },
  {
    id: 'ballad-1-6-4-5',
    name: '抒情 1-6-4-5',
    progression: ['I', 'vi', 'IV', 'V'],
    description: '50 年代老歌、抒情曲常用',
    style: '抒情',
  },
  {
    id: 'kpop-4-5-3-6',
    name: 'K-Pop 4-5-3-6',
    progression: ['IV', 'V', 'iii', 'vi'],
    description: '日韩流行常见的下行小调色彩进行',
    style: 'K-Pop / J-Pop',
  },
];

// 12 个大调的音阶构成音（用于「确定具体调」步骤校验）
// 用 0-11 半音阶表示，C=0
export const majorScales = {
  'C 大调': { notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'], sharps: 0 },
  'G 大调': { notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'], sharps: 1 },
  'D 大调': { notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'], sharps: 2 },
  'A 大调': { notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'], sharps: 3 },
  'E 大调': { notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'], sharps: 4 },
  'B 大调': { notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'], sharps: 5 },
  'F# 大调': { notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'], sharps: 6 },
  'F 大调': { notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'], sharps: -1 },
  'Bb 大调': { notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'], sharps: -2 },
  'Eb 大调': { notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'], sharps: -3 },
  'Ab 大调': { notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'], sharps: -4 },
  'Db 大调': { notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'], sharps: -5 },
};

// 12 个小调（自然小调）的音阶构成音
export const minorScales = {
  'A 小调': { notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], sharps: 0 },
  'E 小调': { notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'], sharps: 1 },
  'B 小调': { notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'], sharps: 2 },
  'F# 小调': { notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'], sharps: 3 },
  'C# 小调': { notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'], sharps: 4 },
  'G# 小调': { notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'], sharps: 5 },
  'D 小调': { notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'], sharps: -1 },
  'G 小调': { notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'], sharps: -2 },
  'C 小调': { notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'], sharps: -3 },
  'F 小调': { notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'], sharps: -4 },
  'Bb 小调': { notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'], sharps: -5 },
  'Eb 小调': { notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'], sharps: -6 },
};

// 根据主音和大小调，生成该调的和弦组（顺阶三和弦，罗马数字级数 -> 实际和弦）
export function buildDiatonicChords(keyNote, isMajor) {
  const scale = isMajor ? majorScales : minorScales;
  const keyName = `${keyNote} ${isMajor ? '大调' : '小调'}`;
  const notes = scale[keyName]?.notes;
  if (!notes) return null;

  const result = [];
  for (let degree = 0; degree < 7; degree++) {
    const root = notes[degree];
    const third = notes[(degree + 2) % 7];
    const fifth = notes[(degree + 4) % 7];
    // 简化：只输出根音 + 三音 + 五音的音名
    result.push(`${root}${third}${fifth}`);
  }
  return result;
}

// 根据调名（如 "C 大调"）生成标准顺阶三和弦名（如 C、Dm、Em、F、G、Am、Bdim）
// 这是应用内部统一的「和弦名」格式，Mock 数据与 Hooktheory 数据都对齐到它
export function getDiatonicChordNames(keyName) {
  const isMajor = keyName.includes('大调');
  const scale = isMajor ? majorScales : minorScales;
  const notes = scale[keyName]?.notes;
  if (!notes) return [];

  // 大调级数质量：I ii iii IV V vi vii°
  const majorQualities = ['', 'm', 'm', '', '', 'm', 'dim'];
  // 自然小调级数质量：i ii° III iv v VI VII
  const minorQualities = ['m', 'dim', '', 'm', 'm', '', ''];

  return notes.map((root, i) => {
    const quality = isMajor ? majorQualities[i] : minorQualities[i];
    return root + quality;
  });
}

// 罗马数字级数 -> 该调实际和弦名的映射（用更友好的方式）
export const degreeLabels = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];

// 半音名表（用于把级数换算成具体和弦）
const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function noteToPitch(note) {
  const clean = note.replace('♭', 'b').replace('♯', '#');
  const map = {
    'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5,
    'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11,
  };
  return map[clean];
}

export function pitchToNote(pitch) {
  return CHROMATIC[((pitch % 12) + 12) % 12];
}

// 级数进行 -> 具体调下的和弦名序列
export function progressionToChords(progression, keyName) {
  const isMajor = keyName.includes('大调');
  const keyNote = keyName.replace(/ [大小]调/, '');
  const scale = isMajor ? majorScales : minorScales;
  const notes = scale[keyName]?.notes;
  if (!notes) return [];

  // 大调级数质量：I ii iii IV V vi vii°
  const majorQualities = ['', 'm', 'm', '', '', 'm', 'dim'];
  // 自然小调级数质量：i ii° III iv v VI VII
  const minorQualities = ['m', 'dim', '', 'm', 'm', '', ''];

  return progression.map((deg) => {
    const clean = deg.replace('°', '');
    const isLower = clean === clean.toLowerCase() && clean.length > 1;
    const idxMap = { i: 0, ii: 1, iii: 2, iv: 3, v: 4, vi: 5, vii: 6 };
    const idx = idxMap[clean.toLowerCase()] ?? 0;
    const root = notes[idx];
    const quality = isMajor ? majorQualities[idx] : minorQualities[idx];
    return root + quality;
  });
}
