// Define the PrismaError type
export interface PrismaError extends Error {
    code?: string; // Prisma error code, e.g., 'P2002'
    meta?: {
        target?: string[]; // Target fields causing the error (e.g., unique constraints)
    };
}

// Type guard to check if an error is a PrismaError
export function isPrismaError(error: unknown): error is PrismaError {
    return typeof error === "object" && error !== null && "code" in error;
}
