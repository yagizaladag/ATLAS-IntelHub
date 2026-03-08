'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function Header() {
  const { mouseCoordinates, currentTime, setCurrentTime } = useAppStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [setCurrentTime]);

  const formatTime = (date: Date) => {
    return date.toISOString().split('T')[1].split('.')[0] + ' UTC';
  };

  const formatCoordinates = (coords: { lat: number; lng: number }) => {
    return `LAT: ${coords.lat.toFixed(4)} LON: ${coords.lng.toFixed(4)}`;
  };

  return (
    <header className="h-14 border-b border-tactical-border bg-tactical-bg flex items-center justify-between px-6 z-40">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-brand animate-pulse-fast"></div>
          <h1 className="text-xl font-bold tracking-tighter uppercase">
            ATLAS <span className="font-light opacity-60">OSINT // CORE v4.2</span>
          </h1>
        </div>
        <div className="h-4 w-px bg-tactical-border mx-2"></div>
        <div className="text-[10px] font-mono opacity-60 leading-tight">
          SYSTEM STATUS: <span className="text-green-400">NOMINAL</span><br/>
          SAT_LINK: <span className="text-brand">ESTABLISHED [12]</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6 font-mono text-xs">
        <div className="opacity-80">{formatCoordinates(mouseCoordinates)}</div>
        <div className="text-brand font-bold">{formatTime(currentTime)}</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-brand text-[10px] uppercase hover:bg-brand hover:text-black transition-colors rounded-custom">
            Signal Scan
          </button>
          <button className="px-3 py-1 bg-red-900/20 border border-red-500/50 text-red-500 text-[10px] uppercase hover:bg-red-500 hover:text-white transition-colors rounded-custom">
            Emergency
          </button>
        </div>
      </div>
    </header>
  );
}
