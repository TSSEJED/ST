const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('signal', (data) => {
    socket.broadcast.emit('signal', data);
  });

  socket.on('join', (data) => {
    console.log(`User joined meeting: ${data.meetingId}`);
    socket.emit('signal', { message: `Welcome to meeting ${data.meetingId}` });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
