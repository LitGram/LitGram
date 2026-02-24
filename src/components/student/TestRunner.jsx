import React, { useState, useEffect, useCallback } from 'react';
import { Clock, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';

const MOCK_QUESTIONS = [
  {
    id: 1,
    type: 'mcq',
    question: 'What is the SI unit of force?',
    options: ['Joule', 'Newton', 'Pascal', 'Watt'],
    correct: 'Newton',
    topic: 'Laws of Motion'
  },
  {
    id: 2,
    type: 'true-false',
    question: 'Velocity and speed have the same meaning in physics.',
    correct: false,
    topic: 'Kinematics'
  },
  {
    id: 3,
    type: 'mcq',
    question: 'Which law states that action and reaction are equal and opposite?',
    options: ['First Law', 'Second Law', 'Third Law', 'Gravity Law'],
    correct: 'Third Law',
    topic: 'Laws of Motion'
  },
  {
    id: 4,
    type: 'one-line',
    question: 'Define acceleration.',
    correct: 'Rate of change of velocity',
    topic: 'Kinematics'
  },
  {
    id: 5,
    type: 'mcq',
    question: 'What is the gravitational constant G approximately equal to?',
    options: ['6.67 × 10^-11 N m²/kg²', '9.8 m/s²', '3 × 10^8 m/s', '1.6 × 10^-19 C'],
    correct: '6.67 × 10^-11 N m²/kg²',
    topic: 'Gravitation'
  },
];

export default function TestRunner({ config, onComplete }) {
  const [questions] = useState(MOCK_QUESTIONS.slice(0, config.numQuestions));
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(config.timeLimit * 60);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (submitted) {
      handleSubmitTest();
    }
  }, [submitted, handleSubmitTest]);
  const currentQuestion = questions[currentQIndex];
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const handleAnswerChange = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(prev => prev - 1);
    }
  };

  const calculateResults = useCallback(() => {
    let correct = 0;
    let weakTopics = {};

    questions.forEach(q => {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer?.toLowerCase() === q.correct.toString().toLowerCase();

      if (isCorrect) {
        correct++;
      } else {
        weakTopics[q.topic] = (weakTopics[q.topic] || 0) + 1;
      }
    });

    const percentage = (correct / questions.length) * 100;
    const topicList = Object.entries(weakTopics)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);    return {
      totalQuestions: questions.length,
      correctAnswers: correct,
      wrongAnswers: questions.length - correct,
      percentage: percentage.toFixed(2),
      weakTopics: topicList,
      timestamp: new Date().toISOString(),
      config: config
    };
  }, [answers, config, questions]);

  const handleSubmitTest = useCallback(() => {
    const results = calculateResults();
    onComplete(results);
  }, [calculateResults, onComplete]);

  const progressPercent = ((currentQIndex + 1) / questions.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{config.subject} - Mock Test</h2>
          <div className={`flex items-center gap-2 px-4 py-2 rounded ${
            timeLeft < 300 ? 'bg-red-500' : 'bg-blue-500'
          }`}>
            <Clock className="w-5 h-5" />
            <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-blue-300 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-sm text-blue-100 mt-2">
          Question {currentQIndex + 1} of {questions.length}
        </div>
      </div>

      {/* Question Container */}
      <div className="p-6 min-h-96">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          {currentQuestion.question}
        </h3>

        {/* MCQ Type */}
        {currentQuestion.type === 'mcq' && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <label
                key={idx}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                  answers[currentQuestion.id] === option
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <input
                  type="radio"
                  name={`q${currentQuestion.id}`}
                  value={option}
                  checked={answers[currentQuestion.id] === option}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="mr-4"
                />
                <span className="font-medium text-gray-800">{option}</span>
              </label>
            ))}
          </div>
        )}

        {/* True/False Type */}
        {currentQuestion.type === 'true-false' && (
          <div className="flex gap-4">
            {[true, false].map(value => (
              <label
                key={value}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition flex-1 ${
                  answers[currentQuestion.id] === value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <input
                  type="radio"
                  name={`q${currentQuestion.id}`}
                  value={value}
                  checked={answers[currentQuestion.id] === value}
                  onChange={(e) => handleAnswerChange(e.target.value === 'true')}
                  className="mr-4"
                />
                <span className="font-bold text-lg text-gray-800">
                  {value ? 'TRUE' : 'FALSE'}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* One-Line Answer Type */}
        {currentQuestion.type === 'one-line' && (
          <input
            type="text"
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
        )}

        {/* Question Status Indicator */}
        <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
          <AlertCircle className="w-4 h-4" />
          {answers[currentQuestion.id]
            ? '✓ Answered'
            : '○ Not answered'}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentQIndex === 0}
          className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="text-sm text-gray-600">
          {Object.keys(answers).length} of {questions.length} answered
        </div>

        {currentQIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmitTest}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
          >
            Submit Test
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}


