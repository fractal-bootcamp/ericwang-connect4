import { initialGameState } from './backend/game'
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Express API!" });
});

// Example API Route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
