/*
  Warnings:

  - You are about to alter the column `penaltyPoints` on the `Start` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Start" ALTER COLUMN "penaltyPoints" SET DEFAULT 0,
ALTER COLUMN "penaltyPoints" SET DATA TYPE INTEGER;
