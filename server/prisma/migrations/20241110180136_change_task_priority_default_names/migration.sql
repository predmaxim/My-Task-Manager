/*
  Warnings:

  - The values [LOW,NORMAL,HIGH,CRITICAL] on the enum `PriorityLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PriorityLevel_new" AS ENUM ('low', 'normal', 'high', 'critical');
ALTER TABLE "Priority" ALTER COLUMN "name" DROP DEFAULT;
ALTER TABLE "Priority" ALTER COLUMN "name" TYPE "PriorityLevel_new" USING ("name"::text::"PriorityLevel_new");
ALTER TYPE "PriorityLevel" RENAME TO "PriorityLevel_old";
ALTER TYPE "PriorityLevel_new" RENAME TO "PriorityLevel";
DROP TYPE "PriorityLevel_old";
COMMIT;

-- AlterTable
ALTER TABLE "Priority" ALTER COLUMN "name" DROP DEFAULT;
