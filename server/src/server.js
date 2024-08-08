const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
require('colors');
require('dotenv').config();


const authRouter = require('./routes/auth.route')
const connectDB = require('./config/db')

const app = express();
app.use(express.json());


//middlewares
connectDB();

app.use('/api/auth', authRouter);

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }
});



const Message = mongoose.model('Message', { user: String, text: String, createdAt: { type: Date, default: Date.now } });

io.on('connection', (socket) => {
  console.log('a user connected'.red.bold);

  socket.on('chat message', async (msg) => {
    const message = new Message(msg);
    await message.save();
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`listening on *:${port}`.cyan.bold);
});