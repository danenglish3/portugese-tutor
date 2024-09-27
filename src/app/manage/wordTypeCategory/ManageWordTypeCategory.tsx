"use client"

import WordTypeTable from '@/components/WordTypeTable'; // Import the dynamic table component
import { createWordTypeCategory, deleteWordTypeCategory } from '@/api/WordTypeCategory'; // Import necessary API functions
import Link from 'next/link';
import WordTypeForm from "@/components/WordTypeForm"; // Import WordTypeForm
import { useState } from "react";

interface ManageWordTypeCategoryProps {
  mode: 'wordType' | 'wordTypeCategory'; // Add mode prop
}

const ManageWordTypeCategory = ({ mode }: ManageWordTypeCategoryProps) => {
  const [selectedWordType, setSelectedWordType] = useState<any | null>(null); // For editing
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [wordTypes, setWordTypes] = useState<any[]>([]); // Local state for word types

  const handleAddWordType = async (type: string) => {
    // Logic to add a new word type
    const newWordType = { id: wordTypes.length + 1, type }; // Example logic for new word type
    setWordTypes((prev) => [...prev, newWordType]); // Update state
  };

  const handleEditWordType = (wordType: any) => {
    setSelectedWordType(wordType); // Set the selected word type for editing
    setIsModalOpen(true); // Open the modal
  };

  const handleDeleteWordType = async (id: string) => {
    // Logic to delete a word type
    setWordTypes((prev) => prev.filter((wt) => wt.id !== id)); // Update state
  };

  return (
    <>
      <Link
        href="/manage" 
        className="mb-4 text-blue-500">Back</Link>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {mode === 'wordType' ? 'Manage Word Types' : 'Manage Word Type Categories'}
      </h1>

      {/* Button to open the form modal */}
      <button
        onClick={() => {
          setSelectedWordType(null); // Clear selection for adding
          setIsModalOpen(true); // Open modal
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add New {mode === 'wordType' ? 'Word Type' : 'Category'}
      </button>

      {/* Word Type Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">{mode === 'wordType' ? 'Type' : 'Category'}</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wordTypes.length > 0 ? (
            wordTypes.map((wordType) => (
              <tr key={wordType.id}>
                <td className="border px-4 py-2">{wordType.id}</td>
                <td className="border px-4 py-2">{wordType.type}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditWordType(wordType)} // Open edit modal
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteWordType(wordType.id)} // Handle delete
                    className="text-red-500 hover:text-red-600 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">No {mode === 'wordType' ? 'Word Types' : 'Categories'} Found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Word Type Form Modal */}
      {isModalOpen && (
        <WordTypeForm
          onSubmit={handleAddWordType}
          onDelete={handleDeleteWordType}
          initialType={selectedWordType ? selectedWordType.type : ''}
          mode={selectedWordType ? 'edit' : 'add'}
          id={selectedWordType ? selectedWordType.id : undefined}
        />
      )}
    </>
  );
};

export default ManageWordTypeCategory;
