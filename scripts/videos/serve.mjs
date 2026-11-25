// Serves content/videos on http://localhost:3010 to preview the rendered videos.
//   node scripts/videos/serve.mjs
import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../../content/videos', import.meta.url));
const TYPES = { '.html': 'text/html; charset=utf-8', '.mp4': 'video/mp4', '.png': 'image/png', '.txt': 'text/plain; charset=utf-8' };

createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const file = normalize(join(ROOT, path === '/' ? 'preview.html' : path));
  if (!file.startsWith(ROOT)) return res.writeHead(403).end();
  let size;
  try {
    size = statSync(file).size;
  } catch {
    return res.writeHead(404).end('Not found');
  }
  const type = TYPES[extname(file)] ?? 'application/octet-stream';
  // Range requests let the browser's video player seek.
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range ?? '');
  if (m) {
    const start = m[1] ? Number(m[1]) : 0;
    const end = m[2] ? Number(m[2]) : size - 1;
    res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
    return createReadStream(file, { start, end }).pipe(res);
  }
  res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' });
  createReadStream(file).pipe(res);
}).listen(Number(process.env.PORT) || 3010, function () {
  console.log(`Video preview on http://localhost:${this.address().port}`);
});
