import React, { useState } from 'react';
import { Flame, Trophy, Target, Calendar, TrendingUp, Award, AlertCircle } from 'lucide-react';

export default function StreakTracker() {
  const [currentStreak, setCurrentStreak] = useState(12);
  const [longestStreak, setLongestStreak] = useState(28);
  const [totalDaysActive, setTotalDaysActive] = useState(45);
  const [streakData, setStreakData] = useState({
    jan: [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    feb: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  });

  const [goals, setGoals] = useState([
    { id: 1, name: 'Study Daily', target: 30, current: 12, progress: 40 },
    { id: 2, name: 'Complete 5 Mock Tests', target: 5, current: 3, progress: 60 },
    { id: 3, name: 'Review 10 Topics', target: 10, current: 7, progress: 70 },
    { id: 4, name: 'Score 80%+', target: 5, current: 2, progress: 40 },
  ]);

  const [badges, setBadges] = useState([
    { id: 1, name: 'Week Warrior', description: '7 day streak', unlocked: true, date: '2024-01-15' },
    { id: 2, name: 'Month Master', description: '30 day streak', unlocked: true, date: '2024-02-10' },
    { id: 3, name: 'Century Club', description: '100 questions solved', unlocked: false, progress: 75 },
    { id: 4, name: 'Test Ace', description: '5 tests completed', unlocked: true, date: '2024-02-05' },
    { id: 5, name: 'Knowledge Seeker', description: '10 topics mastered', unlocked: false, progress: 60 },
    { id: 6, name: 'Perfect Score', description: 'Score 100%', unlocked: false, progress: 0 },
  ]);

  const streakDays = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    active: streakData.jan[i] === 1,
  }));

  const updateGoalProgress = (goalId, increment) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId && goal.current < goal.target) {
        const newCurrent = goal.current + increment;
        return {
          ...goal,
          current: newCurrent,
          progress: Math.min((newCurrent / goal.target) * 100, 100),
        };
      }
      return goal;
    }));
  };

  const getStreakLevel = (streak) => {
    if (streak >= 30) return { level: 'Legendary', color: 'text-purple-600', bgColor: 'bg-purple-100' };
    if (streak >= 20) return { level: 'Excellent', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (streak >= 10) return { level: 'Great', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    if (streak >= 5) return { level: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'Starting', color: 'text-blue-600', bgColor: 'bg-blue-100' };
  };

  const streakLevel = getStreakLevel(currentStreak);
  const febDays = Array.from({ length: 16 }, (_, i) => ({
    day: i + 1,
    active: streakData.feb[i] === 1,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <Flame className="w-8 h-8 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-800">Streak Tracker</h2>
        </div>
        <p className="text-gray-600">Track your learning consistency and achieve your goals</p>
      </div>

      {/* Main Streak Card */}
      <div className={`${streakLevel.bgColor} rounded-lg shadow p-8 text-center`}>
        <div className="flex justify-center mb-4">
          <Flame className={`w-16 h-16 ${streakLevel.color}`} />
        </div>
        <p className={`text-sm font-semibold ${streakLevel.color} mb-2`}>{streakLevel.level}</p>
        <h3 className="text-4xl font-bold text-gray-800 mb-2">{currentStreak} Days</h3>
        <p className="text-gray-600 mb-4">Current Learning Streak</p>
        <button
          onClick={() => setCurrentStreak(currentStreak + 1)}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
        >
          Mark Today as Complete ✓
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Longest Streak</p>
              <p className="text-2xl font-bold text-gray-800">{longestStreak} days</p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-500 opacity-50" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Active Days</p>
              <p className="text-2xl font-bold text-gray-800">{totalDaysActive} days</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Consistency Rate</p>
              <p className="text-2xl font-bold text-gray-800">
                {Math.round((totalDaysActive / (45)) * 100)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Calendar Heatmap */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">January Activity</h3>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-semibold text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 mb-6">
          {streakDays.map((day, idx) => (
            <div
              key={idx}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-semibold transition ${
                day.active
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {day.day}
            </div>
          ))}
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-4 mt-6">February Activity</h3>
        <div className="grid grid-cols-7 gap-2">
          {febDays.map((day, idx) => (
            <div
              key={idx}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-semibold transition ${
                day.active
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {day.day}
            </div>
          ))}
        </div>
      </div>

      {/* Active Goals */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Active Goals
        </h3>
        <div className="space-y-4">
          {goals.map(goal => (
            <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-gray-800">{goal.name}</h4>
                <span className="text-sm font-bold text-gray-600">
                  {goal.current}/{goal.target}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">{Math.round(goal.progress)}% Complete</p>
                {goal.progress < 100 && (
                  <button
                    onClick={() => updateGoalProgress(goal.id, 1)}
                    className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    +1 Progress
                  </button>
                )}
                {goal.progress === 100 && (
                  <span className="text-xs font-bold text-green-600">✓ Completed!</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-600" />
          Achievements & Badges
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`p-4 rounded-lg border-2 text-center transition ${
                badge.unlocked
                  ? 'bg-yellow-50 border-yellow-300 shadow'
                  : 'bg-gray-50 border-gray-300'
              }`}
            >
              {badge.unlocked ? (
                <div className="text-3xl mb-2">🏆</div>
              ) : (
                <div className="text-3xl mb-2 opacity-50">🔒</div>
              )}
              <h4 className={`font-bold text-sm ${badge.unlocked ? 'text-gray-800' : 'text-gray-600'}`}>
                {badge.name}
              </h4>
              <p className={`text-xs ${badge.unlocked ? 'text-gray-700' : 'text-gray-500'}`}>
                {badge.description}
              </p>
              {badge.unlocked ? (
                <p className="text-xs text-green-600 font-semibold mt-2">✓ Unlocked</p>
              ) : (
                <div className="mt-2">
                  <div className="bg-gray-300 h-1 rounded-full mb-1">
                    <div
                      className="bg-blue-600 h-1 rounded-full"
                      style={{ width: `${badge.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600">{badge.progress}%</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <h3 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Streak Tips
        </h3>
        <ul className="space-y-2 text-orange-800 text-sm">
          <li>✓ Study a little bit every day to maintain your streak</li>
          <li>✓ Complete at least one quiz or practice problem daily</li>
          <li>✓ Set realistic daily goals to build momentum</li>
          <li>✓ Celebrate milestones - every streak is an achievement!</li>
          <li>✓ Use your longest streak as motivation for the next one</li>
        </ul>
      </div>
    </div>
  );
}
