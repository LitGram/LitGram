import React, { useState, useMemo } from 'react';
import { Calendar, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { RBSE_CURRICULUM } from '../../data/curriculum';

export default function RevisionScheduler() {
  const [examDate, setExamDate] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [comfortLevels, setComfortLevels] = useState({});
  const [schedule, setSchedule] = useState(null);
  const [completedDays, setCompletedDays] = useState({});

  const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Hindi'];

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
    if (!comfortLevels[subject]) {
      setComfortLevels(prev => ({ ...prev, [subject]: 'average' }));
    }
  };

  const handleComfortChange = (subject, level) => {
    setComfortLevels(prev => ({ ...prev, [subject]: level }));
  };

  const generateSchedule = () => {
    if (!examDate || selectedSubjects.length === 0) {
      alert('Please select exam date and at least one subject');
      return;
    }

    const exam = new Date(examDate);
    const today = new Date();
    const daysAvailable = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));

    if (daysAvailable <= 0) {
      alert('Exam date must be in the future');
      return;
    }

    // Calculate weightage based on comfort level
    const weightages = {};
    selectedSubjects.forEach(subject => {
      const comfort = comfortLevels[subject] || 'average';
      switch (comfort) {
        case 'weak':
          weightages[subject] = 3;
          break;
        case 'average':
          weightages[subject] = 2;
          break;
        case 'strong':
          weightages[subject] = 1;
          break;
        default:
          weightages[subject] = 2;
      }
    });

    const totalWeight = Object.values(weightages).reduce((a, b) => a + b, 0);
    const daysPerWeight = daysAvailable / totalWeight;

    const scheduledDays = {};
    let currentDay = new Date(today);
    let subjectIndex = 0;
    const subjectsList = Object.keys(weightages).sort(
      (a, b) => weightages[b] - weightages[a]
    );

    for (let i = 0; i < daysAvailable; i++) {
      const dateStr = currentDay.toISOString().split('T')[0];
      const subject = subjectsList[subjectIndex % subjectsList.length];

      if (!scheduledDays[dateStr]) {
        scheduledDays[dateStr] = [];
      }
      scheduledDays[dateStr].push(subject);

      if ((i + 1) % Math.ceil(daysPerWeight) === 0) {
        subjectIndex++;
      }

      currentDay.setDate(currentDay.getDate() + 1);
    }

    setSchedule(scheduledDays);
    setCompletedDays({});
  };

  const handleDayComplete = (dateStr) => {
    setCompletedDays(prev => ({
      ...prev,
      [dateStr]: !prev[dateStr]
    }));
  };

  const handleReset = () => {
    setExamDate('');
    setSelectedSubjects([]);
    setComfortLevels({});
    setSchedule(null);
    setCompletedDays({});
  };

  const getStatusColor = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      return completedDays[dateStr] ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300';
    } else if (date.getTime() === today.getTime()) {
      return 'bg-yellow-100 border-yellow-400 ring-2 ring-yellow-400';
    } else {
      return 'bg-white border-gray-300';
    }
  };

  const daysArray = schedule ? Object.keys(schedule).sort() : [];
  const completedCount = Object.values(completedDays).filter(v => v).length;
  const totalDays = daysArray.length;
  const completionPercent = totalDays > 0 ? (completedCount / totalDays) * 100 : 0;

  return (
    <div className="space-y-6">
      {!schedule ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar className="w-8 h-8 text-teal-600" />
            Revision Scheduler
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exam Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exam Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Subject Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Subjects <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {subjects.map(subject => (
                  <label key={subject} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes(subject)}
                      onChange={() => handleSubjectToggle(subject)}
                      className="mr-3"
                    />
                    <span className="text-gray-700">{subject}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Comfort Levels */}
          {selectedSubjects.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-4">
                How comfortable are you with each subject?
              </h3>
              <div className="space-y-3">
                {selectedSubjects.map(subject => (
                  <div key={subject} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{subject}</span>
                    <div className="flex gap-2">
                      {['weak', 'average', 'strong'].map(level => (
                        <button
                          key={level}
                          onClick={() => handleComfortChange(subject, level)}
                          className={`px-3 py-1 rounded text-sm font-medium transition ${
                            comfortLevels[subject] === level
                              ? level === 'weak'
                                ? 'bg-red-600 text-white'
                                : level === 'average'
                                ? 'bg-yellow-600 text-white'
                                : 'bg-green-600 text-white'
                              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                          }`}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={generateSchedule}
            className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition"
          >
            Generate Revision Plan
          </button>
        </div>
      ) : (
        <>
          {/* Progress Header */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Your Revision Plan</h2>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <RotateCcw className="w-4 h-4" />
                Change Plan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Total Days</p>
                <p className="text-3xl font-bold text-blue-600">{totalDays}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-600">{completedCount}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Remaining</p>
                <p className="text-3xl font-bold text-purple-600">{totalDays - completedCount}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Progress</p>
                <p className="text-3xl font-bold text-yellow-600">{completionPercent.toFixed(0)}%</p>
              </div>
            </div>

            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Revision Calendar</h3>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-bold text-gray-600 py-2">
                  {day}
                </div>
              ))}

              {daysArray.map(dateStr => {
                const date = new Date(dateStr);
                const dayOfWeek = date.getDay();
                const subjects = schedule[dateStr];

                return (
                  <div
                    key={dateStr}
                    onClick={() => handleDayComplete(dateStr)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition transform hover:scale-105 ${getStatusColor(dateStr)} ${
                      completedDays[dateStr] ? 'ring-2 ring-green-500' : ''
                    }`}
                  >
                    <p className="text-xs font-bold text-gray-700">
                      {date.getDate()}
                    </p>
                    <div className="mt-1 space-y-0.5">
                      {subjects.slice(0, 2).map((subj, idx) => (
                        <p key={idx} className="text-xs text-gray-700 truncate">
                          {subj.slice(0, 3)}
                        </p>
                      ))}
                    </div>
                    {completedDays[dateStr] && (
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 mx-auto" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Today's Task */}
          {daysArray.length > 0 && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow p-6 border-2 border-yellow-400">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                Today's Revision Task
              </h3>
              {schedule[new Date().toISOString().split('T')[0]] ? (
                <div>
                  <p className="text-gray-700 mb-3">
                    <strong>Focus on:</strong>{' '}
                    {schedule[new Date().toISOString().split('T')[0]].join(', ')}
                  </p>
                  <button
                    onClick={() => handleDayComplete(new Date().toISOString().split('T')[0])}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    Mark Today as Done
                  </button>
                </div>
              ) : (
                <p className="text-gray-700">No scheduled revision for today. Great work! Stay on track!</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
