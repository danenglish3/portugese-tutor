import { useState, useEffect } from 'react';

interface WordFormProps {
  wordTypes: { id: number; type: string }[];
  wordTypeCategories: { id: number; category: string; wordtypeId: number }[];
  onSubmit: (data: any) => void;
  initialData?: {
    original?: string;
    translation?: string;
    description?: string;
    wordtypeId?: number;
    wordtypecategoryId?: number;
  };
}

export default function WordForm({ wordTypes, onSubmit, initialData, wordTypeCategories }: WordFormProps) {
  const [original, setOriginal] = useState(initialData?.original || '');
  const [translation, setTranslation] = useState(initialData?.translation || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [wordTypeId, setWordTypeId] = useState<number | undefined>(initialData?.wordtypeId);
  const [wordTypeCategoryId, setWordTypeCategoryId] = useState<number | undefined>(initialData?.wordtypecategoryId);

  const [categories, setCategories] = useState<any[]>(wordTypeCategories);

  useEffect(() => {
    if (wordTypeId) {
      const selectedType = wordTypes.find((type) => type.id === wordTypeId);
      setCategories(wordTypeCategories.filter((a) => a.wordtypeId === selectedType?.id));
    } else {
      setCategories([]);
    }
  }, [wordTypeId, wordTypes, wordTypeCategories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordTypeId) {
      return;
    }

    if (!wordTypeCategoryId && wordTypeCategories.filter((a) => a.wordtypeId === wordTypeId).length > 0) {
      return;
    }

    onSubmit({
      original,
      translation,
      description,
      wordtypeId: wordTypeId,
      wordtypecategoryId: wordTypeCategoryId,
    });
  };

  // Logic to clear the form
  const handleClear = () => {
    setOriginal('');
    setTranslation('');
    setDescription('');
    setWordTypeId(undefined);
    setWordTypeCategoryId(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="mb-4">
        <label>Word Type</label>
        <select
          value={wordTypeId || ''}
          onChange={(e) => setWordTypeId(Number(e.target.value))}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Word Type</option>
          {wordTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.type}
            </option>
          ))}
        </select>
      </div>

      {categories.length > 0 && (
        <div className="mb-4">
          <label>Word Type Category</label>
          <select
            value={wordTypeCategoryId || ''}
            onChange={(e) => setWordTypeCategoryId(Number(e.target.value))}
            className="border p-2 w-full"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label>Original Word</label>
        <input
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label>Translation</label>
        <input
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label>Description (Optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className='my-4'>
        <p className='text-bold text-2xl'>ç  á  é  í  ó  ú  â  ê  ô  ã  õ</p>
      </div>

      <div className="flex items-center justify-between">
        <button type="button" onClick={handleClear} className="text-blue-500 underline">
          Clear
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-4">
          Submit
        </button>
      </div>
    </form>
  );
}
