import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const menus = [
        {
            label: "Dashboard",
            path: "/",
            icon: "DashboardIcon",
            order_index: 1,
            is_active: true,
        },
        {
            label: "KPI",
            path: "/kpi",
            icon: "KpiIcon",
            order_index: 2,
            is_active: true,
        },
        {
            label: "KPI v2",
            path: "/kpi-v2",
            icon: "KpiV2Icon",
            order_index: 3,
            is_active: true,
        },
        {
            label: "Settings",
            path: "/settings",
            icon: "SettingsIcon",
            order_index: 4,
            is_active: false, // contoh menu non aktif
        },
    ];

    for (const menu of menus) {
        await prisma.sidebarMenu.upsert({
            where: { label: menu.label },
            update: menu,
            create: menu,
        });
    }

    console.log("✅ Seeded sidebar menu successfully");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });