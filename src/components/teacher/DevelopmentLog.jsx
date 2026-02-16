import React, { useState } from 'react';
import { useToast } from '../Toast';
import { BookOpen, Plus, Trash2, Download } from 'lucide-react';
import { exportTextAsPDF, formatDate } from '../../utils/exportService';

export default function DevelopmentLog() {
  const toast = useToast();
  const [trainings, setTrainings] = useState([
    {
      id: 1,
      name: 'Digital Learning Workshop',
      date: '2026-01-15',
      organizer: 'SCERT Rajasthan',
      topics: 'Online teaching tools, LMS usage',
      duration: '2 days',
      certificate: true,
    },
  ]);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    organizer: '',
    topics: '',
    duration: '',
    certificate: false,
  });

  const handleAddTraining = () => {
    if (!formData.name || !formData.date || !formData.organizer || !formData.topics || !formData.duration) {
      alert('Please fill all fields');
      return;
    }

    setTrainings(prev => [...prev, {
      id: Date.now(),
      ...formData,
    }]);

    setFormData({ name: '', date: '', organizer: '', topics: '', duration: '', certificate: false });
  };

  const handleDeleteTraining = (id) => {
    setTrainings(prev => prev.filter(t => t.id !== id));
  };

  const handleGenerateAPARSummary = () => {
    if (trainings.length === 0) {
      alert('No trainings to summarize');
      return;
    }

    let summary = `PROFESSIONAL DEVELOPMENT SUMMARY FOR APAR

During the reporting period, I have participated in the following professional development activities:

`;

    trainings.forEach((training, idx) => {
      summary += `${idx + 1}. ${training.name} - Organized by ${training.organizer} on ${formatDate(training.date)}\n`;
      summary += `   Duration: ${training.duration}\n`;
      summary += `   Topics covered: ${training.topics}\n`;
      if (training.certificate) {
        summary += `   Certificate: Obtained\n`;
      }
      summary += `\n`;
    });

    summary += `These training programs have enhanced my professional skills in:
- Adoption of modern pedagogical approaches
- Integration of technology in classroom teaching
- Development of student-centric learning strategies
- Improvement of subject expertise and content knowledge

These learnings have been reflected in my classroom practices and have contributed to improved student outcomes.`;

    exportTextAsPDF(summary, 'apar_development_summary.pdf', 'PROFESSIONAL DEVELOPMENT SUMMARY');
  };

  const totalTrainings = trainings.length;
  const totalDays = trainings.reduce((sum, t) => {
    const days = parseInt(t.duration) || 1;
    return sum + days;
  }, 0);
  const certificateCount = trainings.filter(t => t.certificate).length;

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-rose-600" />
          Professional Development Log
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Training Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Digital Learning Workshop"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organizer <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.organizer}
              onChange={(e) => setFormData(prev => ({ ...prev, organizer: e.target.value }))}
              placeholder="e.g., SCERT Rajasthan"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              placeholder="e.g., 2 days"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topics Covered <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.topics}
              onChange={(e) => setFormData(prev => ({ ...prev, topics: e.target.value }))}
              placeholder="Describe the topics covered..."
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="md:col-span-2 flex items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.certificate}
                onChange={(e) => setFormData(prev => ({ ...prev, certificate: e.target.checked }))}
                className="w-4 h-4 mr-3"
              />
              <span className="text-gray-700 font-medium">Certificate Obtained</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleAddTraining}
          className="flex items-center gap-2 px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 font-medium transition"
        >
          <Plus className="w-4 h-4" />
          Add Training
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg shadow border border-blue-200">
          <p className="text-gray-600 text-sm">Total Trainings</p>
          <p className="text-3xl font-bold text-blue-600">{totalTrainings}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow border border-green-200">
          <p className="text-gray-600 text-sm">Total Days Trained</p>
          <p className="text-3xl font-bold text-green-600">{totalDays}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow border border-purple-200">
          <p className="text-gray-600 text-sm">Certificates</p>
          <p className="text-3xl font-bold text-purple-600">{certificateCount}</p>
        </div>
      </div>

      {/* Training List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left font-bold">Training Name</th>
              <th className="px-4 py-3 text-center font-bold">Date</th>
              <th className="px-4 py-3 text-left font-bold">Organizer</th>
              <th className="px-4 py-3 text-center font-bold">Duration</th>
              <th className="px-4 py-3 text-center font-bold">Cert.</th>
              <th className="px-4 py-3 text-center font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map(training => (
              <tr key={training.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{training.name}</td>
                <td className="px-4 py-3 text-center text-gray-700 text-sm">{formatDate(training.date)}</td>
                <td className="px-4 py-3 text-gray-700 text-sm">{training.organizer}</td>
                <td className="px-4 py-3 text-center text-gray-700 text-sm">{training.duration}</td>
                <td className="px-4 py-3 text-center">
                  {training.certificate && <span className="text-green-600 font-bold">✓</span>}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDeleteTraining(training.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Generate APAR Summary */}
      <button
        onClick={handleGenerateAPARSummary}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition"
      >
        <Download className="w-5 h-5" />
        Generate APAR Development Summary (PDF)
      </button>
    </div>
  );
}
