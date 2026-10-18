/*
  Warnings:

  - You are about to drop the column `category` on the `Competitor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Competitor" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "Start" ADD COLUMN     "competitionEntryId" INTEGER;

-- CreateTable
CREATE TABLE "CompetitionEntry" (
    "id" SERIAL NOT NULL,
    "competitionId" INTEGER NOT NULL,
    "competitorId" INTEGER NOT NULL,
    "category" "CompetitorCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompetitionEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionEntry_competitionId_competitorId_key" ON "CompetitionEntry"("competitionId", "competitorId");

-- AddForeignKey
ALTER TABLE "CompetitionEntry" ADD CONSTRAINT "CompetitionEntry_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionEntry" ADD CONSTRAINT "CompetitionEntry_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "Competitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Start" ADD CONSTRAINT "Start_competitionEntryId_fkey" FOREIGN KEY ("competitionEntryId") REFERENCES "CompetitionEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
