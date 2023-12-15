/*
  Warnings:

  - You are about to drop the column `academicYear` on the `studentclass` table. All the data in the column will be lost.
  - Added the required column `academicYearId` to the `StudentClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qrCode` to the `StudentClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limit` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `studentclass` DROP FOREIGN KEY `StudentClass_academicYear_fkey`;

-- AlterTable
ALTER TABLE `studentclass` DROP COLUMN `academicYear`,
    ADD COLUMN `academicYearId` INTEGER NOT NULL,
    ADD COLUMN `qrCode` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `limit` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `StudentClass` ADD CONSTRAINT `StudentClass_academicYearId_fkey` FOREIGN KEY (`academicYearId`) REFERENCES `AcademicYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
