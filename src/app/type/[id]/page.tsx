"use server"

import { getWordsForType } from '@/api/word';
import Type from './Type';

type Props = {
    params: { id: string };
};

export default async function TypePage({ params }: Props) {
    const { id } = params;

    const words = await getWordsForType(Number(id));

  return (
    <Type 
      initialWords={words ?? []}
    />
  );
}
