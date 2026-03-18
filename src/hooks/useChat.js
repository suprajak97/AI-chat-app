import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // Load state from local storage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }

    const savedKey = localStorage.getItem('geminiApiKey');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  // Save messages to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('geminiApiKey', key);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
  };

  const sendMessage = async (text) => {
    if (!text.trim() || !apiKey) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // Convert history to Gemini format if needed (simplified for text-only prompt here)
      const prompt = text; 
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiText = response.text();

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: `Error connecting to AI: ${error.message || 'Check your API key.'}`,
        sender: 'ai',
        isError: true,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    apiKey,
    saveApiKey
  };
};
