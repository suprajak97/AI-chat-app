import React, { useState } from 'react';
import { Send, Cpu, User } from 'lucide-react';
import { motion } from 'framer-motion';

const InputBox = ({ onSendMessage, isLoading, disabled, onClickDisabled }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isLoading && !disabled) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="input-container">
      <motion.form 
        className="input-box" 
        onSubmit={handleSubmit}
        onClick={disabled ? onClickDisabled : undefined}
        whileFocus={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <textarea
          className="chat-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Click to configure Gemini API Key" : "Type a message..."}
          disabled={isLoading || disabled}
          rows={1}
        />
        <motion.button 
          type="submit" 
          className="send-btn" 
          disabled={!text.trim() || isLoading || disabled}
          title="Send message"
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9, rotate: -10 }}
        >
          <Send size={18} />
        </motion.button>
      </motion.form>
    </div>
  );
};

export default InputBox;
