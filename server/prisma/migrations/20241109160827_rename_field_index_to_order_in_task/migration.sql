/*
  Warnings:

  - You are about to drop the column `index` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "index",
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;
