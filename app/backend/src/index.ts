import { initialGameState, GameState } from './game'
import express from "express";
import { Server } from 'socket.io'
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from 'http';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
// const SOCKET_PORT = 3001

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

// Database
let gameState: GameState = initialGameState

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true, //cookies
  },
})

io.on('connection', (socket) => {
  console.log('connected')
  socket.on('move', (newGameState) => {
    console.log("player moved (server):", newGameState)
    gameState = newGameState
    io.emit('gameUpdate', newGameState)
  })

  socket.on('newGame', () => {
    gameState = initialGameState
    io.emit('gameUpdate', gameState)
  })

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id)
  })

})

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

httpServer.listen(PORT, () => {
  console.log(`🚀 HTTP server running on http://localhost:${PORT}`);
});