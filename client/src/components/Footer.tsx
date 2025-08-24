export default function Footer() {
  return (
    <footer id="contatti" className="bg-text-primary text-cream py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="font-serif text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6" data-testid="text-footer-brand">
              Mathilde
            </div>
            <p className="text-sm sm:text-base text-cream/80 leading-relaxed mb-4 sm:mb-6" data-testid="text-footer-description">
              Sartoria artigianale contemporanea che unisce tradizione italiana e visione internazionale per creare capi unici e sostenibili.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/mathilde" 
                className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center hover:bg-cream/20 transition-colors"
                data-testid="link-instagram"
                aria-label="Instagram"
              >
                <span className="text-sm font-semibold">IG</span>
              </a>
              <a 
                href="https://facebook.com/mathilde" 
                className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center hover:bg-cream/20 transition-colors"
                data-testid="link-facebook"
                aria-label="Facebook"
              >
                <span className="text-sm font-semibold">FB</span>
              </a>
              <a 
                href="https://linkedin.com/company/mathilde" 
                className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center hover:bg-cream/20 transition-colors"
                data-testid="link-linkedin"
                aria-label="LinkedIn"
              >
                <span className="text-sm font-semibold">LI</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base" data-testid="text-footer-contact-title">Contatti</h4>
            <div className="space-y-1 sm:space-y-2 text-cream/80 text-sm sm:text-base">
              <p data-testid="text-address">Via dell'Eleganza 12</p>
              <p data-testid="text-city">Milano, 20121</p>
              <p data-testid="text-phone">+39 02 1234 5678</p>
              <p data-testid="text-email">info@mathilde.it</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base" data-testid="text-footer-hours-title">Orari atelier</h4>
            <div className="space-y-1 sm:space-y-2 text-cream/80 text-sm sm:text-base">
              <p data-testid="text-hours-weekdays">Lun - Ven: 10:00 - 19:00</p>
              <p data-testid="text-hours-saturday">Sabato: 10:00 - 18:00</p>
              <p data-testid="text-hours-sunday">Domenica: Su appuntamento</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-cream/20 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-cream/60">
          <p data-testid="text-copyright" className="text-xs sm:text-sm">&copy; 2024 Mathilde. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
