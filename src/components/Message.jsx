import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Bot, User } from 'lucide-react';

const Message = ({ message }) => {
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const messageContent = (
    <div className={`message-bubble ${isUser ? 'user' : 'ai'} ${message.isError ? 'border-red-500 text-red-100' : ''}`}>
      <div className="flex items-start gap-3">
        {!isUser && (
          <div className="mt-1 flex-shrink-0">
            <Bot size={18} className="text-purple-500" />
          </div>
        )}
        <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', flex: 1 }}>
          {message.text}
        </div>
        {isUser && (
          <div className="mt-1 flex-shrink-0">
            <User size={18} className="text-indigo-200" />
          </div>
        )}
      </div>
      
      {!isUser && !message.isError && (
        <div className="message-actions">
          <button className="action-btn" onClick={handleCopy} title="Copy to clipboard">
            <Copy size={14} color={copied ? '#10b981' : 'currentColor'} /> 
            {copied && <span style={{fontSize: '0.7rem', marginLeft: '4px', color: '#10b981'}}>Copied</span>}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <motion.div 
      className={`message-wrapper ${isUser ? 'user' : 'ai'}`}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.01 }}
    >
      {messageContent}
    </motion.div>
  );
};

export default Message;
