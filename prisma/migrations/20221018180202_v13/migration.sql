-- CreateEnum
CREATE TYPE "BazaarType" AS ENUM ('eating', 'recreation');

-- CreateTable
CREATE TABLE "Bazaar" (
    "id" SERIAL NOT NULL,
    "descriptions" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "gruop" TEXT NOT NULL,
    "group_type" "BazaarType" NOT NULL,

    CONSTRAINT "Bazaar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BazaarPrices" (
    "id" SERIAL NOT NULL,
    "price" TEXT NOT NULL,
    "bazaarId" INTEGER NOT NULL,

    CONSTRAINT "BazaarPrices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BazaarPrices" ADD CONSTRAINT "BazaarPrices_bazaarId_fkey" FOREIGN KEY ("bazaarId") REFERENCES "Bazaar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
