/*
  Warnings:

  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_imageId_fkey`;

-- AlterTable
ALTER TABLE `Image` ADD COLUMN `like` BIGINT NULL;

-- DropTable
DROP TABLE `Like`;
