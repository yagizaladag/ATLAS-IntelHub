'use client';

import { useEffect } from 'react';
import Header from '@/components/Header/Header';
import MapView from '@/components/MapView/MapView';
import OSINTTools from '@/components/OSINTTools/OSINTTools';
import EventFeed from '@/components/EventFeed/EventFeed';
import AssetTracker from '@/components/AssetTracker/AssetTracker';
import RadarWidget from '@/components/RadarWidget/RadarWidget';
import { useAppStore } from '@/store/useAppStore';

export default function Home() {
  const { setMetrics } = useAppStore();

  useEffect(() => {
    // Simulate system metrics updates
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.random() * 30 + 10,
        memory: Math.random() * 2 + 1,
        network: Math.random() * 200 + 300,
        activeConnections: Math.floor(Math.random() * 20) + 5,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [setMetrics]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden select-none">
      {/* Scanline Animation Layer */}
      <div className="scanline-overlay"></div>
      <div className="fixed top-0 left-0 w-full h-1 bg-brand opacity-10 animate-scanline pointer-events-none z-50"></div>
      
      {/* Main Header */}
      <Header />
      
      {/* Main Console Area */}
      <main className="flex-1 flex overflow-hidden relative grid-bg">
        {/* LEFT PANEL: OSINT Tools */}
        <aside className="w-80 border-r border-tactical-border bg-tactical-bg/80 backdrop-blur-sm p-4 flex flex-col gap-4 overflow-y-auto z-30">
          <OSINTTools />
          
          {/* Radar Display */}
          <RadarWidget />
        </aside>

        {/* CENTER: Interactive Map */}
        <MapView />

        {/* RIGHT PANEL: Event Feed & Targets */}
        <aside className="w-80 border-l border-tactical-border bg-tactical-bg/80 backdrop-blur-sm flex flex-col z-30">
          <EventFeed />
          <AssetTracker />
        </aside>
      </main>

      {/* Footer / Status Bar */}
      <footer className="h-8 border-t border-tactical-border bg-tactical-panel flex items-center justify-between px-6 text-[9px] font-mono z-40">
        <div className="flex gap-4 uppercase">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> CPU: 14%
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> MEM: 2.1GB
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-brand rounded-full"></span> NET: 450MB/S
          </div>
        </div>
        <div className="opacity-60">
          DECRYPTING STREAM... [88%] | PING: 14ms | LOCAL_TZ: +0000
        </div>
      </footer>
    </div>
  );
}
