"use server"

import { PrismaClient } from '@prisma/client';
import { isPrismaError } from '../types/PrismaError';

const prisma = new PrismaClient();

interface PrismaAction {
    model: keyof PrismaClient;
    action: string;
    args?: any;
}

// Centralized handler for Prisma operations
export async function prismaHandler({ model, action, args }: PrismaAction) {
    try {
        const result = await (prisma[model] as any)[action](args);

        // Serialize the result to return plain objects, not Prisma class instances
        return JSON.parse(JSON.stringify(result));
    } catch (error: unknown) {
        if (isPrismaError(error)) {
            if (error.code === 'P2002') {
                throw new Error(`Unique constraint violation on: ${error.meta?.target}`);
            }
            throw new Error(`Error executing Prisma action: ${error.message}`);
        }
    }
}
