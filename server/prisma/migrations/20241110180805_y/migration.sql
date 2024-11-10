/*
  Warnings:

  - You are about to drop the column `priorityId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Priority` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `priority` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_priorityId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "priorityId",
ADD COLUMN     "priority" "PriorityLevel" NOT NULL;

-- DropTable
DROP TABLE "Priority";
