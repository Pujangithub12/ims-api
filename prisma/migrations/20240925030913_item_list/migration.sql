/*
  Warnings:

  - You are about to drop the `Customer_vendors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item_purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item_sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item_purchase" DROP CONSTRAINT "Item_purchase_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Item_purchase" DROP CONSTRAINT "Item_purchase_purchase_id_fkey";

-- DropForeignKey
ALTER TABLE "Item_sale" DROP CONSTRAINT "Item_sale_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Item_sale" DROP CONSTRAINT "Item_sale_sale_id_fkey";

-- DropForeignKey
ALTER TABLE "Purchases" DROP CONSTRAINT "Purchases_vendor_id_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_customer_id_fkey";

-- AlterTable
ALTER TABLE "items" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- DropTable
DROP TABLE "Customer_vendors";

-- DropTable
DROP TABLE "Item_purchase";

-- DropTable
DROP TABLE "Item_sale";

-- DropTable
DROP TABLE "Purchases";

-- DropTable
DROP TABLE "Sales";
