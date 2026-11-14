# 扒谱训练营 🎸

一个帮助你训练「扒谱」能力的交互式 Web 应用。

## 定位

这是一个**开源、非盈利的扒谱练习工具**。它不负责「输入音乐自动出谱」，而是提供一套结构化的四步练习流程，让你在听辨中提升扒谱能力。

标准答案来自**内置练习曲库**（人工维护，开源可贡献），你也可以**上传自己的音频**自由练习。

## 功能

用户通过**上传音频**或**从练习曲库选择**确定目标曲目后，按照四个步骤逐步训练扒谱能力：

1. **确定大小调** —— 判断音乐是大调还是小调
2. **确定是哪个调** —— 确定具体调性，查看构成音与顺阶和弦组
3. **匹配和弦** —— 根据旋律、已用和弦、内置套路库推导和弦进行
4. **一些细节** —— 反思低音线条、离调和弦、转调、转位等细节

每一步选择后**立即判分**并给出提示与正确答案对比。

## 技术栈

- React 19 + Vite + Tailwind CSS v4 + shadcn/ui
- 纯前端，无后端依赖

## 目录结构

```
src/
├── App.jsx                 # 主流程编排
├── components/
│   ├── SongSelector.jsx    # 音频上传 / 曲库搜索
│   ├── Summary.jsx         # 练习总结
│   ├── steps/              # 四个步骤组件
│   └── ui/                 # shadcn/ui 组件
└── data/
    ├── chordLibrary.js     # 和弦套路库 + 12调音阶 + 顺阶和弦计算
    └── songLibrary.js      # 练习曲库（含标准答案）
```

## 运行

```bash
npm install
npm run dev
```

## 如何贡献曲目

练习曲库在 `src/data/songLibrary.js`，每首歌包含标准答案（调性、音阶、和弦进行）。欢迎通过 Pull Request 添加新曲目：

```js
{
  id: 'unique-id',
  title: '歌曲名',
  artist: '歌手',
  genre: '风格',
  answer: {
    mode: 'major',           // 'major' | 'minor'
    key: 'C 大调',           // 与 chordLibrary.js 的调名一致
    scaleNotes: ['C','D','E','F','G','A','B'],
    diatonicChords: ['C','Dm','Em','F','G','Am','Bdim'],
    progression: ['I','V','vi','IV'],
    progressionChords: ['C','G','Am','F'],
    chordOptions: ['C','Dm','Em','F','G','Am','Bdim'], // 候选和弦池
    melodyHint: '旋律/听感提示',
  },
  audio: null,
}
```

## 内置和弦套路库

内置 8 条常用和弦进行模板（卡农、I-IV-V-I、II-V-I、12 小节布鲁斯等），在「匹配和弦」步骤中根据当前调自动换算成具体和弦作为参考。

## 关于数据源

本项目刻意**不依赖任何需要 API Key 或爬取的外部曲谱服务**：

- **Hooktheory** 官方 API 只有「和弦→歌」反查，无「歌名→和弦」接口，故不采用
- **网易云等** 只提供歌名/歌词/音频，不含和弦/调性数据，故不采用

标准答案由内置曲库维护，这是最稳定、可持续、无版权风险的方案。
