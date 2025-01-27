/*
  Warnings:

  - A unique constraint covering the columns `[redirect_link_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "THUMBNAIL_LAYOUT_TYPE" AS ENUM ('COMPACT', 'LARGE');

-- CreateEnum
CREATE TYPE "LINK_ANIMATION_TYPE" AS ENUM ('NONE', 'BUZZ', 'WOBBLE', 'POP', 'SWIPE');

-- CreateEnum
CREATE TYPE "LINK_LOCK_TYPE" AS ENUM ('NONE', 'SUBSCRIBE', 'CODE', 'SENSITIVE', 'DOB');

-- AlterTable
ALTER TABLE "links" ADD COLUMN     "animation_type" "LINK_ANIMATION_TYPE" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "hide_time" TIMESTAMP(3),
ADD COLUMN     "isLocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lock_type" "LINK_LOCK_TYPE",
ADD COLUMN     "prioritize" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "redirect_relaation_user_id" TEXT,
ADD COLUMN     "show_time" TIMESTAMP(3),
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "thumbnail_layout" "THUMBNAIL_LAYOUT_TYPE" NOT NULL DEFAULT 'COMPACT';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "redirect_link_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_redirect_link_id_key" ON "users"("redirect_link_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_redirect_link_id_fkey" FOREIGN KEY ("redirect_link_id") REFERENCES "links"("id") ON DELETE SET NULL ON UPDATE CASCADE;
