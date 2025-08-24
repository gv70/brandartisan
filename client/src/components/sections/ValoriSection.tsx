import AnimatedList from "@/components/ui/AnimatedList";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ValoriSection() {
  const values = [
    {
      title: "Artigianalità",
      description: "Ogni punto, ogni cucitura è testimonianza di un sapere tramandato da generazioni di maestri sarti.",
      color: "bg-leather-brown/20",
      dotColor: "bg-leather-brown"
    },
    {
      title: "Unicità",
      description: "Ogni capo è irripetibile, pensato per esaltare la personalità unica di chi lo indossa.",
      color: "bg-green-primary/20",
      dotColor: "bg-green-primary"
    },
    {
      title: "Sostenibilità",
      description: "Scegliamo materiali eco-compatibili e processi che rispettano l'ambiente e le persone.",
      color: "bg-leather-brown/20",
      dotColor: "bg-leather-brown"
    },
    {
      title: "Eleganza senza tempo",
      description: "Creiamo capi destinati a durare, superando le mode passeggere con stile autentico.",
      color: "bg-green-primary/20",
      dotColor: "bg-green-primary"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream to-beige">
      <div className="max-w-6xl mx-auto text-center">
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary mb-4 sm:mb-6" data-testid="text-valori-title">
              I nostri valori
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary" data-testid="text-valori-subtitle">
              Principi che guidano ogni nostro gesto, ogni scelta, ogni creazione.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <AnimatedList staggerDelay={150}>
            {values.map((value, index) => (
              <div key={value.title} className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-primary/10" data-testid={`card-value-${index + 1}`}>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${value.dotColor} rounded-full`}></div>
                </div>
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-semibold text-text-primary mb-3 sm:mb-4" data-testid={`text-value-${index + 1}-title`}>
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed" data-testid={`text-value-${index + 1}-description`}>
                  {value.description}
                </p>
              </div>
            ))}
          </AnimatedList>
        </div>
      </div>
    </section>
  );
}
