import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import NoFriendSelected from '../no.chat'

const socket = io(`${process.env.REACT_APP_API}`); // Assuming you have a Socket.IO server running

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
            <div className="space-y-4">
              {messages
                .filter((msg) => msg.senderId === selectedFriend || msg.senderId === user)
                .map((msg, index) => (
                  <div key={index} className={`flex ${msg.senderId === user ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`bg-gray-600 text-white p-2 rounded max-w-[70%] ${msg.senderId === user
                        ? 'bg-[#b78ae9] text-white'
                        : ''
                        }`}
                      style={{
                        backgroundColor: msg.senderId === user ? '#b78ae9' : '',
                        color: msg.senderId === user ? '#ffffff' : '',
                      }}
                    >

                      <p>{msg.text}</p>
                      <p className="text-xs text-gray-200 mt-1">
                        {new Date(msg.createdAt).toLocaleString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              {/* Add the live preview of the message */}
              {message && (
                <div className={`flex justify-end`}>
                  <div className={`bg-[#b78ae9] p-2 rounded max-w-[70%]  text-white`}>
                    <p>{message}</p>
                    <p className="text-xs text-gray-200 mt-1">Typing...</p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <NoFriendSelected />
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