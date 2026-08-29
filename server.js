const http = require('http');
const fs = require('fs');
const path = require('path');

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  const host = req.headers.host || 'localhost';
  const urlObj = new URL(req.url, `http://${host}`);
  const decodedPath = decodeURIComponent(urlObj.pathname);
  let filePath = path.join(__dirname, decodedPath === '/' ? 'index.html' : decodedPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mime[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found: ' + decodedPath);
    } else {
      const headers = {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      };
      if (ext === '.pdf') {
        if (urlObj.searchParams.get('preview') === '1') {
          headers['Content-Disposition'] = 'inline; filename="Dheeraj_Yadav_Resume.pdf"';
        } else {
          headers['Content-Disposition'] = 'attachment; filename="Dheeraj_Yadav_Resume.pdf"';
        }
      }
      res.writeHead(200, headers);
      res.end(content);
    }
  });
});

let port = parseInt(process.env.PORT || '5000', 10);

function startServer(p) {
  server.listen(p, () => {
    console.log(`\n🚀 Portfolio Server is LIVE!`);
    console.log(`👉 Open in your browser: http://localhost:${p}\n`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${p} is in use, trying port ${p + 1}...`);
      startServer(p + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(port);
