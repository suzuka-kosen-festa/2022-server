-- CreateTable
CREATE TABLE "Student" (
    "studentId" TEXT NOT NULL,
    "kana" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Guest" (
    "guestId" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "jobs" TEXT NOT NULL,
    "RealName" TEXT NOT NULL,
    "hostId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "sponsorId" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "JHStudent" (
    "jhsId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guestGuestId" TEXT,
    "sponsorId" TEXT,
    "JHStudentId" TEXT,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentId_key" ON "Student"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_guestId_key" ON "Guest"("guestId");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_hostId_key" ON "Guest"("hostId");

-- CreateIndex
CREATE UNIQUE INDEX "Sponsor_sponsorId_key" ON "Sponsor"("sponsorId");

-- CreateIndex
CREATE UNIQUE INDEX "Sponsor_email_key" ON "Sponsor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "JHStudent_jhsId_key" ON "JHStudent"("jhsId");

-- CreateIndex
CREATE UNIQUE INDEX "JHStudent_email_key" ON "JHStudent"("email");

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_guestGuestId_fkey" FOREIGN KEY ("guestGuestId") REFERENCES "Guest"("guestId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("sponsorId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_JHStudentId_fkey" FOREIGN KEY ("JHStudentId") REFERENCES "JHStudent"("jhsId") ON DELETE SET NULL ON UPDATE CASCADE;
