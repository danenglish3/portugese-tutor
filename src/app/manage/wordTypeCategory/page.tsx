"use server"

import { getWordTypeCategories } from '@/api/WordTypeCategory';
import ManageWordTypeCategory from './ManagewordTypeCategory';

const ManageWordTypeCategories = async (): Promise<React.JSX.Element> => {
  const wordTypeCategories = await getWordTypeCategories(); // Fetch word type categories

  return (
    <ManageWordTypeCategory wordTypeCategories={wordTypeCategories} /> // Pass data to the new component
  );
};

export default ManageWordTypeCategories;
