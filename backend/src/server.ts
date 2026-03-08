import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import osintRoutes from './routes/osintRoutes';
import { eventBus } from './events/eventBus';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/osint', osintRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send initial events
  socket.emit('event', {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date(),
    type: 'system',
    severity: 'low',
    message: 'Client connected to ATLAS OSINT Console'
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start event bus simulation
eventBus.startSimulation(io);

server.listen(PORT, () => {
  console.log(`🚀 ATLAS OSINT Backend running on port ${PORT}`);
  console.log(`📡 WebSocket server ready for connections`);
});
