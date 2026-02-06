-- CreateEnum
CREATE TYPE "BucketListCategory" AS ENUM ('DREAM', 'PLANNED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "DestinationCategory" AS ENUM ('NATURE', 'CITIES', 'CULTURAL_EXPERIENCES', 'ADVENTURE', 'RELAXATION', 'FOOD_AND_WINE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "bio" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bucket_list_items" (
    "id" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "category" "BucketListCategory" NOT NULL DEFAULT 'DREAM',
    "destinationType" "DestinationCategory",
    "notes" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "bucket_list_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "bucket_list_items_userId_idx" ON "bucket_list_items"("userId");

-- CreateIndex
CREATE INDEX "bucket_list_items_category_idx" ON "bucket_list_items"("category");

-- AddForeignKey
ALTER TABLE "bucket_list_items" ADD CONSTRAINT "bucket_list_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
