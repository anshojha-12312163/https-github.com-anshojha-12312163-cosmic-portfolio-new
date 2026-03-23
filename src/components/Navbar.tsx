import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';

const Navbar = () => {
  const links = ['About', 'Skills', 'Projects', 'Education', 'Certificates', 'Contact'];
  const navRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverX, setHoverX] = useState<number | null>(null);
  
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  const scrollTo = (id: string, index: number) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty('--spotlight-x', `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;
        animate(spotlightX.current, targetX, {
          type: 'spring',
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty('--spotlight-x', `${v}px`);
          }
        });
      }
    };

    nav.addEventListener('mousemove', handleMouseMove);
    nav.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      nav.removeEventListener('mousemove', handleMouseMove);
      nav.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;
      animate(ambienceX.current, targetX, {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty('--ambience-x', `${v}px`);
        },
      });
    }
  }, [activeIndex]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="w-full flex items-center justify-between">
        <a
          href="#"
          className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          data-hover
        >
          AO
        </a>
        <div 
          ref={navRef}
          className="hidden md:flex items-center gap-2 relative h-11 px-2 rounded-full glass overflow-hidden"
          style={{
            boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
          }}
        >
          {/* Spotlight effect (follows mouse) */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] transition-opacity duration-300"
            style={{
              opacity: hoverX !== null ? 1 : 0,
              background: `radial-gradient(120px circle at var(--spotlight-x) 50%, rgba(0,245,255,0.15) 0%, transparent 50%)`
            }}
          />
          
          {/* Active state ambience */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]"
            style={{
              background: `radial-gradient(60px circle at var(--ambience-x) 0%, rgba(0,245,255,1) 0%, transparent 100%)`
            }}
          />
          
          {/* Bottom border track */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/20 z-0" />
          
          {/* Nav links */}
          <div className="relative flex items-center gap-0 z-[10]">
            {links.map((link, index) => (
              <button
                key={link}
                data-index={index}
                onClick={() => scrollTo(link, index)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-full transition-colors duration-200 ${
                  activeIndex === index
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
                data-hover
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
