import Link from 'next/link';

const Manage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage</h1>
      
      <div className="space-y-4 w-full max-w-xs">
        <Link href="/manage/wordType" className="block w-full text-center py-4 bg-white shadow rounded-lg text-lg text-gray-800 hover:bg-gray-200">
            Manage Word Types
        </Link>

        <Link href="/manage/wordTypeCategory" className="block w-full text-center py-4 bg-white shadow rounded-lg text-lg text-gray-800 hover:bg-gray-200">
            Manage Word Type Categories
        </Link>

        <Link href="/manage/words" className="block w-full text-center py-4 bg-white shadow rounded-lg text-lg text-gray-800 hover:bg-gray-200">
            Manage Words
        </Link>
      </div>
    </div>
  );
};

export default Manage;
