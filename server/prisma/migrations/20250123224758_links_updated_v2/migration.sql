/*
  Warnings:

  - The values [LINKEDIN,TWITTER,FACEBOOK,PORTFOLIO,DISCORD,TELEGRAM,YOUTUBE] on the enum `LINKS_TYPE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LINKS_TYPE_new" AS ENUM ('SOCIAL', 'OTHERS');
ALTER TABLE "links" ALTER COLUMN "type" TYPE "LINKS_TYPE_new" USING ("type"::text::"LINKS_TYPE_new");
ALTER TYPE "LINKS_TYPE" RENAME TO "LINKS_TYPE_old";
ALTER TYPE "LINKS_TYPE_new" RENAME TO "LINKS_TYPE";
DROP TYPE "LINKS_TYPE_old";
COMMIT;

-- AlterTable
ALTER TABLE "links" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false;
