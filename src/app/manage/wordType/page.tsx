import { createWordType, getWordTypes, deleteWordType } from "@/api/wordType"; // Import server-side logic for fetching data
import WordTypeTable from "@/components/WordTypeTable"; // Client component for table and modal

// Server Component
const ManageWordType = async (): Promise<React.JSX.Element> => {
  const wordTypes = await getWordTypes(); // Fetch word types from the API

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Word Types</h1>

      {/* Pass server actions as props to the client component */}
      <WordTypeTable wordTypes={wordTypes} onAdd={createWordType} onDelete={deleteWordType} />
    </div>
  );
};

export default ManageWordType;
