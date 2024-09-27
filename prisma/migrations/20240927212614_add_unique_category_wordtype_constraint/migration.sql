/*
  Warnings:

  - A unique constraint covering the columns `[category,wordtypeId]` on the table `WordTypeCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WordTypeCategory_category_wordtypeId_key" ON "WordTypeCategory"("category", "wordtypeId");
