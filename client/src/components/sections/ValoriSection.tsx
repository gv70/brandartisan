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
      title: "Eleganza Senza Tempo",
      description: "Creiamo capi destinati a durare, superando le mode passeggere con stile autentico.",
      color: "bg-green-primary/20",
      dotColor: "bg-green-primary"
    }
  ];

  return (
    <section className="section-spacing container-spacing bg-cream">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-text-primary mb-6" data-testid="text-valori-title">
              I Nostri Valori
            </h2>
            <p className="text-xl text-text-secondary" data-testid="text-valori-subtitle">
              Principi che guidano ogni nostro gesto, ogni scelta, ogni creazione.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedList staggerDelay={150}>
            {values.map((value, index) => (
              <div key={value.title} className="bg-white rounded-xl p-8 shadow-sm" data-testid={`card-value-${index + 1}`}>
                <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <div className={`w-8 h-8 ${value.dotColor} rounded-full`}></div>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-text-primary mb-4" data-testid={`text-value-${index + 1}-title`}>
                  {value.title}
                </h3>
                <p className="text-text-secondary leading-relaxed" data-testid={`text-value-${index + 1}-description`}>
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
