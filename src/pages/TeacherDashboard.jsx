import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import {
  LogOut,
  BookOpen,
  FileText,
  HelpCircle,
  AlertCircle,
  MessageSquare,
  FileCheck,
  BarChart3,
  Clock,
  Users,
  Calendar,
  Lightbulb,
} from 'lucide-react';
import DailyDiaryGenerator from '../components/teacher/DailyDiaryGenerator';
import LessonPlanMaker from '../components/teacher/LessonPlanMaker';
import QuestionPaperGenerator from '../components/teacher/QuestionPaperGenerator';
import TeachingIdeas from '../components/teacher/TeachingIdeas';
import CircularTracker from '../components/teacher/CircularTracker';
import ParentCommunicationHelper from '../components/teacher/ParentCommunicationHelper';
import APARAssistant from '../components/teacher/APARAssistant';
import ResultAnalysisTool from '../components/teacher/ResultAnalysisTool';
import TimetableBuilder from '../components/teacher/TimetableBuilder';
import StudentProgressTracker from '../components/teacher/StudentProgressTracker';
import HomeworkManager from '../components/teacher/HomeworkManager';
import SchemeOfWorkPlanner from '../components/teacher/SchemeOfWorkPlanner';
import MeetingNotesGenerator from '../components/teacher/MeetingNotesGenerator';
import WorksheetCreator from '../components/teacher/WorksheetCreator';
import DevelopmentLog from '../components/teacher/DevelopmentLog';
import ObservationReportGenerator from '../components/teacher/ObservationReportGenerator';

export default function TeacherDashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const modules = [
    {
      id: 'diary',
      name: 'Daily Diary',
      icon: FileText,
      color: 'bg-blue-100 text-blue-600',
      description: 'Generate daily diary entries',
      priority: 'high',
    },
    {
      id: 'lesson',
      name: 'Lesson Plan',
      icon: BookOpen,
      color: 'bg-green-100 text-green-600',
      description: 'Create lesson plans',
      priority: 'high',
    },
    {
      id: 'questions',
      name: 'Question Paper',
      icon: FileCheck,
      color: 'bg-purple-100 text-purple-600',
      description: 'Generate question papers',
      priority: 'high',
    },
    {
      id: 'ideas',
      name: 'Teaching Ideas',
      icon: HelpCircle,
      color: 'bg-yellow-100 text-yellow-600',
      description: 'Get creative teaching ideas',
      priority: 'medium',
    },
    {
      id: 'circular',
      name: 'Circular Tracker',
      icon: AlertCircle,
      color: 'bg-red-100 text-red-600',
      description: 'Manage school circulars',
      priority: 'medium',
    },
    {
      id: 'parent',
      name: 'Parent Messages',
      icon: MessageSquare,
      color: 'bg-indigo-100 text-indigo-600',
      description: 'Generate parent messages',
      priority: 'medium',
    },
    {
      id: 'apar',
      name: 'APAR Assistant',
      icon: FileText,
      color: 'bg-pink-100 text-pink-600',
      description: 'Complete APAR report',
      priority: 'low',
    },
    {
      id: 'results',
      name: 'Result Analysis',
      icon: BarChart3,
      color: 'bg-teal-100 text-teal-600',
      description: 'Analyze student results',
      priority: 'low',
    },
    // Phase 2 Features
    {
      id: 'timetable',
      name: 'Timetable Builder',
      icon: Clock,
      color: 'bg-indigo-100 text-indigo-600',
      description: 'Create and manage weekly timetables',
      priority: 'high',
    },
    {
      id: 'progress',
      name: 'Student Progress',
      icon: Users,
      color: 'bg-cyan-100 text-cyan-600',
      description: 'Track student performance and analytics',
      priority: 'high',
    },
    {
      id: 'homework',
      name: 'Homework Manager',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
      description: 'Assign and track homework',
      priority: 'high',
    },
    {
      id: 'scheme',
      name: 'Scheme of Work',
      icon: Calendar,
      color: 'bg-amber-100 text-amber-600',
      description: 'Plan term-wise teaching schedule',
      priority: 'medium',
    },
    {
      id: 'meeting',
      name: 'Meeting Notes',
      icon: FileText,
      color: 'bg-orange-100 text-orange-600',
      description: 'Format meeting minutes',
      priority: 'medium',
    },
    // Phase 3 Features
    {
      id: 'worksheet',
      name: 'Worksheet Creator',
      icon: FileCheck,
      color: 'bg-cyan-100 text-cyan-600',
      description: 'Create bilingual worksheets',
      priority: 'medium',
    },
    {
      id: 'development',
      name: 'Development Log',
      icon: Lightbulb,
      color: 'bg-rose-100 text-rose-600',
      description: 'Track professional development',
      priority: 'medium',
    },
    {
      id: 'observation',
      name: 'Observation Report',
      icon: FileText,
      color: 'bg-lime-100 text-lime-600',
      description: 'Generate observation reports',
      priority: 'low',
    },
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
                <h1 className="text-2xl font-bold text-gray-800">Shikshak Sahayak</h1>
                <p className="text-sm text-gray-600">Teacher Assistant for Rajasthan Schools</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-gray-800">{user?.name}</p>
                <p className="text-sm text-gray-600">Teacher</p>
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
        {/* Overview Section */}
        {activeModule === 'overview' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user?.name}!</h2>
            <p className="text-gray-600 mb-8">
              Select a tool below to save time on daily administrative tasks and focus on teaching.
            </p>

            {/* High Priority */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-red-600 rounded-full mr-2" />
                Most Used Tools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules
                  .filter((m) => m.priority === 'high')
                  .map((module) => {
                    const Icon = module.icon;
                    return (
                      <div
                        key={module.id}
                        onClick={() => setActiveModule(module.id)}
                        className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                      >
                        <div className={`${module.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{module.name}</h3>
                        <p className="text-gray-600 text-sm">{module.description}</p>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Other Tools */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Other Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules
                  .filter((m) => m.priority !== 'high')
                  .map((module) => {
                    const Icon = module.icon;
                    return (
                      <div
                        key={module.id}
                        onClick={() => setActiveModule(module.id)}
                        className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                      >
                        <div className={`${module.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{module.name}</h3>
                        <p className="text-gray-600 text-sm">{module.description}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* Module Views */}
        {activeModule === 'diary' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <DailyDiaryGenerator />
          </>
        )}

        {activeModule === 'lesson' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <LessonPlanMaker />
          </>
        )}

        {activeModule === 'questions' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <QuestionPaperGenerator />
          </>
        )}

        {activeModule === 'ideas' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <TeachingIdeas />
          </>
        )}

        {activeModule === 'circular' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <CircularTracker />
          </>
        )}

        {activeModule === 'parent' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <ParentCommunicationHelper />
          </>
        )}

        {activeModule === 'apar' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <APARAssistant />
          </>
        )}

        {activeModule === 'results' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <ResultAnalysisTool />
          </>
        )}

        {/* Phase 2 Features */}
        {activeModule === 'timetable' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <TimetableBuilder />
          </>
        )}

        {activeModule === 'progress' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <StudentProgressTracker />
          </>
        )}

        {activeModule === 'homework' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <HomeworkManager />
          </>
        )}

        {activeModule === 'scheme' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <SchemeOfWorkPlanner />
          </>
        )}

        {activeModule === 'meeting' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <MeetingNotesGenerator />
          </>
        )}

        {/* Phase 3 Features */}
        {activeModule === 'worksheet' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <WorksheetCreator />
          </>
        )}

        {activeModule === 'development' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <DevelopmentLog />
          </>
        )}

        {activeModule === 'observation' && (
          <>
            <button
              onClick={() => setActiveModule('overview')}
              className="mb-6 text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            <ObservationReportGenerator />
          </>
        )}
      </div>
    </div>
  );
}
