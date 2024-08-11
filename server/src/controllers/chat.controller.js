const Chat = require('../models/chat.model');
const { getuser } = require('../services/user.service');
const socketIO = require('socket.io');

// Send a message from one user to another
const sendMessage = async (req, res) => {
    try {
        const { receiverId, text } = req.body;
        const senderId = req.user._id; // Get the sender's ID from the authenticated user

        if (!receiverId || !text) {
            return res.status(400).json({ error: 'Receiver ID and message text are required.' });
        }

        const receiver = await getuser(receiverId);

        if (!receiver) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Create a new message
        const message = new Chat({
            sender: senderId,
            receiver: receiverId,
            text
        });

        // Save the message to the database
        const savedMessage = await message.save();

        // Emit the new message to the connected clients
        req.io.to(receiverId).to(senderId).emit('new message', {
            senderId: savedMessage.sender,
            receiverId: savedMessage.receiver,
            text: savedMessage.text,
            createdAt: savedMessage.createdAt
        });

        return res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

// Get all messages between two users
const getMessages = async (req, res) => {
    try {
        const { friendId } = req.params; // Use req.params instead of req.prams
        const currentUserId = req.user._id;

        if (!friendId) {
            return res.status(400).json({ error: 'User ID is required.' });
        }

        const user = await getuser(friendId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Find messages where either user is the sender or receiver
        const messages = await Chat.find({
            $or: [
                { sender: currentUserId, receiver: friendId },
                { sender: friendId, receiver: currentUserId }
            ]
        })
            .populate('sender', 'username')
            .populate('receiver', 'username')
            .sort({ createdAt: 1 }); // Sort messages by creation date ascending

        // Format the messages
        const formattedMessages = messages.map(message => ({
            senderId: message.sender._id,
            receiverId: message.receiver._id,
            text: message.text,
            combinedText: `${message.sender.username}: ${message.text}`,
            createdAt: message.createdAt
        }));

        return res.status(200).json(formattedMessages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

// Set up Socket.IO
const initializeSocketIO = (server, options) => {
    const io = socketIO(server, options);

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('join room', (roomId) => {
            socket.join(roomId);
            console.log(`User joined room: ${roomId}`);
        });

        socket.on('send message', async (message) => {
            console.log('message-sent', message);
            const { senderId, receiverId, text } = message;

            // Create a new message
            const newMessage = new Chat({
                sender: senderId,
                receiver: receiverId,
                text
            });

            // Save the message to the database
            const savedMessage = await newMessage.save();

            // Emit the new message to the connected clients
            io.to(receiverId).to(senderId).emit('new message', {
                senderId: savedMessage.sender,
                receiverId: savedMessage.receiver,
                text: savedMessage.text,
                createdAt: savedMessage.createdAt
            });
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
};

module.exports = {
    sendMessage,
    getMessages,
    initializeSocketIO
};