import { useEffect, useRef, useState } from 'react';

const terminalLines = [
  '>>> ansh = DataScientist()',
  '>>> ansh.name',
  '"Ansh Ojha"',
  '>>> ansh.skills',
  '["Python", "TensorFlow", "PyTorch", "NLP"]',
  '>>> ansh.passion',
  '"Building intelligent systems that matter"',
];

const stats = [
  { label: 'ML Projects', value: '15+', color: 'from-primary to-primary' },
  { label: 'Model Accuracy', value: '95%', color: 'from-secondary to-secondary' },
  { label: 'Algorithms', value: '8+', color: 'from-accent to-accent' },
  { label: 'Years Exp', value: '3+', color: 'from-gold to-gold' },
];

const AboutSection = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= terminalLines.length) { clearInterval(interval); return prev; }
        return prev + 1;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen flex items-center py-24 grid-overlay">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 scroll-reveal">
          <span className="text-primary">//</span> About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Left */}
          <div className="space-y-8">
            <p className="font-body text-foreground/80 leading-relaxed scroll-reveal">
              I'm a Data Scientist and ML Engineer with a deep passion for transforming raw data into 
              intelligent, impactful systems. I specialize in building end-to-end machine learning pipelines, 
              from data wrangling to production-ready deployments.
            </p>

            {/* Terminal */}
            <div className="clip-futuristic bg-card border border-border p-4 font-mono text-xs scroll-reveal">
              <div className="flex gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-gold/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
              </div>
              <div className="space-y-1">
                {terminalLines.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className={line.startsWith('>>>') ? 'text-primary' : 'text-foreground/70'}>
                    {line}
                  </div>
                ))}
                {visibleLines < terminalLines.length && (
                  <span className="text-primary animate-blink">▊</span>
                )}
              </div>
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="clip-futuristic bg-card border border-border p-6 relative overflow-hidden group hover:-translate-y-1.5 transition-all duration-400 scroll-reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${stat.color}`} />
                <div className="font-display text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
