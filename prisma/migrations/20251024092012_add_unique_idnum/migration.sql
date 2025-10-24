/*
  Warnings:

  - A unique constraint covering the columns `[IDnum]` on the table `patron_master` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `patron_master_IDnum_key` ON `patron_master`(`IDnum`);
