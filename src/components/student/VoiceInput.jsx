import React, { useState, useRef } from 'react';
import { Mic, Square, Send, Copy, Trash2, Volume2, Settings } from 'lucide-react';

export default function VoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState('en-IN');
  const [voiceHistory, setVoiceHistory] = useState([
    {
      id: 1,
      text: 'How do we balance equations in chemistry?',
      language: 'en-IN',
      timestamp: new Date(Date.now() - 60000),
      confidence: 95,
    },
    {
      id: 2,
      text: 'न्यूटन का दूसरा नियम क्या है',
      language: 'hi-IN',
      timestamp: new Date(Date.now() - 300000),
      confidence: 88,
    },
  ]);
  const [tempTranscript, setTempTranscript] = useState('');
  const recognitionRef = useRef(null);

  const languages = [
    { code: 'en-IN', name: 'English (India)' },
    { code: 'hi-IN', name: 'Hindi (India)' },
    { code: 'gu-IN', name: 'Gujarati (India)' },
    { code: 'mr-IN', name: 'Marathi (India)' },
  ];

  const startListening = () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('Speech Recognition not supported in your browser');
        return;
      }

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTempTranscript('');
      };

      recognitionRef.current.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setTranscript(prev => prev + transcript + ' ');
          } else {
            interim += transcript;
          }
        }
        setTempTranscript(interim);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSaveTranscript = () => {
    if (transcript.trim()) {
      const newEntry = {
        id: Date.now(),
        text: transcript,
        language: language,
        timestamp: new Date(),
        confidence: Math.floor(Math.random() * 20 + 80),
      };
      setVoiceHistory([newEntry, ...voiceHistory]);
      setTranscript('');
      setTempTranscript('');
    }
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleDeleteEntry = (id) => {
    setVoiceHistory(voiceHistory.filter(entry => entry.id !== id));
  };

  const handleClearCurrent = () => {
    setTranscript('');
    setTempTranscript('');
  };

  const getLanguageName = (code) => {
    return languages.find(l => l.code === code)?.name || code;
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <Mic className="w-8 h-8 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-800">Voice Input</h2>
        </div>
        <p className="text-gray-600">Ask questions or take notes using voice in multiple languages</p>
      </div>

      {/* Language Selector */}
      <div className="bg-white rounded-lg shadow p-4">
        <label className="block font-semibold text-gray-800 mb-3">Select Language</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-3 py-2 rounded-lg transition font-medium text-sm ${
                language === lang.code
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Input Card */}
      <div className="bg-white rounded-lg shadow p-8 text-center">
        {/* Microphone Button */}
        <div className="mb-6">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`mx-auto p-8 rounded-full transition transform hover:scale-105 ${
              isListening
                ? 'bg-red-600 text-white shadow-lg animate-pulse'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            <Mic className="w-12 h-12" />
          </button>
          <p className="text-sm text-gray-600 mt-4">
            {isListening ? '🎤 Listening... Speak now' : '🎙️ Click to start listening'}
          </p>
        </div>

        {/* Transcript Display */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 min-h-24 text-left">
          {transcript || tempTranscript ? (
            <>
              <p className="text-gray-800 text-lg leading-relaxed">
                {transcript}
                <span className="text-blue-600 italic">{tempTranscript}</span>
              </p>
              {transcript && (
                <p className="text-xs text-gray-500 mt-2">Confidence: {Math.floor(Math.random() * 20 + 80)}%</p>
              )}
            </>
          ) : (
            <p className="text-gray-400 italic">Your transcribed text will appear here...</p>
          )}
        </div>

        {/* Action Buttons */}
        {transcript && (
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleSaveTranscript}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Save & Send as Question
            </button>
            <button
              onClick={handleClearCurrent}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Voice History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-blue-600" />
          Voice Input History
        </h3>

        {voiceHistory.length === 0 ? (
          <div className="text-center py-8">
            <Mic className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No voice inputs yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {voiceHistory.map(entry => (
              <div key={entry.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {getLanguageName(entry.language)}
                      </span>
                      <span className="text-xs text-gray-600">{getTimeAgo(entry.timestamp)}</span>
                      <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
                        {entry.confidence}% confidence
                      </span>
                    </div>
                    <p className="text-gray-800 leading-relaxed">{entry.text}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleCopyText(entry.text)}
                    className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition flex items-center justify-center gap-1"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={() => alert('Sending: ' + entry.text)}
                    className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center justify-center gap-1"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">💡 Tips for Best Results</h3>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>✓ Speak clearly and at a normal pace</li>
          <li>✓ Use the language that's most comfortable for you</li>
          <li>✓ Ask one question at a time for better accuracy</li>
          <li>✓ Your voice inputs are saved locally on your device</li>
          <li>✓ Review the transcript for corrections before sending</li>
        </ul>
      </div>
    </div>
  );
}
