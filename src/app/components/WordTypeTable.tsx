'use client';

import { useState } from "react";
import PencilSVG from "./icons/Pencil";

interface WordTypeTableProps {
  wordTypes: any[];
  onDelete: (id: number) => Promise<void>;
  type: 'wordType' | 'wordTypeCategory';
}

const WordTypeTable = ({ wordTypes: initialWordTypes, onDelete, type }: WordTypeTableProps) => {
  const [selectedWordType, setSelectedWordType] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  // Function to handle deleting a word type
  const handleDeleteWordType = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this word type?');
    if (confirmDelete && selectedWordType) {
      await onDelete(selectedWordType.id);
      closeEditModal();
    }
  };

  return (
    <div>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">{type === 'wordType' ? 'Type' : 'Category'}</th>
          </tr>
        </thead>
        <tbody>
          {initialWordTypes.length > 0 ? (
            initialWordTypes.map((wordType: any) => (
              <tr key={wordType.id}>
                <td className="border px-4 py-2">{wordType.id}</td>
                <td className="border px-4 py-2">{wordType.type || wordType.category} {/* Dynamic data */}
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
              <td colSpan={3} className="text-center py-4 text-gray-500">No {type === 'wordType' ? 'Word Types' : 'Categories'} Found</td> {/* Dynamic message */}
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditModalOpen && selectedWordType && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Edit {type === 'wordType' ? 'Word Type' : 'Category'}</h2> {/* Dynamic title */}

            <input
              type="text"
              value={selectedWordType.type || selectedWordType.category} // Dynamic input value
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
