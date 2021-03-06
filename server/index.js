const path = require('path');
const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const uuid  = require('uuid');
const open = require('open');
const { initSockets } = require('./api')

const PORT = process.env.PORT || 3000;
const CLIENT_ADDRESS = `http://localhost:${PORT}`;

const CLIENT_DIST = path.join(__dirname, '../client/dist');

const app = express();
const httpServer = http.createServer(app);
const io = SocketIO(httpServer, {});
io.engine.generateId = uuid.v4;

app.use(express.static(CLIENT_DIST));

app.get('*', (request, response) => {
  response.sendFile(path.join(CLIENT_DIST, 'index.html'));
});

initSockets(io);

httpServer.listen(PORT, () => {
  console.info(`
  SpeechJam

  Compete with friends to blend in with the AI in a chatroom. Vote on the real AI, get points each round for guessing correctly and for tricking your opponents.

  Visit ${CLIENT_ADDRESS} to get started.
  `);
  if (process.env.NODE_ENV === 'production') {
    open(CLIENT_ADDRESS);
  }
});
