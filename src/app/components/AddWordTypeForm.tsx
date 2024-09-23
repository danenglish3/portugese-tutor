'use client'; // Mark as a client component

import { useState, useTransition } from 'react';

interface AddWordTypeFormProps {
  onAdd: (type: string) => Promise<void>;
}

const AddWordTypeForm = ({ onAdd }: AddWordTypeFormProps) => {
  const [newWordType, setNewWordType] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await onAdd(newWordType);
      setNewWordType(''); // Clear input field after adding
      setIsModalOpen(false); // Close the modal after submission
    });
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add New
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Add New Word Type</h2>
            
            <form onSubmit={handleSubmit} className="mb-4">
              <input
                type="text"
                value={newWordType}
                onChange={(e) => setNewWordType(e.target.value)}
                placeholder="Enter new word type"
                className="p-2 border rounded w-full"
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
                  {isPending ? 'Adding...' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddWordTypeForm;
