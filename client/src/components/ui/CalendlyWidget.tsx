import { useEffect } from 'react';

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
  
  useEffect(() => {
    // Carica script Calendly se non è già presente
    if (!document.querySelector('script[src*="calendly.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const openCalendly = () => {
    // @ts-ignore - Calendly viene caricato dinamicamente
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({
        url: url,
        prefill: prefill
      });
    } else {
      // Fallback: apri in una nuova finestra
      window.open(url, '_blank', 'width=320,height=630');
    }
  };

  return (
    <button 
      onClick={openCalendly}
      className={className}
      data-testid="button-calendly"
    >
      {text}
    </button>
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