import ScrollReveal from "@/components/ui/ScrollReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import CalendlyWidget from "@/components/ui/CalendlyWidget";

interface SuMisuraSectionProps {
  onBookingClick: () => void;
}

export default function SuMisuraSection({ onBookingClick }: SuMisuraSectionProps) {
  const steps = [
    {
      title: "Consulenza",
      description: "Un primo incontro, in atelier o a distanza, per comprendere insieme il tuo stile, i tuoi desideri e trasformarli in un capo unico.",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Tailor consultation and fabric selection"
    },
    {
      title: "Creazione",
      description: "I tuoi desideri prendono forma grazie a tecniche sartoriali che attraversano generazioni.",
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
    <section id="su-misura" className="py-16 sm:py-20 lg:section-spacing px-4 sm:px-6 lg:container-spacing bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary mb-6" data-testid="text-su-misura-title">
              Sartoria su misura: dal tessuto al tuo sogno
            </h2>
            <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto" data-testid="text-su-misura-subtitle">
              Un'esperienza esclusiva che inizia con l'ascolto dei tuoi desideri e si conclude con un capo che diventa parte della tua identità.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 200}>
              <SpotlightCard className="p-6 lg:p-8">
                <img 
                  src={step.image}
                  alt={step.alt}
                  className="rounded-lg w-full h-48 object-cover mb-6"
                  data-testid={`img-step-${index + 1}`}
                />
                <h3 className="font-serif text-xl lg:text-2xl font-semibold text-text-primary mb-4" data-testid={`text-step-${index + 1}-title`}>
                  {step.title}
                </h3>
                <p className="text-base text-text-secondary leading-relaxed" data-testid={`text-step-${index + 1}-description`}>
                  {step.description}
                </p>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <ScrollReveal delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CalendlyWidget
                url="https://calendly.com/mathilde-sartoria/consulenza-su-misura"
                text="Prenota consulenza"
                className="bg-leather-brown text-cream px-10 py-4 rounded-full text-lg font-medium hover:bg-leather-hover transition-all transform hover:scale-105 w-full sm:w-auto"
                prefill={{
                  customAnswers: {
                    a1: "Sartoria Su Misura"
                  }
                }}
              />
              <button 
                onClick={onBookingClick}
                className="border-2 border-leather-brown text-leather-brown px-10 py-4 rounded-full text-lg font-medium hover:bg-leather-brown hover:text-cream transition-all w-full sm:w-auto"
                data-testid="button-info-su-misura"
              >
                Richiedi informazioni
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
