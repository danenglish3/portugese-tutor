'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getWordTypes() {
  try {
    const wordTypes = await prisma.wordType.findMany();
    return wordTypes;
  } catch (error) {
    throw new Error('Error fetching word types');
  }
}

export async function getWordTypeById(id: number) {
  try {
    const wordType = await prisma.wordType.findUnique({
      where: { id },
    });
    return wordType;
  } catch (error) {
    throw new Error(`Error fetching word type with ID ${id}`);
  }
}
export async function createWordType(type: string) {
    try {
      return await prisma.wordType.create({
        data: { type },
      });
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target === 'type') {
        throw new Error(`WordType '${type}' already exists.`);
      }
      throw new Error('Error creating word type.');
    }
  }
export async function updateWordType(id: number, type: string) {
  try {
    const updatedWordType = await prisma.wordType.update({
      where: { id },
      data: { type },
    });
    return updatedWordType;
  } catch (error) {
    throw new Error(`Error updating word type with ID ${id}`);
  }
}

export async function deleteWordType(id: number) {
  try {
    await prisma.wordType.delete({
      where: { id },
    });
    return { message: `Word type with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Error deleting word type with ID ${id}`);
  }
}
