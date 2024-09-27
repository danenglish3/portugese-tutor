'use client'; // Mark as a client component

import { useState, useTransition, useEffect } from 'react';
import PencilSVG from './icons/Pencil';

interface WordTypeCategoryFormProps {
  onSubmit: (category: string, wordTypeId: string) => Promise<void>; // Include wordTypeId for relation
  initialCategory?: string; // This will be passed for editing
  mode: 'add' | 'edit'; // Mode to differentiate between adding and editing
  wordTypeId: string; // ID of the related word type
}

const WordTypeCategoryForm = ({ onSubmit, initialCategory = '', mode, wordTypeId }: WordTypeCategoryFormProps) => {
  const [category, setCategory] = useState(initialCategory);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCategory(initialCategory); // Update category when initialCategory changes
  }, [initialCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await onSubmit(category, wordTypeId); // Pass wordTypeId with category
      setCategory(''); // Clear input field after submission
      setIsModalOpen(false); // Close the modal after submission
    });
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className={mode === 'add' ? 'bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600' : ''}
      >
        {mode === 'add' ? 'Add New Category' : <PencilSVG />}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">
              {mode === 'add' ? 'Add New Category' : 'Edit Category'}
            </h2>

            <form onSubmit={handleSubmit} className="mb-4">
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
                className="p-2 border rounded w-full"
                disabled={mode === 'edit'} // Disable input in edit mode
              />
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)} // Close modal on cancel
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {isPending ? (mode === 'add' ? 'Adding...' : 'Updating...') : mode === 'add' ? 'Add' : 'Close'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordTypeCategoryForm;
