import { useEffect, useState } from 'react';

const pills = ['PYTHON', 'NEURAL NETS', 'DATA SCIENCE', 'ML·AI'];

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewProjects = () => {
    window.dispatchEvent(new Event('warp-speed'));
    // Delay scroll to let warp animation play
    setTimeout(() => scrollTo('projects'), 1200);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-overlay">
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className={`inline-block mb-6 px-4 py-1.5 border border-primary/30 rounded-full font-mono text-xs text-primary tracking-wider transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          DATA SCIENTIST · ML ENGINEER · AI RESEARCHER
        </div>

        {/* Name */}
        <h1
          className={`font-display font-black leading-[0.9] transition-all duration-700 delay-200 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground animate-glitch">
            ANSH
          </span>
          <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl bg-gradient-to-r from-primary via-secondary to-gold bg-clip-text text-transparent animate-gradient-cycle animate-glitch">
            OJHA
          </span>
        </h1>

        {/* Floating pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {pills.map((pill, i) => (
            <span
              key={pill}
              className={`px-3 py-1 border border-primary/20 rounded-full font-mono text-[10px] text-primary/70 tracking-wider animate-float transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ animationDelay: `${i * 0.7}s`, transitionDelay: `${0.4 + i * 0.1}s` }}
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <p
          className={`mt-6 font-mono text-sm text-muted-foreground transition-all duration-700 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          anshojha420@gmail.com
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-wrap justify-center gap-4 mt-8 transition-all duration-700 delay-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={() => scrollTo('projects')}
            className="clip-btn px-8 py-3 bg-gradient-to-r from-primary to-secondary font-display text-xs uppercase tracking-widest text-primary-foreground hover:shadow-[0_0_30px_hsl(174,100%,50%,0.3)] transition-all duration-300"
            data-hover
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="clip-btn px-8 py-3 border border-primary/40 font-display text-xs uppercase tracking-widest text-primary hover:bg-primary/10 transition-all duration-300"
            data-hover
          >
            Get In Touch
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-primary/30 relative overflow-hidden">
            <div className="absolute w-full h-3 bg-primary animate-scroll-line" />
          </div>
        </div>
      </div>

      {/* 3D orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] border border-primary/5 rounded-full"
          style={{ animation: 'spin 30s linear infinite', transformStyle: 'preserve-3d', transform: 'rotateX(60deg)' }}
        />
        <div
          className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] border border-secondary/5 rounded-full"
          style={{ animation: 'spin 25s linear infinite reverse', transformStyle: 'preserve-3d', transform: 'rotateX(70deg) rotateY(20deg)' }}
        />
      </div>

      <style>{`
        @keyframes spin { to { transform: rotateX(60deg) rotateZ(360deg); } }
      `}</style>
    </section>
  );
};

export default HeroSection;
