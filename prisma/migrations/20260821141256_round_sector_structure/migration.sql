/*
  Warnings:

  - A unique constraint covering the columns `[competitionId,number]` on the table `Round` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roundId,name]` on the table `Sector` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Round` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Round` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `Sector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Sector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endPeg` to the `Sector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startPeg` to the `Sector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Sector` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoundStatus" AS ENUM ('PLANNED', 'DRAWN', 'IN_PROGRESS', 'FINISHED');

-- CreateEnum
CREATE TYPE "SectorStatus" AS ENUM ('PLANNED', 'DRAWN', 'IN_PROGRESS', 'READY_FOR_RESULTS', 'FINISHED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CompetitorCategory" ADD VALUE 'U20';
ALTER TYPE "CompetitorCategory" ADD VALUE 'U15';

-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "RoundStatus" NOT NULL DEFAULT 'PLANNED',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Sector" ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "category" "CompetitorCategory" NOT NULL,
ADD COLUMN     "endPeg" INTEGER NOT NULL,
ADD COLUMN     "startPeg" INTEGER NOT NULL,
ADD COLUMN     "status" "SectorStatus" NOT NULL DEFAULT 'PLANNED',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Round_competitionId_number_key" ON "Round"("competitionId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Sector_roundId_name_key" ON "Sector"("roundId", "name");
