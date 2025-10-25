// src/controllers/wpEvidenceController.js
import prisma from "../lib/prisma.js";

// Get all WP Evidence
export const getAllWPEvidence = async (req, res) => {
  try {
    const data = await prisma.wPEvidence.findMany({
      orderBy: { created_at: "desc" },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch WP Evidence" });
  }
};

// Create WP Evidence
export const createWPEvidence = async (req, res) => {
  try {
    const { district, ics, activity_code, activity, evidence_note, evidence_date, link } = req.body;
    const newData = await prisma.wPEvidence.create({
      data: {
        district,
        ics,
        activity_code,
        activity,
        evidence_note,
        evidence_date,
        link,
      },
    });
    res.json(newData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create WP Evidence" });
  }
};