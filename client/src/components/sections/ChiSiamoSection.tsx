import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ChiSiamoSection() {
  return (
    <section
      id="chi-siamo"
      className="py-16 sm:py-20 lg:section-spacing px-4 sm:px-6 lg:container-spacing bg-background-light"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <ScrollReveal delay={200}>
            <img
              src="https://plus.unsplash.com/premium_photo-1682089428454-8f21f3ed62f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Sarta che prende le misure di spalle a una cliente in atelier artigianale"
              className="rounded-xl shadow-lg w-full h-auto"
              data-testid="img-atelier"
            />
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <div>
              <h2
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary mb-8"
                data-testid="text-chi-siamo-title"
              >
                La storia dietro le mani
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-text-secondary">
                <p data-testid="text-chi-siamo-paragraph-1">
                  Nata sul Lago di Como e cresciuta tra Lecco e Milano, Mathilde è un laboratorio sartoriale dove la tradizione artigianale incontra lo stile contemporaneo.
                </p>
                <p data-testid="text-chi-siamo-paragraph-2">
                  Ogni capo prende forma a mano, attraverso modelli studiati nel dettaglio e materiali naturali selezionati, per un'eleganza senza tempo e una qualità destinata a durare.
                </p>
                <p data-testid="text-chi-siamo-paragraph-3">
                  La mia missione? Andare controtempo: privilegiare la lentezza del fare bene, la cura dei gesti e mani sapienti, capaci di restituire storie di unicità e bellezza.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
