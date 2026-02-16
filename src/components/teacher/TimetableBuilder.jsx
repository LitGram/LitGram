import React, { useState } from 'react';
import { Clock, Plus, Trash2, Download, Copy } from 'lucide-react';
import { exportTextAsPDF, copyToClipboard } from '../../utils/exportService';

const SUBJECTS = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Hindi'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const COLORS = {
  Physics: '#EF4444',
  Chemistry: '#3B82F6',
  Mathematics: '#F59E0B',
  Biology: '#10B981',
  English: '#8B5CF6',
  Hindi: '#EC4899',
};

export default function TimetableBuilder() {
  const [phase, setPhase] = useState('config'); // 'config' or 'view'
  const [config, setConfig] = useState({
    periodsPerDay: 6,
    breakAfter: 3,
    breakDuration: 15,
    subjects: ['Physics', 'Chemistry'],
    classes: ['11-A'],
  });
  const [timetable, setTimetable] = useState(null);
  const [editingCell, setEditingCell] = useState(null);

  const handleGenerateTimetable = () => {
    if (config.subjects.length === 0 || config.classes.length === 0) {
      alert('Please select subjects and classes');
      return;
    }

    // Generate a simple timetable
    const newTimetable = {};
    DAYS.forEach(day => {
      newTimetable[day] = [];
      for (let i = 0; i < config.periodsPerDay; i++) {
        const subjectIndex = (DAYS.indexOf(day) + i) % config.subjects.length;
        const classIndex = (DAYS.indexOf(day) + Math.floor(i / 2)) % config.classes.length;
        newTimetable[day].push({
          id: `${day}-${i}`,
          subject: config.subjects[subjectIndex],
          class: config.classes[classIndex],
          period: i + 1,
          isBreak: i === config.breakAfter,
        });
      }
    });

    setTimetable(newTimetable);
    setPhase('view');
  };

  const handleSubjectChange = (day, index, subject) => {
    setTimetable(prev => ({
      ...prev,
      [day]: prev[day].map((slot, i) =>
        i === index ? { ...slot, subject } : slot
      ),
    }));
  };

  const handleClassChange = (day, index, cls) => {
    setTimetable(prev => ({
      ...prev,
      [day]: prev[day].map((slot, i) =>
        i === index ? { ...slot, class: cls } : slot
      ),
    }));
  };

  const handleExportPDF = () => {
    let content = 'WEEKLY TIMETABLE\n\n';
    Object.entries(timetable).forEach(([day, slots]) => {
      content += `${day.toUpperCase()}\n`;
      slots.forEach(slot => {
        if (slot.isBreak) {
          content += `Period ${slot.period}: BREAK (${config.breakDuration} mins)\n`;
        } else {
          content += `Period ${slot.period}: ${slot.subject} - ${slot.class}\n`;
        }
      });
      content += '\n';
    });

    exportTextAsPDF(content, 'timetable.pdf', 'WEEKLY TIMETABLE');
  };

  const handleCopyToClipboard = () => {
    let content = 'WEEKLY TIMETABLE\n\n';
    Object.entries(timetable).forEach(([day, slots]) => {
      content += `${day.toUpperCase()}\n`;
      slots.forEach(slot => {
        if (slot.isBreak) {
          content += `  Period ${slot.period}: BREAK\n`;
        } else {
          content += `  Period ${slot.period}: ${slot.subject} - ${slot.class}\n`;
        }
      });
      content += '\n';
    });
    copyToClipboard(content);
    alert('Timetable copied to clipboard!');
  };

  if (phase === 'view' && timetable) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Weekly Timetable</h2>
              <p className="text-gray-600">{config.periodsPerDay} periods per day</p>
            </div>
            <button
              onClick={() => setPhase('config')}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="bg-white rounded-lg shadow overflow-x-auto p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left font-bold">Period</th>
                {DAYS.map(day => (
                  <th key={day} className="border border-gray-300 p-3 text-center font-bold">
                    {day.slice(0, 3).toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: config.periodsPerDay }).map((_, idx) => (
                <tr key={idx}>
                  <td className="border border-gray-300 p-3 font-medium text-center bg-gray-50">
                    {idx === config.breakAfter ? 'BREAK' : `P${idx + 1}`}
                  </td>
                  {DAYS.map(day => {
                    const slot = timetable[day][idx];
                    if (!slot) return <td key={day} className="border border-gray-300 p-3"></td>;

                    return (
                      <td
                        key={day}
                        className="border border-gray-300 p-2"
                        style={{
                          backgroundColor: slot.isBreak ? '#f3f4f6' : `${COLORS[slot.subject]}15`,
                        }}
                      >
                        {slot.isBreak ? (
                          <div className="text-center text-gray-600 text-sm font-medium">
                            BREAK<br />({config.breakDuration}m)
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <select
                              value={slot.subject}
                              onChange={(e) => handleSubjectChange(day, idx, e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              style={{ borderColor: COLORS[slot.subject] }}
                            >
                              {SUBJECTS.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            <select
                              value={slot.class}
                              onChange={(e) => handleClassChange(day, idx, e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              {config.classes.map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-gray-800 mb-3">Subject Color Code</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {SUBJECTS.map(subject => (
              <div key={subject} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: COLORS[subject] }}
                />
                <span className="text-sm text-gray-700">{subject}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="flex gap-4">
          <button
            onClick={handleCopyToClipboard}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium transition"
          >
            <Copy className="w-5 h-5" />
            Copy
          </button>
          <button
            onClick={handleExportPDF}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </div>
      </div>
    );
  }

  // Configuration Phase
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Clock className="w-8 h-8 text-indigo-600" />
          Timetable Builder
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Periods Configuration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Periods Per Day
            </label>
            <input
              type="number"
              min="4"
              max="10"
              value={config.periodsPerDay}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                periodsPerDay: parseInt(e.target.value),
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Break Configuration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Break After Period
            </label>
            <input
              type="number"
              min="1"
              max={config.periodsPerDay}
              value={config.breakAfter}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                breakAfter: parseInt(e.target.value),
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Subject Selection */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Subjects to Teach
          </label>
          <div className="space-y-2">
            {SUBJECTS.map(subject => (
              <label key={subject} className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={config.subjects.includes(subject)}
                  onChange={(e) => {
                    setConfig(prev => ({
                      ...prev,
                      subjects: e.target.checked
                        ? [...prev.subjects, subject]
                        : prev.subjects.filter(s => s !== subject),
                    }));
                  }}
                  className="mr-3 w-4 h-4"
                />
                <span className="text-gray-800 font-medium">{subject}</span>
                <div
                  className="ml-auto w-6 h-6 rounded"
                  style={{ backgroundColor: COLORS[subject] }}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Class Selection */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Classes Assigned
          </label>
          <div className="space-y-2 mb-3">
            {config.classes.map((cls, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  value={cls}
                  onChange={(e) => {
                    setConfig(prev => ({
                      ...prev,
                      classes: prev.classes.map((c, i) => i === idx ? e.target.value : c),
                    }));
                  }}
                  placeholder="e.g., 11-A"
                  className="flex-1 px-3 py-1 border border-gray-300 rounded"
                />
                <button
                  onClick={() => {
                    setConfig(prev => ({
                      ...prev,
                      classes: prev.classes.filter((_, i) => i !== idx),
                    }));
                  }}
                  className="p-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setConfig(prev => ({
                ...prev,
                classes: [...prev.classes, ''],
              }));
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
          >
            <Plus className="w-4 h-4" />
            Add Class
          </button>
        </div>

        <button
          onClick={handleGenerateTimetable}
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
        >
          Generate Timetable
        </button>
      </div>
    </div>
  );
}
