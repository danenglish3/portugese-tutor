"use server"

import { getWordTypeCategories } from '@/api/WordTypeCategory';
import ManageWordTypeCategory from './ManageWordTypeCategory';
import { getWordTypes } from '@/api/wordType';

const ManageWordTypeCategories = async (): Promise<React.JSX.Element> => {
  const wordTypeCategories = await getWordTypeCategories(); // Fetch word type categories
  const wordTypes = await getWordTypes(); // Fetch word type categories

  return (
    <div>
        <ManageWordTypeCategory 
          categories={wordTypeCategories} 
          wordTypes={wordTypes}  
        />
    </div>
  );
};

export default ManageWordTypeCategories;
