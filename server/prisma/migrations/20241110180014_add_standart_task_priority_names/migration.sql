/*
  Warnings:

  - The `name` column on the `Priority` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PriorityLevel" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'CRITICAL');

-- AlterTable
ALTER TABLE "Priority" DROP COLUMN "name",
ADD COLUMN     "name" "PriorityLevel" NOT NULL DEFAULT 'LOW';
