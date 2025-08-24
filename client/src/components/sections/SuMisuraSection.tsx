import ScrollReveal from "@/components/ui/ScrollReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

interface SuMisuraSectionProps {
  onBookingClick: () => void;
}

export default function SuMisuraSection({ onBookingClick }: SuMisuraSectionProps) {
  const steps = [
    {
      title: "Consulenza",
      description: "Ti accogliamo nel nostro atelier per comprendere il tuo stile, le tue necessità e i tuoi sogni sartoriali.",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Tailor consultation and fabric selection"
    },
    {
      title: "Creazione",
      description: "Le nostre mani esperte danno forma ai tuoi desideri, utilizzando tecniche tramandate da generazioni.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Artisan hands taking precise measurements"
    },
    {
      title: "Perfezione",
      description: "Ritocchi finali e prove fino al raggiungimento della vestibilità perfetta, unica per te.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Elegant fitting room with luxury details"
    }
  ];

  return (
    <section id="su-misura" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <ScrollReveal>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary mb-4 sm:mb-6" data-testid="text-su-misura-title">
              Servizio su misura
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto" data-testid="text-su-misura-subtitle">
              Un'esperienza esclusiva che inizia con l'ascolto dei tuoi desideri e si conclude con un capo che diventa parte della tua identità.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 200}>
              <SpotlightCard className="p-4 sm:p-6 lg:p-8">
                <img 
                  src={step.image}
                  alt={step.alt}
                  className="rounded-lg w-full h-40 sm:h-48 object-cover mb-4 sm:mb-6"
                  data-testid={`img-step-${index + 1}`}
                />
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-semibold text-text-primary mb-3 sm:mb-4" data-testid={`text-step-${index + 1}-title`}>
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed" data-testid={`text-step-${index + 1}-description`}>
                  {step.description}
                </p>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <ScrollReveal delay={600}>
            <button 
              onClick={onBookingClick}
              className="bg-leather-brown text-cream px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-leather-hover transition-all transform hover:scale-105 w-full sm:w-auto"
              data-testid="button-prenota-su-misura"
            >
Prenota la tua sartoria su misura
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
