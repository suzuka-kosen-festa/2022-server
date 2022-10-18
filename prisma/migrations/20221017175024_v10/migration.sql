-- CreateEnum
CREATE TYPE "LivaStage" AS ENUM ('main', 'sub', 'live', 'game');

-- AlterTable
ALTER TABLE "History" ALTER COLUMN "timeStamp" SET DATA TYPE TIMESTAMPTZ(3);

-- CreateTable
CREATE TABLE "LiveEvent" (
    "id" SERIAL NOT NULL,
    "descriptions" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "stage" "LivaStage" NOT NULL,

    CONSTRAINT "LiveEvent_pkey" PRIMARY KEY ("id")
);
