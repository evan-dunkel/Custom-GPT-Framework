/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Field` table. All the data in the column will be lost.
  - Added the required column `messageTemplate` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "messageTemplate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "type" SET DEFAULT 'text',
ALTER COLUMN "suggestions" SET DEFAULT ARRAY[]::TEXT[];
