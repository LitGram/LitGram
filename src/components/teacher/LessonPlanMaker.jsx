import React, { useState } from 'react';
import { useToast } from '../Toast';
import { Copy, Download, BookOpen } from 'lucide-react';
import { generateLessonPlan } from '../../api/aiService';
import jsPDF from 'jspdf';

export default function LessonPlanMaker() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    subject: '',
    className: '',
    chapterName: '',
    periods: '',
  });
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.subject || !formData.className || !formData.chapterName || !formData.periods) {
      toast.warning('Please fill in all required fields');
      return;
    }

    setLoading(true);
    const plan = await generateLessonPlan(
      formData.subject,
      formData.className,
      formData.chapterName,
      formData.periods
    );
    setGeneratedPlan(plan);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPlan);
    toast.success('Copied to clipboard!');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxWidth = pageWidth - 2 * margin;

    doc.setFont('helvetica', 12);
    doc.text('Lesson Plan', margin, margin + 10);
    doc.setFont('helvetica', 10);

    const lines = doc.splitTextToSize(generatedPlan, maxWidth);
    let yPosition = margin + 20;

    lines.forEach((line) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 5;
    });

    doc.save(`lesson_plan_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-green-600" />
          Lesson Plan Maker
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
              placeholder="e.g., Physics"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chapter Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="chapterName"
              value={formData.chapterName}
              onChange={handleInputChange}
              placeholder="e.g., Motion"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Periods <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="periods"
              value={formData.periods}
              onChange={handleInputChange}
              placeholder="e.g., 5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 transition"
        >
          {loading ? 'Generating...' : 'Generate Lesson Plan'}
        </button>
      </div>

      {generatedPlan && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Generated Lesson Plan</h3>
          <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm mb-4 max-h-96 overflow-y-auto">
            {generatedPlan}
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
