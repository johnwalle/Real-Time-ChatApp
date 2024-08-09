const express = require('express');
const chatRouter = express.Router();
const { sendMessage, getMessages } = require('../controllers/chat.controller');
const  authMiddleware  = require('../middlewares/authMiddleware'); // Ensure you have an auth middleware

// Send a message
chatRouter.post('/send', authMiddleware, sendMessage);

// Get messages between two users
chatRouter.get('/get', authMiddleware, getMessages);


module.exports = chatRouter;
