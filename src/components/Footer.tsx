const Footer = () => (
  <footer className="relative z-10 py-8 border-t border-border">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <p className="font-display text-xs tracking-[0.3em] text-foreground/70 uppercase">
        Ansh Ojha · B.Tech CSE @ LPU · Built with Passion & Code
      </p>
      <div className="flex justify-center gap-6 mt-4">
        <a
          href="https://github.com/anshojha-12312163"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] text-foreground/60 hover:text-primary transition-colors duration-300 uppercase tracking-wider"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/anshojha45"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] text-foreground/60 hover:text-primary transition-colors duration-300 uppercase tracking-wider"
        >
          LinkedIn
        </a>
        <a
          href="mailto:anshojha420@gmail.com"
          className="font-mono text-[10px] text-foreground/60 hover:text-primary transition-colors duration-300 uppercase tracking-wider"
        >
          Email
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
