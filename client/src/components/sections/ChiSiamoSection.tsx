import ScrollReveal from "@/components/ui/ScrollReveal";
import personalImage from "@assets/IMG_1945_1756559646527.jpg";

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
              src={personalImage}
              alt="Mathilde Studio - La storia dietro le mani"
              className="rounded-xl shadow-lg w-full h-auto object-cover object-center transform rotate-0"
              style={{ aspectRatio: '3/4' }}
              data-testid="img-laboratorio"
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
