import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import { BookOpen } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role || !name || !email) {
      alert('Please fill in all fields');
      return;
    }

    const userData = { name, email, id: Date.now() };
    login(userData, role, schoolCode);

    // Navigate based on role
    if (role === 'student' || role === 'guardian') {
      navigate('/student');
    } else if (role === 'teacher') {
      navigate('/teacher');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <BookOpen className="w-12 h-12 text-teal-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Sarathi AI</h1>
        </div>

        <p className="text-center text-gray-600 mb-8">
          Welcome to your intelligent learning companion
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Your Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Choose a role...</option>
              <option value="student">Student</option>
              <option value="guardian">Guardian</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              School Code (Optional)
            </label>
            <input
              type="text"
              value={schoolCode}
              onChange={(e) => setSchoolCode(e.target.value.toUpperCase())}
              placeholder="e.g., RBSE001"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Teachers & students from same school can share homework and assignments
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition"
          >
            Continue
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          For RBSE Class 11-12 students & Rajasthan government school teachers
        </p>
      </div>
    </div>
  );
}
