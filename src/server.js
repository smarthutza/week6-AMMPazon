const http = require('http');

const server = http.createServer(router);
const port = process.env.PORT || 3004;
const router = require('./router');


server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
