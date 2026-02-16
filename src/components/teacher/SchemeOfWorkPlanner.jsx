import React, { useState } from 'react';
import { Calendar, Download } from 'lucide-react';
import { exportTextAsPDF } from '../../utils/exportService';
import { RBSE_CURRICULUM, getSubjectChapters } from '../../data/curriculum';

// Rajasthan school holidays (typical)
const RAJASTHAN_HOLIDAYS = [
  { date: '2026-01-26', name: 'Republic Day' },
  { date: '2026-03-08', name: 'Holi' },
  { date: '2026-03-29', name: 'Ram Navami' },
  { date: '2026-04-02', name: 'Good Friday' },
  { date: '2026-04-14', name: 'Ambedkar Jayanti' },
  { date: '2026-08-15', name: 'Independence Day' },
  { date: '2026-10-02', name: 'Gandhi Jayanti' },
  { date: '2026-10-24', name: 'Diwali' },
];

export default function SchemeOfWorkPlanner() {
  const [formData, setFormData] = useState({
    subject: '',
    class: '',
    startDate: '',
    endDate: '',
  });
  const [scheme, setScheme] = useState(null);

  const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Hindi'];

  const handleGenerateScheme = () => {
    if (!formData.subject || !formData.class || !formData.startDate || !formData.endDate) {
      alert('Please fill all fields');
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const chapters = getSubjectChapters(formData.subject, parseInt(formData.class));

    // Calculate working days
    let workingDays = 0;
    let current = new Date(start);
    while (current <= end) {
      const dayOfWeek = current.getDay();
      const dateStr = current.toISOString().split('T')[0];
      const isHoliday = RAJASTHAN_HOLIDAYS.some(h => h.date === dateStr);
      const isSunday = dayOfWeek === 0;

      if (!isSunday && !isHoliday) {
        workingDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    // Distribute chapters across weeks
    const weekPlan = [];
    const chapterDays = Math.floor(workingDays / chapters.length);
    let currentChapterIdx = 0;
    let daysInCurrentChapter = 0;

    current = new Date(start);
    let currentWeek = {
      weekStart: new Date(start),
      weekEnd: null,
      chapters: [],
      workingDays: 0,
    };

    while (current <= end) {
      const dayOfWeek = current.getDay();
      const dateStr = current.toISOString().split('T')[0];
      const isHoliday = RAJASTHAN_HOLIDAYS.some(h => h.date === dateStr);
      const isSunday = dayOfWeek === 0;

      if (!isSunday && !isHoliday) {
        if (daysInCurrentChapter === 0 && chapters[currentChapterIdx]) {
          currentWeek.chapters.push(chapters[currentChapterIdx].name);
        }
        daysInCurrentChapter++;
        currentWeek.workingDays++;

        if (daysInCurrentChapter >= chapterDays && currentChapterIdx < chapters.length - 1) {
          currentChapterIdx++;
          daysInCurrentChapter = 0;
        }
      }

      if (dayOfWeek === 6 || current.getTime() === end.getTime()) {
        currentWeek.weekEnd = new Date(current);
        weekPlan.push({ ...currentWeek });
        currentWeek = {
          weekStart: new Date(current.getTime() + 24 * 60 * 60 * 1000),
          weekEnd: null,
          chapters: [],
          workingDays: 0,
        };
      }

      current.setDate(current.getDate() + 1);
    }

    setScheme({
      ...formData,
      weeks: weekPlan,
      totalWorkingDays: workingDays,
      totalChapters: chapters.length,
    });
  };

  const handleExportPDF = () => {
    if (!scheme) return;

    let content = `SCHEME OF WORK\n${scheme.subject} - Class ${scheme.class}\n\n`;
    content += `Period: ${scheme.startDate} to ${scheme.endDate}\n`;
    content += `Total Working Days: ${scheme.totalWorkingDays}\n`;
    content += `Total Chapters: ${scheme.totalChapters}\n\n`;

    scheme.weeks.forEach((week, idx) => {
      const startDate = new Date(week.weekStart).toLocaleDateString();
      const endDate = new Date(week.weekEnd).toLocaleDateString();
      content += `WEEK ${idx + 1} (${startDate} - ${endDate})\n`;
      content += `Working Days: ${week.workingDays}\n`;
      content += `Topics:\n`;
      week.chapters.forEach(ch => {
        content += `  - ${ch}\n`;
      });
      content += '\n';
    });

    content += `\nHOLIDAYS (${RAJASTHAN_HOLIDAYS.length} days)\n`;
    RAJASTHAN_HOLIDAYS.forEach(holiday => {
      content += `- ${holiday.date}: ${holiday.name}\n`;
    });

    exportTextAsPDF(content, 'scheme_of_work.pdf', 'SCHEME OF WORK');
  };

  if (scheme) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Scheme of Work</h2>
              <p className="text-gray-600">{scheme.subject} - Class {scheme.class}</p>
            </div>
            <button
              onClick={() => setScheme(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              ← Back
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Period</p>
              <p className="text-lg font-bold text-gray-800">{scheme.startDate} to {scheme.endDate}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Working Days</p>
              <p className="text-2xl font-bold text-green-600">{scheme.totalWorkingDays}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Chapters</p>
              <p className="text-2xl font-bold text-purple-600">{scheme.totalChapters}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Weeks</p>
              <p className="text-2xl font-bold text-yellow-600">{scheme.weeks.length}</p>
            </div>
          </div>
        </div>

        {/* Weekly Breakdown */}
        <div className="space-y-4">
          {scheme.weeks.map((week, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-3">
                Week {idx + 1}: {new Date(week.weekStart).toLocaleDateString()} - {new Date(week.weekEnd).toLocaleDateString()}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Working Days</p>
                  <p className="text-2xl font-bold text-blue-600">{week.workingDays}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Topics</p>
                  <p className="text-2xl font-bold text-purple-600">{week.chapters.length}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-lg font-bold text-gray-700">Planned</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="font-medium text-gray-800 mb-2">Topics to Cover:</p>
                <ul className="list-disc list-inside space-y-1">
                  {week.chapters.map((ch, i) => (
                    <li key={i} className="text-gray-700">{ch}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Holidays */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Holidays Accounted For</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {RAJASTHAN_HOLIDAYS.map((holiday, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-yellow-50 rounded border border-yellow-200">
                <span className="text-gray-800">{holiday.name}</span>
                <span className="text-sm text-gray-600">{holiday.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Export */}
        <button
          onClick={handleExportPDF}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
        >
          <Download className="w-5 h-5" />
          Download Scheme (PDF)
        </button>
      </div>
    );
  }

  // Configuration Phase
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Calendar className="w-8 h-8 text-indigo-600" />
          Scheme of Work Planner
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select subject...</option>
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.class}
              onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select class...</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              <strong>Rajasthan School Holidays:</strong> {RAJASTHAN_HOLIDAYS.length} holidays will be automatically excluded from working days calculation.
            </p>
          </div>

          <button
            onClick={handleGenerateScheme}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition"
          >
            Generate Scheme of Work
          </button>
        </div>
      </div>
    </div>
  );
}
