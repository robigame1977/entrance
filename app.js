import { createServer } from 'http';
import next from 'next';
import path from 'path';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    // Handle all requests through Next
    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${port}`);
  });
});
