// src/routes/wpEvidenceRoutes.js
import express from "express";
import { getAllWPEvidence, createWPEvidence } from "../controllers/wpEvidenceController.js";

const router = express.Router();

router.get("/", getAllWPEvidence);
router.post("/", createWPEvidence);

export default router;