import { useEffect, useRef } from 'react';

const techStack = [
  { name: 'Java', color: '#f89820', bgGradient: 'from-orange-500/10 to-red-500/10' },
  { name: 'C++', color: '#00599C', bgGradient: 'from-blue-600/10 to-blue-800/10' },
  { name: 'JavaScript', color: '#F7DF1E', bgGradient: 'from-yellow-400/10 to-yellow-600/10' },
  { name: 'Python', color: '#3776AB', bgGradient: 'from-blue-500/10 to-yellow-500/10' },
  { name: 'React.js', color: '#61DAFB', bgGradient: 'from-cyan-400/10 to-blue-500/10' },
  { name: 'Node.js', color: '#339933', bgGradient: 'from-green-500/10 to-green-700/10' },
  { name: 'Docker', color: '#2496ED', bgGradient: 'from-blue-400/10 to-blue-600/10' },
  { name: 'MongoDB', color: '#47A248', bgGradient: 'from-green-400/10 to-green-600/10' },
  { name: 'MySQL', color: '#4479A1', bgGradient: 'from-blue-500/10 to-orange-500/10' },
  { name: 'Git', color: '#F05032', bgGradient: 'from-orange-500/10 to-red-600/10' },
  { name: 'Hadoop', color: '#FF7F00', bgGradient: 'from-yellow-500/10 to-orange-600/10' },
  { name: 'Flask', color: '#000000', bgGradient: 'from-gray-700/10 to-gray-900/10' },
  { name: 'PostgreSQL', color: '#336791', bgGradient: 'from-blue-600/10 to-blue-800/10' },
  { name: 'Power BI', color: '#F2C811', bgGradient: 'from-yellow-400/10 to-yellow-600/10' },
  { name: 'Kubernetes', color: '#326CE5', bgGradient: 'from-blue-500/10 to-indigo-600/10' },
];

const TechStackSlider = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollerInner = scroller.querySelector('.scroller-inner');
    if (scrollerInner) {
      const scrollerContent = Array.from(scrollerInner.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerInner.appendChild(duplicatedItem);
      });
    }
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="relative w-full px-8 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="text-center mb-12 scroll-reveal">
          <div className="inline-block mb-3">
            <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full font-mono text-xs text-primary uppercase tracking-wider">
              Tech Stack
            </span>
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Technologies & Tools
          </h3>
          <p className="font-body text-base text-foreground/60 max-w-2xl mx-auto">
            Leveraging cutting-edge technologies to build scalable and efficient solutions
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div ref={scrollerRef} className="scroller relative overflow-hidden py-4">
            <div className="scroller-inner flex gap-6 animate-scroll-smooth">
              {techStack.map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className={`group flex-shrink-0 relative flex flex-col items-center justify-center gap-3 p-6 min-w-[160px] bg-gradient-to-br ${tech.bgGradient} backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/40 hover:shadow-[0_0_30px_rgba(0,245,255,0.1)] transition-all duration-500 hover:-translate-y-2`}
                >
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ 
                      background: `radial-gradient(circle at center, ${tech.color}15, transparent 70%)` 
                    }}
                  />
                  
                  {/* Tech name with color accent */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center font-display text-2xl font-bold transition-transform duration-500 group-hover:scale-110"
                      style={{ 
                        background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}10)`,
                        color: tech.color,
                        boxShadow: `0 4px 20px ${tech.color}20`
                      }}
                    >
                      {tech.name.charAt(0)}
                    </div>
                    <span className="font-mono text-sm font-semibold text-foreground/90 whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>

                  {/* Animated border on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div 
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${tech.color}30, transparent)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-8 flex justify-center">
          <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </div>

      <style>{`
        @keyframes scroll-smooth {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-smooth {
          animation: scroll-smooth 40s linear infinite;
        }

        .scroller:hover .animate-scroll-smooth {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TechStackSlider;
