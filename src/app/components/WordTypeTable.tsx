'use client';

import { useState } from "react";
import WordTypeForm from "@/components/WordTypeForm"; // Reusable form for add/edit
import PencilSVG from "./icons/Pencil";

interface WordTypeTableProps {
  wordTypes: any[]; // List of word types
  onAdd: (type: string) => Promise<void>; // Server action for adding
  onDelete: (id: number) => Promise<void>; // Server action for deleting
}

const WordTypeTable = ({ wordTypes: initialWordTypes, onAdd, onDelete }: WordTypeTableProps) => {
  const [wordTypes, setWordTypes] = useState(initialWordTypes); // Local state for word types
  const [selectedWordType, setSelectedWordType] = useState<any | null>(null); // For editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal state for edit

  // Function to open the edit modal
  const openEditModal = (wordType: any) => {
    setSelectedWordType(wordType);
    setIsEditModalOpen(true);
  };

  // Function to handle closing the edit modal
  const closeEditModal = () => {
    setSelectedWordType(null);
    setIsEditModalOpen(false);
  };

  // Function to handle adding a word type
  const handleAddWordType = async (type: string) => {
    await onAdd(type);
    setWordTypes((prev) => [...prev, { id: prev.length + 1, type }]); // Append the new word type
  };

  // Function to handle deleting a word type
  const handleDeleteWordType = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this word type?');
    if (confirmDelete && selectedWordType) {
      await onDelete(selectedWordType.id); // Call delete function
      setWordTypes((prev) => prev.filter((wt) => wt.id !== selectedWordType.id)); // Remove from state
      closeEditModal(); // Close modal after deletion
    }
  };

  return (
    <div>
      <div className="mb-4 float-right">
        <WordTypeForm onSubmit={handleAddWordType} mode="add" /> {/* Form for adding */}
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {wordTypes.length > 0 ? (
            wordTypes.map((wordType: any) => (
              <tr key={wordType.id}>
                <td className="border px-4 py-2">{wordType.id}</td>
                <td className="border px-4 py-2">{wordType.type}
                <button
                    onClick={() => openEditModal(wordType)}
                    className="px-4 py-2 text-blue-500 rounded-md hover:text-blue-600 float-right"
                  >
                    <PencilSVG />
                  </button>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">No Word Types Found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditModalOpen && selectedWordType && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Edit Word Type</h2>

            <input
              type="text"
              value={selectedWordType.type}
              disabled
              className="p-2 border rounded w-full mb-4"
            />

            <div className="flex justify-between items-center">
              <button
                onClick={handleDeleteWordType}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={closeEditModal}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordTypeTable;
