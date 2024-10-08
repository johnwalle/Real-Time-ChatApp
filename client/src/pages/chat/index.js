import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import FriendsList from '../../components/chat/FriendsList';
import ChatArea from '../../components/chat/ChatArea';
import { useAuthStore } from '../../container/auth.store';
import { useMessageStore } from '../../container/message.store';

function Chat() {
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [socket, setSocket] = useState(null);
    const [token, setToken] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthStore((state) => ({
        user: state.user,
    }));

    const { fetchMessages, chats } = useMessageStore((state) => ({
        fetchMessages: state.fetchMessages,
        chats: state.chats,
    }));

    const userId = user?._id;

    useEffect(() => {
        // Connect to the Socket.IO server
        const newSocket = io(`${process.env.REACT_APP_API}`);
        
        setSocket(newSocket);
        setToken(user.token);
        // Join the chat room for the current user
        newSocket.emit('join room', userId);

        // Listen for incoming messages
        newSocket.on('new message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Clean up the socket connection on component unmount
        return () => {
            newSocket.disconnect();
        };
    }, [userId, user.token]);

    useEffect(() => {
        // Fetch the chat messages for the selected friend
        if (selectedFriend) {
            const fetchData = async () => {
                try {
                    setIsLoading(true);
                    await fetchMessages(user.token, selectedFriend);
                    setMessages(chats);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                    setMessages([]);
                } finally {
                    // Set the loading state to false after the data is fetched
                    setIsLoading(false);
                }
            };
            fetchData();
        } else {
            setMessages([]);
            setIsLoading(false);
        }
    }, [selectedFriend, userId, user.token, fetchMessages, chats]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (message.trim() && selectedFriend) {
                // Send the message through the Socket.IO connection
                socket.emit('send message', { senderId: userId, receiverId: selectedFriend, text: message });
                // Update the local messages state
                setMessages((prevMessages) => [...prevMessages, { senderId: userId, receiverId: selectedFriend, text: message, createdAt: new Date() }]);
                setMessage('');
            }
        },
        [message, selectedFriend, socket, userId]
    );

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            {/* Friends List */}
            <FriendsList selectedFriend={selectedFriend} onSelectFriend={setSelectedFriend} />

            {/* Chat Area */}
            <ChatArea
                selectedFriend={selectedFriend}
                user={userId}
                messages={messages}
                isLoading={isLoading}
            />
        </div>
    );
}

export default Chat;