-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'STAFF', 'USER') NOT NULL DEFAULT 'USER',
    `branch` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patron_master` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `Degree_Course` VARCHAR(255) NOT NULL,
    `User_Class` VARCHAR(100) NOT NULL,
    `Year_Level` VARCHAR(100) NOT NULL,
    `IDnum` VARCHAR(50) NOT NULL,
    `DateApplied` VARCHAR(255) NULL,
    `DateExpired` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `gender` ENUM('Male', 'Female', 'Other') NULL,
    `campus` VARCHAR(255) NOT NULL,
    `Bkloan` VARCHAR(255) NULL,
    `telephone` VARCHAR(255) NULL DEFAULT 'None',
    `Overdue` VARCHAR(255) NULL,
    `remarks` VARCHAR(255) NULL,
    `suspended` VARCHAR(255) NULL,
    `tag` VARCHAR(255) NULL,
    `photo` VARCHAR(150) NULL,
    `esig` VARCHAR(150) NULL,
    `reg_date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `College` VARCHAR(100) NULL,
    `Course_Code` VARCHAR(50) NULL,

    UNIQUE INDEX `patron_master_IDnum_key`(`IDnum`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lib_request` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `patron_id` VARCHAR(50) NOT NULL,
    `photo` VARCHAR(150) NULL,
    `esig` VARCHAR(150) NULL,
    `reg_date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `Degree_Course` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `telephone` VARCHAR(255) NOT NULL,

    INDEX `lib_request_patron_id_fkey`(`patron_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `libman_patron` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `patron_id` VARCHAR(50) NOT NULL,
    `reg_date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `libman_patron_patron_id_fkey`(`patron_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lib_pending` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `patron_id` VARCHAR(50) NOT NULL,
    `photo` VARCHAR(150) NULL,
    `esig` VARCHAR(150) NULL,
    `reg_date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `Degree_Course` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `telephone` VARCHAR(255) NOT NULL,

    INDEX `lib_pending_patron_id_fkey`(`patron_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lib_forprint` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `patron_id` VARCHAR(50) NOT NULL,
    `photo` VARCHAR(150) NULL,
    `esig` VARCHAR(150) NULL,
    `reg_date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `Degree_Course` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `telephone` VARCHAR(255) NOT NULL,

    INDEX `lib_forprint_patron_id_key`(`patron_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colleges` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `colleges_code_unique`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `college_id` BIGINT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `courses_code_unique`(`code`),
    INDEX `courses_college_id_foreign`(`college_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subjects` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `level` ENUM('first', 'second', 'third', 'fourth', 'fifth', 'sixth') NULL,
    `course_id` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `subjects_course_id_foreign`(`course_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collection_by_subjects` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `subject_id` BIGINT UNSIGNED NOT NULL,
    `bkid` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `author` TEXT NULL,
    `editor` VARCHAR(255) NULL,
    `contributor` TEXT NULL,
    `publisher` VARCHAR(255) NULL,
    `copyrights` VARCHAR(255) NOT NULL,
    `isbn` VARCHAR(255) NULL,
    `call_number` VARCHAR(255) NULL,
    `accession_number` VARCHAR(255) NULL,
    `edition` VARCHAR(255) NULL,
    `place_of_publication` VARCHAR(255) NULL,
    `material_type` VARCHAR(255) NULL,
    `code` VARCHAR(255) NULL,
    `is_fil` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `copies` VARCHAR(45) NULL,

    INDEX `collection_by_subjects_subject_id_foreign`(`subject_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `bkID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(255) NULL,
    `Maintext` TEXT NULL,
    `Fil` SMALLINT NOT NULL DEFAULT 0,
    `Ref` SMALLINT NOT NULL DEFAULT 0,
    `Bio` SMALLINT NOT NULL DEFAULT 0,
    `Fic` SMALLINT NOT NULL DEFAULT 0,
    `Res` SMALLINT NOT NULL DEFAULT 0,
    `Copy` SMALLINT NOT NULL DEFAULT 1,
    `Inn` SMALLINT NOT NULL DEFAULT 1,
    `t_Out` SMALLINT NOT NULL DEFAULT 0,
    `t_TimesOut` SMALLINT NOT NULL DEFAULT 0,
    `images` VARCHAR(80) NULL,
    `tm` VARCHAR(15) NULL,
    `gc` SMALLINT NOT NULL DEFAULT 0,
    `tr` SMALLINT NOT NULL DEFAULT 0,
    `easy` SMALLINT NOT NULL DEFAULT 0,
    `circ` SMALLINT NOT NULL DEFAULT 0,
    `fr` SMALLINT NOT NULL DEFAULT 0,
    `sm` SMALLINT NOT NULL DEFAULT 0,
    `entered_by` VARCHAR(45) NULL,
    `date_entered` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` VARCHAR(45) NULL,
    `date_updated` DATETIME(0) NULL,
    `schl` SMALLINT NOT NULL DEFAULT 0,
    `acquisitionmode` VARCHAR(15) NULL,
    `donor` VARCHAR(50) NULL,
    `branch` VARCHAR(30) NULL,
    `restricted` BOOLEAN NOT NULL DEFAULT false,
    `filsts` VARCHAR(45) NULL,
    `coding` VARCHAR(50) NULL,

    PRIMARY KEY (`bkID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userlogs` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `transaction_type` TINYINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `userlogs_user_id_foreign`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lib_request` ADD CONSTRAINT `lib_request_patron_id_fkey` FOREIGN KEY (`patron_id`) REFERENCES `patron_master`(`IDnum`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `libman_patron` ADD CONSTRAINT `libman_patron_patron_id_fkey` FOREIGN KEY (`patron_id`) REFERENCES `patron_master`(`IDnum`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lib_pending` ADD CONSTRAINT `lib_pending_patron_id_fkey` FOREIGN KEY (`patron_id`) REFERENCES `patron_master`(`IDnum`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lib_forprint` ADD CONSTRAINT `lib_forprint_patron_id_fkey` FOREIGN KEY (`patron_id`) REFERENCES `patron_master`(`IDnum`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_college_id_foreign` FOREIGN KEY (`college_id`) REFERENCES `colleges`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `subjects` ADD CONSTRAINT `subjects_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `collection_by_subjects` ADD CONSTRAINT `collection_by_subjects_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `userlogs` ADD CONSTRAINT `userlogs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `patron_master`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
