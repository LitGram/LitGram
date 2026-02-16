import React, { useState } from 'react';
import { FileText, Copy, Download } from 'lucide-react';
import { exportTextAsPDF, copyToClipboard } from '../../utils/exportService';

export default function MeetingNotesGenerator() {
  const [language, setLanguage] = useState('english');
  const [roughNotes, setRoughNotes] = useState('');
  const [formattedMinutes, setFormattedMinutes] = useState(null);

  const templates = {
    english: {
      header: `MINUTES OF MEETING (MOM)

Date: {date}
Time: {time}
Venue: {venue}

ATTENDEES:
{attendees}

AGENDA:
{agenda}

DISCUSSION POINTS:
{discussion}

ACTION ITEMS:
{actionItems}

NEXT MEETING DATE: {nextMeeting}

Prepared by: {preparedBy}
Signature: _________________

---`,
      hindi: `बैठक के मिनट्स (MOM)

तारीख: {date}
समय: {time}
स्थान: {venue}

उपस्थित सदस्य:
{attendees}

एजेंडा:
{agenda}

चर्चा के बिंदु:
{discussion}

कार्य सूची:
{actionItems}

अगली बैठक की तारीख: {nextMeeting}

तैयार किया गया: {preparedBy}
हस्ताक्षर: _________________

---`,
    },
  };

  const extractStructuredData = (notes) => {
    // Simple extraction logic
    const lines = notes.split('\n').filter(l => l.trim());

    return {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      venue: 'School',
      attendees: lines[0] || 'Staff Members',
      agenda: lines.slice(0, 3).map(l => `• ${l}`).join('\n') || '• General discussion',
      discussion: lines.slice(0, 5).map(l => `• ${l}`).join('\n') || '• Discussed various issues',
      actionItems: lines
        .filter(l => l.toLowerCase().includes('action') || l.toLowerCase().includes('todo') || l.toLowerCase().includes('decide'))
        .slice(0, 3)
        .map(l => `• ${l}`)
        .join('\n') || '• Follow up on pending matters',
      nextMeeting: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      preparedBy: 'Teacher',
    };
  };

  const handleGenerateMinutes = () => {
    if (!roughNotes.trim()) {
      alert('Please enter meeting notes');
      return;
    }

    const data = extractStructuredData(roughNotes);
    const template = language === 'english' ? templates.english.header : templates.hindi.header;

    let formatted = template
      .replace('{date}', data.date)
      .replace('{time}', data.time)
      .replace('{venue}', data.venue)
      .replace('{attendees}', data.attendees)
      .replace('{agenda}', data.agenda)
      .replace('{discussion}', data.discussion)
      .replace('{actionItems}', data.actionItems)
      .replace('{nextMeeting}', data.nextMeeting)
      .replace('{preparedBy}', data.preparedBy);

    setFormattedMinutes(formatted);
  };

  const handleCopy = () => {
    if (formattedMinutes) {
      copyToClipboard(formattedMinutes);
      alert('Minutes copied to clipboard!');
    }
  };

  const handleDownloadPDF = () => {
    if (formattedMinutes) {
      exportTextAsPDF(
        formattedMinutes,
        `minutes_${new Date().toISOString().split('T')[0]}.pdf`,
        'MINUTES OF MEETING'
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FileText className="w-8 h-8 text-amber-600" />
          Meeting Notes Generator
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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rough Meeting Notes <span className="text-red-500">*</span>
          </label>
          <textarea
            value={roughNotes}
            onChange={(e) => setRoughNotes(e.target.value)}
            placeholder="Paste your rough meeting notes here. Include attendees, discussion points, decisions, and action items..."
            rows="8"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-2">
            💡 Tip: List one item per line for better formatting. Include keywords like "Action", "Decide", "TODO" for automatic extraction.
          </p>
        </div>

        <button
          onClick={handleGenerateMinutes}
          className="w-full px-6 py-3 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition"
        >
          Generate Minutes
        </button>
      </div>

      {/* Generated Minutes Preview */}
      {formattedMinutes && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Generated Minutes of Meeting</h3>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-4 max-h-96 overflow-y-auto whitespace-pre-wrap font-mono text-sm text-gray-800">
            {formattedMinutes}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium transition"
            >
              <Copy className="w-5 h-5" />
              Copy to Clipboard
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm text-gray-700">
            <p className="font-medium mb-2">Note:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Review the generated minutes for accuracy</li>
              <li>Add specific names and details before distributing</li>
              <li>Ensure all action items have clear owners and deadlines</li>
              <li>Share with all meeting attendees for confirmation</li>
            </ul>
          </div>
        </div>
      )}

      {/* Format Guide */}
      {!formattedMinutes && (
        <div className="bg-blue-50 rounded-lg shadow p-6 border border-blue-200">
          <h3 className="font-bold text-gray-800 mb-4">📝 How to Use</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <p className="font-medium">1. Enter rough meeting notes:</p>
              <p className="text-xs text-gray-600">Staff present: Sharma, Patel, Khan</p>
              <p className="text-xs text-gray-600">Discussed exam schedule and syllabus completion</p>
              <p className="text-xs text-gray-600">Action: Complete practical exams by March 31</p>
            </div>
            <div>
              <p className="font-medium">2. Click "Generate Minutes"</p>
            </div>
            <div>
              <p className="font-medium">3. Review the formatted output</p>
            </div>
            <div>
              <p className="font-medium">4. Copy or download as PDF</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
