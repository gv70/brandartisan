import ScrollReveal from "@/components/ui/ScrollReveal";
import videoBackground from "@assets/Creazione_Video_Introduzione_Sartoria_Artigianale_1756064437145.mp4";

interface HeroSectionProps {
  onCollezioneClick: () => void;
  onSuMisuraClick: () => void;
}

export default function HeroSection({ onCollezioneClick, onSuMisuraClick }: HeroSectionProps) {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        data-testid="video-background"
      >
        <source src={videoBackground} type="video/mp4" />
      </video>
      
      {/* Stronger overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-text-primary/60 via-text-primary/40 to-text-primary/70 z-10"></div>
      
      <div className="relative z-20 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <ScrollReveal>
          {/* Text container with semi-transparent background */}
          <div className="bg-text-primary/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-cream mb-4 sm:mb-6 leading-tight" data-testid="hero-title">
              Vestiti di Unicità.
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-cream mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed" data-testid="hero-subtitle">
              Capi sartoriali artigianali uomo & donna, creati su misura per la tua eleganza personale.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button 
              onClick={onCollezioneClick}
              className="bg-green-primary text-cream px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-green-hover transition-all transform hover:scale-105 shadow-xl w-full sm:w-auto"
              data-testid="button-collezione-primary"
            >
              Scopri la collezione limitata
            </button>
            <button 
              onClick={onSuMisuraClick}
              className="bg-cream/20 border-2 border-cream text-cream px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-cream hover:text-green-primary transition-all shadow-xl backdrop-blur-md w-full sm:w-auto"
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
