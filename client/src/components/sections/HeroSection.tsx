import ScrollReveal from "@/components/ui/ScrollReveal";
import CalendlyWidget from "@/components/ui/CalendlyWidget";
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
      
      <div className="relative z-20 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:container-spacing pt-16 sm:pt-20">
        <ScrollReveal>
          {/* Text container with semi-transparent background */}
          <div className="bg-text-primary/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream mb-4 sm:mb-6 leading-tight" data-testid="hero-title">
              Ogni capo una storia.<br/>
              <span className="italic">La prossima è la tua?</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-xl lg:text-2xl text-cream mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed" data-testid="hero-subtitle">
              Creazioni sartoriali per donne e bambini, con accessori che ti raccontano. Realizzate a mano su misura, per uno stile senza tempo.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onCollezioneClick}
              className="bg-green-primary text-cream px-8 py-4 rounded-full text-lg font-medium hover:bg-green-hover transition-all transform hover:scale-105 shadow-xl w-full sm:w-auto"
              data-testid="button-collezione-primary"
            >
              Scopri la Capsule Collection
            </button>
            <CalendlyWidget
              url="https://calendly.com/mathildestudio-info/30min"
              text="Prenota consulenza gratuita"
              className="bg-cream/20 border-2 border-cream text-cream px-8 py-4 rounded-full text-lg font-medium hover:bg-cream hover:text-green-primary transition-all shadow-xl backdrop-blur-md w-full sm:w-auto"
              prefill={{
                customAnswers: {
                  a1: "Consulenza Generale"
                }
              }}
            />
            <button 
              onClick={() => {
                const element = document.getElementById('regala-unicita');
                if (element) {
                  const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
                  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
              }}
              className="bg-leather-brown text-cream px-8 py-4 rounded-full text-lg font-medium hover:bg-leather-hover transition-all transform hover:scale-105 shadow-xl w-full sm:w-auto"
              data-testid="button-regala-unicita"
            >
              Regala unicità
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
