/*
  Warnings:

  - You are about to drop the column `state` on the `Task` table. All the data in the column will be lost.
  - Added the required column `password` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Employee` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `state`,
    ADD COLUMN `status` VARCHAR(255) NOT NULL;
