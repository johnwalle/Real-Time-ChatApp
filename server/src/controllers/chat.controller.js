const Chat = require('../models/chat.model');
const { getuser } = require('../services/user.service')

// Send a message from one user to another
const sendMessage = async (req, res) => {

    try {
        const { receiverId, text } = req.body;
        const senderId = req.user._id; // Get the sender's ID from the authenticated user

        if (!receiverId || !text) {
            return res.status(400).json({ error: 'Receiver ID and message text are required.' });
        }

        const reciver = await getuser(receiverId);

        if (!reciver) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Create a new message
        const message = new Chat({
            sender: senderId,
            receiver: receiverId,
            text
        });

        // Save the message to the database
        await message.save();

        return res.status(201).json(message);
    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

// Get all messages between two users
const getMessages = async (req, res) => {

    try {

        const { userId } = req.body;
        const currentUserId = req.user._id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required.' });
        }

        const user = await getuser(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }


        // Find messages where either user is the sender or receiver
        const messages = await Chat.find({
            $or: [
                { sender: currentUserId, receiver: userId },
                { sender: userId, receiver: currentUserId }
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
            // Combine sender username and text
        }));

        return res.status(200).json(formattedMessages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = {
    sendMessage,
    getMessages
};
