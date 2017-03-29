const handlers = require('./handlers');


const router = (req, res) => {
  const endpoint = req.url;

  if (endpoint === '/') {

    handlers.serveLanding(req, res);

  } else if (endpoint === '/bestsellers') {

    handlers.serveBestsellers(req, res);

  } else {

    handlers.serveNotFound(req, res);

  }
};


module.exports = router;
