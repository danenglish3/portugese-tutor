import { prismaHandler } from "../prismaHandler";

export async function getWordTypes() {
    return await prismaHandler({
      model: 'wordType',
      action: 'findMany',
    });
}

export async function getWordTypeById(id: number) {
    return await prismaHandler({
      model: 'wordType',
      action: 'findUnique',
      args: { where: { id } },
    });
}

export async function createWordType(type: string) {
    return await prismaHandler({
      model: 'wordType',
      action: 'create',
      args: { data: { type } },
    });
}

export async function updateWordType(id: number, type: string) {
    return await prismaHandler({
      model: 'wordType',
      action: 'update',
      args: { where: { id }, data: { type } },
    });
}

export async function deleteWordType(id: number) {
    return await prismaHandler({
      model: 'wordType',
      action: 'delete',
      args: { where: { id } },
    });
}
