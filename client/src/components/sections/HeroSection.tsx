import ScrollReveal from "@/components/ui/ScrollReveal";

interface HeroSectionProps {
  onCollezioneClick: () => void;
  onSuMisuraClick: () => void;
}

export default function HeroSection({ onCollezioneClick, onSuMisuraClick }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-cream-beige container-spacing pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight" data-testid="hero-title">
            Vestiti di Unicità.
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed" data-testid="hero-subtitle">
Capi sartoriali artigianali uomo & donna, creati su misura per la tua eleganza personale.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onCollezioneClick}
              className="bg-green-primary text-cream px-8 py-4 rounded-full text-lg font-medium hover:bg-green-hover transition-all transform hover:scale-105"
              data-testid="button-collezione-primary"
            >
Scopri la collezione limitata
            </button>
            <button 
              onClick={onSuMisuraClick}
              className="border-2 border-leather-brown text-leather-brown px-8 py-4 rounded-full text-lg font-medium hover:bg-leather-brown hover:text-cream transition-all"
              data-testid="button-su-misura-secondary"
            >
Prenota la tua sartoria su misura
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
