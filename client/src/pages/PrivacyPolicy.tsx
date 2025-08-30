export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-cream py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-text-primary mb-6">
            Informativa Privacy
          </h1>
          <p className="text-lg text-text-secondary">
            Mathilde Studio - Trattamento dei dati personali
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12 space-y-8">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              1. Titolare del Trattamento
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Il Titolare del trattamento dei dati è <strong>Mathilde Studio</strong>, con sede in Lecco (LC), 
              contattabile all'indirizzo email: <strong>info@mathildestudio.it</strong>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              2. Dati Raccolti
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Attraverso il nostro sito web raccogliamo i seguenti dati personali:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li><strong>Newsletter:</strong> Indirizzo email</li>
              <li><strong>Richieste informazioni:</strong> Nome, cognome, indirizzo email, messaggio</li>
              <li><strong>Richieste gift card:</strong> Nome, cognome, indirizzo email, richieste speciali</li>
              <li><strong>Prenotazioni:</strong> Gestite tramite Calendly (vedi loro privacy policy)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              3. Finalità del Trattamento
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              I tuoi dati vengono trattati per le seguenti finalità:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>Rispondere alle tue richieste di informazioni</li>
              <li>Elaborare richieste di gift card</li>
              <li>Invio di newsletter e comunicazioni promozionali (con consenso)</li>
              <li>Gestione delle relazioni commerciali</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              4. Base Giuridica
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Il trattamento è basato sul <strong>consenso esplicito</strong> per newsletter e comunicazioni promozionali, 
              e sull'<strong>interesse legittimo</strong> per rispondere alle tue richieste di informazioni e servizi.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              5. Conservazione dei Dati
            </h2>
            <p className="text-text-secondary leading-relaxed">
              I dati vengono conservati per il tempo strettamente necessario alle finalità del trattamento:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 mt-4">
              <li><strong>Richieste informazioni:</strong> 2 anni dalla richiesta</li>
              <li><strong>Newsletter:</strong> Fino alla revoca del consenso</li>
              <li><strong>Gift card:</strong> 5 anni per finalità contabili</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              6. I Tuoi Diritti
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Hai diritto a:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>Accedere ai tuoi dati personali</li>
              <li>Rettificare dati inesatti o incompleti</li>
              <li>Cancellare i tuoi dati (diritto all'oblio)</li>
              <li>Limitare il trattamento</li>
              <li>Portabilità dei dati</li>
              <li>Revocare il consenso in qualsiasi momento</li>
              <li>Presentare reclamo al Garante Privacy</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              7. Sicurezza dei Dati
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Adottiamo misure tecniche e organizzative appropriate per proteggere i tuoi dati personali 
              da accessi non autorizzati, perdita, distruzione o divulgazione.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              8. Cookie
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Il nostro sito utilizza esclusivamente cookie tecnici necessari al funzionamento. 
              Non utilizziamo cookie di profilazione o tracking.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              9. Contatti
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Per esercitare i tuoi diritti o per qualsiasi informazione, contattaci:
            </p>
            <div className="mt-4 space-y-2 text-text-secondary">
              <p><strong>Email:</strong> info@mathildestudio.it</p>
              <p><strong>Telefono:</strong> +39 333 83 97 050</p>
              <p><strong>Indirizzo:</strong> Lecco, 23900</p>
            </div>
          </section>

          <section className="border-t border-sand pt-8">
            <p className="text-sm text-text-secondary">
              <strong>Ultimo aggiornamento:</strong> Gennaio 2025
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}