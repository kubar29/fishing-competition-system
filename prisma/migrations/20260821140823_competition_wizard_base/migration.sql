/*
  Warnings:

  - You are about to drop the column `date` on the `Competition` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizerId` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venue` to the `Competition` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CompetitionRank" AS ENUM ('FRIENDLY', 'CLUB', 'DISTRICT', 'GPP');

-- CreateEnum
CREATE TYPE "CompetitionStatus" AS ENUM ('DRAFT', 'READY', 'IN_PROGRESS', 'FINISHED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CompetitionSetupStep" AS ENUM ('BASIC_INFO', 'SETTINGS', 'STRUCTURE', 'PARTICIPANTS', 'SUMMARY', 'COMPLETED');

-- CreateEnum
CREATE TYPE "AssignmentMode" AS ENUM ('DRAW', 'MANUAL');

-- AlterTable
ALTER TABLE "Competition" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "organizerId" INTEGER NOT NULL,
ADD COLUMN     "rank" "CompetitionRank",
ADD COLUMN     "setupStep" "CompetitionSetupStep" NOT NULL DEFAULT 'BASIC_INFO',
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "CompetitionStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "venue" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CompetitionSettings" (
    "id" SERIAL NOT NULL,
    "competitionId" INTEGER NOT NULL,
    "roundCount" INTEGER NOT NULL DEFAULT 1,
    "assignmentMode" "AssignmentMode" NOT NULL DEFAULT 'DRAW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompetitionSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionSettings_competitionId_key" ON "CompetitionSettings"("competitionId");

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionSettings" ADD CONSTRAINT "CompetitionSettings_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
