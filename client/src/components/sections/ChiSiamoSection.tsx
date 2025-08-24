import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ChiSiamoSection() {
  return (
    <section id="chi-siamo" className="section-spacing container-spacing bg-background-light">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal delay={200}>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Luxury tailoring atelier with natural lighting and fabric details" 
              className="rounded-xl shadow-lg w-full h-auto"
              data-testid="img-atelier"
            />
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-text-primary mb-8" data-testid="text-chi-siamo-title">
                Chi siamo
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-text-secondary">
                <p data-testid="text-chi-siamo-paragraph-1">
                  Nata sul Lago di Como e cresciuta tra Lecco e Milano, Mathilde è più di una sartoria: è il luogo dove la tradizione artigianale italiana incontra lo stile minimalista contemporaneo.
                </p>
                <p data-testid="text-chi-siamo-paragraph-2">
                  Nel nostro atelier ogni capo prende vita a mano, punto dopo punto, rispettando i ritmi dell'artigianalità autentica. Crediamo nell'eleganza senza tempo: linee pulite, dettagli curati, materiali eccellenti scelti con cura.
                </p>
                <p data-testid="text-chi-siamo-paragraph-3">
                  La nostra missione? Cucire non solo vestiti, ma storie. Storie di bellezza, di individualità, di rispetto per l'ambiente attraverso una moda sostenibile e locale.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
