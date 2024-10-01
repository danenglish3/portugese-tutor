"use client"

import Flashcard from '@/app/components/Flashcard';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Props {
  initialWords: any[];
}

export default function Type(props: Props) {
  const { initialWords } = props;

  const [words, setWords] = useState<any[]>(props.initialWords);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  if (words.length === 0) {
    return <div>Loading...</div>;
  }

  const currentWord = words[currentWordIndex];

  const handleNextWord = () => {
    setShowTranslation(false);
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className='w-full h-full'>

      <div className="flex justify-between items-center w-full">
        <Link className="text-black text-2xl" href={"/"}>
          &times;
        </Link>
        <h1 className="text-center text-xl font-bold">flashcards</h1>
        <div className="w-8" /> {/* Empty div for symmetry */}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${((currentWordIndex + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* Word Display */}
      <div className="flex items-center justify-center my-8">
        <div className="flex items-center space-x-4">
          {/* Word */}

          <Flashcard 
            translation={currentWord.translation}
            original={currentWord.original}
          />
        </div>
      </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 w-full max-w-md">
        <button
          className="flex-1 py-3 bg-gray-200 text-black rounded-md"
          onClick={() => setShowTranslation(true)}
        >
          Show translation
        </button>
        <button
          className="flex-1 py-3 bg-blue-500 text-white rounded-md"
          onClick={handleNextWord}
        >
          I know this
        </button>
      </div>
    </div>
  );
}
