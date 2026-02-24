import React, { useState } from 'react';
import { useToast } from '../Toast';
import { BarChart3, Plus, Trash2, TrendingUp, Trophy, AlertCircle } from 'lucide-react';
import { exportTextAsPDF } from '../../utils/exportService';

export default function StudentProgressTracker() {
  const toast = useToast();
  const [phase, setPhase] = useState('view'); // 'view' or 'addScore'
  const [students, setStudents] = useState([
    { id: 1, name: 'Rahul Kumar', rollNo: 1, scores: [75, 82, 88] },
    { id: 2, name: 'Priya Singh', rollNo: 2, scores: [92, 88, 95] },
    { id: 3, name: 'Amit Patel', rollNo: 3, scores: [65, 70, 72] },
  ]);
  const [newStudent, setNewStudent] = useState({ name: '', rollNo: '' });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newScore, setNewScore] = useState('');

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.rollNo) {
      toast.warning('Please enter name and roll number');
      return;
    }
    setStudents(prev => [...prev, {
      id: Date.now(),
      name: newStudent.name,
      rollNo: parseInt(newStudent.rollNo),
      scores: [],
    }]);
    setNewStudent({ name: '', rollNo: '' });
  };

  const handleDeleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const handleAddScore = () => {
    if (!selectedStudent || !newScore || isNaN(newScore)) {
      toast.warning('Please select student and enter valid score');
      return;
    }
    setStudents(prev => prev.map(s =>
      s.id === selectedStudent.id
        ? { ...s, scores: [...s.scores, parseInt(newScore)] }
        : s
    ));
    setNewScore('');
    setSelectedStudent(null);
  };

  const getStudentStats = (student) => {
    if (student.scores.length === 0) return { avg: 0, min: 0, max: 0, trend: 'no-data' };
    const avg = (student.scores.reduce((a, b) => a + b, 0) / student.scores.length).toFixed(1);
    const min = Math.min(...student.scores);
    const max = Math.max(...student.scores);
    const trend = student.scores.length > 1
      ? student.scores[student.scores.length - 1] > student.scores[student.scores.length - 2]
        ? 'up'
        : 'down'
      : 'stable';
    return { avg, min, max, trend };
  };

  const sortedStudents = [...students].sort((a, b) => {
    const avgA = parseFloat(getStudentStats(a).avg) || 0;
    const avgB = parseFloat(getStudentStats(b).avg) || 0;
    return avgB - avgA;
  });

  const topStudents = sortedStudents.slice(0, 5);
  const bottomStudents = sortedStudents.slice(-5);

  const classAverage = students.length > 0
    ? (students.reduce((sum, s) => {
        const stats = getStudentStats(s);
        return sum + parseFloat(stats.avg);
      }, 0) / students.length).toFixed(1)
    : 0;

  const handleGenerateReport = () => {
    let report = `CLASS PERFORMANCE REPORT\nDate: ${new Date().toLocaleDateString()}\n\n`;
    report += `CLASS STATISTICS:\nTotal Students: ${students.length}\nClass Average: ${classAverage}%\n\n`;

    report += `TOP PERFORMERS:\n`;
    topStudents.slice(0, 5).forEach((student, idx) => {
      const stats = getStudentStats(student);
      report += `${idx + 1}. ${student.name} (Roll: ${student.rollNo}) - Avg: ${stats.avg}%\n`;
    });

    report += `\nSTUDENTS NEEDING SUPPORT:\n`;
    bottomStudents.forEach((student, idx) => {
      const stats = getStudentStats(student);
      report += `${idx + 1}. ${student.name} (Roll: ${student.rollNo}) - Avg: ${stats.avg}%\n`;
    });

    report += `\nDETAILED SCORES:\n`;
    students.forEach(student => {
      const stats = getStudentStats(student);
      report += `\n${student.name} (Roll: ${student.rollNo}):\n`;
      report += `  Scores: ${student.scores.join(', ')}\n`;
      report += `  Average: ${stats.avg}%, Min: ${stats.min}%, Max: ${stats.max}%\n`;
    });

    exportTextAsPDF(report, 'class_performance_report.pdf', 'CLASS PERFORMANCE REPORT');
  };

  if (phase === 'addScore') {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Test Score</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Student
              </label>
              <select
                value={selectedStudent?.id || ''}
                onChange={(e) => {
                  const student = students.find(s => s.id === parseInt(e.target.value));
                  setSelectedStudent(student);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose student...</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} (Roll: {s.rollNo})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Score (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                placeholder="Enter score"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPhase('view')}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddScore}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold"
              >
                Add Score
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-purple-600" />
          Student Progress Tracker
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Total Students</p>
            <p className="text-3xl font-bold text-blue-600">{students.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Class Average</p>
            <p className="text-3xl font-bold text-green-600">{classAverage}%</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Tests Conducted</p>
            <p className="text-3xl font-bold text-yellow-600">
              {Math.max(...students.map(s => s.scores.length), 0)}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Pass Rate</p>
            <p className="text-3xl font-bold text-purple-600">
              {students.length > 0
                ? Math.round((students.filter(s => {
                    const stats = getStudentStats(s);
                    return parseFloat(stats.avg) >= 40;
                  }).length / students.length) * 100)
                : 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Add Student Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Student</h3>
        <div className="flex gap-3 flex-col sm:flex-row">
          <input
            type="text"
            value={newStudent.name}
            onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Student name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            value={newStudent.rollNo}
            onChange={(e) => setNewStudent(prev => ({ ...prev, rollNo: e.target.value }))}
            placeholder="Roll number"
            className="w-32 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleAddStudent}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {/* Student Scores Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left font-bold">Name</th>
              <th className="px-4 py-3 text-center font-bold">Roll</th>
              <th className="px-4 py-3 text-center font-bold">Scores</th>
              <th className="px-4 py-3 text-center font-bold">Average</th>
              <th className="px-4 py-3 text-center font-bold">Trend</th>
              <th className="px-4 py-3 text-center font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.sort((a, b) => a.rollNo - b.rollNo).map(student => {
              const stats = getStudentStats(student);
              return (
                <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{student.name}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{student.rollNo}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700">
                    {student.scores.join(', ') || '-'}
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-purple-600">
                    {stats.avg}%
                  </td>
                  <td className="px-4 py-3 text-center">
                    {stats.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600 mx-auto" />}
                    {stats.trend === 'down' && <div className="text-2xl text-red-600">↓</div>}
                    {stats.trend === 'stable' && <div className="text-gray-400">—</div>}
                    {stats.trend === 'no-data' && <div className="text-gray-400">-</div>}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => setSelectedStudent(student) || setPhase('addScore')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      +Score
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-600 hover:text-red-700 inline-block"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Top & Bottom Performers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Top Performers
          </h3>
          <div className="space-y-2">
            {topStudents.slice(0, 5).map((student, idx) => {
              const stats = getStudentStats(student);
              return (
                <div key={student.id} className="flex items-center justify-between p-3 bg-green-50 rounded">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-green-700">#{idx + 1}</span>
                    <span className="text-gray-800">{student.name}</span>
                  </div>
                  <span className="font-bold text-green-600">{stats.avg}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Needs Support */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Needs Support
          </h3>
          <div className="space-y-2">
            {bottomStudents.slice(0, 5).map((student) => {
              const stats = getStudentStats(student);
              return (
                <div key={student.id} className="flex items-center justify-between p-3 bg-red-50 rounded">
                  <span className="text-gray-800">{student.name}</span>
                  <span className="font-bold text-red-600">{stats.avg}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={handleGenerateReport}
        className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition"
      >
        Generate Performance Report (PDF)
      </button>
    </div>
  );
}

