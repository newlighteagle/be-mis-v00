/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `SidebarMenu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SidebarMenu_label_key" ON "SidebarMenu"("label");
