'use client';

import { useAppStore } from '@/store/useAppStore';

export default function AssetTracker() {
  const { assets } = useAppStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-brand';
      case 'offline': return 'bg-brand/30';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-brand/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'ACTIVE';
      case 'offline': return 'OFFLINE';
      case 'warning': return 'WARNING';
      default: return 'UNKNOWN';
    }
  };

  return (
    <section className="h-1/2 border-t border-tactical-border p-4 overflow-hidden flex flex-col">
      <h2 className="text-[10px] font-bold text-brand uppercase tracking-widest mb-3">Asset Tracking</h2>
      <div className="space-y-1 overflow-y-auto pr-2">
        {assets.map((asset) => (
          <div 
            key={asset.id}
            className="flex items-center justify-between p-2 bg-black/40 border border-tactical-border hover:border-brand/50 transition-colors cursor-pointer rounded-custom group"
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 ${getStatusColor(asset.status)} rounded-full`}></div>
              <div>
                <div className="text-[10px] font-bold">{asset.name}</div>
                <div className="text-[8px] opacity-60 font-mono">ID: {asset.id}</div>
              </div>
            </div>
            <div className="text-[9px] font-mono text-brand group-hover:underline">VIEW</div>
          </div>
        ))}
        
        {/* Default assets if none exist */}
        {assets.length === 0 && (
          <>
            <div className="flex items-center justify-between p-2 bg-black/40 border border-tactical-border hover:border-brand/50 transition-colors cursor-pointer rounded-custom group">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand rounded-full"></div>
                <div>
                  <div className="text-[10px] font-bold">MOBILE_UNIT_A</div>
                  <div className="text-[8px] opacity-60 font-mono">ID: 0x9928AF</div>
                </div>
              </div>
              <div className="text-[9px] font-mono text-brand group-hover:underline">VIEW</div>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-black/40 border border-tactical-border hover:border-brand/50 transition-colors cursor-pointer rounded-custom group">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <div className="text-[10px] font-bold">DRONE_ORBIT_01</div>
                  <div className="text-[8px] opacity-60 font-mono">ID: 0x1247BB</div>
                </div>
              </div>
              <div className="text-[9px] font-mono text-brand group-hover:underline">VIEW</div>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-black/40 border border-tactical-border hover:border-brand/50 transition-colors cursor-pointer rounded-custom group">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand/30 rounded-full"></div>
                <div>
                  <div className="text-[10px] font-bold italic">STATIC_RELAY_4</div>
                  <div className="text-[8px] opacity-60 font-mono text-red-400">OFFLINE</div>
                </div>
              </div>
              <div className="text-[9px] font-mono text-brand group-hover:underline">VIEW</div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
