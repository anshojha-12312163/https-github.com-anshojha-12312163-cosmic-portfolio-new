const Navbar = () => {
  const links = ['About', 'Skills', 'Projects', 'Contact'];

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 glass z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a
          href="#"
          className="font-display text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          data-hover
        >
          AO
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="font-mono text-xs uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
              data-hover
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
