import { useState } from 'react';

const projects = [
  {
    num: '01',
    category: 'AI Platform',
    title: 'Vedix AI — AI Platform Developer',
    desc: 'Built an advanced AI platform with an interactive dashboard using React.js and Node.js, enabling multimodal AI features like chat, code generation, and document analysis. Implemented Machine Learning and data analysis capabilities for intelligent responses, real-time web search, and automated insights.',
    tags: ['Python', 'React.js', 'Flask', 'ML', 'Deep Learning', 'NLP', 'REST APIs', 'Docker'],
    date: "Feb '26",
    link: 'https://github.com/anshojha-12312163',
    image: '/projects/vedix-ai.png',
  },
  {
    num: '02',
    category: 'Smart City',
    title: 'SmartCity AI – Intelligent Urban Traffic & Monitoring Dashboard',
    desc: 'Developed a real-time Smart City monitoring dashboard using React.js and Express.js, integrating IoT sensor data, traffic analytics, and live system alerts. Implemented AI/ML-based traffic flow prediction and data analysis, processing urban traffic and air-quality data.',
    tags: ['Python', 'JavaScript', 'React.js', 'Node.js', 'Apache Hadoop', 'Power BI', 'MySQL'],
    date: "Dec '25",
    link: 'https://github.com/anshojha-12312163',
    image: '/projects/smartcity-ai.png',
  },
  {
    num: '03',
    category: 'Data Analytics',
    title: 'Customer, Product & Revenue Analytics Dashboard',
    desc: 'Developed an interactive analytics dashboard using Microsoft Power BI to analyze customer behavior, product performance, and revenue trends for data-driven decision-making. Cleaned and transformed data using Power Query, implemented data modeling with relationships, and created KPIs.',
    tags: ['Power BI', 'Power Query', 'DAX', 'Data Modeling'],
    date: "Oct '25",
    link: 'https://github.com/anshojha-12312163',
    image: '/projects/analytics-dashboard.png',
  },
];

const ProjectsSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section id="projects" className="relative min-h-screen flex items-center py-24 grid-overlay">
      <div className="w-full px-8 lg:px-16 xl:px-20">
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-12 scroll-reveal">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj, i) => (
            <div
              key={proj.num}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
              className="relative h-[500px] scroll-reveal"
              style={{ 
                transitionDelay: `${i * 0.1}s`,
                perspective: '1000px',
              }}
              data-hover
            >
              {/* Card Container with 3D transform */}
              <div className="relative w-full h-full transition-transform duration-700 group" style={{ transformStyle: 'preserve-3d' }}>
                {/* Front Face */}
                <div className="absolute inset-0 clip-futuristic bg-card border border-border overflow-hidden group-hover:opacity-0 transition-opacity duration-700" style={{ backfaceVisibility: 'hidden' }}>
                  {/* Cursor-following spotlight effect */}
                  {hoveredCard === i && (
                    <>
                      <div
                        className="pointer-events-none absolute z-[20] transition-opacity duration-300"
                        style={{
                          left: mousePosition.x,
                          top: mousePosition.y,
                          width: '300px',
                          height: '300px',
                          transform: 'translate(-50%, -50%)',
                          background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)',
                          filter: 'blur(20px)',
                        }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 z-[15] transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(0,0,0,0.3) 100%)`,
                        }}
                      />
                    </>
                  )}

                  {/* Project Image */}
                  <div className="relative h-full overflow-hidden bg-muted">
                    <img 
                      src={proj.image} 
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />
                    
                    {/* Front content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <span className="inline-block px-2 py-0.5 bg-secondary/10 border border-secondary/20 rounded font-mono text-[10px] text-secondary uppercase tracking-wider mb-3">
                        {proj.category}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">{proj.title}</h3>
                      <p className="font-mono text-xs text-primary/70">Hover to see details →</p>
                    </div>

                    {/* Ghost number */}
                    <span className="absolute top-4 right-6 font-display text-7xl font-black text-foreground/[0.08] select-none">
                      {proj.num}
                    </span>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 clip-futuristic bg-card border border-primary/30 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_40px_hsl(174,100%,50%,0.2)]" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="h-full overflow-y-auto p-8 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-block px-2 py-0.5 bg-secondary/20 border border-secondary/40 rounded font-mono text-[10px] text-secondary uppercase tracking-wider">
                        {proj.category}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">{proj.date}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-primary mb-4">{proj.title}</h3>
                    <p className="font-body text-sm text-foreground/85 leading-relaxed mb-6 flex-grow">{proj.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-secondary/10 border border-secondary/30 rounded font-mono text-xs text-secondary/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors text-sm font-mono group/link mt-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>View Project</span>
                        <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default ProjectsSection;
