-- CreateTable
CREATE TABLE "SectorJudge" (
    "id" SERIAL NOT NULL,
    "sectorId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SectorJudge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JudgeInvite" (
    "id" SERIAL NOT NULL,
    "sectorId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JudgeInvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SectorJudge_sectorId_userId_key" ON "SectorJudge"("sectorId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "JudgeInvite_code_key" ON "JudgeInvite"("code");

-- AddForeignKey
ALTER TABLE "SectorJudge" ADD CONSTRAINT "SectorJudge_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectorJudge" ADD CONSTRAINT "SectorJudge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeInvite" ADD CONSTRAINT "JudgeInvite_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;
