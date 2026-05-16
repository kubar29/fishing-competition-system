/*
  Warnings:

  - The `category` column on the `Competitor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[competitorId,roundId]` on the table `Start` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teamId,competitorId]` on the table `TeamMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CompetitorCategory" AS ENUM ('SENIOR', 'WOMAN', 'U25');

-- CreateEnum
CREATE TYPE "StartStatus" AS ENUM ('ACTIVE', 'DNS', 'DNF', 'DSQ');

-- AlterTable
ALTER TABLE "Competitor" DROP COLUMN "category",
ADD COLUMN     "category" "CompetitorCategory" NOT NULL DEFAULT 'SENIOR';

-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sector" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Start" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "weight" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Start_competitorId_roundId_key" ON "Start"("competitorId", "roundId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_teamId_competitorId_key" ON "TeamMember"("teamId", "competitorId");
