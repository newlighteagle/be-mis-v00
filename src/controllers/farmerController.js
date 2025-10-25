import prisma from "../lib/prisma.js";
/**
 * GET /api/farmers
 * List farmers with filters, search, and pagination
 */
export const getFarmers = async (req, res) => {
    try {
        const { district, ics, search, page = 1, limit = 50 } = req.query;
        const filters = {};

        // optional filters
        if (district) filters.district_id = district;
        if (ics) filters.ics_id = ics;

        // search by name OR farmer_id
        if (search) {
            filters.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { farmer_id: { contains: search, mode: "insensitive" } },
            ];
        }

        const skip = (Number(page) - 1) * Number(limit);

        const [farmers, total] = await Promise.all([
            prisma.farmer.findMany({
                where: filters,
                skip,
                take: Number(limit),
                orderBy: { created_at: "desc" },
            }),
            prisma.farmer.count({ where: filters }),
        ]);

        res.status(200).json({
            data: farmers,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
        });
    } catch (error) {
        console.error("Error fetching farmers:", error);
        res.status(500).json({ error: "Failed to fetch farmers" });
    }
};

/**
 * GET /api/farmers/:id
 * Get a single farmer by ID
 */
export const getFarmerById = async (req, res) => {
    try {
        const { id } = req.params;
        const farmer = await prisma.farmer.findUnique({ where: { id } });

        if (!farmer) {
            return res.status(404).json({ error: "Farmer not found" });
        }

        res.status(200).json(farmer);
    } catch (error) {
        console.error("Error fetching farmer:", error);
        res.status(500).json({ error: "Failed to fetch farmer" });
    }
};

/**
 * POST /api/farmers
 * Create new farmer
 */
export const createFarmer = async (req, res) => {
    try {
        const { farmer_id, name, gender, birth_date, ics_id } = req.body;

        if (!farmer_id || !name) {
            return res.status(400).json({ error: "farmer_id and name are required" });
        }

        const newFarmer = await prisma.farmer.create({
            data: {
                farmer_id,
                name,
                gender,
                birth_date: birth_date ? new Date(birth_date) : null,
                ics_id,
            },
        });

        res.status(201).json(newFarmer);
    } catch (error) {
        console.error("Error creating farmer:", error);
        res.status(500).json({ error: "Failed to create farmer" });
    }
};

/**
 * PUT /api/farmers/:id
 * Update existing farmer
 */
export const updateFarmer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, gender, birth_date, ics_id } = req.body;

        const farmer = await prisma.farmer.update({
            where: { id },
            data: {
                name,
                gender,
                birth_date: birth_date ? new Date(birth_date) : null,
                ics_id,
            },
        });

        res.status(200).json(farmer);
    } catch (error) {
        console.error("Error updating farmer:", error);
        res.status(500).json({ error: "Failed to update farmer" });
    }
};

/**
 * DELETE /api/farmers/:id
 * Delete a farmer
 */
export const deleteFarmer = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.farmer.delete({ where: { id } });
        res.status(200).json({ message: "Farmer deleted successfully" });
    } catch (error) {
        console.error("Error deleting farmer:", error);
        res.status(500).json({ error: "Failed to delete farmer" });
    }
};