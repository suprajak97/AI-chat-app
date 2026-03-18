import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ChatBox from './components/ChatBox';
import InputBox from './components/InputBox';
import SettingsModal from './components/SettingsModal';
import AnimatedBackground from './components/AnimatedBackground';
import { useChat } from './hooks/useChat';

function App() {
  const [theme, setTheme] = useState('dark');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    apiKey,
    saveApiKey
  } = useChat();

  // Load state from local storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
    
    // Check if API key exists, if not, open settings
    if (!localStorage.getItem('geminiApiKey')) {
      setIsSettingsOpen(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('appTheme', newTheme);
    document.documentElement.className = newTheme;
  };

  return (
    <>
      <AnimatedBackground theme={theme} />
      <div className="app-container">
        <Header 
          theme={theme}
          toggleTheme={toggleTheme}
          onClearChat={clearChat}
          onOpenSettings={() => setIsSettingsOpen(true)}
          hasMessages={messages.length > 0}
        />
        
        <main className="main-content">
          <ChatBox 
            messages={messages} 
            isLoading={isLoading} 
          />
          
          <InputBox 
            onSendMessage={sendMessage} 
            isLoading={isLoading} 
            disabled={!apiKey}
            onClickDisabled={() => setIsSettingsOpen(true)}
          />
        </main>
      </div>

      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsModal 
            onClose={() => setIsSettingsOpen(false)} 
            onSave={saveApiKey}
            initialKey={apiKey}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
