/*
  Warnings:

  - Added the required column `read` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReadAccess" AS ENUM ('OWN', 'ANY');

-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "read" "ReadAccess" NOT NULL;
