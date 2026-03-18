import React from 'react';
import { Sparkles, Trash2, Settings, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ theme, toggleTheme, onClearChat, onOpenSettings, hasMessages }) => {
  const isDark = theme === 'dark';

  return (
    <header className="header glass-panel">
      <h1>
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           style={{ display: 'flex', alignItems: 'center' }}
        >
          <Sparkles size={24} color="#a855f7" />
        </motion.div>
        AI Nexus
      </h1>
      
      <div className="header-actions">
        <div className="toggle-container" title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}>
          {isDark ? <Moon size={18} className="text-gray-400" /> : <Sun size={18} className="text-yellow-500" />}
          <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={!isDark} 
              onChange={toggleTheme} 
            />
            <span className="slider"></span>
          </label>
        </div>
        
        {hasMessages && (
          <button 
            className="btn-icon" 
            title="Clear Chat" 
            onClick={onClearChat}
          >
            <Trash2 size={18} />
          </button>
        )}
        
        <button 
          className="btn-icon" 
          title="Settings" 
          onClick={onOpenSettings}
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
