-- DropForeignKey
ALTER TABLE "Guest" DROP CONSTRAINT "Guest_hostId_fkey";

-- AlterTable
ALTER TABLE "Guest" ALTER COLUMN "hostId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Student"("studentId") ON DELETE SET NULL ON UPDATE CASCADE;
