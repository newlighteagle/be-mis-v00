// prisma/seed-wp-evidence.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const wpEvidenceData = [
        {
            district: "District A",
            ics: "ICS-001",
            activity_code: "ACT-001",
            activity: "Training Farmers",
            evidence_note: "Photos of training session",
            evidence_date: "2025-10-01",
            link: "https://drive.google.com/folder1",
        },
        {
            district: "District B",
            ics: "ICS-002",
            activity_code: "ACT-002",
            activity: "Soil Testing",
            evidence_note: "Lab reports",
            evidence_date: "2025-10-05",
            link: "https://drive.google.com/folder2",
        },
        {
            district: "District C",
            ics: "ICS-003",
            activity_code: "ACT-003",
            activity: "Harvest Monitoring",
            evidence_note: "Photos of harvested crops",
            evidence_date: "2025-10-10",
            link: "https://drive.google.com/folder3",
        },
    ];

    for (const data of wpEvidenceData) {
        await prisma.wPEvidence.upsert({
            where: { id: data.id || data.activity_code }, // kalau mau pakai id tetap unik bisa generate sendiri
            update: data,
            create: data,
        });
    }

    console.log("🌱 WP Evidence seeded!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });