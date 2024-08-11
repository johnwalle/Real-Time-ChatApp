import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); // Assuming you have a Socket.IO server running

function ChatArea({ selectedFriend, user, messages }) {
  const messagesRef = useRef(null);
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && selectedFriend) {
      // Send the message through the Socket.IO connection
      socket.emit('send message', { senderId: user, receiverId: selectedFriend, text: message });
      // Update the local messages state
      setAllMessages((prevMessages) => [...prevMessages, { senderId: user, receiverId: selectedFriend, text: message, createdAt: new Date() }]);
      setMessage('');
    }
  };

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [allMessages]);

  return (
    <div className="md:w-3/4 w-full flex flex-col">
      <div className="flex-1 bg-white p-4 overflow-y-auto" ref={messagesRef}>
        {selectedFriend ? (
          <>
            <h3 className="text-lg font-semibold mb-4">Chat with {selectedFriend}</h3>
            <div className="space-y-4">
              {messages
                .filter((msg) => msg.senderId === selectedFriend || msg.senderId === user)
                .map((msg, index) => (
                  <div key={index} className={`flex ${msg.senderId === user ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`bg-gray-200 p-2 rounded max-w-[70%] ${msg.senderId === user ? 'bg-blue-500 text-white' : ''
                        }`}
                    >
                      <p>{msg.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              {/* Add the live preview of the message */}
              {message && (
                <div className={`flex justify-end`}>
                  <div className={`bg-gray-200 p-2 rounded max-w-[70%] bg-blue-500 text-white`}>
                    <p>{message}</p>
                    <p className="text-xs text-gray-500 mt-1">Typing...</p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-center">Select a friend to start chatting.</p>
        )}
      </div>
      {selectedFriend && (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 border-t border-gray-300 flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-2 border border-gray-300 rounded mr-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Send
          </button>
        </form>
      )}
    </div>
  );
}

export default ChatArea;