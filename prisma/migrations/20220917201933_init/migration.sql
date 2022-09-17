-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Man', 'Woman', 'Xgender');

-- CreateEnum
CREATE TYPE "Job" AS ENUM ('School', 'College', 'Society', 'Others');

-- CreateTable
CREATE TABLE "Student" (
    "uuid" TEXT NOT NULL,
    "RealName" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Visitor" (
    "uuid" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "age" INTEGER NOT NULL,
    "jobs" "Job" NOT NULL,
    "nickname" TEXT NOT NULL,
    "JHS" BOOLEAN,
    "Sponsor" BOOLEAN,
    "studentUuid" TEXT NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "History" (
    "uuid" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "History_uuid_key" ON "History"("uuid");

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_studentUuid_fkey" FOREIGN KEY ("studentUuid") REFERENCES "Student"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "Visitor"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
