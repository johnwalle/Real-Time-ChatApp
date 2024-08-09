import React, { useState } from 'react';
import FriendsList from '../../components/chat/FriendsList';
import ChatArea from '../../components/chat/ChatArea';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');
    const [friends, setFriends] = useState([
        { name: 'Alice', gender: 'female' },
        { name: 'Bob', gender: 'male' },
        { name: 'Charlie', gender: 'male' }
    ]);
    const [selectedFriend, setSelectedFriend] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && selectedFriend) {
            // Add message sending logic here
            setMessages([...messages, { user, text: message }]);
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            {/* Friends List */}
            <FriendsList
                selectedFriend={selectedFriend}
                onSelectFriend={setSelectedFriend}
            />

            {/* Chat Area */}
            <ChatArea
                selectedFriend={selectedFriend}
                messages={messages}
                message={message}
                setMessage={setMessage}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default Chat;
