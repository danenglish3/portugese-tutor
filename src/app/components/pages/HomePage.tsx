"use client"

import { useState, useEffect } from 'react';

interface HomePageProps {
    categories: any[];
    wordtypeCategories: any[];
}

export default function HomePage(props: HomePageProps) {
    const { categories, wordtypeCategories } = props;

    console.log(wordtypeCategories)

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center w-full p-4">
        <button className="text-black text-2xl">
          &times;
        </button>
        <h1 className="text-center text-xl font-bold">Flashcards</h1>
        <div className="w-8" /> {/* Empty div for symmetry */}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-4 p-4 w-full max-w-md">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-md shadow-sm border border-gray-200"
          >
            <h2 className="text-lg font-semibold">{category.type}</h2>
            <p className="text-gray-500">{wordtypeCategories.filter(a => a.wordtypeId == category.id).map(a => a.category).join(", ")}</p>
          </div>
        ))}
      </div>

      {/* Start Button */}
      <div className="w-full p-4">
        <button className="w-full py-3 bg-blue-500 text-white rounded-md text-lg">
          Start
        </button>
      </div>
    </div>
  );
}
