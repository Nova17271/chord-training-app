# 扒谱训练营 🎸

一个帮助你训练「扒谱」能力的交互式 Web 应用。

## 功能

用户通过**上传音频**或**搜索音乐**确定目标曲目后，按照四个步骤逐步训练扒谱能力：

1. **确定大小调** —— 判断音乐是大调还是小调
2. **确定是哪个调** —— 确定具体调性，查看构成音与顺阶和弦组
3. **匹配和弦** —— 根据旋律、已用和弦、内置套路库推导和弦进行
4. **一些细节** —— 反思低音线条、离调和弦、转调、转位等细节

每一步选择后**立即判分**并给出提示与正确答案对比。

## 技术栈

- **前端**：React 19 + Vite + Tailwind CSS v4 + shadcn/ui
- **后端代理**：Express（用于访问 Hooktheory 数据源，避开 CORS 并隐藏凭据）

## 目录结构

```
server/
└── index.js                # Express 代理（Hooktheory API 转发）
src/
├── App.jsx                 # 主流程编排
├── components/
│   ├── SongSelector.jsx    # 音频上传 / 音乐搜索（示例曲库 + Hooktheory）
│   ├── Summary.jsx         # 练习总结
│   ├── steps/              # 四个步骤组件
│   └── ui/                 # shadcn/ui 组件
└── data/
    ├── chordLibrary.js     # 和弦套路库 + 12调音阶 + 顺阶和弦计算
    ├── songLibrary.js      # 示例曲库（含标准答案）
    └── hooktheory.js       # Hooktheory API 客户端 + 数据转换
```

## 运行

```bash
npm install

# 1. 启动后端代理（需先配置凭据，见下）
npm run dev:server

# 2. 启动前端
npm run dev
```

## Hooktheory 数据源配置

搜索音乐支持两个数据源：**示例曲库**（内置，无需配置）和 **Hooktheory 曲库**（真实 65000+ 首歌的和弦/调性/旋律数据）。

接入 Hooktheory：

1. 去 https://www.hooktheory.com 注册免费账号
2. 复制 `server/.env.example` 为 `server/.env`，填入用户名密码：

```
HOOKTHEORY_USERNAME=your_username
HOOKTHEORY_PASSWORD=your_password
```

3. 启动后端代理 `npm run dev:server`，前端搜索时切换到「Hooktheory 曲库」

> 注意：`server/.env` 已被 .gitignore 忽略，不会提交到仓库。

## 当前状态与后续计划

- ✅ 四步练习流程（每步即时判分）
- ✅ 内置常用和弦套路库（卡农、I-IV-V-I、II-V-I 等）
- ✅ 音频上传（浏览器本地播放）
- ✅ 音乐搜索：示例曲库 + Hooktheory 真实曲库（后端代理已就绪，待填凭据）
- ⏳ 上传音频暂无自动判分（需接入 AI 音频分析或手动标注答案）

## 数据源说明

「匹配和弦」依赖标准答案（调性、和弦进行）。当前支持：

- `src/data/songLibrary.js` 中的示例曲库（内置标准答案）
- Hooktheory 曲库（通过后端代理获取真实和弦/调性数据）
