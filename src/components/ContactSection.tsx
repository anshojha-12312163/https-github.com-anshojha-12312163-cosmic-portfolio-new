const socials = [
  { name: 'GitHub', icon: '⌘', href: '#' },
  { name: 'LinkedIn', icon: '◈', href: '#' },
  { name: 'Kaggle', icon: '◆', href: '#' },
  { name: 'Twitter', icon: '✦', href: '#' },
];

const ContactSection = () => {
  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center py-24 grid-overlay">
      <div className="max-w-2xl mx-auto px-6 text-center w-full">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 scroll-reveal">
          Let's Build Something
          <span className="block text-primary">Extraordinary</span>
        </h2>
        <p className="font-body text-foreground/60 mb-12 scroll-reveal">
          Open to collaborations, research opportunities, and interesting ML challenges.
        </p>

        <div className="clip-futuristic glass p-10 relative overflow-hidden scroll-reveal">
          {/* Radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(174,100%,50%,0.05),transparent_70%)]" />

          <div className="relative z-10">
            <a
              href="mailto:anshojha420@gmail.com"
              className="inline-block font-mono text-lg md:text-xl text-primary hover:text-secondary transition-colors duration-300 mb-8"
              data-hover
            >
              anshojha420@gmail.com
            </a>

            <div className="flex justify-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="clip-btn w-12 h-12 flex items-center justify-center border border-border text-foreground/60 hover:border-primary hover:text-primary hover:shadow-[0_0_20px_hsl(174,100%,50%,0.15)] transition-all duration-300 font-mono text-sm"
                  data-hover
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
