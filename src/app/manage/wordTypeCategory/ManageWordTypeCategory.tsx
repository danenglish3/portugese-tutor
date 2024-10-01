"use client"

import WordTypeTable from '@/components/WordTypeTable'; // Import the dynamic table component
import Link from 'next/link';
import { useEffect, useState } from "react";
import WordTypeCategoryForm from '@/app/components/WordTypeCategoryForm';
import { useToast } from '@/app/components/toast/ToastContext';
import { createWordTypeCategory, deleteWordTypeCategory } from '@/api/WordTypeCategory';

interface ManageWordTypeCategoryProps {
  categories: any[];
  wordTypes: any[];
}

const ManageWordTypeCategory = (props: ManageWordTypeCategoryProps) => {
  const { showToast } = useToast();

  const [wordTypeCategories, setWordTypeCategories] = useState<any[]>(props.categories);
  const [wordTypes, setWordTypes] = useState<any[]>(props.wordTypes);

  const handleAddCategory = async (category: string, wordTypeId: number): Promise<void> => {
    try {
      const result = await createWordTypeCategory(category, wordTypeId);
      showToast(`Category '${category}' created successfully!`, 'success');
      setWordTypeCategories((prev) => [...prev, result]);
    } catch (error: any) {
      showToast(`An error occurred: ${error.message ?? ""}`, "error");
    }
  };

  const handleOnDelete = async (id: number): Promise<void> => {
    await deleteWordTypeCategory(id);
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Link href="/manage" className="mb-4 text-blue-500">Back</Link>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Word Type Categories</h1>

      <div className="mb-4 float-right">
        <WordTypeCategoryForm
          onSubmit={handleAddCategory}
          mode="add"
          wordTypes={wordTypes}
        />
      </div>

      <WordTypeTable
        wordTypes={wordTypeCategories}
        onDelete={handleOnDelete}
        type="wordTypeCategory"
      />
    </div>
  );
};

export default ManageWordTypeCategory;
