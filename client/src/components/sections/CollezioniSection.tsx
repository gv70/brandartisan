import ScrollReveal from "@/components/ui/ScrollReveal";

interface CollezioniSectionProps {
  onCollezioneClick: () => void;
}

export default function CollezioniSection({ onCollezioneClick }: CollezioniSectionProps) {
  return (
    <section id="collezioni" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-warm-beige">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <ScrollReveal>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary mb-4 sm:mb-6" data-testid="text-collezioni-title">
              Collezioni capsule
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-2xl mx-auto" data-testid="text-collezioni-subtitle">
              Creazioni limitate che interpretano l'eleganza contemporanea attraverso la maestria artigianale italiana.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <ScrollReveal delay={200}>
            <div className="collection-stack">
              <div className="relative">
                <div className="collection-item absolute inset-0 rounded-xl shadow-lg transform -rotate-2">
                  <img 
                    src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                    alt="High-end fabric details with texture and craftsmanship" 
                    className="rounded-xl w-full h-48 sm:h-64 lg:h-80 object-cover"
                    data-testid="img-fabric-1"
                  />
                </div>
                <div className="collection-item relative rounded-xl shadow-lg transform rotate-1">
                  <img 
                    src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                    alt="Italian craftsmanship details showing texture and quality" 
                    className="rounded-xl w-full h-48 sm:h-64 lg:h-80 object-cover"
                    data-testid="img-fabric-2"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-text-primary mb-4 sm:mb-6" data-testid="text-collezione-season">
                Autunno-inverno 2024
              </h3>
              <p className="text-base sm:text-lg text-text-secondary mb-6 sm:mb-8 leading-relaxed" data-testid="text-collezione-description">
                Una collezione che celebra la bellezza del tempo che rallenta, con tonalità calde e materiali che raccontano storie di comfort raffinato e eleganza senza tempo.
              </p>
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center text-text-secondary" data-testid="text-feature-1">
                  <div className="w-2 h-2 bg-leather-brown rounded-full mr-3"></div>
                  <span className="text-sm sm:text-base">15 pezzi unici realizzati a mano</span>
                </div>
                <div className="flex items-center text-text-secondary" data-testid="text-feature-2">
                  <div className="w-2 h-2 bg-leather-brown rounded-full mr-3"></div>
                  <span className="text-sm sm:text-base">Tessuti sostenibili e certificati</span>
                </div>
                <div className="flex items-center text-text-secondary" data-testid="text-feature-3">
                  <div className="w-2 h-2 bg-leather-brown rounded-full mr-3"></div>
                  <span className="text-sm sm:text-base">Numerazione limitata e personalizzabile</span>
                </div>
              </div>
              <button 
                onClick={onCollezioneClick}
                className="border-2 border-green-primary text-green-primary px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-medium hover:bg-green-primary hover:text-cream transition-all w-full sm:w-auto"
                data-testid="button-scopri-collezione"
              >
Scopri la collezione limitata
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
