/*
  Warnings:

  - The values [DISQUALIFIED] on the enum `ResultStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACTIVE,DNF] on the enum `StartStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `notes` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Start` table. All the data in the column will be lost.
  - You are about to drop the column `sectorPoints` on the `Start` table. All the data in the column will be lost.
  - You are about to drop the column `subSector` on the `Start` table. All the data in the column will be lost.
  - Added the required column `pegNumber` to the `Start` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Start` table without a default value. This is not possible if the table is not empty.
  - Made the column `competitionEntryId` on table `Start` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ResultStatus_new" AS ENUM ('PENDING', 'CONFIRMED');
ALTER TABLE "Result" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Result" ALTER COLUMN "status" TYPE "ResultStatus_new" USING ("status"::text::"ResultStatus_new");
ALTER TYPE "ResultStatus" RENAME TO "ResultStatus_old";
ALTER TYPE "ResultStatus_new" RENAME TO "ResultStatus";
DROP TYPE "ResultStatus_old";
ALTER TABLE "Result" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "StartStatus_new" AS ENUM ('PENDING', 'WEIGHED', 'DNS', 'DSQ');
ALTER TABLE "Start" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Start" ALTER COLUMN "status" TYPE "StartStatus_new" USING ("status"::text::"StartStatus_new");
ALTER TYPE "StartStatus" RENAME TO "StartStatus_old";
ALTER TYPE "StartStatus_new" RENAME TO "StartStatus";
DROP TYPE "StartStatus_old";
ALTER TABLE "Start" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "Start" DROP CONSTRAINT "Start_competitionEntryId_fkey";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "notes",
ALTER COLUMN "placeInSector" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Start" DROP COLUMN "position",
DROP COLUMN "sectorPoints",
DROP COLUMN "subSector",
ADD COLUMN     "pegNumber" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL,
ALTER COLUMN "weight" DROP DEFAULT,
ALTER COLUMN "penaltyPoints" SET DEFAULT 0,
ALTER COLUMN "penaltyPoints" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "competitionEntryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Start" ADD CONSTRAINT "Start_competitionEntryId_fkey" FOREIGN KEY ("competitionEntryId") REFERENCES "CompetitionEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
