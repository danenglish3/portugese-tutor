interface WordFilterProps {
    wordTypes: { id: number; type: string; }[];
    selectedWordType: number | undefined;
    selectedCategory: number | undefined;
    onFilterChange: (type: number | undefined, category: number | undefined) => void;
  }
  
  export default function WordFilter({
    wordTypes,
    selectedWordType,
    selectedCategory,
    onFilterChange,
  }: WordFilterProps) {
    const handleTypeChange = (typeId: number) => {
      onFilterChange(typeId, undefined); // Reset category when changing word type
    };
  
    const handleCategoryChange = (categoryId: number) => {
      onFilterChange(selectedWordType, categoryId);
    };
  
    return (
      <div className="mb-4">
        <div className="mb-4">
          <h2 className="mt-4 text-lg font-bold">Word Type</h2>
          <select
            value={selectedWordType || ''}
            onChange={(e) => handleTypeChange(Number(e.target.value))}
            className="border p-2 w-full"
          >
            <option value="">Select Word Type</option>
            {wordTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
  