import express from "express";
import {
    getFarmers,
    getFarmerById,
    createFarmer,
    updateFarmer,
    deleteFarmer,
} from "../controllers/farmerController.js";

const router = express.Router();

router.get("/", getFarmers);
router.get("/:id", getFarmerById);
router.post("/", createFarmer);
router.put("/:id", updateFarmer);
router.delete("/:id", deleteFarmer);

export default router;