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
  const [isFlipped, setIsFlipped] = useState(false);

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

  const handlePreviousWord = () => {
    setShowTranslation(false);
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
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
      <div className="w-full h-1 bg-gray-200 rounded-full mt-4">
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
            isFlipped={isFlipped}
            onFlipChange={setIsFlipped}
          />
        </div>
      </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 w-full max-w-md justify-between">
        <button
          className="w-1/3 py-3 bg-gray-200 text-black rounded-md"
          onClick={handlePreviousWord}
        >
          Back
        </button>

        <button 
          className='w-1/4 text-black rounded-md border-black text-center flex justify-center items-center'
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <svg fill="#000000" height="24px" width="24px" viewBox="0 0 214.367 214.367" >
            <path d="M202.403,95.22c0,46.312-33.237,85.002-77.109,93.484v25.663l-69.76-40l69.76-40v23.494
              c27.176-7.87,47.109-32.964,47.109-62.642c0-35.962-29.258-65.22-65.22-65.22s-65.22,29.258-65.22,65.22
              c0,9.686,2.068,19.001,6.148,27.688l-27.154,12.754c-5.968-12.707-8.994-26.313-8.994-40.441C11.964,42.716,54.68,0,107.184,0
              S202.403,42.716,202.403,95.22z"/>
          </svg>
        </button>

        <button
          className="w-1/3 py-3 bg-blue-500 text-white rounded-md"
          onClick={handleNextWord}
        >
          Next
        </button>
      </div>
    </div>
  );
}
