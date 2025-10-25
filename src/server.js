import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import wpEvidenceRoutes from "./routes/wpEvidenceRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`📩 ${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => res.send("✅ SmallholderHUB API running"));
app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/wp-evidence", wpEvidenceRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));