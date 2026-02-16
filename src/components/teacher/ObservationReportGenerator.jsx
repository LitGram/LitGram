import React, { useState } from 'react';
import { FileText, Copy, Download } from 'lucide-react';
import { exportTextAsPDF, copyToClipboard, formatDate } from '../../utils/exportService';

export default function ObservationReportGenerator() {
  const [language, setLanguage] = useState('english');
  const [formData, setFormData] = useState({
    date: '',
    observerName: '',
    observerDesignation: 'Principal',
    subject: '',
    class: '',
    topic: '',
    strengths: '',
    improvements: '',
  });
  const [report, setReport] = useState(null);

  const generateReport = () => {
    if (language === 'english') {
      return `CLASS OBSERVATION REPORT
═══════════════════════════════════════════════

1. OBSERVATION DETAILS
─────────────────────────────────────────────
Date of Observation: ${formatDate(formData.date)}
Observer Name: ${formData.observerName}
Observer Designation: ${formData.observerDesignation}
Subject: ${formData.subject}
Class: ${formData.class}
Topic Taught: ${formData.topic}

2. STRENGTHS OBSERVED
─────────────────────────────────────────────
${formData.strengths.split('\n').map(s => `• ${s.trim()}`).join('\n')}

3. AREAS FOR IMPROVEMENT
─────────────────────────────────────────────
${formData.improvements.split('\n').map(i => `• ${i.trim()}`).join('\n')}

4. RECOMMENDATIONS
─────────────────────────────────────────────
• Continue implementing engaging teaching strategies
• Work on the suggested improvement areas
• Maintain regular student feedback collection
• Document student progress consistently

5. OBSERVER'S SIGNATURE
─────────────────────────────────────────────

Signature: _________________________     Date: ${formatDate(new Date().toISOString().split('T')[0])}

Name: ${formData.observerName}
Designation: ${formData.observerDesignation}

─────────────────────────────────────────────
Report generated on: ${new Date().toLocaleString()}`;
    } else {
      return `कक्षा अवलोकन रिपोर्ट
═══════════════════════════════════════════════

1. अवलोकन विवरण
─────────────────────────────────────────────
अवलोकन की तारीख: ${formatDate(formData.date)}
अवलोकनकर्ता का नाम: ${formData.observerName}
अवलोकनकर्ता का पद: ${formData.observerDesignation}
विषय: ${formData.subject}
कक्षा: ${formData.class}
पढ़ाया गया विषय: ${formData.topic}

2. अवलोकित शक्तियाँ
─────────────────────────────────────────────
${formData.strengths.split('\n').map(s => `• ${s.trim()}`).join('\n')}

3. सुधार के लिए क्षेत्र
─────────────────────────────────────────────
${formData.improvements.split('\n').map(i => `• ${i.trim()}`).join('\n')}

4. सिफारिशें
─────────────────────────────────────────────
• आकर्षक शिक्षण रणनीतियों को लागू करना जारी रखें
• सुझाए गए सुधार क्षेत्रों पर काम करें
• नियमित छात्र प्रतिक्रिया संग्रहण बनाए रखें
• छात्र प्रगति को सुसंगत रूप से दस्तावेज़ करें

5. अवलोकनकर्ता के हस्ताक्षर
─────────────────────────────────────────────

हस्ताक्षर: _________________________     तारीख: ${formatDate(new Date().toISOString().split('T')[0])}

नाम: ${formData.observerName}
पद: ${formData.observerDesignation}

─────────────────────────────────────────────
रिपोर्ट जारी की गई: ${new Date().toLocaleString()}`;
    }
  };

  const handleGenerateReport = () => {
    if (!formData.date || !formData.observerName || !formData.subject || !formData.class || !formData.topic || !formData.strengths || !formData.improvements) {
      alert('Please fill all fields');
      return;
    }
    setReport(generateReport());
  };

  const handleCopy = () => {
    if (report) {
      copyToClipboard(report);
      alert('Report copied to clipboard!');
    }
  };

  const handleDownloadPDF = () => {
    if (report) {
      exportTextAsPDF(
        report,
        `observation_report_${formData.date}.pdf`,
        'CLASS OBSERVATION REPORT'
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FileText className="w-8 h-8 text-lime-600" />
          Observation Report Generator
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Output Language
          </label>
          <div className="flex gap-4">
            {['english', 'hindi'].map(lang => (
              <label key={lang} className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  value={lang}
                  checked={language === lang}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700 font-medium">
                  {lang === 'english' ? 'English' : 'हिंदी (Hindi)'}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Observation <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.observerName}
              onChange={(e) => setFormData(prev => ({ ...prev, observerName: e.target.value }))}
              placeholder="Principal/Inspector Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observer Designation
            </label>
            <select
              value={formData.observerDesignation}
              onChange={(e) => setFormData(prev => ({ ...prev, observerDesignation: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            >
              <option value="Principal">Principal</option>
              <option value="Vice-Principal">Vice-Principal</option>
              <option value="DIET Officer">DIET Officer</option>
              <option value="Inspector">Inspector</option>
              <option value="Cluster Resource Person">Cluster Resource Person</option>
            </select>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.class}
              onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value }))}
              placeholder="e.g., 11-A"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic Taught <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              placeholder="e.g., Laws of Motion"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Strengths Observed <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.strengths}
              onChange={(e) => setFormData(prev => ({ ...prev, strengths: e.target.value }))}
              placeholder="List one strength per line:&#10;- Clear explanation of concepts&#10;- Good classroom management&#10;- Interactive teaching methods"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Areas for Improvement <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.improvements}
              onChange={(e) => setFormData(prev => ({ ...prev, improvements: e.target.value }))}
              placeholder="List one area per line:&#10;- Encourage more student participation&#10;- Use more visual aids&#10;- Check student understanding regularly"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
          className="w-full px-6 py-3 bg-lime-600 text-white rounded-lg font-bold hover:bg-lime-700 transition"
        >
          Generate Report
        </button>
      </div>

      {report && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Generated Report</h3>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-4 max-h-96 overflow-y-auto whitespace-pre-wrap font-mono text-sm text-gray-800">
            {report}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium transition"
            >
              <Copy className="w-5 h-5" />
              Copy
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
