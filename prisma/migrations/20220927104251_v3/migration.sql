/*
  Warnings:

  - You are about to drop the column `RealName` on the `Guest` table. All the data in the column will be lost.
  - Added the required column `name` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Sponsor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "RealName",
ADD COLUMN     "hostJhsId" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "jobs" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Sponsor" ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_hostJhsId_fkey" FOREIGN KEY ("hostJhsId") REFERENCES "JHStudent"("jhsId") ON DELETE SET NULL ON UPDATE CASCADE;
