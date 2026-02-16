import React, { useState } from 'react';
import { useToast } from '../Toast';
import { BookOpen, Plus, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/exportService';

export default function HomeworkManager() {
  const toast = useToast();
  const [homeworks, setHomeworks] = useState([
    {
      id: 1,
      class: '11-A',
      subject: 'Physics',
      topic: 'Laws of Motion',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: 'Solve problems 1-10 from chapter 3',
      submitted: 'partial',
      createdDate: new Date().toISOString().split('T')[0],
    },
  ]);
  const [formData, setFormData] = useState({
    class: '',
    subject: '',
    topic: '',
    dueDate: '',
    description: '',
  });

  const handleAddHomework = () => {
    if (!formData.class || !formData.subject || !formData.topic || !formData.dueDate || !formData.description) {
      alert('Please fill all fields');
      return;
    }

    setHomeworks(prev => [...prev, {
      id: Date.now(),
      ...formData,
      submitted: 'pending',
      createdDate: new Date().toISOString().split('T')[0],
    }]);

    setFormData({ class: '', subject: '', topic: '', dueDate: '', description: '' });
  };

  const handleUpdateStatus = (id, status) => {
    setHomeworks(prev => prev.map(hw =>
      hw.id === id ? { ...hw, submitted: status } : hw
    ));
  };

  const handleDeleteHomework = (id) => {
    setHomeworks(prev => prev.filter(hw => hw.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'all':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'pending':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'all':
        return 'All Submitted';
      case 'partial':
        return 'Partially Submitted';
      case 'pending':
        return 'Not Submitted';
      default:
        return status;
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const days = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return days;
  };

  const sortedHomeworks = [...homeworks].sort((a, b) => {
    const daysA = getDaysUntilDue(a.dueDate);
    const daysB = getDaysUntilDue(b.dueDate);
    return daysA - daysB;
  });

  return (
    <div className="space-y-6">
      {/* Create Homework */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-blue-600" />
          Homework Manager
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.class}
              onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value }))}
              placeholder="e.g., 11-A"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="e.g., Physics"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              placeholder="e.g., Laws of Motion"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the homework assignment..."
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleAddHomework}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
        >
          <Plus className="w-5 h-5" />
          Create Homework
        </button>
      </div>

      {/* Homework List */}
      <div className="space-y-4">
        {sortedHomeworks.map(hw => {
          const daysLeft = getDaysUntilDue(hw.dueDate);
          const isOverdue = daysLeft < 0;

          return (
            <div key={hw.id} className={`bg-white rounded-lg shadow p-4 border-l-4 ${
              hw.submitted === 'all' ? 'border-green-500' : hw.submitted === 'partial' ? 'border-yellow-500' : 'border-red-500'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">{hw.subject} - {hw.topic}</h3>
                  <p className="text-sm text-gray-600">Class: {hw.class}</p>
                </div>
                <button
                  onClick={() => handleDeleteHomework(hw.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-700 text-sm mb-3">{hw.description}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {isOverdue ? (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                  )}
                  <span className={`text-sm font-medium ${isOverdue ? 'text-red-600' : 'text-blue-600'}`}>
                    {isOverdue ? `Overdue by ${Math.abs(daysLeft)} days` : `Due in ${daysLeft} days`}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  Due: {formatDate(hw.dueDate)}
                </span>
              </div>

              {/* Status Buttons */}
              <div className="flex gap-2 flex-wrap">
                {['pending', 'partial', 'all'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleUpdateStatus(hw.id, status)}
                    className={`px-3 py-1 rounded text-sm font-medium border transition ${
                      hw.submitted === status
                        ? `${getStatusColor(status)} border-current`
                        : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {getStatusLabel(status)}
                  </button>
                ))}
              </div>

              {/* Auto-generated parent message */}
              {hw.submitted === 'pending' && (
                <div className="mt-3 p-3 bg-yellow-50 rounded border border-yellow-200 text-xs text-gray-700">
                  <p className="font-medium mb-1">Auto-generated message for parents:</p>
                  <p>
                    "Dear parent, please ensure your ward completes the {hw.subject} homework on {hw.topic} by {formatDate(hw.dueDate)}. {hw.description}"
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {homeworks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No homework assigned yet</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-blue-50 rounded-lg shadow p-6 border border-blue-200">
        <h3 className="font-bold text-gray-800 mb-3">Homework Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Assignments</p>
            <p className="text-2xl font-bold text-blue-600">{homeworks.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">All Submitted</p>
            <p className="text-2xl font-bold text-green-600">{homeworks.filter(h => h.submitted === 'all').length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Partially Submitted</p>
            <p className="text-2xl font-bold text-yellow-600">{homeworks.filter(h => h.submitted === 'partial').length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Not Submitted</p>
            <p className="text-2xl font-bold text-red-600">{homeworks.filter(h => h.submitted === 'pending').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
