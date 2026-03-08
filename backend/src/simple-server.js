const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock OSINT endpoints
app.get('/api/osint/ip-lookup', (req, res) => {
  const { ip } = req.query;
  res.json({
    success: true,
    type: 'ip_geolocation',
    data: {
      ip: ip || '8.8.8.8',
      country: 'United States',
      region: 'California',
      city: 'Mountain View',
      latitude: 37.4056,
      longitude: -122.0775,
      org: 'Google LLC',
      timezone: 'America/Los_Angeles'
    },
    timestamp: new Date()
  });
});

app.get('/api/osint/whois', (req, res) => {
  const { domain } = req.query;
  res.json({
    success: true,
    type: 'whois',
    data: {
      domain: domain || 'example.com',
      registrar: "Mock Registrar Inc.",
      creationDate: "2020-01-15T00:00:00Z",
      expirationDate: "2025-01-15T00:00:00Z",
      status: ["clientTransferProhibited"],
      nameServers: ["ns1.example.com", "ns2.example.com"]
    },
    timestamp: new Date()
  });
});

app.get('/api/osint/dns', (req, res) => {
  const { domain } = req.query;
  res.json({
    success: true,
    type: 'dns',
    data: {
      domain: domain || 'example.com',
      records: [
        { type: 'A', name: domain, value: '93.184.216.34', ttl: 300 },
        { type: 'NS', name: domain, value: 'ns1.example.com', ttl: 300 }
      ]
    },
    timestamp: new Date()
  });
});

app.get('/api/osint/reverse-dns', (req, res) => {
  const { ip } = req.query;
  res.json({
    success: true,
    type: 'reverse_dns',
    data: {
      ip: ip || '8.8.8.8',
      hostnames: ['dns.google']
    },
    timestamp: new Date()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Socket.IO events
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

  // Simulate events
  const eventInterval = setInterval(() => {
    const events = [
      { type: 'signal', message: "Accessing remote gateway...", severity: 'medium' },
      { type: 'log', message: "Packet sniffing initiated on port 8080", severity: 'low' },
      { type: 'signal', message: "New node detected: 192.168.1.44", severity: 'high' },
      { type: 'system', message: "Encryption key rotation successful", severity: 'low' },
      { type: 'alert', message: "Thermal anomaly detected in Sector 4", severity: 'high' }
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    
    socket.emit('event', {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      type: randomEvent.type,
      severity: randomEvent.severity,
      message: randomEvent.message,
      source: `SYS-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`
    });
  }, 3000);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    clearInterval(eventInterval);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 ATLAS OSINT Backend running on port ${PORT}`);
  console.log(`📡 WebSocket server ready for connections`);
});
