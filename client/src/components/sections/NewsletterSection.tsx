import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Checkbox } from "@/components/ui/checkbox";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const { toast } = useToast();

  const subscribeToNewsletter = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Iscrizione completata!",
        description: "Ti invieremo le nostre ultime creazioni e novità esclusive.",
      });
      setEmail("");
      setPrivacyConsent(false);
    },
    onError: (error: any) => {
      const message = error.message.includes("409") 
        ? "Questo indirizzo email è già iscritto alla newsletter."
        : "Si è verificato un errore. Riprova più tardi.";
      
      toast({
        variant: "destructive",
        title: "Errore nell'iscrizione",
        description: message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    if (!privacyConsent) {
      toast({
        title: "Consenso privacy richiesto",
        description: "È necessario accettare l'informativa privacy per iscriversi alla newsletter.",
        variant: "destructive",
      });
      return;
    }
    
    subscribeToNewsletter.mutate(email);
  };

  return (
    <section className="py-16 sm:py-20 lg:section-spacing px-4 sm:px-6 lg:container-spacing gradient-green-overlay">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <div className="fade-scale animate">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-cream mb-6" data-testid="text-newsletter-title">
              Unisciti al mondo <span className="font-brand">Mathilde</span>
            </h2>
            <p className="text-lg sm:text-xl text-cream mb-12 max-w-2xl mx-auto" data-testid="text-newsletter-subtitle">
              Ricevi in anteprima le nostre nuove creazioni, gli eventi esclusivi e i segreti della sartoria artigianale italiana.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Il tuo indirizzo email"
                  className="flex-1 px-6 py-4 rounded-full text-charcoal placeholder-charcoal/60 focus:outline-none focus:ring-2 focus:ring-sage"
                  required
                  data-testid="input-newsletter-email"
                />
                <button 
                  type="submit"
                  disabled={subscribeToNewsletter.isPending}
                  className="bg-leather-brown text-cream px-8 py-4 rounded-full font-medium hover:bg-leather-hover transition-all whitespace-nowrap disabled:opacity-50 w-full sm:w-auto"
                  data-testid="button-newsletter-submit"
                >
                  {subscribeToNewsletter.isPending ? "Iscrizione..." : "Iscriviti"}
                </button>
              </div>
              
              <div className="flex items-start space-x-2 mt-6 text-left">
                <Checkbox 
                  id="newsletter-privacy-consent"
                  checked={privacyConsent}
                  onCheckedChange={(checked) => setPrivacyConsent(!!checked)}
                  className="mt-1 border-cream data-[state=checked]:bg-leather-brown"
                  data-testid="checkbox-newsletter-privacy"
                />
                <label htmlFor="newsletter-privacy-consent" className="text-cream text-sm leading-relaxed">
                  Acconsento al trattamento dei miei dati personali secondo l'
                  <a href="/privacy-policy" target="_blank" className="text-sand hover:underline">
                    informativa privacy
                  </a>
                  . Potrai disiscriverti in qualsiasi momento.
                </label>
              </div>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
