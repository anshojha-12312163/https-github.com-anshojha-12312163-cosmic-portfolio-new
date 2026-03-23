import { useEffect, useState } from 'react';

const pills = ['JAVA', 'C++', 'JAVASCRIPT', 'PYTHON', 'REACT.JS', 'ML/AI'];

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-overlay pt-24">
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Profile Photo */}
        <div
          className={`flex justify-center mb-10 transition-all duration-700 delay-100 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="relative flex items-center justify-center">
            {/* Animated Glow Border Effect */}
            <div
              className="absolute rounded-full"
              style={{
                width: '430px',
                height: '430px',
                background: 'conic-gradient(from 0deg, #00f5ff, #a855f7, #ec4899, #f59e0b, #00f5ff)',
                animation: 'spin-glow 4s linear infinite',
                padding: '3px',
                filter: 'blur(8px)',
                opacity: 0.8,
              }}
            />
            {/* Solid Border Container */}
            <div
              className="absolute rounded-full bg-background"
              style={{
                width: '424px',
                height: '424px',
              }}
            />
            {/* Inner Glow Ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: '420px',
                height: '420px',
                background: 'conic-gradient(from 0deg, rgba(0,245,255,0.6), rgba(168,85,247,0.6), rgba(236,72,153,0.6), rgba(245,158,11,0.6), rgba(0,245,255,0.6))',
                animation: 'spin-glow 4s linear infinite',
                padding: '2px',
              }}
            />
            {/* Photo */}
            <img
              src="/profile.png"
              alt="Ansh Ojha"
              className="relative rounded-full object-cover"
              style={{
                width: '410px',
                height: '410px',
                objectPosition: 'center center',
                objectFit: 'cover',
                border: '5px solid rgba(0,0,0,0.9)',
                zIndex: 1,
              }}
            />
          </div>
        </div>

        {/* Name with Flip-Fade Animation */}
        <div className="font-display font-black leading-tight" style={{ perspective: "1000px" }}>
          <div className="flex flex-wrap justify-center gap-4">
            {/* ANSH with flip animation */}
            <div className="flex gap-[0.1em]">
              {['A', 'N', 'S', 'H'].map((letter, i) => (
                <span
                  key={`ansh-${i}`}
                  className="inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground"
                  style={{
                    transformStyle: "preserve-3d",
                    animation: loaded ? `flipFadeIn 0.6s ease-out ${0.1 * i}s both` : 'none',
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
            
            {/* OJHA with flip animation - same color as ANSH */}
            <div className="flex gap-[0.1em]">
              {['O', 'J', 'H', 'A'].map((letter, i) => (
                <span
                  key={`ojha-${i}`}
                  className="inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground"
                  style={{
                    transformStyle: "preserve-3d",
                    animation: loaded ? `flipFadeIn 0.6s ease-out ${0.4 + 0.1 * i}s both` : 'none',
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Badge */}
        <div
          className={`inline-block mt-4 mb-2 px-4 py-1.5 border border-primary/30 rounded-full font-mono text-xs text-primary tracking-wider transition-all duration-700 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          FREELANCER · JAVA DEVELOPER · DATA ANALYST · ML ENTHUSIAST
        </div>

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
          B.Tech CSE @ Lovely Professional University · 15+ Projects Delivered · 4⭐ Fiverr Rating
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-wrap justify-center gap-4 mt-8 transition-all duration-700 delay-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={handleViewProjects}
            className="clip-btn px-8 py-3 bg-gradient-to-r from-primary to-secondary font-display text-xs uppercase tracking-widest text-primary-foreground hover:shadow-[0_0_30px_hsl(174,100%,50%,0.3)] transition-all duration-300"
            data-hover
          >
            View Projects
          </button>
          <a
            href="/resume.pdf"
            download="Ansh_Ojha_Resume.pdf"
            className="clip-btn px-8 py-3 border border-gold/40 font-display text-xs uppercase tracking-widest text-gold hover:bg-gold/10 transition-all duration-300 inline-flex items-center gap-2"
            data-hover
          >
            <span>Download Resume</span>
            <span>↓</span>
          </a>
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
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes spin-glow { to { transform: rotate(360deg); } }
        @keyframes flipFadeIn {
          0% {
            transform: rotateX(90deg);
            opacity: 0;
            filter: blur(8px);
            transform-origin: center bottom;
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
            filter: blur(0px);
            transform-origin: center bottom;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
