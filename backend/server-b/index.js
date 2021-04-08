const path = require('path');
const { connectDB, disconnectDB } = require('./models/db');

connectDB();

const http = require('http');
var Order = require('./services/order');

const PORT = 8086;
const server = http.createServer(Order);

server.on('error', err => {
  console.error(err);
  server.close();
});

server.on('close', () => console.log('Server closed.'));

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
