import React, { useState } from 'react';
import { BookOpen, Timer, AlertCircle } from 'lucide-react';
import { RBSE_CURRICULUM, getSubjectChapters } from '../../data/curriculum';
import TestRunner from './TestRunner';
import TestResults from './TestResults';
import { useToast } from '../Toast';

export default function MockTestEngine() {
  const toast = useToast();
  const [phase, setPhase] = useState('config'); // 'config', 'running', 'results'
  const [testConfig, setTestConfig] = useState({
    subject: '',
    chapters: [],
    numQuestions: 10,
    timeLimit: 30,
  });
  const [testResults, setTestResults] = useState(null);

  const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Hindi'];
  const chapters = testConfig.subject
    ? getSubjectChapters(testConfig.subject, 12) // Default to class 12
    : [];

  const handleChapterToggle = (chapterId) => {
    setTestConfig(prev => ({
      ...prev,
      chapters: prev.chapters.includes(chapterId)
        ? prev.chapters.filter(id => id !== chapterId)
        : [...prev.chapters, chapterId]
    }));
  };

  const handleStartTest = () => {
    if (!testConfig.subject) {
      toast.warning('Please select a subject');
      return;
    }
    if (testConfig.chapters.length === 0) {
      toast.warning('Please select at least one chapter');
      return;
    }
    setPhase('running');
  };

  const handleTestComplete = (results) => {
    setTestResults(results);
    setPhase('results');
  };

  const handleRetakeTest = () => {
    setPhase('config');
    setTestResults(null);
  };

  if (phase === 'running' && testResults === null) {
    return (
      <TestRunner
        config={testConfig}
        onComplete={handleTestComplete}
      />
    );
  }

  if (phase === 'results' && testResults) {
    return (
      <TestResults
        results={testResults}
        config={testConfig}
        onRetake={handleRetakeTest}
      />
    );
  }

  // Configuration phase
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-blue-600" />
          Mock Test Engine
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subject Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Subject <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {subjects.map(subject => (
                <label key={subject} className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-blue-50">
                  <input
                    type="radio"
                    name="subject"
                    value={subject}
                    checked={testConfig.subject === subject}
                    onChange={(e) => setTestConfig(prev => ({
                      ...prev,
                      subject: e.target.value,
                      chapters: []
                    }))}
                    className="mr-3"
                  />
                  <span className="text-gray-800">{subject}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Chapter Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Chapters <span className="text-red-500">*</span>
            </label>
            {testConfig.subject ? (
              <div className="space-y-2 max-h-64 overflow-y-auto border rounded-lg p-3">
                {chapters.map(chapter => (
                  <label key={chapter.id} className="flex items-center p-2 hover:bg-blue-50">
                    <input
                      type="checkbox"
                      checked={testConfig.chapters.includes(chapter.id)}
                      onChange={() => handleChapterToggle(chapter.id)}
                      className="mr-3"
                    />
                    <span className="text-gray-800 text-sm">{chapter.name}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg text-gray-600 text-sm">
                Select a subject first
              </div>
            )}
          </div>
        </div>

        {/* Test Configuration */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Questions
            </label>
            <select
              value={testConfig.numQuestions}
              onChange={(e) => setTestConfig(prev => ({
                ...prev,
                numQuestions: parseInt(e.target.value)
              }))}
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            >
              <option value={10}>10 Questions</option>
              <option value={20}>20 Questions</option>
              <option value={30}>30 Questions</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Time Limit (minutes)
            </label>
            <select
              value={testConfig.timeLimit}
              onChange={(e) => setTestConfig(prev => ({
                ...prev,
                timeLimit: parseInt(e.target.value)
              }))}
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
              <option value={90}>90 minutes</option>
            </select>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="font-medium mb-1">Test Guidelines:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Questions will include MCQ, True/False, and one-line answers</li>
              <li>Once submitted, you cannot edit answers</li>
              <li>Your results will be saved in your test history</li>
              <li>Weak topics will be identified for focused revision</li>
            </ul>
          </div>
        </div>

        <button
          onClick={handleStartTest}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition text-lg"
        >
          Start Test
        </button>
      </div>
    </div>
  );
}

