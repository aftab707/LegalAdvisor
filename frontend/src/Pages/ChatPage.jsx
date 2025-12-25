import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, Plus, LogOut, User, Sparkles,Scale, MessageSquare } from 'lucide-react';
import './ChatPage.css';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([{ id: 1, name: 'New Chat', messages: [] }]);
  const [activeChat, setActiveChat] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  // 1. Change 'aftab' to a state variable
  const [username, setUsername] = useState('Guest');


// --- SECURITY CHECK HERE ---
  useEffect(() => {
    const storedName = localStorage.getItem('chatUser');
    const token = localStorage.getItem('authToken');

    // If NO name is found in storage, redirect to Login
    if (!token) {
      window.location.href = '/login';
    } else {
      // If name IS found, let them stay and set the name
      setUsername(storedName || 'User');
    }
  }, []); // Empty array means this runs once when page loads


  // 3. Update Logout to clear the name
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Delete token
    localStorage.removeItem('chatUser'); // Delete the name
    window.location.href = '/login';     // Go back to login
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      // Simulate bot response
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: 'This is a demo response. Connect your backend to get real answers about Pakistani Constitution.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);

        // Update chat title if it's the first message
        if (newMessages.length === 1) {
          setChats(prev => prev.map(chat =>
            chat.id === activeChat
              ? { ...chat, name: message.slice(0, 30) + (message.length > 30 ? '...' : ''), messages: [...newMessages, botMessage] }
              : chat
          ));
        }
      }, 500);

      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    const newId = Date.now();
    setChats([...chats, { id: newId, name: 'New Chat', messages: [] }]);
    setActiveChat(newId);
    setMessages([]);
  };

  const switchChat = (id) => {
    setActiveChat(id);
    const chat = chats.find(c => c.id === id);
    setMessages(chat ? chat.messages : []);
  };

  return (
    <div className="chat-page-container">
      {/* Sidebar */}
      <aside className={`sidebar ${!sidebarOpen ? 'closed' : ''}`}>
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={handleNewChat}>
            <Plus size={20} />
            New Chat
          </button>
        </div>

        <div className="chat-list">
          {chats.map((chat) => (
            <button
              key={chat.id}
              className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
              onClick={() => switchChat(chat.id)}
            >
              <MessageSquare size={16} />
              <span className="chat-title">{chat.name}</span>
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <User size={20} color="white" />
            </div>
            <span className="username">{username}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="chat-header">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} />
          </button>
          <h1 className="app-title"> <div className="bot-avatar">
                      <Scale size={18} color="white" />
                    </div>Legal Advisor</h1>
        </header>

        {/* Chat Area */}
        <section className="chat-area">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <Scale size={40} color="white" />
              </div>
              <h2 className="welcome-title">How can I help you today?</h2>
              <p className="welcome-subtitle">
                Ask me anything about the Pakistani Constitution. I'll provide accurate
                answers based on official documents.
              </p>
            </div>
          ) : (
            <div className="messages-container">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-wrapper ${msg.type}`}>
                  {msg.type === 'bot' && (
                    <div className="bot-avatar">
                      <Scale size={20} color="white" />
                    </div>
                  )}
                  <div className={`message-bubble ${msg.type}`}>
                    <p className="message-text">{msg.content}</p>
                    <span className={`message-time ${msg.type}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                  {msg.type === 'user' && (
                    <div className="user-avatar-msg">
                      <User size={20} color="#666" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </section>

        {/* Input Area */}
        <footer className="input-area">
          <div className="input-wrapper">
            <div className="input-container">
              <input
                type="text"
                className="message-input"
                placeholder="Ask a legal question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className={`send-btn ${message.trim() ? 'active' : ''}`}
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <Send size={20} />
              </button>
            </div>
            <p className="server-status">
              Backend server is offline. Please start Django server on http://localhost:8000
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}