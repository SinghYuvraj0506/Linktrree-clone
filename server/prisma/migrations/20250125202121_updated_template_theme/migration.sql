/*
  Warnings:

  - You are about to drop the column `slug` on the `linksClicks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "linksClicks" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "templateData" JSONB;
