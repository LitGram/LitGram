import React from 'react';
import { Trophy, TrendingDown, RotateCcw, Download } from 'lucide-react';
import { exportTextAsPDF } from '../../utils/exportService';

export default function TestResults({ results, config, onRetake }) {
  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-500' };
    if (percentage >= 70) return { grade: 'B+', color: 'text-blue-500' };
    if (percentage >= 60) return { grade: 'B', color: 'text-blue-400' };
    if (percentage >= 50) return { grade: 'C', color: 'text-orange-500' };
    return { grade: 'F', color: 'text-red-600' };
  };

  const gradeInfo = getGrade(parseFloat(results.percentage));

  const handleDownloadResults = () => {
    const resultText = `
MOCK TEST RESULTS REPORT
${new Date(results.timestamp).toLocaleDateString()}

Test Configuration:
- Subject: ${config.subject}
- Number of Questions: ${results.totalQuestions}
- Time Limit: ${config.timeLimit} minutes

PERFORMANCE SUMMARY:
Total Questions: ${results.totalQuestions}
Correct Answers: ${results.correctAnswers}
Wrong Answers: ${results.wrongAnswers}
Score Percentage: ${results.percentage}%
Grade: ${gradeInfo.grade}

${results.weakTopics.length > 0 ? `WEAK TOPICS (Areas for Improvement):
${results.weakTopics.map((topic, idx) => `${idx + 1}. ${topic[0]} - ${topic[1]} incorrect answers`).join('\n')}` : 'No weak topics identified!'}

ANALYSIS:
${parseFloat(results.percentage) >= 70
        ? 'Great job! You have demonstrated good understanding of the concepts. Continue your preparation and focus on the weak areas mentioned above.'
        : 'You need more practice. Focus on the weak topics mentioned above and try to strengthen your conceptual understanding. Attempt more mock tests to improve your performance.'}

Next Steps:
1. Review the weak topics identified above
2. Refer to your textbook for these topics
3. Practice more questions from these chapters
4. Attempt another mock test after revision
`;

    exportTextAsPDF(resultText, `mock_test_${config.subject}_${new Date().toISOString().split('T')[0]}.pdf`, 'MOCK TEST RESULTS');
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Test Complete!</h2>
            <p className="text-blue-100">{config.subject} - {results.totalQuestions} questions</p>
          </div>
          <Trophy className="w-12 h-12" />
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-500 bg-opacity-50 rounded-lg p-4">
            <p className="text-blue-100 text-sm mb-1">SCORE</p>
            <p className="text-4xl font-bold">{results.percentage}%</p>
          </div>
          <div className="bg-blue-500 bg-opacity-50 rounded-lg p-4">
            <p className="text-blue-100 text-sm mb-1">GRADE</p>
            <p className={`text-4xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</p>
          </div>
          <div className="bg-blue-500 bg-opacity-50 rounded-lg p-4">
            <p className="text-blue-100 text-sm mb-1">CORRECT</p>
            <p className="text-4xl font-bold">{results.correctAnswers}/{results.totalQuestions}</p>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <p className="text-green-600 text-4xl font-bold">{results.correctAnswers}</p>
            <p className="text-gray-600 mt-2">Correct Answers</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <p className="text-red-600 text-4xl font-bold">{results.wrongAnswers}</p>
            <p className="text-gray-600 mt-2">Wrong Answers</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <p className="text-blue-600 text-4xl font-bold">{config.timeLimit}</p>
            <p className="text-gray-600 mt-2">Minutes Available</p>
          </div>
        </div>
      </div>

      {/* Weak Topics */}
      {results.weakTopics.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-orange-600" />
            Areas for Improvement
          </h3>
          <div className="space-y-3">
            {results.weakTopics.map((topic, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{topic[0]}</p>
                  <p className="text-sm text-gray-600">{topic[1]} incorrect answer{topic[1] > 1 ? 's' : ''}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">{topic[1]}</p>
                  <p className="text-xs text-gray-600">mistakes</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-gray-700">
              <strong>Recommendation:</strong> Focus on these topics first. Review the concepts, practice related questions, and attempt another test after revision.
            </p>
          </div>
        </div>
      )}

      {/* Performance Message */}
      <div className={`rounded-lg shadow p-6 ${
        parseFloat(results.percentage) >= 70
          ? 'bg-green-50 border border-green-200'
          : 'bg-yellow-50 border border-yellow-200'
      }`}>
        <p className="text-gray-800 text-center">
          {parseFloat(results.percentage) >= 90
            ? '🎉 Outstanding! You have mastered these concepts. Try harder questions to further improve.'
            : parseFloat(results.percentage) >= 70
            ? '✓ Good performance! Continue with consistent practice and revision.'
            : '→ Keep practicing! More effort and focused study will help you improve.'}
        </p>
      </div>

      {/* Test History Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-medium text-gray-800 mb-3">Test Details</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Date: {new Date(results.timestamp).toLocaleString()}</p>
          <p>Subject: {config.subject}</p>
          <p>Questions: {results.totalQuestions}</p>
          <p>Time Limit: {config.timeLimit} minutes</p>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          This test result has been saved to your test history for future reference.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleDownloadResults}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium transition"
        >
          <Download className="w-5 h-5" />
          Download Results
        </button>
        <button
          onClick={onRetake}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition"
        >
          <RotateCcw className="w-5 h-5" />
          Take Another Test
        </button>
      </div>
    </div>
  );
}
