-- AlterTable
ALTER TABLE `event` ADD COLUMN `role` ENUM('SA', 'LA', 'HS', 'GS', 'ST') NOT NULL DEFAULT 'HS';
