import { useEffect, useRef, useState } from 'react';

const certificates = [
  { 
    name: 'SQL (Advanced) - HackerRank', 
    date: "Jan '26 – Feb '26", 
    icon: '🗄️',
    link: 'https://www.hackerrank.com/certificates/57aecec2e18c',
    image: '/certificates/sql-hackerrank.png'
  },
  { 
    name: 'Master DSA with Java/C++ - w3grads', 
    date: "Jun '25 – Jul '25", 
    icon: '📐',
    link: 'https://drive.google.com/drive/folders/1yHCYLIFkYbpecLmkalAURZyFvrOWhsBw',
    image: '/certificates/dsa-w3grads.png'
  },
  { 
    name: 'Object-Oriented Programming (OOP) - Imneo', 
    date: "Apr '25 – May '25", 
    icon: '🧩',
    link: 'https://lpucolab438.examly.io/certificate/U2FsdGVkX18wsWYtxFDiN%2B2LzRONGJpTKrYi5adeWnM%3D',
    image: '/certificates/oop-imneo.png'
  },
  { 
    name: 'Responsive Web Design - freeCodeCamp', 
    date: "Aug '23 – Nov '23", 
    icon: '🌐',
    link: 'https://www.freecodecamp.org/certification/fccf2e5ac75-2e82-404f-95f4-25126d416980/responsive-web-design',
    image: '/certificates/freecodecamp-rwd.png'
  },
];

const experience = [
  {
    title: 'Fiverr - Global Freelancing',
    role: 'Freelancer',
    period: "Aug '25 – Present",
    desc: 'Successfully delivered 15+ end-to-end web & mobile apps for international clients, maintaining a 4-star rating. Managed the complete Software Development Life Cycle (SDLC), focusing on scalable e-commerce and business-aligned applications with 95% client retention rate.',
    icon: '�',
  },
  {
    title: 'Java Developer | Data Analysis | Machine Learning',
    role: 'Summer Internship',
    period: "Jun '25 – Jul '25",
    desc: 'College Summer Internship – FLAMES\'25: Trained in DSA using Java/C++ with industrial practices and developed a project implementing core algorithmic concepts.',
    icon: '🎯',
  },
];

const activities = [
  {
    title: 'Competitive Programming & Hackathons',
    desc: 'Secured top positions in college coding competitions and hackathons. Participated in Securities and Exchange Board of India (SEBI) Financial Literacy Quiz and CipherSchools Tech Synergy Coding Event, showcasing competitive coding and technical knowledge.',
    icon: '🏆',
  },
];

const CertificatesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredCert(index);
  };

  const handleMouseLeave = () => {
    setHoveredCert(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certificates" ref={sectionRef} className="relative py-24 grid-overlay">
      <div className="w-full px-8 lg:px-16 xl:px-20">
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-12 scroll-reveal">
          Experience & Certificates
        </h2>

        {/* Experience Section */}
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 scroll-reveal">
          <span className="text-primary">&gt;</span> Professional Experience
        </h3>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {experience.map((exp, i) => (
            <div
              key={exp.title}
              className="clip-futuristic bg-card border border-border p-6 relative overflow-hidden group hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(174,100%,50%,0.08)] transition-all duration-400 scroll-reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{exp.icon}</span>
                <div className="flex-1">
                  <h4 className="font-display text-base font-bold text-foreground mb-1">{exp.title}</h4>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded font-mono text-xs text-primary">
                      {exp.role}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="font-body text-sm text-foreground/70 leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificates Grid */}
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 scroll-reveal">
          <span className="text-secondary">&gt;</span> Certifications
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {certificates.map((cert, i) => (
            <div
              key={cert.name}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
              className="relative h-[320px] scroll-reveal"
              style={{ 
                transitionDelay: `${i * 0.06}s`,
                perspective: '1000px',
              }}
            >
              {/* Card Container with 3D transform */}
              <div className="relative w-full h-full transition-transform duration-700 group" style={{ transformStyle: 'preserve-3d' }}>
                {/* Front Face */}
                <div className="absolute inset-0 clip-futuristic bg-card border border-border overflow-hidden group-hover:opacity-0 transition-opacity duration-700" style={{ backfaceVisibility: 'hidden' }}>
                  {/* Cursor-following spotlight effect */}
                  {hoveredCert === i && (
                    <>
                      <div
                        className="pointer-events-none absolute z-[20] transition-opacity duration-300"
                        style={{
                          left: mousePosition.x,
                          top: mousePosition.y,
                          width: '200px',
                          height: '200px',
                          transform: 'translate(-50%, -50%)',
                          background: 'radial-gradient(circle, rgba(0,245,255,0.2) 0%, transparent 70%)',
                          filter: 'blur(15px)',
                        }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 z-[15] transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(0,0,0,0.4) 100%)`,
                        }}
                      />
                    </>
                  )}

                  {/* Certificate Image Preview */}
                  <div className="relative h-full overflow-hidden bg-muted/50">
                    <img 
                      src={cert.image} 
                      alt={cert.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </div>
                    
                    {/* Front content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="absolute top-2 right-2 text-3xl">{cert.icon}</span>
                      <h3 className="font-display text-sm font-semibold text-foreground leading-snug mb-2">{cert.name}</h3>
                      <span className="font-mono text-xs text-primary/60 block">{cert.date}</span>
                      <p className="font-mono text-xs text-primary/70 mt-2">Hover to view →</p>
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 clip-futuristic bg-card border border-primary/30 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_40px_hsl(174,100%,50%,0.2)]" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="h-full overflow-y-auto p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{cert.icon}</span>
                      <span className="font-mono text-xs text-primary/60">{cert.date}</span>
                    </div>

                    <h3 className="font-display text-base font-bold text-primary mb-4 leading-snug">{cert.name}</h3>
                    
                    {/* Certificate preview image */}
                    <div className="relative h-32 mb-4 rounded overflow-hidden border border-primary/20">
                      <img 
                        src={cert.image} 
                        alt={cert.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors text-sm font-mono group/link mt-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>View Certificate</span>
                      <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 scroll-reveal">
          <span className="text-gold">&gt;</span> Achievements
        </h3>
        <div className="grid gap-6">
          {activities.map((activity, i) => (
            <div
              key={activity.title}
              className={`clip-futuristic bg-card border border-border p-6 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_0_30px_hsl(174,100%,50%,0.08)] transition-all duration-400 scroll-reveal`}
              style={{ 
                transitionDelay: `${i * 0.1}s`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{activity.icon}</span>
                <div>
                  <h4 className="font-display text-base font-bold text-foreground mb-2">{activity.title}</h4>
                  <p className="font-body text-base text-foreground/60 leading-relaxed">{activity.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
