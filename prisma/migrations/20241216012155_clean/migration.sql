/*
  Warnings:

  - Made the column `user_id` on table `Sale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_name` on table `Sale` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_user_id_fkey";

-- AlterTable
ALTER TABLE "Brand" ALTER COLUMN "logo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "user_name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
