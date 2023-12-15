/*
  Warnings:

  - You are about to alter the column `type` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - Added the required column `grade` to the `Classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `classes` ADD COLUMN `grade` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `type` ENUM('Payment', 'Refund') NOT NULL;
