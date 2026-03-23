const contactMethods = [
  { 
    label: 'Email Address', 
    value: 'anshojha420@gmail.com', 
    href: 'mailto:anshojha420@gmail.com',
    icon: '✉️',
    description: 'Preferred method for professional inquiries'
  },
  { 
    label: 'Phone Number', 
    value: '+91 9956126495', 
    href: 'tel:+919956126495',
    icon: '📞',
    description: 'Available Mon-Fri, 9 AM - 6 PM IST'
  },
  { 
    label: 'Location', 
    value: 'Phagwara, Punjab, India', 
    href: null,
    icon: '🌍',
    description: 'Open to remote and on-site opportunities'
  },
];

const socials = [
  { 
    name: 'GitHub', 
    icon: '💻', 
    href: 'https://github.com/anshojha-12312163', 
    label: 'View my repositories and contributions',
    username: '@anshojha-12312163'
  },
  { 
    name: 'LinkedIn', 
    icon: '💼', 
    href: 'https://www.linkedin.com/in/anshojha45', 
    label: 'Connect for professional networking',
    username: 'in/anshojha45'
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="relative min-h-screen flex items-center py-32 grid-overlay">
      <div className="w-full px-8 lg:px-16 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 scroll-reveal">
              Get In Touch
            </h2>
            <p className="font-body text-xl md:text-2xl text-foreground/70 max-w-3xl scroll-reveal leading-relaxed">
              I'm actively seeking internship opportunities and open to collaborating on innovative projects. 
              Whether you have a question, opportunity, or just want to connect, feel free to reach out.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Contact Information */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-8 scroll-reveal">
                Contact Information
              </h3>
              
              <div className="grid gap-6">
                {contactMethods.map((method, i) => (
                  <div
                    key={method.label}
                    className="clip-futuristic bg-card border border-border p-8 group hover:border-primary/40 hover:shadow-[0_0_40px_hsl(174,100%,50%,0.1)] transition-all duration-400 scroll-reveal"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors duration-300">
                        {method.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-sm uppercase tracking-wider text-primary/80 mb-2 font-semibold">
                          {method.label}
                        </h4>
                        {method.href ? (
                          <a
                            href={method.href}
                            className="font-mono text-xl md:text-2xl text-foreground hover:text-primary transition-colors duration-300 block mb-2 break-all"
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="font-mono text-xl md:text-2xl text-foreground mb-2">{method.value}</p>
                        )}
                        <p className="text-base text-foreground/60 leading-relaxed">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Professional Links */}
              <div className="mt-12">
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-8 scroll-reveal">
                  Professional Profiles
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {socials.map((social, i) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clip-futuristic bg-card border border-border p-8 group hover:border-secondary/40 hover:shadow-[0_0_40px_hsl(280,100%,70%,0.1)] transition-all duration-400 scroll-reveal hover:-translate-y-1"
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-2xl group-hover:bg-secondary/20 transition-colors duration-300">
                          {social.icon}
                        </div>
                        <span className="text-2xl text-foreground/30 group-hover:text-secondary group-hover:translate-x-1 transition-all duration-300">
                          →
                        </span>
                      </div>
                      <h4 className="font-display text-xl font-bold text-foreground mb-2">
                        {social.name}
                      </h4>
                      <p className="text-sm text-foreground/60 mb-2">{social.label}</p>
                      <p className="font-mono text-xs text-primary/70">{social.username}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Availability & CTA */}
            <div className="lg:col-span-1 space-y-6">
              {/* Availability Status */}
              <div className="clip-futuristic bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30 p-8 scroll-reveal sticky top-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary animate-ping" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-foreground uppercase tracking-wider">
                    Available for Work
                  </h4>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-lg mt-0.5">✓</span>
                    <p className="text-base text-foreground/80">Internship opportunities</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-lg mt-0.5">✓</span>
                    <p className="text-base text-foreground/80">Freelance projects</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-lg mt-0.5">✓</span>
                    <p className="text-base text-foreground/80">Open source collaboration</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-lg mt-0.5">✓</span>
                    <p className="text-base text-foreground/80">Technical consulting</p>
                  </div>
                </div>

                <div className="border-t border-primary/20 pt-6 mb-6">
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    <span className="font-semibold text-foreground">Response Time:</span> Typically within 24 hours on business days
                  </p>
                </div>

                <a
                  href="mailto:anshojha420@gmail.com"
                  className="clip-btn w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-display text-sm uppercase tracking-widest hover:shadow-[0_0_40px_hsl(174,100%,50%,0.4)] transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <span>Send a Message</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
