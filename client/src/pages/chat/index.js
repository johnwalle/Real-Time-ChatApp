import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import styles from './styles.module.css';
const ENDPOINT = 'http://localhost:3001';

function App() {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = socketIOClient(ENDPOINT);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to the WebSocket server');
        });

        newSocket.on('chat message', (msg) => {
            setMessages((messages) => [...messages, msg]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && user.trim()) {
            socket.emit('chat message', { user, text: message });
            setMessage('');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.messageContainer}>
                {messages.map((msg, index) => (
                    <div key={index} className={styles.messageItem}>
                        <strong>{msg.user}</strong>: {msg.text}
                    </div>
                ))}
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Your name"
                    required
                />
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default App;