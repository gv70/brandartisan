import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import logoImage from "@assets/Senza titolo (19)_1756559098695.png";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-cream/95 backdrop-blur-sm border-b border-subtle/20" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto container-spacing py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center" data-testid="logo">
            <img 
              src={logoImage} 
              alt="Mathilde Studio" 
              className="h-16 w-auto object-contain"
            />
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <button
              onClick={() => scrollToSection('collezioni')}
              className="hover:text-green-primary transition-colors"
              data-testid="nav-collezioni"
            >
              Collezioni
            </button>
            <button
              onClick={() => scrollToSection('su-misura')}
              className="hover:text-green-primary transition-colors"
              data-testid="nav-su-misura"
            >
              Su misura
            </button>
            <button
              onClick={() => scrollToSection('chi-siamo')}
              className="hover:text-green-primary transition-colors"
              data-testid="nav-chi-siamo"
            >
              Chi siamo
            </button>
            <button
              onClick={() => scrollToSection('contatti')}
              className="hover:text-green-primary transition-colors"
              data-testid="nav-contatti"
            >
              Contatti
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
