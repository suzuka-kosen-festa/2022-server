/*
  Warnings:

  - Made the column `jobs` on table `Guest` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `JHStudent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guest" ALTER COLUMN "jobs" SET NOT NULL;

-- AlterTable
ALTER TABLE "History" ADD COLUMN     "oBObId" TEXT;

-- AlterTable
ALTER TABLE "JHStudent" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "OB" (
    "obId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OB_obId_key" ON "OB"("obId");

-- CreateIndex
CREATE UNIQUE INDEX "OB_email_key" ON "OB"("email");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_oBObId_fkey" FOREIGN KEY ("oBObId") REFERENCES "OB"("obId") ON DELETE SET NULL ON UPDATE CASCADE;
