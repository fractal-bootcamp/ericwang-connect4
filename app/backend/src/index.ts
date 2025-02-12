import { initialGameState, GameState } from './game'
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

// Database
let gameState: GameState = initialGameState

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Express API!" });
});

app.get("/initial-game", (req, res) => {
  res.json({ initialGameState: initialGameState });
});

// Example API Route
app.get("/current-game", (req, res) => {
  res.json({ gameState: gameState });
});

app.post("/current-game", (req, res) => {
  const updatedGameState = structuredClone(gameState)
  
  updatedGameState.board = req.body.board
  updatedGameState.currentPlayer = req.body.currentPlayer
  updatedGameState.status = req.body.status

  gameState = updatedGameState

  res.json({ gameState: updatedGameState })
})

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
