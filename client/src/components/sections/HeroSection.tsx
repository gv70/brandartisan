import ScrollReveal from "@/components/ui/ScrollReveal";

interface HeroSectionProps {
  onCollezioneClick: () => void;
  onSuMisuraClick: () => void;
}

export default function HeroSection({ onCollezioneClick, onSuMisuraClick }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-cream-sand container-spacing pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-charcoal mb-6 leading-tight" data-testid="hero-title">
            Vestiti di Unicità.
          </h1>
          <p className="text-xl md:text-2xl text-charcoal/80 mb-12 max-w-2xl mx-auto leading-relaxed" data-testid="hero-subtitle">
            Capi sartoriali artigianali uomo & donna, creati su misura per la tua eleganza personale.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onCollezioneClick}
              className="bg-navy text-cream px-8 py-4 rounded-full text-lg font-medium hover:bg-navy/90 transition-all transform hover:scale-105"
              data-testid="button-collezione-primary"
            >
              Scopri la Collezione Limitata
            </button>
            <button 
              onClick={onSuMisuraClick}
              className="border-2 border-charcoal text-charcoal px-8 py-4 rounded-full text-lg font-medium hover:bg-charcoal hover:text-cream transition-all"
              data-testid="button-su-misura-secondary"
            >
              Prenota la tua Sartoria Su Misura
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
