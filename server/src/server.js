const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
require('colors');
require('dotenv').config();

const { initializeSocketIO } = require('./controllers/chat.controller');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const chatRouter = require('./routes/chat.route');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

// Initialize Socket.IO with CORS options
const server = http.createServer(app);
const io = initializeSocketIO(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow the React app's origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }
});

// Attach the Socket.IO instance to the request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middleware to handle CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow the React app's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Connect to the database
connectDB();

// Set up routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/chat', chatRouter);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`listening on *:${port}`.cyan.bold);
});