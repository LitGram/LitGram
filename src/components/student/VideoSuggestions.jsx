import React, { useState } from 'react';
import { Play, Clock, TrendingUp, BookOpen, Filter, Search, Eye, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { useToast } from '../Toast';

export default function VideoSuggestions() {
  const toast = useToast();
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Newton\'s Laws of Motion Explained',
      subject: 'Physics',
      chapter: 'Newton\'s Laws',
      channel: 'Physics Academy',
      duration: 12,
      views: 245000,
      rating: 4.8,
      difficulty: 'Medium',
      relevance: 95,
      watched: true,
      liked: true,
      topics: ['Force', 'Motion', 'Acceleration'],
      thumbnail: '🎓',
    },
    {
      id: 2,
      title: 'Complete Guide to Integration',
      subject: 'Mathematics',
      chapter: 'Calculus',
      channel: 'Math Made Easy',
      duration: 28,
      views: 187000,
      rating: 4.7,
      difficulty: 'Hard',
      relevance: 92,
      watched: false,
      liked: false,
      topics: ['Integration', 'Calculus', 'Substitution'],
      thumbnail: '📐',
    },
    {
      id: 3,
      title: 'Electrochemistry Reactions Simplified',
      subject: 'Chemistry',
      chapter: 'Electrochemistry',
      channel: 'Chemistry Concepts',
      duration: 15,
      views: 156000,
      rating: 4.6,
      difficulty: 'Medium',
      relevance: 88,
      watched: false,
      liked: false,
      topics: ['Oxidation', 'Reduction', 'Electrochemistry'],
      thumbnail: '⚗️',
    },
    {
      id: 4,
      title: 'Photosynthesis: Light & Dark Reactions',
      subject: 'Biology',
      chapter: 'Plant Physiology',
      channel: 'BioLogical',
      duration: 22,
      views: 198000,
      rating: 4.9,
      difficulty: 'Hard',
      relevance: 90,
      watched: true,
      liked: true,
      topics: ['Photosynthesis', 'Light reactions', 'Calvin cycle'],
      thumbnail: '🌱',
    },
    {
      id: 5,
      title: 'Organic Reactions Masterclass',
      subject: 'Chemistry',
      chapter: 'Organic Chemistry',
      channel: 'Chemistry Concepts',
      duration: 35,
      views: 134000,
      rating: 4.5,
      difficulty: 'Hard',
      relevance: 85,
      watched: false,
      liked: false,
      topics: ['Substitution', 'Elimination', 'Nomenclature'],
      thumbnail: '🧪',
    },
  ]);

  const [filterSubject, setFilterSubject] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance', 'rating', 'duration'
  const [selectedVideo, setSelectedVideo] = useState(null);

  const subjects = ['all', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const filteredVideos = videos
    .filter(video => {
      const matchesSubject = filterSubject === 'all' || video.subject === filterSubject;
      const matchesDifficulty = filterDifficulty === 'all' || video.difficulty === filterDifficulty;
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            video.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            video.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSubject && matchesDifficulty && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'relevance') return b.relevance - a.relevance;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'duration') return a.duration - b.duration;
      return 0;
    });

  const handleToggleLike = (id) => {
    setVideos(videos.map(v => v.id === id ? { ...v, liked: !v.liked } : v));
  };

  const handleMarkWatched = (id) => {
    setVideos(videos.map(v => v.id === id ? { ...v, watched: !v.watched } : v));
  };

  const watchedCount = videos.filter(v => v.watched).length;
  const avgRating = (videos.reduce((sum, v) => sum + v.rating, 0) / videos.length).toFixed(1);
  const recommendedCount = videos.filter(v => v.relevance >= 85).length;

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'Easy') return 'bg-green-100 text-green-800';
    if (difficulty === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (selectedVideo) {
    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="bg-white rounded-lg shadow p-6">
          <button
            onClick={() => setSelectedVideo(null)}
            className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
          >
            ← Back
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedVideo.title}</h2>
              <p className="text-gray-600">{selectedVideo.channel}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleToggleLike(selectedVideo.id)}
                className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                  selectedVideo.liked
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                {selectedVideo.liked ? 'Liked' : 'Like'}
              </button>
              <button
                onClick={() => toast.success('Share link copied to clipboard!')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                aria-label="Share video"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Video Player Placeholder */}
        <div className="bg-gray-900 rounded-lg shadow overflow-hidden aspect-video flex items-center justify-center">
          <div className="text-center">
            <Play className="w-16 h-16 text-white mx-auto mb-4 opacity-50" />
            <p className="text-white text-lg">Video Player</p>
            <p className="text-gray-400 text-sm mt-2">{selectedVideo.duration} minutes</p>
          </div>
        </div>

        {/* Video Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm mb-1">Duration</p>
            <p className="text-2xl font-bold text-gray-800">{selectedVideo.duration} min</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm mb-1">Views</p>
            <p className="text-2xl font-bold text-gray-800">{(selectedVideo.views / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm mb-1">Rating</p>
            <p className="text-2xl font-bold text-yellow-600">⭐ {selectedVideo.rating}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm mb-1">Relevance</p>
            <p className="text-2xl font-bold text-green-600">{selectedVideo.relevance}%</p>
          </div>
        </div>

        {/* Topics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-gray-800 mb-4">Topics Covered</h3>
          <div className="flex flex-wrap gap-2">
            {selectedVideo.topics.map((topic, idx) => (
              <span key={idx} className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Video Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-gray-800 mb-4">About This Video</h3>
          <div className="space-y-3 text-gray-700">
            <p>📚 Subject: <span className="font-semibold">{selectedVideo.subject}</span></p>
            <p>📖 Chapter: <span className="font-semibold">{selectedVideo.chapter}</span></p>
            <p>🎯 Difficulty: <span className="font-semibold">{selectedVideo.difficulty}</span></p>
            <p>✨ Why Recommended: This video aligns with your current topics and learning pace</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-4">Next Steps</h3>
          <div className="space-y-2">
            <button
              onClick={() => handleMarkWatched(selectedVideo.id)}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 font-semibold"
            >
              <Eye className="w-5 h-5" />
              {selectedVideo.watched ? '✓ Watched' : 'Mark as Watched'}
            </button>
            <button
              onClick={() => toast.success('Added to your study playlist!')}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Add to Playlist
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <Play className="w-8 h-8 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-800">Video Suggestions</h2>
        </div>
        <p className="text-gray-600">Personalized video recommendations for your learning</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Total Videos</p>
          <p className="text-2xl font-bold text-gray-800">{videos.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Watched</p>
          <p className="text-2xl font-bold text-green-600">{watchedCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Avg Rating</p>
          <p className="text-2xl font-bold text-yellow-600">⭐ {avgRating}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Recommended</p>
          <p className="text-2xl font-bold text-blue-600">{recommendedCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Subject Filter */}
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {difficulties.map(diff => (
              <option key={diff} value={diff}>
                {diff === 'all' ? 'All Levels' : diff}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="relevance">Most Relevant</option>
            <option value="rating">Highest Rated</option>
            <option value="duration">Shortest First</option>
          </select>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow p-8 text-center">
            <Play className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No videos found matching your criteria</p>
          </div>
        ) : (
          filteredVideos.map(video => (
            <div key={video.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer group">
              {/* Thumbnail */}
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-6 text-center aspect-video flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 transition">
                <div className="text-4xl mb-2">{video.thumbnail}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVideo(video);
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition"
                >
                  <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition" />
                </button>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}m
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3
                  onClick={() => setSelectedVideo(video)}
                  className="font-bold text-gray-800 mb-2 line-clamp-2 hover:text-red-600 transition"
                >
                  {video.title}
                </h3>

                <div className="space-y-2 mb-3 text-sm text-gray-600">
                  <p>{video.channel}</p>
                  <p>{video.subject} • {video.chapter}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${getDifficultyColor(video.difficulty)}`}>
                    {video.difficulty}
                  </span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">
                    {video.relevance}% match
                  </span>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center py-2 border-t border-gray-200 text-xs text-gray-600">
                  <span>⭐ {video.rating}</span>
                  <span>👁️ {(video.views / 1000).toFixed(0)}K views</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleLike(video.id);
                    }}
                    className={`flex-1 px-2 py-2 text-sm rounded transition flex items-center justify-center gap-1 ${
                      video.liked
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    Like
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVideo(video);
                    }}
                    className="flex-1 px-2 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center justify-center gap-1"
                  >
                    <Play className="w-3 h-3" />
                    Play
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tips */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="font-semibold text-red-900 mb-3">💡 How to Use Video Suggestions</h3>
        <ul className="space-y-2 text-red-800 text-sm">
          <li>✓ Videos are recommended based on your current topics</li>
          <li>✓ Watch videos that match your difficulty level</li>
          <li>✓ Mark videos as watched to track your progress</li>
          <li>✓ Like videos you found helpful for personalized recommendations</li>
          <li>✓ Create playlists to organize videos by topic</li>
        </ul>
      </div>
    </div>
  );
}
