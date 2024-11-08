/*
  Warnings:

  - Added the required column `index` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Status" ADD COLUMN "index" INTEGER NOT NULL;

-- Создание функции
CREATE OR REPLACE FUNCTION set_default_index()
RETURNS TRIGGER AS $$
BEGIN
  NEW.index := COALESCE((SELECT MAX("index") + 1 FROM "Status"), 1);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Создание триггера
CREATE TRIGGER set_default_index_trigger
BEFORE INSERT ON "Status"
FOR EACH ROW
EXECUTE FUNCTION set_default_index();
