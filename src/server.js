const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/') {
      app.render(req, res, '/home', query);
      return;
    }

    if (pathname) {
      app.render(req, res, pathname, query);
      return;
    }

    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
  });
});
