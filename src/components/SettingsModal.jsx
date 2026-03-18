import React, { useState } from 'react';
import { X, Key } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsModal = ({ onClose, onSave, initialKey }) => {
  const [apiKey, setApiKey] = useState(initialKey || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(apiKey);
    onClose();
  };

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content glass-panel"
        initial={{ y: 50, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 50, scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="modal-title flex items-center gap-2">
          <Key size={20} className="text-purple-400" /> API Settings
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#9ca3af' }}>
              Google Gemini API Key
            </label>
            <input 
              type="password" 
              className="modal-input" 
              placeholder="AIzaSy..." 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              autoFocus
            />
            <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
              Your key is stored locally in your browser and is never sent to our servers.
            </p>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="modal-btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn save">
              Save Key
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SettingsModal;
