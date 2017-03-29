const path = require('path');
const fs = require('fs');

const handlers = {};

handlers.serveLanding = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (err, file) => {
    if (err) {
      handlers.serveNotFound(req, res);
    }

    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(file);
  });
};


handlers.getContentType = (url) => {
  const extension = path.extname(url);
  const extensionType = {
    '.css' : 'text/css',
    '.html' : 'text/html',
    '.ico' : 'image/x-ico',
    'json' : 'applictation/json'
  };
  return extensionType[extension];
};


handlers.serveAssets = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', req.url), (err, file) => {
    if (err) {
      handlers.serveNotFound(req,res);
    }

    res.writeHead(200, { 'content-type': handlers.getContentType(req.url) });
    res.end(file);
  });
};


handlers.serveNotFound = (req, res) => {
  res.writeHead(404, { 'content-type': 'text/html' });
  res.end('<h1>Page Not Found 😩</h1>');
};


module.exports = handlers;
