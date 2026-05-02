/*
  Warnings:

  - You are about to drop the `WorkFlow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "WorkFlow";

-- CreateTable
CREATE TABLE "WorkFlows" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WorkFlows_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkFlows" ADD CONSTRAINT "WorkFlows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
