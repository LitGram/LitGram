import React, { useState } from 'react';
import { useToast } from '../Toast';
import { Copy, Download, FileCheck } from 'lucide-react';
import { generateQuestionPaper } from '../../api/aiService';
import jsPDF from 'jspdf';

export default function QuestionPaperGenerator() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    subject: '',
    className: '',
    chapters: '',
    difficulty: 'medium',
    totalMarks: 80,
    questionTypes: [],
  });
  const [generatedPaper, setGeneratedPaper] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      questionTypes: prev.questionTypes.includes(type)
        ? prev.questionTypes.filter((t) => t !== type)
        : [...prev.questionTypes, type],
    }));
  };

  const handleGenerate = async () => {
    if (!formData.subject || !formData.className || !formData.chapters) {
      toast.warning('Please fill in all required fields');
      return;
    }

    setLoading(true);
    const paper = await generateQuestionPaper(
      formData.subject,
      formData.className,
      formData.chapters,
      formData.difficulty,
      formData.totalMarks,
      formData.questionTypes.join(', ')
    );
    setGeneratedPaper(paper);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPaper);
    toast.success('Copied to clipboard!');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxWidth = pageWidth - 2 * margin;

    doc.setFont('helvetica', 14);
    doc.text('QUESTION PAPER', margin, margin + 10);
    doc.setFont('helvetica', 10);

    const lines = doc.splitTextToSize(generatedPaper, maxWidth);
    let yPosition = margin + 20;

    lines.forEach((line) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 5;
    });

    doc.save(`question_paper_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FileCheck className="w-8 h-8 text-purple-600" />
          Question Paper Generator
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              placeholder="e.g., 12-A"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chapters <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="chapters"
              value={formData.chapters}
              onChange={handleInputChange}
              placeholder="e.g., Chapter 1, 2, 3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Marks
            </label>
            <input
              type="number"
              name="totalMarks"
              value={formData.totalMarks}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Types
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.questionTypes.includes('mcq')}
                  onChange={() => handleCheckboxChange('mcq')}
                  className="mr-2"
                />
                Multiple Choice
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.questionTypes.includes('short')}
                  onChange={() => handleCheckboxChange('short')}
                  className="mr-2"
                />
                Short Answer
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.questionTypes.includes('long')}
                  onChange={() => handleCheckboxChange('long')}
                  className="mr-2"
                />
                Long Answer
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-400 transition"
        >
          {loading ? 'Generating...' : 'Generate Question Paper'}
        </button>
      </div>

      {generatedPaper && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Generated Question Paper</h3>
          <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm mb-4 max-h-96 overflow-y-auto">
            {generatedPaper}
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
