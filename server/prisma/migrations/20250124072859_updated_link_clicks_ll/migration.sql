/*
  Warnings:

  - The `ll` column on the `linksClicks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "linksClicks" DROP COLUMN "ll",
ADD COLUMN     "ll" DOUBLE PRECISION[];
