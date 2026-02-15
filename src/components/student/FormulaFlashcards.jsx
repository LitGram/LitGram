import React, { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, RotateCcw, Check, X } from 'lucide-react';
import { getAllFlashcardSets, searchFlashcards } from '../../data/flashcards';

export default function FormulaFlashcards() {
  const [phase, setPhase] = useState('select'); // 'select', 'study'
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState({});
  const [weakCards, setWeakCards] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const allDecks = getAllFlashcardSets();
  const filteredDecks = searchQuery
    ? searchFlashcards(searchQuery)
    : allDecks;

  const handleSelectDeck = (deck) => {
    setSelectedDeck(deck);
    setPhase('study');
    setCurrentCardIdx(0);
    setFlipped(false);
    setMasteredCards({});
    setWeakCards({});
  };

  const handleMarkMastered = () => {
    const card = selectedDeck.cards[currentCardIdx];
    setMasteredCards(prev => ({
      ...prev,
      [currentCardIdx]: true
    }));
    handleNextCard();
  };

  const handleMarkWeak = () => {
    const card = selectedDeck.cards[currentCardIdx];
    setWeakCards(prev => ({
      ...prev,
      [currentCardIdx]: true
    }));
    handleNextCard();
  };

  const handleNextCard = () => {
    if (currentCardIdx < selectedDeck.cards.length - 1) {
      setCurrentCardIdx(prev => prev + 1);
      setFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIdx > 0) {
      setCurrentCardIdx(prev => prev - 1);
      setFlipped(false);
    }
  };

  const handleRestartDeck = () => {
    setCurrentCardIdx(0);
    setFlipped(false);
    setMasteredCards({});
    setWeakCards({});
  };

  const handleBackToSelect = () => {
    setPhase('select');
    setSelectedDeck(null);
    setCurrentCardIdx(0);
    setFlipped(false);
  };

  const masteryPercent = selectedDeck
    ? (Object.keys(masteredCards).length / selectedDeck.cards.length) * 100
    : 0;

  if (phase === 'study' && selectedDeck) {
    const card = selectedDeck.cards[currentCardIdx];
    const cardKey = `${currentCardIdx}`;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedDeck.chapter}</h2>
              <p className="text-gray-600">{selectedDeck.subject} - Class {selectedDeck.class}</p>
            </div>
            <button
              onClick={handleBackToSelect}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Card {currentCardIdx + 1} of {selectedDeck.cards.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Object.keys(masteredCards).length} Mastered
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${masteryPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="bg-white rounded-lg shadow p-8 min-h-96 flex flex-col justify-center cursor-pointer" onClick={() => setFlipped(!flipped)}>
          <div className="perspective">
            <div className={`transition-all duration-300 ${flipped ? 'opacity-100' : 'opacity-100'}`}>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  {flipped ? 'ANSWER' : 'QUESTION'}
                </p>
                <p className="text-3xl md:text-4xl font-bold text-teal-600 mb-4">
                  {flipped ? card.back : card.front}
                </p>
                {flipped && card.latex && (
                  <div className="bg-gray-50 p-4 rounded mt-4 font-mono text-lg text-gray-800">
                    {card.latex}
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">Click card to reveal answer</p>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={handlePrevCard}
              disabled={currentCardIdx === 0}
              className="flex items-center gap-2 flex-1 px-4 py-3 bg-gray-400 text-white rounded-lg disabled:opacity-50 hover:bg-gray-500"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            <button
              onClick={handleNextCard}
              disabled={currentCardIdx === selectedDeck.cards.length - 1}
              className="flex items-center gap-2 flex-1 px-4 py-3 bg-gray-400 text-white rounded-lg disabled:opacity-50 hover:bg-gray-500"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleMarkWeak}
              className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
            >
              <X className="w-5 h-5" />
              Show Again
            </button>
            <button
              onClick={handleMarkMastered}
              className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
            >
              <Check className="w-5 h-5" />
              Got It!
            </button>
          </div>

          <button
            onClick={handleRestartDeck}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </button>
        </div>

        {/* Status */}
        {masteredCards[cardKey] && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
            <p className="text-green-800 font-medium">✓ You've marked this as mastered</p>
          </div>
        )}
        {weakCards[cardKey] && (
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 text-center">
            <p className="text-orange-800 font-medium">⚠ You've marked this to review again</p>
          </div>
        )}
      </div>
    );
  }

  // Selection phase
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-teal-600" />
          Formula Flashcards
        </h2>

        {/* Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by subject or chapter..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-6"
        />

        {/* Deck Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDecks.map((deck, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectDeck(deck)}
              className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition border-2 border-teal-300"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">{deck.chapter}</h3>
              <p className="text-sm text-gray-600 mb-4">{deck.subject} - Class {deck.class}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-teal-700">
                  {deck.cards.length} cards
                </span>
                <span className="text-2xl">🎴</span>
              </div>
            </div>
          ))}
        </div>

        {filteredDecks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No flashcard decks found. Try a different search.</p>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>How to use:</strong> Select a deck above to start studying. Flip cards to see answers, mark as "Got It!" when you've mastered a formula, or "Show Again" if you need more practice.
          </p>
        </div>
      </div>
    </div>
  );
}
