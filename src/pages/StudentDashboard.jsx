import React, { useState, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { LogOut, MessageSquare, BookOpen, Lightbulb, Zap, Calendar, Layers, HelpCircle, FileText, Mic, Flame, Brain, Play } from 'lucide-react';
import StudentChat from '../components/student/StudentChat';
import NotificationCenter from '../components/NotificationCenter';

// Lazy load components for code splitting
const MockTestEngine = lazy(() => import('../components/student/MockTestEngine'));
const RevisionScheduler = lazy(() => import('../components/student/RevisionScheduler'));
const FormulaFlashcards = lazy(() => import('../components/student/FormulaFlashcards'));
const DoubtHistory = lazy(() => import('../components/student/DoubtHistory'));
const PreviousYearPapers = lazy(() => import('../components/student/PreviousYearPapers'));
const VoiceInput = lazy(() => import('../components/student/VoiceInput'));
const StreakTracker = lazy(() => import('../components/student/StreakTracker'));
const ConceptMaps = lazy(() => import('../components/student/ConceptMaps'));
const VideoSuggestions = lazy(() => import('../components/student/VideoSuggestions'));

// Loading placeholder
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

export default function StudentDashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('subjects');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const subjects = [
    { id: 1, name: 'Physics', class: 'Class 11 & 12' },
    { id: 2, name: 'Chemistry', class: 'Class 11 & 12' },
    { id: 3, name: 'Mathematics', class: 'Class 11 & 12' },
    { id: 4, name: 'Biology', class: 'Class 11 & 12' },
    { id: 5, name: 'Hindi', class: 'Class 11 & 12' },
    { id: 6, name: 'English', class: 'Class 11 & 12' },
  ];

  const formulas = [
    { subject: 'Physics', title: 'Newton\'s Laws of Motion', formula: 'F = ma' },
    { subject: 'Chemistry', title: 'Ideal Gas Law', formula: 'PV = nRT' },
    { subject: 'Mathematics', title: 'Quadratic Formula', formula: 'x = (-b ± √(b²-4ac)) / 2a' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-teal-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Sarathi AI</h1>
                <p className="text-sm text-gray-600">Learning Companion</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <NotificationCenter />
              <div className="text-right">
                <p className="font-medium text-gray-800">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs - Primary */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveSection('subjects')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap text-sm ${
              activeSection === 'subjects'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Subjects
          </button>
          <button
            onClick={() => setActiveSection('chat')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap text-sm ${
              activeSection === 'chat'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Ask Tutor
          </button>
          <button
            onClick={() => setActiveSection('test')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap text-sm ${
              activeSection === 'test'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Zap className="w-4 h-4 inline mr-2" />
            Mock Test
          </button>
          <button
            onClick={() => setActiveSection('revision')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap text-sm ${
              activeSection === 'revision'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Revision
          </button>
          <button
            onClick={() => setActiveSection('flashcards')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap text-sm ${
              activeSection === 'flashcards'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Layers className="w-4 h-4 inline mr-2" />
            Flashcards
          </button>
          <button
            onClick={() => setActiveSection('formulas')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap text-sm ${
              activeSection === 'formulas'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Lightbulb className="w-4 h-4 inline mr-2" />
            Formulas
          </button>
          <button
            onClick={() => setActiveSection('doubts')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap text-sm ${
              activeSection === 'doubts'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <HelpCircle className="w-4 h-4 inline mr-2" />
            Doubts
          </button>
          <button
            onClick={() => setActiveSection('papers')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap text-sm ${
              activeSection === 'papers'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Papers
          </button>
          <button
            onClick={() => setActiveSection('voice')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap text-sm ${
              activeSection === 'voice'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Mic className="w-4 h-4 inline mr-2" />
            Voice
          </button>
          <button
            onClick={() => setActiveSection('streak')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap text-sm ${
              activeSection === 'streak'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Flame className="w-4 h-4 inline mr-2" />
            Streak
          </button>
          <button
            onClick={() => setActiveSection('concepts')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap text-sm ${
              activeSection === 'concepts'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Brain className="w-4 h-4 inline mr-2" />
            Concepts
          </button>
          <button
            onClick={() => setActiveSection('videos')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap text-sm ${
              activeSection === 'videos'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Play className="w-4 h-4 inline mr-2" />
            Videos
          </button>
        </div>

        {/* Content Sections */}
        {activeSection === 'subjects' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select a Subject</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => setActiveSection('chat')}
                >
                  <BookOpen className="w-12 h-12 text-teal-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{subject.name}</h3>
                  <p className="text-gray-600">{subject.class}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'chat' && <StudentChat />}

        {activeSection === 'test' && (
          <Suspense fallback={<LoadingSpinner />}>
            <MockTestEngine />
          </Suspense>
        )}

        {activeSection === 'revision' && (
          <Suspense fallback={<LoadingSpinner />}>
            <RevisionScheduler />
          </Suspense>
        )}

        {activeSection === 'flashcards' && (
          <Suspense fallback={<LoadingSpinner />}>
            <FormulaFlashcards />
          </Suspense>
        )}

        {activeSection === 'doubts' && (
          <Suspense fallback={<LoadingSpinner />}>
            <DoubtHistory />
          </Suspense>
        )}

        {activeSection === 'papers' && (
          <Suspense fallback={<LoadingSpinner />}>
            <PreviousYearPapers />
          </Suspense>
        )}

        {activeSection === 'voice' && (
          <Suspense fallback={<LoadingSpinner />}>
            <VoiceInput />
          </Suspense>
        )}

        {activeSection === 'streak' && (
          <Suspense fallback={<LoadingSpinner />}>
            <StreakTracker />
          </Suspense>
        )}

        {activeSection === 'concepts' && (
          <Suspense fallback={<LoadingSpinner />}>
            <ConceptMaps />
          </Suspense>
        )}

        {activeSection === 'videos' && (
          <Suspense fallback={<LoadingSpinner />}>
            <VideoSuggestions />
          </Suspense>
        )}

        {activeSection === 'formulas' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Formulas & Concepts</h2>
            <div className="space-y-4">
              {formulas.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded">
                      {item.subject}
                    </span>
                  </div>
                  <div className="bg-gray-100 p-4 rounded font-mono text-lg">
                    {item.formula}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
