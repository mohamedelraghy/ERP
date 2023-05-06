-- AlterTable
ALTER TABLE `Employee` ADD COLUMN `birthDate` DATETIME(3) NULL,
    ADD COLUMN `join` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `profilePic` VARCHAR(255) NULL DEFAULT 'https://profile-pic.me',
    MODIFY `salary` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `deadLine` DATETIME(3) NULL,
    ADD COLUMN `finishedAt` DATETIME(3) NULL,
    MODIFY `salary` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `SalaryHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `month` INTEGER NULL,
    `year` INTEGER NULL,
    `salaryTaken` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SalaryHistory` ADD CONSTRAINT `SalaryHistory_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
