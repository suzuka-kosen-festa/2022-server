/*
  Warnings:

  - You are about to drop the column `gruop` on the `Bazaar` table. All the data in the column will be lost.
  - Added the required column `group` to the `Bazaar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Bazaar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BazaarPrices" DROP CONSTRAINT "BazaarPrices_bazaarId_fkey";

-- DropForeignKey
ALTER TABLE "Guest" DROP CONSTRAINT "Guest_hostId_fkey";

-- DropForeignKey
ALTER TABLE "Guest" DROP CONSTRAINT "Guest_hostJhsId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_guestId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_jhsId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_obId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_sponsorId_fkey";

-- AlterTable
ALTER TABLE "Bazaar" DROP COLUMN "gruop",
ADD COLUMN     "group" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Student"("studentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_hostJhsId_fkey" FOREIGN KEY ("hostJhsId") REFERENCES "JHStudent"("jhsId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("guestId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("sponsorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_jhsId_fkey" FOREIGN KEY ("jhsId") REFERENCES "JHStudent"("jhsId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_obId_fkey" FOREIGN KEY ("obId") REFERENCES "OB"("obId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BazaarPrices" ADD CONSTRAINT "BazaarPrices_bazaarId_fkey" FOREIGN KEY ("bazaarId") REFERENCES "Bazaar"("id") ON DELETE CASCADE ON UPDATE CASCADE;
