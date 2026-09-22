import http from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.md': 'text/plain; charset=utf-8', '.png': 'image/png', '.txt': 'text/plain; charset=utf-8' };
http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
    const relative = pathname === '/' ? 'preview/reference.html' : pathname.slice(1);
    const resolved = await realpath(path.resolve(root, relative));
    if (!resolved.startsWith(root) || !['preview/', 'public/'].some((prefix) => path.relative(root, resolved).split(path.sep).join('/').startsWith(prefix))) { response.writeHead(403); response.end('Forbidden'); return; }
    const content = await readFile(resolved);
    response.writeHead(200, { 'Content-Type': types[path.extname(resolved)] ?? 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    response.end(content);
  } catch { response.writeHead(404); response.end('Not found'); }
}).listen(4174, '127.0.0.1', () => console.log('Visual reference only: http://localhost:4174/preview/reference.html'));
