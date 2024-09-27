'use client'; // Mark as a client component

import { useState, useTransition, useEffect } from 'react';
import PencilSVG from './icons/Pencil';

interface WordTypeCategoryFormProps {
  onSubmit: (category: string, wordTypeId: number) => Promise<void>; 
  initialCategory?: string;
  mode: 'add' | 'edit'; 
  wordTypes: any[];
}

const WordTypeCategoryForm = ({ onSubmit, initialCategory = '', mode, wordTypes }: WordTypeCategoryFormProps) => {
  const [category, setCategory] = useState(initialCategory);
  const [types, setTypes] = useState(wordTypes);
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCategory(initialCategory); 
  }, [initialCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedTypeId == null) {
      return;
    }

    startTransition(async () => {
      await onSubmit(category, selectedTypeId);
      setCategory(''); 
      setIsModalOpen(false);
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
              <label>Type: </label>
              <select
                className="mb-4"
                onChange={(e) => setSelectedTypeId(Number(e.target.value))}
              >
                <option value="">Select a type</option>
                {types?.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.type}
                  </option>
                ))}
              </select>
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
