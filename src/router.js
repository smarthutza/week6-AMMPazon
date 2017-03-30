const handlers = require('./handlers');


const router = (req, res) => {
  const endpoint = req.url;

  if (endpoint === '/') {

    handlers.serveLanding(req, res);

  } else if (endpoint.indexOf('/assets') === 0) {

    handlers.serveAssets(req, res);

  } else if (endpoint.indexOf('/get-data') === 0) {

    handlers.serveData(req, res);

  } else {

    handlers.serveNotFound(req, res);

  }
};


module.exports = router;
