import React, { useEffect, useRef } from 'react';
import Message from './Message';

const ChatBox = ({ messages, isLoading }) => {
  const containerRef = useRef(null);

  // Handle auto-scroll down
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div 
      className="chat-container glass-panel"
      ref={containerRef}
      style={{ border: 'none', borderRadius: '0', flex: 1 }}
    >
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center opacity-70" style={{ color: 'var(--text-secondary)' }}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Welcome to AI Nexus</h2>
            <p>Start a conversation below.</p>
          </div>
        </div>
      ) : (
        messages.map((msg, index) => (
          <Message 
            key={msg.id || index} 
            message={msg} 
          />
        ))
      )}
      
      {isLoading && (
        <div className="message-wrapper ai">
          <div className="message-bubble ai">
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
