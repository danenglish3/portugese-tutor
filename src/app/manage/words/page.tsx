"use server"

import { getWordTypes } from "@/api/wordType";
import Words from "./Words";
import { getWordTypeCategories } from "@/api/WordTypeCategory";
import { getWords } from "@/api/Word";

const ManageWordType = async (): Promise<React.JSX.Element> => {
  const wordTypes = await getWordTypes();
  const wordTypeCategories = await getWordTypeCategories();
  const words = await getWords();

  return (
    <Words 
      wordTypes={wordTypes}
      wordTypeCategories={wordTypeCategories}
      words={words}
    />
  );
};

export default ManageWordType;
