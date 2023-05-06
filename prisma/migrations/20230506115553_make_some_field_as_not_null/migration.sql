/*
  Warnings:

  - Made the column `finishedAt` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `finishedAt` DATETIME(3) NOT NULL;
