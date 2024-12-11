/*
  Warnings:

  - Added the required column `host_password` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `host_password` VARCHAR(255) NOT NULL;
