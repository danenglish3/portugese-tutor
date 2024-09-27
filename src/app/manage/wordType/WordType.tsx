"use client"

import { createWordType, deleteWordType } from "@/api/wordType";
import WordTypeForm from "@/app/components/WordTypeForm";
import WordTypeTable from "@/app/components/WordTypeTable";
import Link from "next/link";
import { useState } from "react";

interface WordTypeProps {
    wordTypes: any[];
  }

const WordType = (props: WordTypeProps) => {
    const [wordTypes, setWordTypes] = useState<any[]>(props.wordTypes); 

    const handleOnDelete = async (id: number): Promise<void> => {
      await deleteWordType(id);
      setWordTypes((prev) => prev.filter((wt) => wt.id !== id));
    }

    const handleAddType = async (type: string): Promise<void> => {
        const newType = await createWordType(type);
        console.log(newType)

        setWordTypes((prev) => [...prev, newType]);
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
        <Link 
          href="/manage" 
          className="mb-4 text-blue-500">Back</Link>
  
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Word Types</h1>
  
        <div className="mb-4 float-right">
            <WordTypeForm 
                onSubmit={handleAddType}
                mode="add"
            />
        </div>

        <WordTypeTable 
            wordTypes={wordTypes} 
            onDelete={handleOnDelete}
            type="wordType"
        />
      </div>
    )
}

export default WordType;
