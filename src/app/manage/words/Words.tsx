"use client"

import { createWord, deleteWord } from '@/api/word';
import Modal from '@/app/components/Modal';
import { useToast } from '@/app/components/toast/ToastContext';
import WordFilter from '@/app/components/words/WordFilter';
import WordForm from '@/app/components/words/WordForm';
import WordList from '@/app/components/words/WordList';
import Link from 'next/link';
import { useState } from 'react';

interface WordsProps {
  wordTypes: any[];
  wordTypeCategories: any[];
  words: any[];
}

const Words = (props: WordsProps) => {
  const { showToast } = useToast();

  const [words, setWords] = useState<any>([]);
  const [wordTypes, setWordTypes] = useState(props.wordTypes ?? []);
  const [wordTypeCategories, setWordTypeCategories] = useState(props.wordTypeCategories ?? []);
  const [filterType, setFilterType] = useState<number | undefined>(undefined);
  const [filterCategory, setFilterCategory] = useState<number | undefined>(undefined);
  const [editingWord, setEditingWord] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddModal = () => {
    setEditingWord(null); // Clear editing data to open as new word form
    setIsModalOpen(true); // Open modal to add a new word
  };

  const handleDeleteWord = async (id: number) => {
    // Handle word deletion
    try {
      await deleteWord(id);
      showToast(`Word deleted successfully!`, 'success');
      setWords((prev: any) => prev.filter((wt: any) => wt.id !== id));
    } catch (error: any) {
      showToast(`An error occurred: ${error.message ?? ""}`, "error");
    }
  };

  const handleEditWord = (word: any) => {
    setEditingWord(word);
  };

  const handleAddOrEditWord = async (data: any) => {
    if (editingWord) {
      // Handle word update
    } else {
      try {
        const result = await createWord(data.original, data.translation, data.description,
          data.wordtypeId, data.wordtypecategoryId
        );
        showToast(`Word '${result.original}' created successfully!`, 'success');
        setWords((prev: any) => [...prev, result]);
        setIsModalOpen(false);
      } catch (error: any) {
        showToast(`An error occurred: ${error.message ?? ""}`, "error");
      }
    }
    setEditingWord(null);
  };

  const handleFilterChange = (type: number | undefined, category: number | undefined) => {
    const wordForFilter = props.words.filter(a => a.wordtypeId == type);
    setWords(wordForFilter)
    setFilterType(type);
    setFilterCategory(category);
  };

  return (
    <div className='p-4 bg-gray-100 min-h-screen'>
      <Link href="/manage" className="mb-4 text-blue-500">Back</Link>
      <h1 className="text-xl font-bold mb-4">Word Management</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className={'bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'}
      >
        Add New
      </button>

      <WordFilter
        wordTypes={wordTypes}
        selectedWordType={filterType}
        selectedCategory={filterCategory}
        onFilterChange={handleFilterChange}
      />

      <WordList words={words} wordTypes={wordTypes} onDelete={handleDeleteWord} onEdit={handleEditWord} />

      { isModalOpen && 
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingWord ? 'Edit Word' : 'Add New Word'}
      >
        <WordForm
          wordTypes={wordTypes}
          wordTypeCategories={wordTypeCategories}
          onSubmit={handleAddOrEditWord}
          initialData={editingWord}
        />
      </Modal>
      }
    </div>
  );
}

export default Words;
