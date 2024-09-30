import { getWordTypeCategories } from '@/api/WordTypeCategory';
import HomePage from './components/pages/HomePage';
import { getWordTypes } from '@/api/wordType';

export default async function Home() {
  const wordtypes = await getWordTypes(); 
  const wordTypeCategories = await getWordTypeCategories();

  return (
    <HomePage 
      categories={wordtypes}
      wordtypeCategories={wordTypeCategories}
    />
  );
}
