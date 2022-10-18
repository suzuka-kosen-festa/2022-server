/*
  Warnings:

  - Changed the type of `stage` on the `LiveEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LiveStage" AS ENUM ('main', 'sub', 'live', 'game');

-- AlterTable
ALTER TABLE "LiveEvent" DROP COLUMN "stage",
ADD COLUMN     "stage" "LiveStage" NOT NULL;

-- DropEnum
DROP TYPE "LivaStage";
