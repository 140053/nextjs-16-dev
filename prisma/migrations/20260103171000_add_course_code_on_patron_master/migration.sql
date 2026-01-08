/*
  Warnings:

  - Added the required column `Course_Code` to the `patron_master` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patron_master` ADD COLUMN `Course_Code` VARCHAR(50) NOT NULL;
