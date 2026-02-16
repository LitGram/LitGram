import React, { useState } from 'react';
import { useToast } from '../Toast';
import { FileCheck, Copy, Download } from 'lucide-react';
import jsPDF from 'jspdf';

export default function APARAssistant() {
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    year: new Date().getFullYear(),
    achievements: '',
    extracurricular: '',
    community: '',
    weakAreas: '',
    goals: '',
  });
  const [generatedAPAR, setGeneratedAPAR] = useState('');

  const steps = [
    { title: 'Personal Information', key: ['name', 'school'] },
    { title: 'Academic Achievements', key: ['achievements'] },
    { title: 'Extracurricular Activities', key: ['extracurricular'] },
    { title: 'Community Work', key: ['community'] },
    { title: 'Self-Assessment', key: ['weakAreas', 'goals'] },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateAPAR = () => {
    const apar = `ANNUAL PERFORMANCE APPRAISAL REPORT (APAR)

TEACHER INFORMATION:
Name: ${formData.name}
School: ${formData.school}
Year: ${formData.year}

SECTION A: ACADEMIC ACHIEVEMENTS
${formData.achievements}

SECTION B: EXTRACURRICULAR ACTIVITIES & LEADERSHIP
${formData.extracurricular}

SECTION C: COMMUNITY SERVICE & SOCIAL WORK
${formData.community}

SECTION D: SELF-ASSESSMENT
Areas for Improvement:
${formData.weakAreas}

Future Goals:
${formData.goals}

SECTION E: OVERALL ASSESSMENT
This appraisal reflects my dedication to teaching excellence and contribution to the school community. I am committed to continuous professional development and student success.

Date: ${new Date().toLocaleDateString()}
Signature: ___________________`;

    setGeneratedAPAR(apar);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedAPAR);
    toast.success('Copied to clipboard!');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxWidth = pageWidth - 2 * margin;

    doc.setFont('helvetica', 14);
    doc.text('ANNUAL PERFORMANCE APPRAISAL REPORT', margin, margin + 10);
    doc.setFont('helvetica', 10);

    const lines = doc.splitTextToSize(generatedAPAR, maxWidth);
    let yPosition = margin + 25;

    lines.forEach((line) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 5;
    });

    doc.save('APAR_Report.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FileCheck className="w-8 h-8 text-pink-600" />
          APAR Assistant (Annual Performance Appraisal Report)
        </h2>

        {/* Steps */}
        {!generatedAPAR && (
          <>
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                {steps.map((s, idx) => (
                  <div key={idx} className="text-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        idx <= step
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <p className="text-xs mt-2 text-gray-600">{s.title}</p>
                  </div>
                ))}
              </div>
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink-600 transition-all"
                  style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 0 */}
            {step === 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {steps[0].title}
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Name
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    placeholder="Your school name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {steps[1].title}
                </h3>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  placeholder="List your academic achievements, successful projects, student performance, etc."
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {steps[2].title}
                </h3>
                <textarea
                  name="extracurricular"
                  value={formData.extracurricular}
                  onChange={handleInputChange}
                  placeholder="Describe club activities, cultural programs, sports, leadership roles, etc."
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {steps[3].title}
                </h3>
                <textarea
                  name="community"
                  value={formData.community}
                  onChange={handleInputChange}
                  placeholder="Mention community outreach, village programs, awareness campaigns, etc."
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {steps[4].title}
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Areas for Improvement
                  </label>
                  <textarea
                    name="weakAreas"
                    value={formData.weakAreas}
                    onChange={handleInputChange}
                    placeholder="What areas do you need to work on?"
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Future Goals
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    placeholder="What are your professional goals for next year?"
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              {step === steps.length - 1 ? (
                <button
                  onClick={handleGenerateAPAR}
                  className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                >
                  Generate APAR
                </button>
              ) : (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}

        {/* Generated APAR */}
        {generatedAPAR && (
          <div>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm mb-4 max-h-96 overflow-y-auto">
              {generatedAPAR}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
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
              <button
                onClick={() => {
                  setGeneratedAPAR('');
                  setStep(0);
                }}
                className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
              >
                Create Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
