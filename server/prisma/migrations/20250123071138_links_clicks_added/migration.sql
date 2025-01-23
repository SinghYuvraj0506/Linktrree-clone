-- CreateTable
CREATE TABLE "linksClicks" (
    "id" TEXT NOT NULL,
    "country" TEXT,
    "region" TEXT,
    "timezone" TEXT,
    "city" TEXT,
    "ll" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "linkId" TEXT,
    "userId" TEXT,

    CONSTRAINT "linksClicks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "linksClicks" ADD CONSTRAINT "linksClicks_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "links"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "linksClicks" ADD CONSTRAINT "linksClicks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
