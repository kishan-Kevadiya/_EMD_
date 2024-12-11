-- CreateTable
CREATE TABLE `location_admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hash_id` VARCHAR(36) NOT NULL,
    `location` INTEGER NOT NULL,
    `location_Add` VARCHAR(255) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NULL,
    `deleted_at` DATETIME(6) NULL,
    `created_by` INTEGER NOT NULL,
    `updated_by` INTEGER NULL,
    `deleted_by` INTEGER NULL,
    `reset_password_token` VARCHAR(500) NULL,
    `reset_password_token_expired_at` DATETIME(6) NULL,
    `is_active` INTEGER NOT NULL,
    `role` ENUM('SA', 'LA', 'HS', 'GS', 'ST') NOT NULL DEFAULT 'LA',

    UNIQUE INDEX `location_admin_hash_id_key`(`hash_id`),
    UNIQUE INDEX `location_admin_location_Add_key`(`location_Add`),
    UNIQUE INDEX `location_admin_email_deleted_at_key`(`email`, `deleted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `location_admin` ADD CONSTRAINT `location_admin_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `super_admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
