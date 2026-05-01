const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname);
const mime = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.jpg':'image/jpeg', '.png':'image/png' };
http.createServer((req, res) => {
  const file = path.join(root, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'text/plain' });
    res.end(data);
  });
}).listen(8765, '0.0.0.0', () => {
  console.log('Catalyst Labs running on:');
  console.log('  Local:   http://localhost:8765');
  console.log('  iPhone:  http://192.168.100.69:8765');
});
