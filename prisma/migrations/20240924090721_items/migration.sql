/*
  Warnings:

  - You are about to drop the `Item_organization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item_organization" DROP CONSTRAINT "Item_organization_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Item_organization" DROP CONSTRAINT "Item_organization_organization_id_fkey";

-- DropTable
DROP TABLE "Item_organization";

-- CreateTable
CREATE TABLE "item_organizations" (
    "item_id" INTEGER NOT NULL,
    "organization_id" INTEGER NOT NULL,

    CONSTRAINT "item_organizations_pkey" PRIMARY KEY ("item_id","organization_id")
);

-- AddForeignKey
ALTER TABLE "item_organizations" ADD CONSTRAINT "item_organizations_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_organizations" ADD CONSTRAINT "item_organizations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
