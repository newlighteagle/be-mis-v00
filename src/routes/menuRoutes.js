import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const menu = await prisma.sidebarMenu.findMany({
            orderBy: { order_index: "asc" },
        });
        res.json(menu);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch menu" });
    }
});

export default router;