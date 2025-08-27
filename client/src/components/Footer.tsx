export default function Footer() {
  return (
    <footer
      id="contatti"
      className="bg-text-primary text-cream py-16 px-4 sm:px-6 lg:container-spacing"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="sm:col-span-2 md:col-span-2">
            <div
              className="font-brand text-3xl font-semibold mb-6"
              data-testid="text-footer-brand"
            >
              Mathilde
            </div>
            <p
              className="text-cream/80 leading-relaxed mb-4"
              data-testid="text-footer-description"
            >
              Sartoria artigianale contemporanea che unisce tradizione italiana
              e visione internazionale per creare capi unici e sostenibili.
            </p>
            <p
              className="text-cream/80 leading-relaxed mb-6"
              data-testid="text-footer-contact-note"
            >
              Ricevo su appuntamento. Scrivimi, sarò felice di creare con te.
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
            <h4
              className="font-semibold mb-4"
              data-testid="text-footer-contact-title"
            >
              Contatti
            </h4>
            <div className="space-y-1 sm:space-y-2 text-cream/80 text-sm sm:text-base">
              <p data-testid="text-city">Lecco, 23900</p>
              <p data-testid="text-phone">+39 333 83 97 050</p>
              <p data-testid="text-email">info@mathildestudio.it</p>
            </div>
          </div>

          <div>
            <h4
              className="font-semibold mb-4"
              data-testid="text-footer-hours-title"
            >
              Orari atelier
            </h4>
            <div className="space-y-1 sm:space-y-2 text-cream/80 text-sm sm:text-base">
              <p data-testid="text-hours-weekdays">
                Ricevo su appuntamento. Scrivimi, sarò felice di creare con te.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-12 pt-8 text-center text-cream/60">
          <p data-testid="text-copyright">
            &copy; 2025 Mathilde Studio. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}
