-- CreateTable
CREATE TABLE "WordType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "WordType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordTypeCategory" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "wordtypeId" INTEGER NOT NULL,

    CONSTRAINT "WordTypeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "original" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "description" TEXT,
    "markedAsStudied" BOOLEAN NOT NULL DEFAULT false,
    "wordtypeId" INTEGER NOT NULL,
    "wordtypecategoryId" INTEGER,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WordTypeCategory" ADD CONSTRAINT "WordTypeCategory_wordtypeId_fkey" FOREIGN KEY ("wordtypeId") REFERENCES "WordType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_wordtypeId_fkey" FOREIGN KEY ("wordtypeId") REFERENCES "WordType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_wordtypecategoryId_fkey" FOREIGN KEY ("wordtypecategoryId") REFERENCES "WordTypeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
