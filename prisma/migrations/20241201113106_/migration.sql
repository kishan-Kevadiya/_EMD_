/*
  Warnings:

  - You are about to drop the column `last_login` on the `staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `staff` DROP COLUMN `last_login`,
    ADD COLUMN `role` ENUM('SA', 'LA', 'HS', 'GS', 'ST') NOT NULL DEFAULT 'ST',
    MODIFY `updated_at` DATETIME(3) NULL;
