-- CreateTable
CREATE TABLE "Competitor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,

    CONSTRAINT "Competitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Start" (
    "id" SERIAL NOT NULL,
    "competitorId" INTEGER NOT NULL,
    "roundId" INTEGER NOT NULL,
    "sector" TEXT NOT NULL,
    "subSector" TEXT,
    "position" INTEGER,
    "weight" INTEGER NOT NULL,
    "penaltyPoints" INTEGER NOT NULL DEFAULT 0,
    "sectorPoints" DOUBLE PRECISION,

    CONSTRAINT "Start_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Start" ADD CONSTRAINT "Start_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "Competitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
