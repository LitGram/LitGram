import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, TrendingUp, BookOpen, Filter, Search, ChevronRight } from 'lucide-react';

export default function PreviousYearPapers() {
  const [papers, setPapers] = useState([
    {
      id: 1,
      subject: 'Physics',
      year: 2024,
      board: 'RBSE',
      class: 12,
      term: 'Final',
      difficulty: 'Hard',
      marksDistribution: { theory: 60, practical: 40 },
      topicsAsked: ['Optics', 'Electricity', 'Magnetism', 'Thermodynamics'],
      averageScore: 65,
      totalQuestions: 35,
      duration: 180,
    },
    {
      id: 2,
      subject: 'Physics',
      year: 2023,
      board: 'RBSE',
      class: 12,
      term: 'Final',
      difficulty: 'Medium',
      marksDistribution: { theory: 60, practical: 40 },
      topicsAsked: ['Waves', 'Electromagnetism', 'Modern Physics'],
      averageScore: 70,
      totalQuestions: 35,
      duration: 180,
    },
    {
      id: 3,
      subject: 'Mathematics',
      year: 2024,
      board: 'RBSE',
      class: 12,
      term: 'Final',
      difficulty: 'Hard',
      marksDistribution: { section_a: 20, section_b: 30, section_c: 50 },
      topicsAsked: ['Calculus', 'Algebra', 'Matrices', 'Probability'],
      averageScore: 62,
      totalQuestions: 29,
      duration: 180,
    },
    {
      id: 4,
      subject: 'Chemistry',
      year: 2024,
      board: 'RBSE',
      class: 12,
      term: 'Final',
      difficulty: 'Medium',
      marksDistribution: { inorganic: 30, organic: 35, physical: 35 },
      topicsAsked: ['Electrochemistry', 'Coordination Compounds', 'Organic Reactions'],
      averageScore: 68,
      totalQuestions: 40,
      duration: 180,
    },
    {
      id: 5,
      subject: 'Physics',
      year: 2022,
      board: 'RBSE',
      class: 12,
      term: 'Final',
      difficulty: 'Easy',
      marksDistribution: { theory: 60, practical: 40 },
      topicsAsked: ['Mechanics', 'Heat', 'Sound'],
      averageScore: 75,
      totalQuestions: 35,
      duration: 180,
    },
  ]);

  const [selectedPaper, setSelectedPaper] = useState(null);
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = ['all', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];
  const years = ['all', 2024, 2023, 2022, 2021];

  const filteredPapers = papers.filter(paper => {
    const matchesSubject = filterSubject === 'all' || paper.subject === filterSubject;
    const matchesYear = filterYear === 'all' || paper.year === parseInt(filterYear);
    const matchesSearch = paper.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          paper.topicsAsked.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesYear && matchesSearch;
  });

  const handleViewPaper = (paper) => {
    setSelectedPaper(paper);
  };

  const handleDownloadPaper = (paperId) => {
    alert(`Downloaded paper ${paperId}`);
  };

  const topicFrequency = papers.reduce((acc, paper) => {
    paper.topicsAsked.forEach(topic => {
      acc[topic] = (acc[topic] || 0) + 1;
    });
    return acc;
  }, {});

  const sortedTopics = Object.entries(topicFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  if (selectedPaper) {
    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="bg-white rounded-lg shadow p-6">
          <button
            onClick={() => setSelectedPaper(null)}
            className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
          >
            ← Back
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedPaper.subject} - {selectedPaper.year}
              </h2>
              <p className="text-gray-600">
                Class {selectedPaper.class} • Term {selectedPaper.term} • Duration: {selectedPaper.duration} min
              </p>
            </div>
            <button
              onClick={() => handleDownloadPaper(selectedPaper.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Paper Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm mb-1">Total Questions</p>
            <p className="text-2xl font-bold text-gray-800">{selectedPaper.totalQuestions}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm mb-1">Difficulty Level</p>
            <p className={`text-2xl font-bold ${
              selectedPaper.difficulty === 'Easy' ? 'text-green-600' :
              selectedPaper.difficulty === 'Medium' ? 'text-yellow-600' :
              'text-red-600'
            }`}>{selectedPaper.difficulty}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm mb-1">Avg Student Score</p>
            <p className="text-2xl font-bold text-blue-600">{selectedPaper.averageScore}%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm mb-1">Board</p>
            <p className="text-2xl font-bold text-gray-800">{selectedPaper.board}</p>
          </div>
        </div>

        {/* Topics Asked */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Topics Asked
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {selectedPaper.topicsAsked.map((topic, idx) => (
              <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="font-medium text-blue-900">{topic}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marks Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Marks Distribution</h3>
          <div className="space-y-3">
            {Object.entries(selectedPaper.marksDistribution).map(([section, marks]) => (
              <div key={section}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-700 capitalize">{section.replace(/_/g, ' ')}</span>
                  <span className="text-gray-600">{marks} marks</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(marks / 100) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Study Tips Based on This Paper</h3>
          <ul className="space-y-2 text-blue-800">
            <li>✓ Focus on these topics as they frequently appear in exams</li>
            <li>✓ Practice multi-step problems similar to those in this paper</li>
            <li>✓ Allocate time based on marks distribution shown above</li>
            <li>✓ Compare with other year papers to identify patterns</li>
            <li>✓ Time yourself while solving to improve speed</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-8 h-8 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">Previous Year Papers</h2>
        </div>
        <p className="text-gray-600">Access and analyze past exam papers for exam preparation</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Total Papers</p>
          <p className="text-2xl font-bold text-gray-800">{papers.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Subjects Covered</p>
          <p className="text-2xl font-bold text-gray-800">{new Set(papers.map(p => p.subject)).size}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Year Range</p>
          <p className="text-2xl font-bold text-gray-800">
            {Math.min(...papers.map(p => p.year))}-{Math.max(...papers.map(p => p.year))}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Avg Difficulty</p>
          <p className="text-2xl font-bold text-yellow-600">Medium</p>
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
              placeholder="Search by subject or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Subject Filter */}
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year === 'all' ? 'All Years' : year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPapers.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow p-8 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No papers found</p>
          </div>
        ) : (
          filteredPapers.map(paper => (
            <div key={paper.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{paper.subject}</h3>
                    <p className="text-sm text-gray-600">{paper.year} • Class {paper.class}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    paper.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    paper.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {paper.difficulty}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <p>📋 {paper.totalQuestions} questions</p>
                  <p>⏱️ {paper.duration} minutes</p>
                  <p>📊 Avg Score: {paper.averageScore}%</p>
                </div>

                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Topics:</p>
                  <div className="flex flex-wrap gap-1">
                    {paper.topicsAsked.slice(0, 3).map((topic, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                    {paper.topicsAsked.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        +{paper.topicsAsked.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewPaper(paper)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleDownloadPaper(paper.id)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Frequently Asked Topics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Most Frequently Asked Topics
        </h3>
        <div className="space-y-3">
          {sortedTopics.map(([topic, count], idx) => (
            <div key={topic} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-blue-600">#{idx + 1}</span>
                <span className="font-medium text-gray-800">{topic}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(count / Math.max(...Object.values(topicFrequency))) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{count}x</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
