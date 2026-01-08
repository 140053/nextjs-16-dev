/*
  Warnings:

  - You are about to drop the column `esig` on the `lib_forprint` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `lib_forprint` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `lib_forprint` DROP COLUMN `esig`,
    DROP COLUMN `photo`;
