const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
require('colors');
require('dotenv').config();


const authRouter = require('./routes/auth.route');
const userROuter = require('./routes/user.route');
const chatRouter = require('./routes/chat.route')
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

// Middleware to handle CORS
app.use(cors()); // Allow requests from all origins

// Connect to the database
connectDB();

// Set up routes
app.use('/api/auth', authRouter);
app.use('/api/users', userROuter);
app.use('/api/chat', chatRouter)

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }
});

// Define the Message model
const Message = mongoose.model('Message', { user: String, text: String, createdAt: { type: Date, default: Date.now } });

// Handle socket connections
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
