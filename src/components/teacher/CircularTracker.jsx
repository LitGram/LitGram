import React, { useState } from 'react';
import { useToast } from '../Toast';
import { AlertCircle, Trash2, CheckCircle, Clock } from 'lucide-react';

export default function CircularTracker() {
  const toast = useToast();
  const [circulars, setCirculars] = useState([
    {
      id: 1,
      title: 'Board Exam Schedule Update',
      summary: '- Exams scheduled for March 15\n- Syllabus update on official website\n- Send 10 sample papers to students',
      deadline: '2026-03-01',
      status: 'pending',
      source: 'Department',
    },
  ]);
  const [newCircular, setNewCircular] = useState('');
  const [newDeadline, setNewDeadline] = useState('');

  const handleAddCircular = () => {
    if (!newCircular.trim()) {
      toast.warning('Please enter circular text');
      return;
    }

    const summary = newCircular.split('\n').slice(0, 3).join('\n');
    const circular = {
      id: Date.now(),
      title: newCircular.split('\n')[0],
      summary: summary,
      deadline: newDeadline || new Date().toISOString().split('T')[0],
      status: 'pending',
      source: 'Manual Entry',
    };

    setCirculars([circular, ...circulars]);
    setNewCircular('');
    setNewDeadline('');
  };

  const handleUpdateStatus = (id, newStatus) => {
    setCirculars(circulars.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
  };

  const handleDeleteCircular = (id) => {
    setCirculars(circulars.filter((c) => c.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'done':
        return 'text-green-600 bg-green-50';
      case 'not-applicable':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <AlertCircle className="w-8 h-8 text-red-600" />
          Circular Tracker
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste Circular Text
          </label>
          <textarea
            value={newCircular}
            onChange={(e) => setNewCircular(e.target.value)}
            placeholder="Paste the circular from WhatsApp, email, or paper..."
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deadline
          </label>
          <input
            type="date"
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
          />

          <button
            onClick={handleAddCircular}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition"
          >
            Add Circular
          </button>
        </div>
      </div>

      {circulars.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Circulars ({circulars.length})</h3>
          <div className="space-y-4">
            {circulars.map((circular) => (
              <div key={circular.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-gray-800">{circular.title}</h4>
                    <p className="text-xs text-gray-500">From: {circular.source}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCircular(circular.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-gray-700 mb-3 whitespace-pre-wrap">
                  {circular.summary}
                </p>

                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    Deadline: {new Date(circular.deadline).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(circular.id, 'pending')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      circular.status === 'pending'
                        ? 'bg-yellow-600 text-white'
                        : getStatusColor('pending')
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(circular.id, 'done')}
                    className={`px-3 py-1 rounded text-sm font-medium flex items-center gap-1 ${
                      circular.status === 'done'
                        ? 'bg-green-600 text-white'
                        : getStatusColor('done')
                    }`}
                  >
                    <CheckCircle className="w-3 h-3" />
                    Done
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(circular.id, 'not-applicable')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      circular.status === 'not-applicable'
                        ? 'bg-gray-600 text-white'
                        : getStatusColor('not-applicable')
                    }`}
                  >
                    N/A
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
