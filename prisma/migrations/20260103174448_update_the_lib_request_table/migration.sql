/*
  Warnings:

  - Added the required column `Degree_Course` to the `lib_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `lib_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `lib_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `lib_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `lib_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lib_request` ADD COLUMN `Degree_Course` VARCHAR(255) NOT NULL,
    ADD COLUMN `address` VARCHAR(255) NOT NULL,
    ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `name` VARCHAR(150) NOT NULL,
    ADD COLUMN `telephone` VARCHAR(255) NOT NULL;
