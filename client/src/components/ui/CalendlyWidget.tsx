import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface CalendlyWidgetProps {
  url: string;
  text?: string;
  className?: string;
  prefill?: {
    name?: string;
    email?: string;
    customAnswers?: {
      a1?: string; // Tipo di servizio
      a2?: string; // Note aggiuntive
    };
  };
}

export default function CalendlyWidget({ 
  url, 
  text = "Prenota appuntamento", 
  className = "",
  prefill = {} 
}: CalendlyWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Carica script Calendly se non è già presente
    if (!document.querySelector('script[src*="calendly.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    // Inizializza il widget inline quando il modal si apre
    if (isOpen) {
      const timer = setTimeout(() => {
        // @ts-ignore - Calendly viene caricato dinamicamente
        if (window.Calendly && document.querySelector('.calendly-inline-widget-modal')) {
          // @ts-ignore
          window.Calendly.initInlineWidget({
            url: url,
            parentElement: document.querySelector('.calendly-inline-widget-modal'),
            prefill: prefill
          });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, url, prefill]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button 
          className={className}
          data-testid="button-calendly"
        >
          {text}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold">
            Prenota il tuo appuntamento
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-2">
          <div 
            className="calendly-inline-widget-modal w-full"
            style={{ minWidth: '320px', height: '600px' }}
            data-testid="calendly-modal-widget"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Componente inline per sezioni più grandi
export function CalendlyInlineWidget({ 
  url, 
  height = "700px",
  className = "" 
}: {
  url: string;
  height?: string;
  className?: string;
}) {
  useEffect(() => {
    // Carica script Calendly se non è già presente
    if (!document.querySelector('script[src*="calendly.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div 
      className={`calendly-inline-widget ${className}`}
      data-url={url}
      style={{ minWidth: '320px', height: height }}
      data-testid="calendly-inline"
    />
  );
}