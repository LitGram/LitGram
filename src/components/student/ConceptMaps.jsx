import React, { useState } from 'react';
import { Layers, Plus, Trash2, Edit2, Download, Share2, Eye, ZoomIn, ZoomOut } from 'lucide-react';

export default function ConceptMaps() {
  const [maps, setMaps] = useState([
    {
      id: 1,
      title: 'Photosynthesis Process',
      subject: 'Biology',
      chapter: 'Plant Physiology',
      nodes: [
        { id: 'root', label: 'Photosynthesis', x: 50, y: 20 },
        { id: 'light', label: 'Light Reactions', x: 20, y: 50 },
        { id: 'dark', label: 'Dark Reactions', x: 80, y: 50 },
        { id: 'atp', label: 'ATP + NADPH', x: 15, y: 80 },
        { id: 'co2', label: 'CO₂ Fixation', x: 75, y: 80 },
        { id: 'glucose', label: 'Glucose', x: 50, y: 95 },
      ],
      links: [
        { source: 'root', target: 'light' },
        { source: 'root', target: 'dark' },
        { source: 'light', target: 'atp' },
        { source: 'atp', target: 'glucose' },
        { source: 'dark', target: 'co2' },
        { source: 'co2', target: 'glucose' },
      ],
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 2,
      title: 'Atomic Structure',
      subject: 'Chemistry',
      chapter: 'Atomic Models',
      nodes: [
        { id: 'atom', label: 'Atom', x: 50, y: 15 },
        { id: 'nucleus', label: 'Nucleus', x: 30, y: 45 },
        { id: 'electrons', label: 'Electrons', x: 70, y: 45 },
        { id: 'protons', label: 'Protons', x: 15, y: 70 },
        { id: 'neutrons', label: 'Neutrons', x: 45, y: 70 },
        { id: 'orbitals', label: 'Orbitals', x: 70, y: 70 },
      ],
      links: [
        { source: 'atom', target: 'nucleus' },
        { source: 'atom', target: 'electrons' },
        { source: 'nucleus', target: 'protons' },
        { source: 'nucleus', target: 'neutrons' },
        { source: 'electrons', target: 'orbitals' },
      ],
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  ]);

  const [selectedMap, setSelectedMap] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [editMode, setEditMode] = useState(false);
  const [newNodeLabel, setNewNodeLabel] = useState('');

  const handleCreateNewMap = () => {
    const newMap = {
      id: Date.now(),
      title: 'New Concept Map',
      subject: 'Select Subject',
      chapter: 'Select Chapter',
      nodes: [{ id: 'start', label: 'Main Concept', x: 50, y: 50 }],
      links: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setMaps([...maps, newMap]);
    setSelectedMap(newMap);
    setEditMode(true);
  };

  const handleAddNode = () => {
    if (!selectedMap || !newNodeLabel.trim()) return;

    const newNode = {
      id: `node-${Date.now()}`,
      label: newNodeLabel,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    };

    const updatedMap = {
      ...selectedMap,
      nodes: [...selectedMap.nodes, newNode],
      updatedAt: new Date(),
    };

    setMaps(maps.map(m => m.id === selectedMap.id ? updatedMap : m));
    setSelectedMap(updatedMap);
    setNewNodeLabel('');
  };

  const handleDeleteMap = (id) => {
    setMaps(maps.filter(m => m.id !== id));
    if (selectedMap?.id === id) {
      setSelectedMap(null);
    }
  };

  const handleDeleteNode = (nodeId) => {
    if (!selectedMap) return;

    const updatedMap = {
      ...selectedMap,
      nodes: selectedMap.nodes.filter(n => n.id !== nodeId),
      links: selectedMap.links.filter(l => l.source !== nodeId && l.target !== nodeId),
      updatedAt: new Date(),
    };

    setMaps(maps.map(m => m.id === selectedMap.id ? updatedMap : m));
    setSelectedMap(updatedMap);
  };

  const handleDownloadMap = (mapId) => {
    alert(`Downloading concept map ${mapId} as PNG`);
  };

  const handleShareMap = (mapId) => {
    alert('Share link copied to clipboard!');
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (selectedMap) {
    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="bg-white rounded-lg shadow p-6">
          <button
            onClick={() => {
              setSelectedMap(null);
              setEditMode(false);
            }}
            className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
          >
            ← Back
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedMap.title}</h2>
              <p className="text-gray-600">
                {selectedMap.subject} • {selectedMap.chapter}
              </p>
            </div>
            <div className="flex gap-2">
              {editMode && (
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Done Editing
                </button>
              )}
              {!editMode && (
                <>
                  <button
                    onClick={() => handleDownloadMap(selectedMap.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => handleShareMap(selectedMap.id)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Map Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm mb-1">Concepts</p>
            <p className="text-2xl font-bold text-gray-800">{selectedMap.nodes.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm mb-1">Relationships</p>
            <p className="text-2xl font-bold text-gray-800">{selectedMap.links.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm mb-1">Created</p>
            <p className="text-sm font-bold text-gray-800">{getTimeAgo(selectedMap.createdAt)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm mb-1">Updated</p>
            <p className="text-sm font-bold text-gray-800">{getTimeAgo(selectedMap.updatedAt)}</p>
          </div>
        </div>

        {/* Canvas with Zoom */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Concept Map Visualization</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-3 py-2 bg-gray-100 rounded text-sm font-medium">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 10))}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas SVG */}
          <div className="border border-gray-300 rounded-lg bg-gray-50 overflow-auto" style={{ height: '400px' }}>
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${800 / (zoom / 100)} ${600 / (zoom / 100)}`}
              style={{ minWidth: '100%', minHeight: '100%' }}
            >
              {/* Links */}
              {selectedMap.links.map((link, idx) => {
                const sourceNode = selectedMap.nodes.find(n => n.id === link.source);
                const targetNode = selectedMap.nodes.find(n => n.id === link.target);
                if (!sourceNode || !targetNode) return null;
                return (
                  <line
                    key={idx}
                    x1={(sourceNode.x / 100) * 800}
                    y1={(sourceNode.y / 100) * 600}
                    x2={(targetNode.x / 100) * 800}
                    y2={(targetNode.y / 100) * 600}
                    stroke="#999"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                );
              })}
              {/* Arrow marker */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#999" />
                </marker>
              </defs>
              {/* Nodes */}
              {selectedMap.nodes.map(node => (
                <g key={node.id}>
                  <circle
                    cx={(node.x / 100) * 800}
                    cy={(node.y / 100) * 600}
                    r="40"
                    fill="#3B82F6"
                    opacity="0.8"
                  />
                  <text
                    x={(node.x / 100) * 800}
                    y={(node.y / 100) * 600}
                    textAnchor="middle"
                    dy="0.3em"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {node.label.length > 12 ? node.label.substring(0, 12) + '...' : node.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Edit Panel */}
        {editMode && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-gray-800 mb-4">Add Concept</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter concept name..."
                value={newNodeLabel}
                onChange={(e) => setNewNodeLabel(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddNode}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {/* Nodes List */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-3">Concepts in Map</h4>
              <div className="space-y-2">
                {selectedMap.nodes.map(node => (
                  <div key={node.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-800">{node.label}</span>
                    <button
                      onClick={() => handleDeleteNode(node.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Concepts List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-gray-800 mb-4">Concepts</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {selectedMap.nodes.map(node => (
              <div key={node.id} className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <p className="font-medium text-blue-900">{node.label}</p>
              </div>
            ))}
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
          <Layers className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Concept Maps</h2>
        </div>
        <p className="text-gray-600">Visualize and organize concepts and their relationships</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Total Maps</p>
          <p className="text-2xl font-bold text-gray-800">{maps.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Total Concepts</p>
          <p className="text-2xl font-bold text-gray-800">{maps.reduce((sum, m) => sum + m.nodes.length, 0)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Subjects Covered</p>
          <p className="text-2xl font-bold text-gray-800">{new Set(maps.map(m => m.subject)).size}</p>
        </div>
      </div>

      {/* Create New Map Button */}
      <button
        onClick={handleCreateNewMap}
        className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-lg font-semibold"
      >
        <Plus className="w-6 h-6" />
        Create New Concept Map
      </button>

      {/* Maps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {maps.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow p-8 text-center">
            <Layers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No concept maps yet</p>
            <button
              onClick={handleCreateNewMap}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Create Your First Map
            </button>
          </div>
        ) : (
          maps.map(map => (
            <div key={map.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{map.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{map.subject} • {map.chapter}</p>
                <div className="space-y-2 mb-4 text-sm text-gray-600 pb-4 border-b border-gray-200">
                  <p>📊 {map.nodes.length} concepts</p>
                  <p>🔗 {map.links.length} relationships</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedMap(map)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteMap(map.id)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
