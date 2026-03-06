/**
 * server.mjs — Servidor dev para ShopFast.
 * Uso: bun server.mjs
 * Sirve archivos estáticos desde el directorio actual en http://localhost:3000
 */

import { serve } from 'bun';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';

const PORT = 3000;
const ROOT = import.meta.dir;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;

    // SPA fallback: cualquier ruta sin extensión sirve index.html
    const ext = extname(pathname);
    if (!ext) {
      pathname = '/index.html';
    }

    const filePath = join(ROOT, pathname);

    if (!existsSync(filePath)) {
      const indexPath = join(ROOT, 'index.html');
      if (existsSync(indexPath)) {
        return new Response(readFileSync(indexPath), {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache',
          },
        });
      }
      return new Response('Not found', { status: 404 });
    }

    return new Response(readFileSync(filePath), {
      headers: {
        'Content-Type': MIME[extname(filePath)] ?? 'application/octet-stream',
        'Cache-Control': 'no-cache',
      },
    });
  },
});

console.log(`🚀 ShopFast dev server corriendo en → http://localhost:${PORT}`);
