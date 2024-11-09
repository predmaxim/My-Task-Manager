/*
  Warnings:

  - You are about to drop the column `in_work` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "in_work",
ADD COLUMN     "inWork" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
