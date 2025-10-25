-- CreateTable
CREATE TABLE "District" (
    "id" TEXT NOT NULL,
    "district_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ics" (
    "id" TEXT NOT NULL,
    "district_id" TEXT NOT NULL,
    "ics_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farmer" (
    "id" TEXT NOT NULL,
    "farmer_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT,
    "birth_date" TIMESTAMP(3),
    "ics_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "District_district_id_key" ON "District"("district_id");

-- CreateIndex
CREATE UNIQUE INDEX "Ics_ics_id_key" ON "Ics"("ics_id");

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_farmer_id_key" ON "Farmer"("farmer_id");

-- AddForeignKey
ALTER TABLE "Ics" ADD CONSTRAINT "Ics_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("district_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Farmer" ADD CONSTRAINT "Farmer_ics_id_fkey" FOREIGN KEY ("ics_id") REFERENCES "Ics"("ics_id") ON DELETE SET NULL ON UPDATE CASCADE;
