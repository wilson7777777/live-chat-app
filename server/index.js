const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const redis = require('redis');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const redisClient = redis.createClient({
  url: 'redis://redis:6379', // Connect to the redis service name
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect().then(()=>{
    console.log("Redis Connected");
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', async (msg) => {
    console.log('message: ' + msg.message);
    io.emit('chat message', msg); // Broadcast to all clients
    await redisClient.RPUSH('messages', JSON.stringify(msg));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});