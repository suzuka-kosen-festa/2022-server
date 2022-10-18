/*
  Warnings:

  - Added the required column `title` to the `LiveEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LiveEvent" ADD COLUMN     "title" TEXT NOT NULL;
