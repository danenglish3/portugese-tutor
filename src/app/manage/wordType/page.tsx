"use server"

import { getWordTypes } from "@/api/wordType";
import WordType from "./WordType";

const ManageWordType = async (): Promise<React.JSX.Element> => {
  const wordTypes = await getWordTypes(); // Fetch word types from the API

  return (
    <WordType wordTypes={wordTypes} />
  );
};

export default ManageWordType;
