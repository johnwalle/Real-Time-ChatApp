const mongoose = require('mongoose');

// Define the schema for chats
const chatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Use this pattern to prevent overwriting the model if it's already defined
const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);

module.exports = Chat;
