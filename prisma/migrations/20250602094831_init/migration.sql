/*
  Warnings:

  - You are about to drop the column `authorAvatar` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `authorName` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `authorRole` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `excerpt` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `isDraft` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `readTime` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the `GoldenLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GoldenLink" DROP CONSTRAINT "GoldenLink_blogPostId_fkey";

-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "authorAvatar",
DROP COLUMN "authorName",
DROP COLUMN "authorRole",
DROP COLUMN "category",
DROP COLUMN "date",
DROP COLUMN "excerpt",
DROP COLUMN "imageUrl",
DROP COLUMN "isDraft",
DROP COLUMN "readTime",
DROP COLUMN "tags",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "GoldenLink";
