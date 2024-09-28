import { useState } from 'react';
import ChevronUpSVG from '../icons/ChevronUpSVG';
import ChevronDownSVG from '../icons/ChevronDownSVG';

interface Word {
  id: number;
  original: string;
  translation: string;
  wordtypeId: number;
  wordtypecategoryId?: number;
}

interface WordListProps {
  words: Word[];
  wordTypes: { id: number; type: string }[];
  onDelete: (id: number) => void;
  onEdit: (word: Word) => void;
}

export default function WordList({ words, wordTypes, onDelete, onEdit }: WordListProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    // Show confirmation dialog before deleting
    const isConfirmed = window.confirm('Are you sure you want to delete this word?');
    if (isConfirmed) {
      onDelete(id);
    }
  };

  const handleEdit = (word: Word) => {
    onEdit(word);
  };

  const toggleExpandCard = (id: number) => {
    setExpandedCard((prev) => (prev === id ? null : id)); // Toggle the card between expanded and collapsed
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {words.map((word) => {
        const wordType = wordTypes.find((type) => type.id === word.wordtypeId);

        return (
          <div
            key={word.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow relative"
          >
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpandCard(word.id)}>
              {/* Collapsed View: Show only original and translation */}
              <div>
                <h3 className="font-semibold text-lg">{word.original}</h3>
                <p className="text-gray-600">{word.translation}</p>
              </div>

              {/* Chevron for expand/collapse */}
              <div className="text-gray-500">
                {expandedCard === word.id ? (
                  <ChevronUpSVG className="w-6 h-6" />
                ) : (
                  <ChevronDownSVG className="w-6 h-6" />
                )}
              </div>
            </div>

            {/* Expanded section */}
            {expandedCard === word.id && (
              <div className="mt-4">
                <p className="text-sm text-gray-700">
                  <strong>Word Type:</strong> {wordType?.type || 'N/A'}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Category:</strong> {word.wordtypecategoryId || 'N/A'}
                </p>

                <div className="flex space-x-2 mt-4">
                  <button onClick={() => handleEdit(word)} className="text-blue-500">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(word.id)} className="text-red-500">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
