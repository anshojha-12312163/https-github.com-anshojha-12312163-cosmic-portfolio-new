const projects = [
  {
    num: '01',
    category: 'Computer Vision',
    title: 'Real-Time Object Detection',
    desc: 'High-performance object detection system achieving 60fps inference with custom-trained YOLOv8 models for industrial inspection.',
    tags: ['YOLOv8', 'PyTorch', 'OpenCV', 'FastAPI'],
  },
  {
    num: '02',
    category: 'NLP',
    title: 'Sentiment Analysis at Scale',
    desc: 'Enterprise-grade sentiment analysis pipeline processing 100K+ reviews daily with fine-tuned BERT and explainable AI via SHAP.',
    tags: ['BERT', 'Transformers', 'SHAP', 'AWS'],
  },
  {
    num: '03',
    category: 'Predictive Analytics',
    title: 'Customer Churn Prediction',
    desc: 'ML system reducing customer churn by 23% using gradient-boosted trees with automated retraining and model monitoring.',
    tags: ['XGBoost', 'Sklearn', 'MLflow', 'Streamlit'],
  },
  {
    num: '04',
    category: 'Generative AI',
    title: 'RAG Document QA System',
    desc: 'Retrieval-augmented generation system enabling natural language queries over enterprise document repositories.',
    tags: ['LangChain', 'FAISS', 'OpenAI', 'Pinecone'],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative min-h-screen flex items-center py-24 grid-overlay">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 scroll-reveal">
          <span className="text-primary">//</span> Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj, i) => (
            <div
              key={proj.num}
              className="clip-futuristic bg-card border border-border p-8 relative overflow-hidden group hover:-translate-y-1.5 hover:shadow-[0_0_40px_hsl(174,100%,50%,0.1)] hover:border-primary/30 transition-all duration-400 scroll-reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
              data-hover
            >
              {/* Ghost number */}
              <span className="absolute top-4 right-6 font-display text-7xl font-black text-foreground/[0.03] select-none">
                {proj.num}
              </span>

              <span className="inline-block px-2 py-0.5 bg-secondary/10 border border-secondary/20 rounded font-mono text-[10px] text-secondary uppercase tracking-wider mb-4">
                {proj.category}
              </span>

              <h3 className="font-display text-lg font-bold text-foreground mb-3">{proj.title}</h3>
              <p className="font-body text-sm text-foreground/60 leading-relaxed mb-6">{proj.desc}</p>

              <div className="flex flex-wrap gap-2">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-secondary/5 border border-secondary/15 rounded font-mono text-[10px] text-secondary/80"
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

export default ProjectsSection;
