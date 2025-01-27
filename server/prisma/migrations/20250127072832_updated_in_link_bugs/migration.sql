/*
  Warnings:

  - You are about to drop the column `redirect_relaation_user_id` on the `links` table. All the data in the column will be lost.
  - Made the column `lock_type` on table `links` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "links" DROP COLUMN "redirect_relaation_user_id",
ADD COLUMN     "redirect_relation_user_id" TEXT,
ALTER COLUMN "lock_type" SET NOT NULL,
ALTER COLUMN "lock_type" SET DEFAULT 'NONE';
