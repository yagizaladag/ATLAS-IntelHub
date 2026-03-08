export default function RadarWidget() {
  return (
    <div className="relative w-full aspect-square border border-tactical-border rounded-full overflow-hidden flex items-center justify-center bg-black/40">
      <div className="absolute inset-0 border border-brand/10 rounded-full scale-75"></div>
      <div className="absolute inset-0 border border-brand/10 rounded-full scale-50"></div>
      <div className="absolute inset-0 border border-brand/10 rounded-full scale-25"></div>
      <div className="absolute top-1/2 left-0 w-full h-px bg-brand/10"></div>
      <div className="absolute top-0 left-1/2 w-px h-full bg-brand/10"></div>
      <div className="absolute top-1/2 left-1/2 w-[140%] h-[140%] origin-top-left -translate-x-[0%] -translate-y-[0%] bg-gradient-to-tr from-brand/20 via-transparent to-transparent animate-radar" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}></div>
      <div className="w-1.5 h-1.5 bg-brand rounded-full absolute top-[30%] left-[60%] shadow-[0_0_10px_rgba(13,242,242,1)]"></div>
      <div className="w-1 h-1 bg-red-500 rounded-full absolute top-[70%] left-[20%] animate-pulse"></div>
      <span className="absolute bottom-2 text-[8px] font-mono text-brand/50">LOCAL SIGNAL SCANNER</span>
    </div>
  );
}
