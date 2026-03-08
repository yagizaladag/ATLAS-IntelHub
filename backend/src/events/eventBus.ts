import { Server } from 'socket.io';

interface Event {
  id: string;
  timestamp: Date;
  type: 'signal' | 'log' | 'alert' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  source?: string;
}

export class EventBus {
  private static instance: EventBus;
  private isRunning = false;

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  startSimulation(io: Server) {
    if (this.isRunning) return;
    this.isRunning = true;

    console.log('📡 Starting event simulation...');

    // Generate random events every 3-8 seconds
    const generateEvent = () => {
      const events = [
        {
          type: 'signal' as const,
          message: "Accessing remote gateway...",
          severity: 'medium' as const
        },
        {
          type: 'log' as const,
          message: "Packet sniffing initiated on port 8080",
          severity: 'low' as const
        },
        {
          type: 'signal' as const,
          message: "New node detected: 192.168.1.44",
          severity: 'high' as const
        },
        {
          type: 'system' as const,
          message: "Encryption key rotation successful",
          severity: 'low' as const
        },
        {
          type: 'signal' as const,
          message: "Handshake verified with GEO-SAT 4",
          severity: 'medium' as const
        },
        {
          type: 'alert' as const,
          message: "Thermal anomaly detected in Sector 4",
          severity: 'high' as const
        },
        {
          type: 'signal' as const,
          message: "Unusual traffic pattern detected",
          severity: 'medium' as const
        },
        {
          type: 'log' as const,
          message: "System diagnostics completed",
          severity: 'low' as const
        },
        {
          type: 'alert' as const,
          message: "Perimeter breach detected in Sector 7-G",
          severity: 'critical' as const
        },
        {
          type: 'system' as const,
          message: "Database synchronization complete",
          severity: 'low' as const
        }
      ];

      const randomEvent = events[Math.floor(Math.random() * events.length)];
      
      const event: Event = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        type: randomEvent.type,
        severity: randomEvent.severity,
        message: randomEvent.message,
        source: `SYS-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`
      };

      // Broadcast to all connected clients
      io.emit('event', event);

      // Schedule next event
      if (this.isRunning) {
        const delay = Math.random() * 5000 + 3000; // 3-8 seconds
        setTimeout(generateEvent, delay);
      }
    };

    // Start generating events
    generateEvent();
  }

  stopSimulation() {
    this.isRunning = false;
    console.log('📡 Event simulation stopped');
  }

  broadcastEvent(io: Server, event: Omit<Event, 'id' | 'timestamp'>) {
    const fullEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      ...event
    };

    io.emit('event', fullEvent);
  }
}

export const eventBus = EventBus.getInstance();
