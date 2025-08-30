import ScrollReveal from "@/components/ui/ScrollReveal";
import CalendlyWidget from "@/components/ui/CalendlyWidget";
import capsuleImage from "@assets/capsule collaction autum 2025_1756560799608.png";

interface CollezioniSectionProps {
  onCollezioneClick: () => void;
}

export default function CollezioniSection({
  onCollezioneClick,
}: CollezioniSectionProps) {
  return (
    <section
      id="collezioni"
      className="py-16 sm:py-20 lg:section-spacing px-4 sm:px-6 lg:container-spacing bg-warm-beige"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <ScrollReveal>
            <h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary mb-6"
              data-testid="text-collezioni-title"
            >
              Capsule collection: eleganza essenziale, in edizione limitata
            </h2>
            <p
              className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto"
              data-testid="text-collezioni-subtitle"
            >
              Collezioni in edizione limitata, che interpretano l'eleganza
              contemporanea attraverso la maestria artigianale italiana.
              Creazioni pensate per ogni stagione, con la stessa cura e unicità
              del su misura.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <ScrollReveal delay={200}>
            <div className="collection-stack">
              <div className="relative">
                <div className="collection-item relative rounded-xl shadow-lg">
                  <img
                    src={capsuleImage}
                    alt="Mathilde Capsule Collection Autumn 2025 - Coming Soon"
                    className="rounded-xl w-full h-48 sm:h-64 lg:h-80 object-cover object-top"
                    data-testid="img-capsule-collection"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div>
              <h3
                className="font-serif text-2xl lg:text-3xl font-semibold text-text-primary mb-6"
                data-testid="text-collezione-season"
              >
                Autunno-inverno 2025
              </h3>
              <p
                className="text-lg text-text-secondary mb-8 leading-relaxed"
                data-testid="text-collezione-description"
              >
                Una collezione che celebra la bellezza del tempo che rallenta,
                con tonalità calde e materiali che raccontano storie di comfort
                raffinato e eleganza senza tempo.
              </p>
              <div className="space-y-4 mb-8">
                <div
                  className="flex items-center text-text-secondary"
                  data-testid="text-feature-1"
                >
                  <div className="w-2 h-2 bg-leather-brown rounded-full mr-3"></div>
                  <span>15 pezzi unici realizzati a mano</span>
                </div>
                <div
                  className="flex items-center text-text-secondary"
                  data-testid="text-feature-2"
                >
                  <div className="w-2 h-2 bg-leather-brown rounded-full mr-3"></div>
                  <span>Tessuti sostenibili e certificati</span>
                </div>
                <div
                  className="flex items-center text-text-secondary"
                  data-testid="text-feature-3"
                >
                  <div className="w-2 h-2 bg-leather-brown rounded-full mr-3"></div>
                  <span>Numerazione limitata e personalizzabile</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <CalendlyWidget
                  url="https://calendly.com/mathildestudio-info/30min"
                  text="Prenota visita in atelier"
                  className="bg-green-primary text-cream px-8 py-3 rounded-full font-medium hover:bg-green-hover transition-all transform hover:scale-105 w-full sm:w-auto"
                  prefill={{
                    customAnswers: {
                      a1: "Capsule Collection"
                    }
                  }}
                />
                <button
                  onClick={onCollezioneClick}
                  className="border-2 border-green-primary text-green-primary px-8 py-3 rounded-full font-medium hover:bg-green-primary hover:text-cream transition-all w-full sm:w-auto"
                  data-testid="button-scopri-collezione"
                >
                  Scopri la collezione limitata
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
