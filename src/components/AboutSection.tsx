import { useEffect, useRef, useState } from 'react';

const terminalLines = [
  '>>> ansh = Developer()',
  '>>> ansh.name',
  '"Ansh Ojha"',
  '>>> ansh.education',
  '"B.Tech CSE @ LPU (2023-2027)"',
  '>>> ansh.experience',
  '"Fiverr Freelancer | 15+ Projects | 4⭐ Rating"',
  '>>> ansh.languages',
  '["Java", "C++", "JavaScript", "Python"]',
  '>>> ansh.passion',
  '"Building scalable apps & solving real-world problems"',
];

const stats = [
  { label: 'Projects Built', value: '15+', color: 'from-primary to-primary' },
  { label: 'Languages', value: '4+', color: 'from-secondary to-secondary' },
  { label: 'Certifications', value: '4+', color: 'from-accent to-accent' },
  { label: 'Client Retention', value: '95%', color: 'from-gold to-gold' },
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
    <section id="about" ref={sectionRef} className="relative min-h-screen flex items-center py-32 grid-overlay">
      <div className="w-full px-8 lg:px-16 xl:px-20">
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-16 scroll-reveal">
          About Me
        </h2>
        
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left - Main Content (3 columns) */}
          <div className="lg:col-span-3 space-y-10">
            <div className="space-y-6">
              <p className="font-body text-xl md:text-2xl text-foreground leading-relaxed scroll-reveal">
                I'm a B.Tech Computer Science & Engineering student at Lovely Professional University with a passion 
                for delivering high-quality software solutions. As a Fiverr freelancer, I've successfully delivered 
                15+ end-to-end web & mobile applications for international clients, maintaining a 4-star rating and 
                95% client retention rate.
              </p>
              <p className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed scroll-reveal">
                With expertise in Java, C++, JavaScript, and Python, I specialize in full-stack development, machine 
                learning, data analysis, and big data technologies. I'm passionate about building scalable, 
                business-aligned applications and continuously expanding my technical skillset through hands-on projects 
                and competitive programming.
              </p>
            </div>

            {/* Terminal */}
            <div className="clip-futuristic bg-card border border-border p-6 font-mono text-sm md:text-base scroll-reveal">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-gold/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
              </div>
              <div className="space-y-2">
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

            {/* Key Highlights */}
            <div className="space-y-4 scroll-reveal">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                <span className="text-secondary">›</span> Key Highlights
              </h3>
              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 bg-card/50 border border-border/50 rounded-lg hover:border-primary/30 transition-colors">
                  <div className="text-primary text-2xl">💼</div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-foreground mb-1">Freelance Developer</h4>
                    <p className="text-foreground/70 text-base">15+ projects delivered with 95% client retention on Fiverr</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-card/50 border border-border/50 rounded-lg hover:border-secondary/30 transition-colors">
                  <div className="text-secondary text-2xl">💻</div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-foreground mb-1">Full-Stack Developer</h4>
                    <p className="text-foreground/70 text-base">React.js, Node.js, Flask, RESTful APIs, Docker</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-card/50 border border-border/50 rounded-lg hover:border-gold/30 transition-colors">
                  <div className="text-gold text-2xl">🤖</div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-foreground mb-1">ML & Data Analyst</h4>
                    <p className="text-foreground/70 text-base">Machine Learning, Big Data (Hadoop), Power BI, EDA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Stats (2 columns) */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 lg:sticky lg:top-32">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="clip-futuristic bg-card border border-border p-8 relative overflow-hidden group hover:-translate-y-1.5 hover:shadow-lg transition-all duration-400 scroll-reveal"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${stat.color}`} />
                  <div className="font-display text-5xl md:text-6xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="font-mono text-sm uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                  <div className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
