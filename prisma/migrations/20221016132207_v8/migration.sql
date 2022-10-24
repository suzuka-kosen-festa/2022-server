/*
  Warnings:

  - You are about to drop the column `JHStudentId` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `guestGuestId` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `oBObId` on the `History` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_JHStudentId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_guestGuestId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_oBObId_fkey";

-- AlterTable
ALTER TABLE "History" DROP COLUMN "JHStudentId",
DROP COLUMN "guestGuestId",
DROP COLUMN "oBObId",
ADD COLUMN     "guestId" TEXT,
ADD COLUMN     "jhsId" TEXT,
ADD COLUMN     "obId" TEXT;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("guestId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_jhsId_fkey" FOREIGN KEY ("jhsId") REFERENCES "JHStudent"("jhsId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_obId_fkey" FOREIGN KEY ("obId") REFERENCES "OB"("obId") ON DELETE SET NULL ON UPDATE CASCADE;
