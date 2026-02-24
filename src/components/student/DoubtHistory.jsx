import React, { useState } from 'react';
import { MessageSquare, Trash2, Search, Filter, CheckCircle, Clock, AlertCircle, ChevronDown } from 'lucide-react';

export default function DoubtHistory() {
  const [doubts, setDoubts] = useState([
    {
      id: 1,
      subject: 'Physics',
      topic: 'Newton\'s Second Law',
      question: 'How to apply F=ma when multiple forces act on an object?',
      askedOn: new Date('2026-02-21T10:00:00.000Z'),
      resolved: true,
      answer: 'Net force is the vector sum of all forces. Calculate resultant and apply F=ma.',
      resolvedOn: new Date('2026-02-22T10:00:00.000Z'),
      tutorName: 'AI Tutor',
      category: 'Concept',
      helpfulness: 5,
    },
    {
      id: 2,
      subject: 'Mathematics',
      topic: 'Integration by Substitution',
      question: 'When should I use u-substitution vs integration by parts?',
      askedOn: new Date('2026-02-23T10:00:00.000Z'),
      resolved: true,
      answer: 'Use substitution when you see a composition. Use by-parts when you have a product of functions.',
      resolvedOn: new Date('2026-02-23T12:00:00.000Z'),
      tutorName: 'AI Tutor',
      category: 'Technique',
      helpfulness: 4,
    },
    {
      id: 3,
      subject: 'Chemistry',
      topic: 'Electrochemistry',
      question: 'How to calculate cell potential for non-standard conditions?',
      askedOn: new Date('2026-02-24T06:00:00.000Z'),
      resolved: false,
      answer: null,
      resolvedOn: null,
      tutorName: null,
      category: 'Calculation',
      helpfulness: 0,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'resolved', 'pending'
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [expandedDoubt, setExpandedDoubt] = useState(null);

  const subjects = ['all', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Hindi', 'English'];
  const categories = ['Concept', 'Technique', 'Calculation', 'Application'];

  const filteredDoubts = doubts.filter(doubt => {
    const matchesSearch = doubt.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doubt.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' ||
                          (filterStatus === 'resolved' && doubt.resolved) ||
                          (filterStatus === 'pending' && !doubt.resolved);
    const matchesSubject = selectedSubject === 'all' || doubt.subject === selectedSubject;
    return matchesSearch && matchesStatus && matchesSubject;
  });

  const handleDeleteDoubt = (id) => {
    setDoubts(doubts.filter(d => d.id !== id));
  };

  const handleRateHelpfulness = (id, rating) => {
    setDoubts(doubts.map(d => d.id === id ? { ...d, helpfulness: rating } : d));
  };

  const resolvedCount = doubts.filter(d => d.resolved).length;
  const pendingCount = doubts.filter(d => !d.resolved).length;
  const averageHelpfulness = doubts
    .filter(d => d.helpfulness > 0)
    .reduce((sum, d) => sum + d.helpfulness, 0) / doubts.filter(d => d.helpfulness > 0).length || 0;

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
          <MessageSquare className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Doubt History</h2>
        </div>
        <p className="text-gray-600">Track all your questions and their resolutions</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Doubts</p>
              <p className="text-2xl font-bold text-gray-800">{doubts.length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Resolved</p>
              <p className="text-2xl font-bold text-green-600">{resolvedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500 opacity-50" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Helpfulness</p>
              <p className="text-2xl font-bold text-yellow-600">{averageHelpfulness.toFixed(1)}/5</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search doubts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-2 rounded-lg transition ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('resolved')}
              className={`px-3 py-2 rounded-lg transition ${
                filterStatus === 'resolved'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Resolved
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-2 rounded-lg transition ${
                filterStatus === 'pending'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
          </div>
        </div>
      </div>

      {/* Doubts List */}
      <div className="space-y-4">
        {filteredDoubts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No doubts found</p>
          </div>
        ) : (
          filteredDoubts.map(doubt => (
            <div key={doubt.id} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Doubt Header */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setExpandedDoubt(expandedDoubt === doubt.id ? null : doubt.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {doubt.subject}
                      </span>
                      <span className="text-xs font-semibold bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {doubt.category}
                      </span>
                      {doubt.resolved ? (
                        <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Resolved
                        </span>
                      ) : (
                        <span className="text-xs font-semibold bg-orange-100 text-orange-800 px-2 py-1 rounded flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{doubt.topic}</h3>
                    <p className="text-gray-600 mb-2">{doubt.question}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Asked {getTimeAgo(doubt.askedOn)}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition ${
                          expandedDoubt === doubt.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDoubt(doubt.id);
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedDoubt === doubt.id && (
                <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-4">
                  {doubt.resolved && (
                    <>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Resolution
                        </h4>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="text-gray-800 mb-2">{doubt.answer}</p>
                          <p className="text-xs text-gray-600">
                            Answered by {doubt.tutorName} • {getTimeAgo(doubt.resolvedOn)}
                          </p>
                        </div>
                      </div>

                      {/* Helpfulness Rating */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">How helpful was this answer?</h4>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(rating => (
                            <button
                              key={rating}
                              onClick={() => handleRateHelpfulness(doubt.id, rating)}
                              className={`px-3 py-1 rounded transition ${
                                doubt.helpfulness === rating
                                  ? 'bg-yellow-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {!doubt.resolved && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <p className="text-yellow-800 text-sm">
                        This doubt is awaiting response. You can ask a similar question to get help.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Category Legend */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Question Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <div key={cat} className="text-sm">
              <span className="font-medium text-gray-800">{cat}</span>
              <p className="text-gray-600">
                {doubts.filter(d => d.category === cat).length} question{doubts.filter(d => d.category === cat).length !== 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

