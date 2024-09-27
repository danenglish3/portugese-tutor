'use server';

import { prismaHandler } from "../prismaHandler"; // Import the centralized handler

// Get all word type categories
export async function getWordTypeCategories() {
    return await prismaHandler({
        model: 'wordTypeCategory',
        action: 'findMany',
    });
}

// Get word type category by ID
export async function getWordTypeCategoryById(id: number) {
    return await prismaHandler({
        model: 'wordTypeCategory',
        action: 'findUnique',
        args: { where: { id } },
    });
}

// Create a new word type category
export async function createWordTypeCategory(category: string, wordtypeId: number) {
    return await prismaHandler({
        model: 'wordTypeCategory',
        action: 'create',
        args: {
            data: {
                category,
                wordtypeId,
            }
        }
    });
}

// Update an existing word type category
export async function updateWordTypeCategory(id: number, category: string) {
    return await prismaHandler({
        model: 'wordTypeCategory',
        action: 'update',
        args: {
            where: { id },
            data: { category }
        }
    });
}

// Delete a word type category by ID
export async function deleteWordTypeCategory(id: number) {
    return await prismaHandler({
        model: 'wordTypeCategory',
        action: 'delete',
        args: { where: { id } },
    });
}
