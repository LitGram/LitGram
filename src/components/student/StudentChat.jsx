import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Download, AlertCircle } from 'lucide-react';
import { getSocraticResponse } from '../../api/aiService';
import { useToast } from '../Toast';

export default function StudentChat() {
  const toast = useToast();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      text: 'Hello! I\'m your Socratic tutor. Ask me any question about Physics, Chemistry, Mathematics, Biology, or other RBSE subjects. I\'ll guide you to find the answer through reasoning and hints, rather than giving direct answers.',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('english');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) {
      toast.warning('Please enter a question');
      return;
    }

    setError(null);

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputText,
    };
    setMessages([...messages, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      // Get AI response
      const response = await getSocraticResponse(inputText, language);
      const assistantMessage = {
        id: messages.length + 2,
        type: 'assistant',
        text: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setError('Failed to get response. Please try again.');
      toast.error('Unable to get response from tutor');
      // Remove loading user message on error
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy to clipboard');
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 rounded-t-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Ask Your Tutor</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-teal-500 text-white px-3 py-1 rounded text-sm"
          >
            <option value="english">English</option>
            <option value="hinglish">Hinglish</option>
            <option value="hindi">Hindi</option>
          </select>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-teal-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-900 rounded-bl-none border border-gray-300'
              }`}
            >
              <p className="text-sm lg:text-base">{message.text}</p>
              {message.type === 'assistant' && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleCopyMessage(message.text)}
                    aria-label="Copy message to clipboard"
                    className="text-xs bg-gray-300 hover:bg-gray-400 text-gray-900 px-2 py-1 rounded flex items-center gap-1 transition"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start" role="status" aria-label="Tutor is thinking">
            <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg rounded-bl-none border border-gray-300">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-start">
            <div className="bg-red-50 text-red-800 px-4 py-3 rounded-lg rounded-bl-none border border-red-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-300 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask your question here..."
            aria-label="Type your question"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100"
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !inputText.trim()}
            aria-label="Send message"
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center gap-2 font-medium"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Tip: I guide you to find answers using the Socratic method. Ask specific questions!
        </p>
      </div>
    </div>
  );
}

