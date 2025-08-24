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
    <section className="py-16 sm:py-20 lg:section-spacing px-4 sm:px-6 lg:container-spacing bg-gradient-to-br from-cream to-beige">
      <div className="max-w-6xl mx-auto text-center">
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary mb-6" data-testid="text-valori-title">
              I nostri valori
            </h2>
            <p className="text-lg sm:text-xl text-text-secondary" data-testid="text-valori-subtitle">
              Principi che guidano ogni nostro gesto, ogni scelta, ogni creazione.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          <AnimatedList staggerDelay={150}>
            {values.map((value, index) => (
              <div key={value.title} className="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-primary/10" data-testid={`card-value-${index + 1}`}>
                <div className={`w-14 h-14 lg:w-16 lg:h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <div className={`w-7 h-7 lg:w-8 lg:h-8 ${value.dotColor} rounded-full`}></div>
                </div>
                <h3 className="font-serif text-xl lg:text-2xl font-semibold text-text-primary mb-4" data-testid={`text-value-${index + 1}-title`}>
                  {value.title}
                </h3>
                <p className="text-base text-text-secondary leading-relaxed" data-testid={`text-value-${index + 1}-description`}>
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
