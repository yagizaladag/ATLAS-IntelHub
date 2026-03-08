'use client';

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function EventFeed() {
  const { events, addEvent } = useAppStore();
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate random events
    const logMessages = [
      { type: 'signal' as const, message: "Accessing remote gateway...", severity: 'medium' as const },
      { type: 'log' as const, message: "Packet sniffing initiated on port 8080", severity: 'low' as const },
      { type: 'signal' as const, message: "New node detected: 192.168.1.44", severity: 'high' as const },
      { type: 'system' as const, message: "Encryption key rotation successful", severity: 'low' as const },
      { type: 'signal' as const, message: "Handshake verified with GEO-SAT 4", severity: 'medium' as const },
      { type: 'alert' as const, message: "Thermal anomaly detected in Sector 4", severity: 'high' as const },
    ];

    const interval = setInterval(() => {
      const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
      addEvent({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        type: randomLog.type,
        severity: randomLog.severity,
        message: randomLog.message,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [addEvent]);

  const formatTime = (date: Date) => {
    return date.toISOString().split('T')[1].split('.')[0];
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-500/5';
      case 'high': return 'border-orange-500 bg-orange-500/5';
      case 'medium': return 'border-brand bg-brand/5';
      case 'low': return 'border-tactical-muted';
      default: return 'border-tactical-muted';
    }
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case 'alert': return 'text-red-400';
      case 'signal': return 'text-white/80';
      case 'system': return 'text-white/80';
      default: return 'text-white/80';
    }
  };

  return (
    <section className="flex-1 p-4 flex flex-col min-h-0">
      <h2 className="text-[10px] font-bold text-brand uppercase tracking-widest mb-3 flex items-center gap-2">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        Live Event Stream
      </h2>
      <div ref={feedRef} className="flex-1 overflow-y-auto space-y-3 pr-2">
        {events.map((event) => (
          <div 
            key={event.id} 
            className={`text-[10px] border-l-2 ${getSeverityColor(event.severity)} pl-2 py-1`}
          >
            <span className="text-brand opacity-60">{formatTime(event.timestamp)}</span><br/>
            <span className={`font-bold ${getTextColor(event.type)}`}>
              {event.type.toUpperCase()}
            </span> - {event.message}
          </div>
        ))}
      </div>
    </section>
  );
}
