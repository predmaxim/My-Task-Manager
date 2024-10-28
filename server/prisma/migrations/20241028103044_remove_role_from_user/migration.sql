/*
  Warnings:

  - The `done` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `in_work` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `name` on the `Status` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TASK_STATUSES" AS ENUM ('queue', 'development', 'done');

-- AlterTable
ALTER TABLE "Status" DROP COLUMN "name",
ADD COLUMN     "name" "TASK_STATUSES" NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "done",
ADD COLUMN     "done" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "in_work",
ADD COLUMN     "in_work" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
