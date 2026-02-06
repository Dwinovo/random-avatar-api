const http = require('http');
const { URL } = require('url');

const { getRandomAvatarOption } = require('./random');
const { buildAvatarSvg, DEFAULT_SIZE } = require('./svg');

function resolvePort() {
  const cliPort = parseCliPort();
  if (cliPort !== undefined) {
    return cliPort;
  }

  const envPort = parsePort(process.env.PORT);
  if (envPort !== undefined) {
    return envPort;
  }

  return 3000;
}

function parseCliPort() {
  const args = process.argv.slice(2);

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (arg === '--port' || arg === '-p') {
      const value = args[i + 1];
      if (value && !value.startsWith('-')) {
        const parsed = parsePort(value);
        if (parsed !== undefined) {
          return parsed;
        }
      }
    } else if (arg.startsWith('--port=')) {
      const [, value] = arg.split('=', 2);
      const parsed = parsePort(value);
      if (parsed !== undefined) {
        return parsed;
      }
    } else if (arg.startsWith('-p=')) {
      const [, value] = arg.split('=', 2);
      const parsed = parsePort(value);
      if (parsed !== undefined) {
        return parsed;
      }
    }
  }

  return undefined;
}

function parsePort(value) {
  if (!value) {
    return undefined;
  }

  const port = Number(value);
  if (!Number.isFinite(port)) {
    return undefined;
  }

  const portInt = Math.floor(port);
  if (portInt < 1 || portInt > 65535) {
    return undefined;
  }

  return portInt;
}

const PORT = resolvePort();

function parseSize(query) {
  const raw = query.get('size');
  if (!raw) {
    return DEFAULT_SIZE;
  }
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? Math.min(value, 1024) : DEFAULT_SIZE;
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host}`);

  if (req.method === 'GET' && requestUrl.pathname === '/image') {
    try {
      const size = parseSize(requestUrl.searchParams);
      const option = getRandomAvatarOption();
      const svg = await buildAvatarSvg(option, size);

      res.writeHead(200, {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'no-store',
      });
      res.end(svg);
    } catch (error) {
      console.error('[avatar] generation failed:', error);
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ message: 'Failed to generate avatar' }));
    }
    return;
  }

  if (req.method === 'GET' && requestUrl.pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ message: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`[avatar] server listening on port ${PORT}`);
});
