import React, { useEffect, useState } from 'react';
import { BookOpen, AlertCircle } from 'lucide-react';
import useAuthStore from '../../stores/authStore';
import { getHomeworkForSchool } from '../../services/homeworkService';
import { formatDate } from '../../utils/exportService';

export default function SchoolHomeworkInbox() {
  const schoolCode = useAuthStore((state) => state.schoolCode);
  const [homeworks, setHomeworks] = useState([]);

  useEffect(() => {
    setHomeworks(getHomeworkForSchool(schoolCode));
  }, [schoolCode]);

  const getDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          Homework Inbox
        </h2>
        <p className="text-gray-600">
          {schoolCode
            ? `Showing homework shared by teachers in school code: ${schoolCode}`
            : 'No school code found. Login with a school code to receive homework.'}
        </p>
      </div>

      {homeworks.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No homework available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {homeworks.map((homework) => {
            const daysLeft = getDaysUntilDue(homework.dueDate);
            const isOverdue = daysLeft < 0;

            return (
              <div key={homework.id} className="bg-white rounded-lg shadow p-5 border-l-4 border-indigo-500">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{homework.subject} - {homework.topic}</h3>
                    <p className="text-sm text-gray-600">Class: {homework.class}</p>
                  </div>
                  <span className="text-xs text-gray-500">Due: {formatDate(homework.dueDate)}</span>
                </div>

                <p className="text-sm text-gray-700 mb-3">{homework.description}</p>

                <div className="flex items-center gap-2">
                  <AlertCircle className={`w-4 h-4 ${isOverdue ? 'text-red-600' : 'text-blue-600'}`} />
                  <span className={`text-sm font-medium ${isOverdue ? 'text-red-600' : 'text-blue-600'}`}>
                    {isOverdue ? `Overdue by ${Math.abs(daysLeft)} days` : `Due in ${daysLeft} days`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
