/*
  Warnings:

  - Added the required column `College` to the `patron_master` table without a default value. This is not possible if the table is not empty.
  - Made the column `telephone` on table `patron_master` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `patron_master` ADD COLUMN `College` VARCHAR(100) NOT NULL,
    MODIFY `telephone` VARCHAR(255) NOT NULL DEFAULT 'None';
