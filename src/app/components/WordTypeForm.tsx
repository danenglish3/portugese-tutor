'use client'; // Mark as a client component

import { useState, useTransition, useEffect } from 'react';
import PencilSVG from './icons/Pencil';

interface WordTypeFormProps {
  onSubmit: (type: string) => Promise<void>;
  initialType?: string; 
  mode: 'add' | 'edit';
  id?: string; 
}

const WordTypeForm = ({ onSubmit, initialType = '', mode, id }: WordTypeFormProps) => {
  const [wordType, setWordType] = useState(initialType);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setWordType(initialType); 
  }, [initialType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await onSubmit(wordType);
      setWordType(''); 
      setIsModalOpen(false); 
    });
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className={mode === 'add' ? 'bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600' : ''}
      >
        {mode === 'add' ? 'Add New' : <PencilSVG />}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">
              {mode === 'add' ? 'Add New Word Type' : 'Edit Word Type'}
            </h2>

            <form onSubmit={handleSubmit} className="mb-4">
              <input
                type="text"
                value={wordType}
                onChange={(e) => setWordType(e.target.value)}
                placeholder="Enter word type"
                className="p-2 border rounded w-full"
                disabled={mode === 'edit'}
              />
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {isPending ? (mode === 'add' ? 'Adding...' : 'Updating...') : mode === 'add' ? 'Add' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordTypeForm;
