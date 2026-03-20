import { useEffect, useRef, useState } from 'react';

const skills = [
  { name: 'Machine Learning', pct: 92, emoji: '🤖', tags: ['Scikit-learn', 'XGBoost', 'MLflow'] },
  { name: 'Deep Learning', pct: 88, emoji: '🧠', tags: ['TensorFlow', 'PyTorch', 'Keras'] },
  { name: 'Data Science', pct: 95, emoji: '📊', tags: ['Pandas', 'NumPy', 'SQL'] },
  { name: 'NLP & LLMs', pct: 82, emoji: '💬', tags: ['BERT', 'LangChain', 'Transformers'] },
  { name: 'Computer Vision', pct: 78, emoji: '👁️', tags: ['OpenCV', 'YOLO', 'CNNs'] },
  { name: 'MLOps & Cloud', pct: 74, emoji: '☁️', tags: ['Docker', 'AWS', 'FastAPI'] },
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
      <div className="max-w-6xl mx-auto px-6 w-full">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 scroll-reveal">
          <span className="text-primary">//</span> Skills & Expertise
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="clip-futuristic bg-card border border-border p-6 group hover:-translate-y-1.5 hover:shadow-[0_0_30px_hsl(174,100%,50%,0.08)] transition-all duration-400 scroll-reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="text-3xl mb-3">{skill.emoji}</div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-4">{skill.name}</h3>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                  style={{ width: animate ? `${skill.pct}%` : '0%' }}
                />
              </div>
              <div className="font-mono text-[10px] text-muted-foreground mb-4">{skill.pct}%</div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 border border-primary/20 rounded font-mono text-[10px] text-primary/80"
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
