import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface RegalaUnicitaDialogProps {
  children: React.ReactNode;
}

export default function RegalaUnicitaDialog({ children }: RegalaUnicitaDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    nomeDestinatario: "",
    messaggio: "",
    importo: ""
  });
  const sendGiftRequest = useMutation({
    mutationFn: async (data: typeof formData) => {
      // Simula invio email - in produzione integreresti con un servizio di email
      const emailBody = `
Richiesta Buono Regalo Mathilde

Dati del richiedente:
- Nome: ${data.nome}
- Email: ${data.email}
- Telefono: ${data.telefono}

Destinatario del regalo:
- Nome: ${data.nomeDestinatario}

Importo desiderato: ${data.importo}

Messaggio personalizzato:
${data.messaggio}
      `;
      
      // Apri client email
      const subject = encodeURIComponent("Richiesta Buono Regalo Mathilde");
      const body = encodeURIComponent(emailBody);
      window.open(`mailto:info@mathilde.it?subject=${subject}&body=${body}`, '_blank');
      
      return { success: true };
    },
    onSuccess: () => {
      setOpen(false);
      setFormData({
        nome: "",
        email: "",
        telefono: "",
        nomeDestinatario: "",
        messaggio: "",
        importo: ""
      });
    },
    onError: () => {
      // Gestione errore silenziosa
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.nomeDestinatario) {
      return;
    }
    sendGiftRequest.mutate(formData);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-brand text-2xl text-green-primary mb-2">
            Regala unicità
          </DialogTitle>
          <p className="text-text-secondary">
            Crea un buono regalo personalizzato per entrare nel mondo <span className="font-brand">Mathilde</span>
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome e Cognome *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                placeholder="Il tuo nome"
                required
                data-testid="input-gift-nome"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="la-tua-email@esempio.com"
                required
                data-testid="input-gift-email"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefono">Telefono</Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
                placeholder="+39 xxx xxx xxxx"
                data-testid="input-gift-telefono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="importo">Importo desiderato</Label>
              <Input
                id="importo"
                value={formData.importo}
                onChange={(e) => handleInputChange("importo", e.target.value)}
                placeholder="€ 500"
                data-testid="input-gift-importo"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nomeDestinatario">Nome del destinatario *</Label>
            <Input
              id="nomeDestinatario"
              value={formData.nomeDestinatario}
              onChange={(e) => handleInputChange("nomeDestinatario", e.target.value)}
              placeholder="A chi vuoi regalare l'esperienza Mathilde?"
              required
              data-testid="input-gift-destinatario"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="messaggio">Messaggio personalizzato</Label>
            <Textarea
              id="messaggio"
              value={formData.messaggio}
              onChange={(e) => handleInputChange("messaggio", e.target.value)}
              placeholder="Aggiungi una dedica speciale al tuo regalo..."
              rows={4}
              data-testid="textarea-gift-messaggio"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto"
              data-testid="button-gift-cancel"
            >
              Annulla
            </Button>
            <Button
              type="submit"
              disabled={sendGiftRequest.isPending}
              className="bg-green-primary hover:bg-green-hover text-cream w-full sm:w-auto"
              data-testid="button-gift-submit"
            >
              {sendGiftRequest.isPending ? "Invio in corso..." : "Invia richiesta"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}