import { useEffect, useRef, useState } from 'react';

const skills = [
  { name: 'Programming Languages', pct: 90, emoji: '💻', tags: ['Java', 'C++', 'JavaScript', 'Python'] },
  { name: 'Web Technologies', pct: 88, emoji: '🌐', tags: ['HTML5', 'CSS3', 'React.js', 'RESTful APIs', 'Flask'] },
  { name: 'Databases', pct: 85, emoji: '🗄️', tags: ['MySQL', 'PostgreSQL', 'MongoDB'] },
  { name: 'Big Data', pct: 80, emoji: '📊', tags: ['Apache Hadoop', 'Apache Hive'] },
  { name: 'Cloud & DevOps', pct: 82, emoji: '☁️', tags: ['Docker', 'Kubernetes', 'Git', 'CI/CD'] },
  { name: 'Machine Learning', pct: 85, emoji: '🤖', tags: ['ML', 'Data Analysis', 'EDA', 'Power BI'] },
  { name: 'Tools', pct: 88, emoji: '🛠️', tags: ['Jupyter', 'Power BI', 'Postman', 'VS Code', 'GitHub'] },
  { name: 'Soft Skills', pct: 90, emoji: '🧠', tags: ['Problem-Solving', 'Team Work', 'Adaptability', 'Communication'] },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative min-h-screen flex items-center py-24 grid-overlay">
      <div className="w-full px-8 lg:px-16 xl:px-20">
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-12 scroll-reveal">
          Skills & Expertise
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="clip-futuristic bg-card border border-border p-6 group hover:-translate-y-1.5 hover:shadow-[0_0_30px_hsl(174,100%,50%,0.08)] transition-all duration-400 scroll-reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="text-4xl mb-3">{skill.emoji}</div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">{skill.name}</h3>

              {/* Progress bar */}
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                  style={{ width: animate ? `${skill.pct}%` : '0%' }}
                />
              </div>
              <div className="font-mono text-sm text-muted-foreground mb-4">{skill.pct}%</div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 border border-primary/20 rounded font-mono text-xs text-primary/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
