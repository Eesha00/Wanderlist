import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-105"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        {/* Subtle overlay to make the card pop */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* The Card: Smaller Size, but CORRECT Contrast */}
      <div className="relative z-10 glass-card p-10 md:p-12 rounded-3xl max-w-lg w-full text-center animate-fade-in-up shadow-2xl backdrop-blur-md bg-white/80 border border-white/40">
        
        <p className="text-[10px] tracking-[0.4em] uppercase text-forest/60 mb-6 font-medium">
          The Art of Travel
        </p>

        {/* RESTORED: Forest Green & Clay Colors */}
        <h1 className="font-serif text-5xl md:text-6xl text-forest mb-4 leading-tight">
          Collect moments,<br />
          <span className="italic font-light text-clay text-4xl md:text-5xl block mt-2">not things.</span>
        </h1>

        <p className="text-sm md:text-base text-forest/80 mb-8 max-w-xs mx-auto leading-relaxed font-light">
          Your quiet digital sanctuary to plan, dream, and remember your journeys.
        </p>

        {/* RESTORED: Forest Green Button */}
        <div className="flex justify-center">
          <Link 
            href="/register" 
            className="bg-forest text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-forest/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-wide"
          >
            Begin Journey
          </Link>
        </div>
      </div>
    </main>
  );
}