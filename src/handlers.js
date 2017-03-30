const path = require('path');
const fs = require('fs');
const query = require('./database_queries');

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

handlers.serveBestsellers = (req, res) => {

  query.getBestseller((err, result) => {
    if (err) console.log(err);
    let data = JSON.stringify(result.rows);
    res.writeHead(200,{
      'content-type': 'application/json'
    });
    res.end(data);
  });

};

handlers.serveSalesToDate = (req, res) => {

  query.getAllSales((err, result) => {
    if (err) console.log(err);
    let data = JSON.stringify(result);
    res.writeHead(200,{
      'content-type': 'application/json'
    });
    res.end(data);
  });

};



module.exports = handlers;
