import { useEffect, useRef, useState } from 'react';

const education = [
  {
    institution: 'Lovely Professional University',
    location: 'Punjab, India',
    degree: 'B.Tech – Computer Science & Engineering',
    grade: 'CGPA: 6.4',
    period: "Aug '23 – Jun '27",
    icon: '🎓',
    highlight: true,
  },
  {
    institution: "St. Xavier's School",
    location: 'Ballia, Uttar Pradesh',
    degree: 'Intermediate (12th)',
    grade: 'Percentage: 69%',
    period: "Apr '21 – Mar '22",
    icon: '📚',
    highlight: false,
  },
];

const EducationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="relative py-24 grid-overlay">
      <div className="w-full px-8 lg:px-16 xl:px-20">
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-12 scroll-reveal">
          Education
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-primary/20" />

          <div className="space-y-12">
            {education.map((edu, i) => (
              <div
                key={edu.institution}
                className={`relative flex flex-col md:flex-row items-start gap-6 scroll-reveal ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10" 
                  style={{
                    boxShadow: inView ? '0 0 12px hsl(174, 100%, 50%, 0.5)' : 'none',
                    transition: 'box-shadow 0.6s ease',
                    transitionDelay: `${i * 0.3}s`,
                  }}
                />

                {/* Content card */}
                <div className={`ml-14 md:ml-0 md:w-[45%] ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className={`clip-futuristic bg-card border ${edu.highlight ? 'border-primary/30' : 'border-border'} p-6 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_0_30px_hsl(174,100%,50%,0.08)] transition-all duration-400`}>
                    {edu.highlight && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-gold" />
                    )}
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{edu.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-display text-base font-bold text-foreground">{edu.institution}</h3>
                        <p className="font-mono text-xs text-primary/70 tracking-wider mt-0.5">{edu.location}</p>
                        <p className="font-body text-base text-foreground/70 mt-2">{edu.degree}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                          <span className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded font-mono text-xs text-primary">
                            {edu.grade}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">{edu.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
