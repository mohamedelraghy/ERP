/*
  Warnings:

  - Made the column `birthDate` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deadLine` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Employee` MODIFY `birthDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Task` MODIFY `deadLine` DATETIME(3) NOT NULL;
