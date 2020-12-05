const http = require('http');
const formidable = require('formidable');
const path = require("path");

 
const server = http.createServer((req, res) => {
  if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {
    // parse a file upload
    const form = formidable({ multiples: true, keepExtensions: true, uploadDir: path.join(__dirname, "uploads") });
 
    form.parse(req, (err, fields, files) => {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write("<h1> It worked! </h1>");
      res.end();
    });

    return;
  }
 
  // show a file upload form
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(`
    <html>
    <head>
        <link rel="stylesheet" href="stylesheet.css"> // unsure how to apply style sheet to main upload page
    </head>
        <body>
            <h2>With Node.js <code>"http"</code> module</h2>
            <form action="/api/upload" enctype="multipart/form-data" method="post">
            <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
            <input type="submit" value="Upload" />
            </form>
        </body>
    </html>
  `);
});
 
server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000/ ...');
});