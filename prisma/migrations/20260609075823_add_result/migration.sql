-- CreateEnum
CREATE TYPE "ResultStatus" AS ENUM ('PENDING', 'CONFIRMED', 'DISQUALIFIED');

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "startId" INTEGER NOT NULL,
    "placeInSector" INTEGER,
    "sectorPoints" DOUBLE PRECISION,
    "finalPoints" DOUBLE PRECISION,
    "status" "ResultStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Result_startId_key" ON "Result"("startId");

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_startId_fkey" FOREIGN KEY ("startId") REFERENCES "Start"("id") ON DELETE CASCADE ON UPDATE CASCADE;
