// Hooktheory 代理服务器
// 作用：避开浏览器 CORS 限制、隐藏 Hooktheory 账号凭据、统一限流处理。
// 前端通过本服务的 /api/* 接口间接访问 Hooktheory 数据。

import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Hooktheory API 配置
const HOOKTHEORY_AUTH_URL = 'https://api.hooktheory.com/v1/users/auth';
const HOOKTHEORY_API_BASE = 'https://api.hooktheory.com/v1';

// 缓存 Bearer Token（Hooktheory 的 token 约 1 小时过期）
let cachedToken = null;
let tokenExpiresAt = 0;

async function getToken() {
  // token 未过期则复用
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const username = process.env.HOOKTHEORY_USERNAME;
  const password = process.env.HOOKTHEORY_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'HOOKTHEORY_USERNAME / HOOKTHEORY_PASSWORD 未配置，请检查 server/.env'
    );
  }

  const res = await fetch(HOOKTHEORY_AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Hooktheory 认证失败 (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  cachedToken = data.activkey;
  // 提前 5 分钟过期，避免临界点 401
  tokenExpiresAt = Date.now() + 55 * 60 * 1000;
  return cachedToken;
}

async function hooktheoryRequest(path, options = {}) {
  let token;
  try {
    token = await getToken();
  } catch (err) {
    return { error: err.message, status: 500 };
  }

  const url = `${HOOKTHEORY_API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      ...(options.headers || {}),
    },
  });

  // token 过期则重试一次
  if (res.status === 401) {
    cachedToken = null;
    tokenExpiresAt = 0;
    token = await getToken();
    const retry = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        ...(options.headers || {}),
      },
    });
    const body = await retry.json().catch(() => null);
    return { status: retry.status, data: body };
  }

  const body = await res.json().catch(() => null);
  return { status: res.status, data: body };
}

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ ok: true, hasCreds: !!(process.env.HOOKTHEORY_USERNAME && process.env.HOOKTHEORY_PASSWORD) });
});

// 搜索歌曲：返回调性 + 和弦进行
// GET /api/search?query=imagine&limit=10
app.get('/api/search', async (req, res) => {
  const { query, limit = 10, offset = 0 } = req.query;
  if (!query) {
    return res.status(400).json({ error: '缺少 query 参数' });
  }

  // Hooktheory 官方公开搜索接口（theorytab 搜索）
  const url = `https://www.hooktheory.com/api/trends/search?q=${encodeURIComponent(query)}`;
  const result = await hooktheoryRequest(`/trends/search?q=${encodeURIComponent(query)}`);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }
  res.json(result.data);
});

// 获取某首歌的详细信息（按 artist + song slug）
// GET /api/song?artist=queen&song=bohemian-rhapsody
app.get('/api/song', async (req, res) => {
  const { artist, song } = req.query;
  if (!artist || !song) {
    return res.status(400).json({ error: '缺少 artist 或 song 参数' });
  }

  const path = `/theorytab/view/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`;
  const result = await hooktheoryRequest(path);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }
  res.json(result.data);
});

app.listen(PORT, () => {
  console.log(`[proxy] Hooktheory 代理已启动: http://localhost:${PORT}`);
  console.log(`[proxy] 凭据状态: ${process.env.HOOKTHEORY_USERNAME ? '已配置' : '未配置（请在 server/.env 填写）'}`);
});
