import React from 'react';

function ChatArea({ selectedFriend, messages, message, setMessage, handleSubmit }) {
    return (
        <div className="md:w-3/4 w-full flex flex-col">
            <div className="flex-1 bg-white p-4 overflow-y-auto">
                {selectedFriend ? (
                    <>
                        <h3 className="text-lg font-semibold mb-4">Chat with {selectedFriend}</h3>
                        <div id="messages" className="space-y-4">
                            {messages
                                .filter(msg => msg.user === selectedFriend) // Filter messages for the selected friend
                                .map((msg, index) => (
                                    <div key={index}>
                                        <strong>{msg.user}</strong>: {msg.text}
                                    </div>
                                ))}
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
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Send
                    </button>
                </form>
            )}
        </div>
    );
}

export default ChatArea;
