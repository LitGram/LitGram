import React, { useState } from 'react';
import { FileText, Download, Copy } from 'lucide-react';
import { exportTextAsPDF, copyToClipboard } from '../../utils/exportService';
import { getSubjectChapters } from '../../data/curriculum';

export default function WorksheetCreator() {
  const [formData, setFormData] = useState({
    subject: '',
    class: '',
    chapter: '',
    type: 'practice',
    difficulty: 'medium',
    language: 'english',
  });
  const [worksheet, setWorksheet] = useState(null);
  const [loading, setLoading] = useState(false);

  const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Hindi'];
  const types = [
    { value: 'practice', label: 'Practice Worksheet' },
    { value: 'revision', label: 'Revision Sheet' },
    { value: 'assessment', label: 'Assessment Test' },
  ];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const generateMockWorksheet = () => {
    const worksheets = {
      english_easy: `WORKSHEET - EASY
${formData.subject} - Class ${formData.class}
Chapter: ${formData.chapter}
Date: ${new Date().toLocaleDateString()}

SECTION A: FILL IN THE BLANKS
1. _________________ is the fundamental unit of life.
2. The process by which plants make their own food is called _________________.
3. _________________ is the powerhouse of the cell.
4. The SI unit of force is _________________.
5. _________________ discovered the structure of DNA.

SECTION B: MATCH THE FOLLOWING
Column A                           Column B
1. Mitochondria                   a) Photosynthesis
2. Chloroplast                    b) ATP production
3. Nucleus                        c) Ribosome
4. Protein synthesis              d) Genetic material
5. Enzyme                         e) Biological catalyst

SECTION C: MULTIPLE CHOICE QUESTIONS
1. What is the pH of neutral solution?
   (a) 0    (b) 7    (c) 14    (d) 1

2. Which organelle is found in plant cells but not in animal cells?
   (a) Mitochondria  (b) Ribosome  (c) Chloroplast  (d) Nucleus

3. The basic unit of inheritance is:
   (a) Chromosome  (b) Gene  (c) Protein  (d) Enzyme

SECTION D: SHORT ANSWER QUESTIONS (2-3 words)
1. Define osmosis.
2. What is the function of ribosomes?
3. Name the process of cell division that produces sex cells.`,

      english_medium: `WORKSHEET - MEDIUM
${formData.subject} - Class ${formData.class}
Chapter: ${formData.chapter}
Date: ${new Date().toLocaleDateString()}

SECTION A: SHORT ANSWER QUESTIONS
1. Explain the difference between mitochondria and chloroplast.
2. What is the role of ATP in cellular respiration?
3. Describe the process of photosynthesis in brief.
4. What are the three types of muscle tissue? Give one example of each.
5. How does osmosis differ from diffusion?

SECTION B: LONG ANSWER QUESTIONS
1. Draw and label a plant cell. Explain the function of each organelle.
   (6 marks)

2. Explain the process of cellular respiration. How is ATP generated?
   (6 marks)

SECTION C: PROBLEM SOLVING
1. Calculate the pH of a solution with H+ concentration of 10^-8.
2. If a cell divides by mitosis, how many daughter cells are produced? Are they identical?`,

      hindi_medium: `प्रश्नपत्र - मध्यम स्तर
विषय: ${formData.subject} - कक्षा ${formData.class}
अध्याय: ${formData.chapter}
तारीख: ${new Date().toLocaleDateString()}

भाग क: लघु उत्तरीय प्रश्न
1. माइटोकॉन्ड्रिया और क्लोरोप्लास्ट में अंतर बताइए।
2. कोशीय श्वसन में ATP की भूमिका क्या है?
3. प्रकाश संश्लेषण की प्रक्रिया को संक्षेप में समझाइए।
4. पेशी ऊतक के तीन प्रकार बताइए और एक-एक उदाहरण दीजिए।
5. परासरण और विसरण में क्या अंतर है?

भाग ख: दीर्घ उत्तरीय प्रश्न
1. एक पादप कोशिका की संरचना का चित्र बनाइए और सभी अंगकों की कार्यों को समझाइए।
   (6 अंक)

2. कोशीय श्वसन की प्रक्रिया को समझाइए। ATP का निर्माण कैसे होता है?
   (6 अंक)`,
    };

    const key = `${formData.language}_${formData.difficulty.toLowerCase()}`;
    return worksheets[key] || worksheets['english_medium'];
  };

  const handleGenerateWorksheet = async () => {
    if (!formData.subject || !formData.class || !formData.chapter) {
      alert('Please select all fields');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const generatedWorksheet = generateMockWorksheet();
      setWorksheet(generatedWorksheet);
      setLoading(false);
    }, 1000);
  };

  const handleDownloadPDF = () => {
    if (worksheet) {
      exportTextAsPDF(
        worksheet,
        `worksheet_${formData.subject}_${new Date().toISOString().split('T')[0]}.pdf`,
        'WORKSHEET'
      );
    }
  };

  const handleCopy = () => {
    if (worksheet) {
      copyToClipboard(worksheet);
      alert('Worksheet copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FileText className="w-8 h-8 text-cyan-600" />
          Bilingual Worksheet Creator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select class...</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chapter <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.chapter}
              onChange={(e) => setFormData(prev => ({ ...prev, chapter: e.target.value }))}
              placeholder="e.g., Cell Structure"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Worksheet Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {types.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {difficulties.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={formData.language}
              onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="english">English</option>
              <option value="hindi">हिंदी (Hindi)</option>
              <option value="bilingual">Bilingual (English + Hindi)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerateWorksheet}
          disabled={loading}
          className="w-full px-6 py-3 bg-cyan-600 text-white rounded-lg font-bold hover:bg-cyan-700 disabled:bg-gray-400 transition"
        >
          {loading ? 'Generating...' : 'Generate Worksheet'}
        </button>
      </div>

      {worksheet && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Generated Worksheet</h3>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-4 max-h-96 overflow-y-auto whitespace-pre-wrap font-mono text-sm text-gray-800">
            {worksheet}
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
