import React, { useState } from 'react';
import { BarChart3, Download, Copy } from 'lucide-react';
import jsPDF from 'jspdf';

export default function ResultAnalysisTool() {
  const [marks, setMarks] = useState([
    { studentName: 'Rahul', marks: 85 },
    { studentName: 'Priya', marks: 92 },
    { studentName: 'Amit', marks: 78 },
  ]);
  const [newStudent, setNewStudent] = useState('');
  const [newMarks, setNewMarks] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleAddMarks = () => {
    if (!newStudent.trim() || !newMarks || isNaN(newMarks)) {
      alert('Please enter valid student name and marks');
      return;
    }

    setMarks([...marks, { studentName: newStudent, marks: parseInt(newMarks) }]);
    setNewStudent('');
    setNewMarks('');
  };

  const handleAnalyzeResults = () => {
    if (marks.length === 0) {
      alert('Please add student marks first');
      return;
    }

    const totalMarks = marks.reduce((sum, m) => sum + m.marks, 0);
    const avgMarks = (totalMarks / marks.length).toFixed(2);
    const topScorer = marks.reduce((max, m) => (m.marks > max.marks ? m : max));
    const belowAvg = marks.filter((m) => m.marks < avgMarks).length;
    const passed = marks.filter((m) => m.marks >= 40).length;

    setAnalysis({
      totalStudents: marks.length,
      averageMarks: avgMarks,
      topScorer: topScorer,
      highestMarks: topScorer.marks,
      belowAverage: belowAvg,
      passed: passed,
      failed: marks.length - passed,
      passPercentage: ((passed / marks.length) * 100).toFixed(2),
    });
  };

  const handleDeleteStudent = (idx) => {
    setMarks(marks.filter((_, i) => i !== idx));
  };

  const generateReport = () => {
    if (!analysis) return '';

    return `RESULT ANALYSIS REPORT
Date: ${new Date().toLocaleDateString()}

SUMMARY:
- Total Students: ${analysis.totalStudents}
- Class Average: ${analysis.averageMarks}%
- Highest Marks: ${analysis.highestMarks} (${analysis.topScorer.studentName})
- Passed: ${analysis.passed}/${analysis.totalStudents} (${analysis.passPercentage}%)
- Below Average: ${analysis.belowAverage} students
- Failed: ${analysis.failed} students

DETAILED MARKS:
${marks.map((m) => `${m.studentName}: ${m.marks}/100`).join('\n')}

RECOMMENDATIONS:
1. Focus on students scoring below 40
2. Provide additional support to students below class average
3. Encourage toppers to help other students
4. Conduct revision classes for weak areas`;
  };

  const handleDownloadPDF = () => {
    const report = generateReport();
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxWidth = pageWidth - 2 * margin;

    doc.setFont('helvetica', 14);
    doc.text('RESULT ANALYSIS REPORT', margin, margin + 10);
    doc.setFont('helvetica', 10);

    const lines = doc.splitTextToSize(report, maxWidth);
    let yPosition = margin + 25;

    lines.forEach((line) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 5;
    });

    doc.save('result_analysis.pdf');
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateReport());
    alert('Report copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-teal-600" />
          Result Analysis Tool
        </h2>

        {/* Input Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Enter Student Marks</h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newStudent}
              onChange={(e) => setNewStudent(e.target.value)}
              placeholder="Student name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="number"
              value={newMarks}
              onChange={(e) => setNewMarks(e.target.value)}
              placeholder="Marks (0-100)"
              max="100"
              min="0"
              className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={handleAddMarks}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Marks Table */}
        {marks.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Student Marks</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr>
                    <th className="px-4 py-2">Student Name</th>
                    <th className="px-4 py-2">Marks</th>
                    <th className="px-4 py-2">Grade</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.map((m, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2">{m.studentName}</td>
                      <td className="px-4 py-2">{m.marks}/100</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            m.marks >= 80
                              ? 'bg-green-100 text-green-800'
                              : m.marks >= 60
                              ? 'bg-yellow-100 text-yellow-800'
                              : m.marks >= 40
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {m.marks >= 80 ? 'A' : m.marks >= 60 ? 'B' : m.marks >= 40 ? 'C' : 'F'}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleDeleteStudent(idx)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <button
          onClick={handleAnalyzeResults}
          className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition"
        >
          Analyze Results
        </button>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Analysis Summary</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Total Students</p>
              <p className="text-2xl font-bold text-blue-600">{analysis.totalStudents}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Class Average</p>
              <p className="text-2xl font-bold text-green-600">{analysis.averageMarks}%</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Pass Percentage</p>
              <p className="text-2xl font-bold text-purple-600">{analysis.passPercentage}%</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Highest Marks</p>
              <p className="text-2xl font-bold text-yellow-600">{analysis.highestMarks}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Failed Students</p>
              <p className="text-2xl font-bold text-red-600">{analysis.failed}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Below Average</p>
              <p className="text-2xl font-bold text-orange-600">{analysis.belowAverage}</p>
            </div>
          </div>

          {/* Report Preview */}
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Report Preview</h4>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm mb-4 max-h-96 overflow-y-auto">
              {generateReport()}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCopyReport}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
