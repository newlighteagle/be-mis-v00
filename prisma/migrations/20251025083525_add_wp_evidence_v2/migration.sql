-- CreateTable
CREATE TABLE "WPEvidence" (
    "id" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "ics" TEXT NOT NULL,
    "activity_code" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "evidence_note" TEXT NOT NULL,
    "evidence_date" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WPEvidence_pkey" PRIMARY KEY ("id")
);
