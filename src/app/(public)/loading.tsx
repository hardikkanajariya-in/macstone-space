export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md transition-opacity duration-300">
      <div className="relative flex items-center justify-center">
        {/* Animated premium spin ring */}
        <div className="w-16 h-16 rounded-full border border-accent/10 border-t-accent animate-spin" style={{ animationDuration: "1.2s" }} />
        
        {/* Logo Monogram Center */}
        <div className="absolute flex items-center justify-center">
          <img
            src="/logo-icon-transparet.png"
            alt="Loading..."
            className="w-8 h-8 object-contain"
          />
        </div>
      </div>
      
      {/* Editorial Loading Text */}
      <p className="text-[9px] uppercase tracking-[0.3em] text-accent-light/80 mt-6 animate-pulse">
        Refining Portfolio
      </p>
    </div>
  );
}
