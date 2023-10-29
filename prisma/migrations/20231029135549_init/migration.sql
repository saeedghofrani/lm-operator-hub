-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deleted" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "deleted" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deleted" TIMESTAMP(3);
