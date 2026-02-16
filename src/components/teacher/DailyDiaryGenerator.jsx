import React, { useState } from 'react';
import { useToast } from '../Toast';
import { Copy, Download, FileText } from 'lucide-react';
import { generateDailyDiary } from '../../api/aiService';
import jsPDF from 'jspdf';

export default function DailyDiaryGenerator() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    subject: '',
    className: '',
    topic: '',
    period: '',
    activities: '',
    homework: '',
  });
  const [generatedDiary, setGeneratedDiary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.subject || !formData.className || !formData.topic || !formData.period) {
      toast.warning('Please fill in all required fields');
      return;
    }

    setLoading(true);
    const diary = await generateDailyDiary(
      formData.subject,
      formData.className,
      formData.topic,
      formData.period,
      formData.activities,
      formData.homework
    );
    setGeneratedDiary(diary);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDiary);
    toast.success('Copied to clipboard!');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxWidth = pageWidth - 2 * margin;

    doc.setFont('helvetica', 12);
    doc.text('Daily Diary Entry', margin, margin + 10);
    doc.setFont('helvetica', 10);

    const lines = doc.splitTextToSize(generatedDiary, maxWidth);
    let yPosition = margin + 20;

    lines.forEach((line) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 5;
    });

    doc.save(`diary_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FileText className="w-8 h-8 text-blue-600" />
          Daily Diary Generator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="e.g., Physics, Chemistry"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleInputChange}
              placeholder="e.g., 11-A"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic Taught <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              placeholder="e.g., Newton's Laws of Motion"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Period Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="period"
              value={formData.period}
              onChange={handleInputChange}
              placeholder="e.g., 1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activities Used
            </label>
            <textarea
              name="activities"
              value={formData.activities}
              onChange={handleInputChange}
              placeholder="Describe the teaching methods and activities used..."
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Homework Given
            </label>
            <textarea
              name="homework"
              value={formData.homework}
              onChange={handleInputChange}
              placeholder="Specify homework assignments..."
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {loading ? 'Generating...' : 'Generate Diary Entry'}
        </button>
      </div>

      {/* Generated Diary Display */}
      {generatedDiary && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Generated Entry</h3>
          <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm mb-4 max-h-96 overflow-y-auto">
            {generatedDiary}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
