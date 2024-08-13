import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './chat.css';

const ChatBox = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [loading, setLoading] = useState(true);
    const currentUser = "sanju"; // Replace with actual user
    const chatUser = "murari";   // Replace with actual chat user

    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/api/messages/${currentUser}/${chatUser}`);
                setMessages(response.data || []);
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
                scrollToBottom(); // Scroll to bottom after loading messages
            }
        };
        fetchMessages();
    }, [chatUser, currentUser]);

    const handleSendMessage = async () => {
        if (messageText.trim()) {
            try {
                const response = await axios.post('http://localhost:8000/api/messages', {
                    from: currentUser,
                    to: chatUser,
                    text: messageText,
                });
                setMessages((prevMessages) => [...prevMessages, response.data]);
                setMessageText('');
                scrollToBottom(); // Scroll to bottom after sending a message
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                <div className="chat-header">
                    <span>Chat with {chatUser}</span>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="chat-messages">
                    {loading ? (
                        <p>Loading...</p>
                    ) : messages.length === 0 ? (
                        <p>No messages yet. Start the conversation!</p>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg._id} className={`message ${msg.from === currentUser ? 'sent' : 'received'}`}>
                                <p>{msg.text}</p>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button className="send-button" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
