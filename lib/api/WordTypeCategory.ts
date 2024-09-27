'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getWordTypeCategories() {
  try {
    const wordTypeCategories = await prisma.wordTypeCategory.findMany();
    return wordTypeCategories;
  } catch (error) {
    throw new Error('Error fetching word type categories');
  }
}

export async function getWordTypeCategoryById(id: number) {
  try {
    const wordTypeCategory = await prisma.wordTypeCategory.findUnique({
      where: { id },
    });
    return wordTypeCategory;
  } catch (error) {
    throw new Error(`Error fetching word type category with ID ${id}`);
  }
}

export async function createWordTypeCategory(category: string) {
  try {
    return await prisma.wordTypeCategory.create({
      data: { category },
    });
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target === 'category') {
      throw new Error(`WordTypeCategory '${category}' already exists.`);
    }
    throw new Error('Error creating word type category.');
  }
}

export async function updateWordTypeCategory(id: number, category: string) {
  try {
    const updatedWordTypeCategory = await prisma.wordTypeCategory.update({
      where: { id },
      data: { category },
    });
    return updatedWordTypeCategory;
  } catch (error) {
    throw new Error(`Error updating word type category with ID ${id}`);
  }
}

export async function deleteWordTypeCategory(id: number) {
  try {
    await prisma.wordTypeCategory.delete({
      where: { id },
    });
    return { message: `Word type category with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Error deleting word type category with ID ${id}`);
  }
}
