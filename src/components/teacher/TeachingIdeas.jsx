import React, { useState } from 'react';
import { useToast } from '../Toast';
import { Lightbulb, Copy } from 'lucide-react';

export default function TeachingIdeas() {
  const toast = useToast();
  const [topic, setTopic] = useState('');
  const [className, setClassName] = useState('');
  const [resources, setResources] = useState('');
  const [ideas, setIdeas] = useState([]);

  const mockIdeas = [
    {
      title: 'Hands-on Demonstration',
      description: 'Use simple materials from the lab or classroom to demonstrate the concept physically. This helps students visualize abstract ideas.',
    },
    {
      title: 'Story-based Learning',
      description: 'Connect the topic to a real-world story or everyday example that students can relate to in rural India.',
    },
    {
      title: 'Group Activity',
      description: 'Divide students into groups and have them solve problems together. This encourages peer learning and discussion.',
    },
    {
      title: 'Blackboard Visualization',
      description: 'Draw diagrams, flowcharts, and visual representations on the board to help students understand complex concepts.',
    },
    {
      title: 'Quiz-based Engagement',
      description: 'Use quick quizzes or games to test understanding and keep students engaged in the lesson.',
    },
  ];

  const handleGenerateIdeas = () => {
    if (!topic || !className) {
      alert('Please fill in topic and class');
      return;
    }
    setIdeas(mockIdeas);
  };

  const handleCopyIdea = (idea) => {
    navigator.clipboard.writeText(`${idea.title}\n${idea.description}`);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Lightbulb className="w-8 h-8 text-yellow-600" />
          Teaching Ideas Generator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Photosynthesis, Gravity"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="e.g., 11-A"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Resources
            </label>
            <textarea
              value={resources}
              onChange={(e) => setResources(e.target.value)}
              placeholder="e.g., Blackboard only, Basic lab equipment, Projector"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateIdeas}
          className="mt-6 w-full bg-yellow-600 text-white py-2 rounded-lg font-medium hover:bg-yellow-700 transition"
        >
          Get Teaching Ideas
        </button>
      </div>

      {ideas.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Suggested Ideas for {topic}</h3>
          <div className="space-y-4">
            {ideas.map((idea, idx) => (
              <div key={idx} className="border border-yellow-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-800">{idea.title}</h4>
                  <button
                    onClick={() => handleCopyIdea(idea)}
                    className="text-yellow-600 hover:text-yellow-700"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-700">{idea.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
