/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `WordType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WordType_type_key" ON "WordType"("type");
