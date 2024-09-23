import AddWordTypeForm from "@/app/components/AddWordTypeForm";
import { createWordType, getWordTypes } from "@/api/wordType";

const ManageWordType = async () => {
  const wordTypes = await getWordTypes(); // Fetch word types from the API library

  // Function to handle creating a new word type (this is the server action)
  const handleAddWordType = async (type: string) => {
    'use server'; // This is a server action, running on the server
    await createWordType(type);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Word Types</h1>
      
      <div className="mb-4 float-right">
          <AddWordTypeForm onAdd={handleAddWordType} />
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {wordTypes.length > 0 ? (
            wordTypes.map((wordType: any) => (
              <tr key={wordType.id}>
                <td className="border px-4 py-2">{wordType.id}</td>
                <td className="border px-4 py-2">{wordType.type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center py-4 text-gray-500">No Word Types Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageWordType;
