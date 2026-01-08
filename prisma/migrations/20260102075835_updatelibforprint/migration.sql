/*
  Warnings:

  - You are about to drop the column `Bkloan` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `DateApplied` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `DateExpired` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `Degree_Course` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `IDnum` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `Overdue` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `User_Class` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `Year_Level` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `campus` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `print` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `remarks` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `suspended` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `lib_forprint` table. All the data in the column will be lost.
  - Added the required column `patron_id` to the `lib_forprint` table without a default value. This is not possible if the table is not empty.
  - Made the column `photo` on table `lib_forprint` required. This step will fail if there are existing NULL values in that column.
  - Made the column `esig` on table `lib_forprint` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reg_date` on table `lib_forprint` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `lib_forprint_IDnum_key` ON `lib_forprint`;

-- AlterTable
ALTER TABLE `lib_forprint` DROP COLUMN `Bkloan`,
    DROP COLUMN `DateApplied`,
    DROP COLUMN `DateExpired`,
    DROP COLUMN `Degree_Course`,
    DROP COLUMN `IDnum`,
    DROP COLUMN `Overdue`,
    DROP COLUMN `User_Class`,
    DROP COLUMN `Year_Level`,
    DROP COLUMN `address`,
    DROP COLUMN `campus`,
    DROP COLUMN `email`,
    DROP COLUMN `gender`,
    DROP COLUMN `name`,
    DROP COLUMN `print`,
    DROP COLUMN `remarks`,
    DROP COLUMN `status`,
    DROP COLUMN `suspended`,
    DROP COLUMN `tag`,
    DROP COLUMN `telephone`,
    ADD COLUMN `patron_id` VARCHAR(50) NOT NULL,
    MODIFY `photo` VARCHAR(150) NOT NULL,
    MODIFY `esig` VARCHAR(150) NOT NULL,
    MODIFY `reg_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- CreateIndex
CREATE INDEX `lib_forprint_patron_id_key` ON `lib_forprint`(`patron_id`);

-- AddForeignKey
ALTER TABLE `lib_forprint` ADD CONSTRAINT `lib_forprint_patron_id_fkey` FOREIGN KEY (`patron_id`) REFERENCES `patron_master`(`IDnum`) ON DELETE CASCADE ON UPDATE CASCADE;
