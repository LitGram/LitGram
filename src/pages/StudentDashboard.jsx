import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { LogOut, MessageSquare, BookOpen, Lightbulb, Zap, Calendar } from 'lucide-react';
import StudentChat from '../components/student/StudentChat';
import MockTestEngine from '../components/student/MockTestEngine';
import RevisionScheduler from '../components/student/RevisionScheduler';

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
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveSection('subjects')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap ${
              activeSection === 'subjects'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BookOpen className="w-5 h-5 inline mr-2" />
            Subjects
          </button>
          <button
            onClick={() => setActiveSection('chat')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap ${
              activeSection === 'chat'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <MessageSquare className="w-5 h-5 inline mr-2" />
            Ask Tutor
          </button>
          <button
            onClick={() => setActiveSection('test')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap ${
              activeSection === 'test'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Zap className="w-5 h-5 inline mr-2" />
            Mock Test
          </button>
          <button
            onClick={() => setActiveSection('revision')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap ${
              activeSection === 'revision'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Calendar className="w-5 h-5 inline mr-2" />
            Revision Plan
          </button>
          <button
            onClick={() => setActiveSection('formulas')}
            className={`px-4 py-2 font-medium transition whitespace-nowrap ${
              activeSection === 'formulas'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Lightbulb className="w-5 h-5 inline mr-2" />
            Key Formulas
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

        {activeSection === 'test' && <MockTestEngine />}

        {activeSection === 'revision' && <RevisionScheduler />}

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
