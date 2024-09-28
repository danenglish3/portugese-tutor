'use server';

import { prismaHandler } from "../prismaHandler"; // Import the centralized handler

// Get all words
export async function getWords() {
    return await prismaHandler({
        model: 'word',
        action: 'findMany',
    });
}

// Get a word by ID
export async function getWordById(id: number) {
    return await prismaHandler({
        model: 'word',
        action: 'findUnique',
        args: { where: { id } },
    });
}

// Create a new word
export async function createWord(original: string, translation: string, description: string | null, wordtypeId: number, wordtypecategoryId: number | null) {
    return await prismaHandler({
        model: 'word',
        action: 'create',
        args: {
            data: {
                original,
                translation,
                description,
                wordtypeId,
                wordtypecategoryId,
            }
        }
    });
}

// Update an existing word
export async function updateWord(id: number, original: string, translation: string, description: string | null, wordtypeId: number, wordtypecategoryId: number | null) {
    return await prismaHandler({
        model: 'word',
        action: 'update',
        args: {
            where: { id },
            data: {
                original,
                translation,
                description,
                wordtypeId,
                wordtypecategoryId,
            }
        }
    });
}

// Delete a word by ID
export async function deleteWord(id: number) {
    return await prismaHandler({
        model: 'word',
        action: 'delete',
        args: { where: { id } },
    });
}

// Mark a word as studied
export async function markWordAsStudied(id: number, markedAsStudied: boolean) {
    return await prismaHandler({
        model: 'word',
        action: 'update',
        args: {
            where: { id },
            data: { markedAsStudied },
        }
    });
}
