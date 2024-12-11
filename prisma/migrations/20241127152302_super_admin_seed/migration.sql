/*
  Warnings:

  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropTable
DROP TABLE `profile`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `super_admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hash_id` VARCHAR(36) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `is_active` INTEGER NOT NULL,
    `role` ENUM('SA', 'LA', 'HS', 'GS', 'ST') NOT NULL DEFAULT 'SA',

    UNIQUE INDEX `super_admin_hash_id_key`(`hash_id`),
    UNIQUE INDEX `super_admin_username_key`(`username`),
    UNIQUE INDEX `super_admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
