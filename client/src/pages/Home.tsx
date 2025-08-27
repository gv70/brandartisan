import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import ChiSiamoSection from "@/components/sections/ChiSiamoSection";
import SuMisuraSection from "@/components/sections/SuMisuraSection";
import CollezioniSection from "@/components/sections/CollezioniSection";
import ValoriSection from "@/components/sections/ValoriSection";
import RegalaUnicitaSection from "@/components/sections/RegalaUnicitaSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  const { toast } = useToast();

  const requestConsultation = useMutation({
    mutationFn: async (service: 'su-misura' | 'collezione') => {
      const response = await apiRequest("POST", "/api/consultation/request", {
        name: "Cliente Interessato", // In a real app, this would come from a form
        email: "cliente@example.com",
        service,
        message: `Interessato al servizio: ${service}`
      });
      return response.json();
    },
    onSuccess: (data, variables) => {
      const serviceText = variables === 'su-misura' ? 'Sartoria Su Misura' : 'Collezione Limitata';
      toast({
        title: "Richiesta inviata!",
        description: `Ti contatteremo presto per ${serviceText}.`,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Errore nell'invio",
        description: "Si è verificato un errore. Riprova più tardi.",
      });
    },
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleCollezioneClick = () => {
    requestConsultation.mutate('collezione');
    scrollToSection('collezioni');
  };

  const handleSuMisuraClick = () => {
    requestConsultation.mutate('su-misura');
    scrollToSection('su-misura');
  };

  return (
    <div className="min-h-screen bg-background-light text-text-primary overflow-x-hidden">
      <Navigation />
      
      <main>
        <HeroSection 
          onCollezioneClick={handleCollezioneClick}
          onSuMisuraClick={handleSuMisuraClick}
        />
        
        <ChiSiamoSection />
        
        <SuMisuraSection onBookingClick={handleSuMisuraClick} />
        
        <CollezioniSection onCollezioneClick={handleCollezioneClick} />
        
        <ValoriSection />
        
        <RegalaUnicitaSection />
        
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
}
