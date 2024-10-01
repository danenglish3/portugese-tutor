"use client";

import React, { useState } from "react";

type FlashcardProps = {
  original: string;
  translation: string;
};

const Flashcard: React.FC<FlashcardProps> = ({ original, translation }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      {/* Flashcard container with 3D flip effect */}
      <div
        className="relative w-64 h-40 perspective"
        onClick={handleFlip}
      >
        <div
          className={`w-full h-full transition-transform duration-700 transform-style preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front side of the flashcard */}
          <div className="absolute w-full h-full bg-white shadow-lg rounded-xl flex items-center justify-center text-2xl font-semibold text-gray-800 backface-hidden">
            {translation}
          </div>

          {/* Back side of the flashcard */}
          <div className="absolute w-full h-full bg-blue-500 shadow-lg rounded-xl flex items-center justify-center text-2xl font-semibold text-white backface-hidden transform rotate-y-180">
            {original}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
