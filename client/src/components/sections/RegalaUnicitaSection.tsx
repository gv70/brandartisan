import ScrollReveal from "@/components/ui/ScrollReveal";
import RegalaUnicitaDialog from "@/components/ui/RegalaUnicitaDialog";

export default function RegalaUnicitaSection() {
  return (
    <section id="regala-unicita" className="py-16 sm:py-20 lg:section-spacing px-4 sm:px-6 lg:container-spacing bg-gradient-to-br from-warm-beige to-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <ScrollReveal delay={400}>
            <div>
              <h2
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary mb-8"
                data-testid="text-regala-title"
              >
                Regala unicità
              </h2>
              <p className="text-lg leading-relaxed text-text-secondary mb-8" data-testid="text-regala-description">
                Un buono speciale per entrare nel mondo <span className="font-brand">Mathilde</span>: un invito a scegliere tra l'esperienza su misura e le collezioni stagionali in edizione limitata. Un regalo che dura nel tempo, come l'eleganza che rappresenta.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-text-secondary" data-testid="text-gift-feature-1">
                  <div className="w-2 h-2 bg-leather-brown rounded-full mr-3"></div>
                  <span>Buono regalo personalizzabile</span>
                </div>
                <div className="flex items-center text-text-secondary" data-testid="text-gift-feature-2">
                  <div className="w-2 h-2 bg-leather-brown rounded-full mr-3"></div>
                  <span>Valido per su misura e collezioni</span>
                </div>
                <div className="flex items-center text-text-secondary" data-testid="text-gift-feature-3">
                  <div className="w-2 h-2 bg-leather-brown rounded-full mr-3"></div>
                  <span>Confezione regalo elegante inclusa</span>
                </div>
              </div>
              <RegalaUnicitaDialog>
                <button 
                  className="bg-green-primary text-cream px-8 py-4 rounded-full text-lg font-medium hover:bg-green-hover transition-all transform hover:scale-105 shadow-xl w-full sm:w-auto"
                  data-testid="button-regala-unicita-contact"
                >
                  Regala unicità
                </button>
              </RegalaUnicitaDialog>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <img
              src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Elegant gift wrapping with luxury details"
              className="rounded-xl shadow-lg w-full h-auto"
              data-testid="img-gift"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}