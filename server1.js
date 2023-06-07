const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (req.method === 'GET') {
    if (pathname === '/api/parsetime') {
      const iso = query.iso;
      const date = new Date(iso);

      const response = {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    } else if (pathname === '/api/unixtime') {
      const iso = query.iso;
      const unixtime = new Date(iso).getTime();

      const response = {
        unixtime: unixtime
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    } else {
      res.writeHead(404);
      res.end();
    }
  } else {
    res.writeHead(405);
    res.end();
  }
});

const port = process.argv[2]|| 4000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
