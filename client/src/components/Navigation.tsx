import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/Senza titolo (19)_1756559098695.png";
import MinimalContactDialog from "@/components/ui/MinimalContactDialog";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-cream border-b border-subtle/20" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto container-spacing py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center" data-testid="logo">
            <img 
              src={logoImage} 
              alt="Mathilde Studio" 
              className={cn(
                "h-[130px] w-auto object-contain transition-all duration-300",
                isScrolled ? "brightness-0" : "brightness-100"
              )}
            />
          </div>
          {/* Desktop Navigation */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-[180px] left-4 right-4 bg-cream border border-sand rounded-2xl shadow-2xl z-50 md:hidden overflow-hidden">
            <div className="p-6 space-y-6">
              {/* Navigation Links */}
              <div className="space-y-4">
                <button
                  onClick={() => scrollToSection('collezioni')}
                  className="block w-full text-left text-lg font-medium text-text-primary hover:text-green-primary transition-colors py-2"
                  data-testid="mobile-nav-collezioni"
                >
                  Collezioni
                </button>
                <button
                  onClick={() => scrollToSection('su-misura')}
                  className="block w-full text-left text-lg font-medium text-text-primary hover:text-green-primary transition-colors py-2"
                  data-testid="mobile-nav-su-misura"
                >
                  Su misura
                </button>
                <button
                  onClick={() => scrollToSection('regalo-unicita')}
                  className="block w-full text-left text-lg font-medium text-text-primary hover:text-green-primary transition-colors py-2"
                  data-testid="mobile-nav-regalo"
                >
                  Gift Card
                </button>
                <button
                  onClick={() => scrollToSection('chi-siamo')}
                  className="block w-full text-left text-lg font-medium text-text-primary hover:text-green-primary transition-colors py-2"
                  data-testid="mobile-nav-chi-siamo"
                >
                  Chi siamo
                </button>
              </div>

              {/* CTA Buttons */}
              <div className="border-t border-sand pt-6 space-y-3">
                <MinimalContactDialog type="info" title="Richiedi Informazioni">
                  <Button 
                    className="w-full bg-leather-brown hover:bg-leather-hover text-cream font-medium py-3"
                    data-testid="mobile-cta-contact"
                  >
                    Contattaci
                  </Button>
                </MinimalContactDialog>
                
                <MinimalContactDialog type="gift" title="Richiedi Gift Card">
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-leather-brown text-leather-brown hover:bg-leather-brown hover:text-cream font-medium py-3"
                    data-testid="mobile-cta-gift"
                  >
                    🎁 Gift Card
                  </Button>
                </MinimalContactDialog>

                <button
                  onClick={() => scrollToSection('contatti')}
                  className="w-full text-center text-text-secondary hover:text-green-primary transition-colors py-2 text-sm"
                  data-testid="mobile-cta-contacts"
                >
                  Vai ai Contatti
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
