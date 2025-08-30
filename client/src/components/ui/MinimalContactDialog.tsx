import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface MinimalContactDialogProps {
  children: React.ReactNode;
  type: "info" | "gift";
  title?: string;
  buttonText?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message?: string;
}

export default function MinimalContactDialog({ 
  children, 
  type, 
  title, 
  buttonText = "Invia" 
}: MinimalContactDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: ""
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const endpoint = type === "gift" ? "/api/gift/request" : "/api/consultation/request";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message || (type === "gift" ? "Richiesta gift card" : "Richiesta informazioni"),
          serviceType: type === "gift" ? "Gift Card" : "Informazioni Generali"
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to send request");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Richiesta inviata!",
        description: type === "gift" 
          ? "Ti contatteremo presto per la tua gift card."
          : "Ti risponderemo il prima possibile.",
      });
      setFormData({ name: "", email: "", message: "" });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['/api/consultation'] });
    },
    onError: () => {
      toast({
        title: "Errore",
        description: "Si è verificato un errore. Riprova più tardi.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Campi obbligatori",
        description: "Nome ed email sono richiesti.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(formData);
  };

  const dialogTitle = title || (type === "gift" ? "Richiedi Gift Card" : "Richiedi Informazioni");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-cream border-sand">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-text-primary text-center">
            {dialogTitle}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Nome *"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-white border-sand focus:border-leather-brown"
              data-testid="input-contact-name"
              required
            />
          </div>
          
          <div>
            <Input
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="bg-white border-sand focus:border-leather-brown"
              data-testid="input-contact-email"
              required
            />
          </div>

          {type === "info" && (
            <div>
              <Textarea
                placeholder="Messaggio (opzionale)"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="bg-white border-sand focus:border-leather-brown min-h-[80px] resize-none"
                data-testid="textarea-contact-message"
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-sand text-text-secondary hover:bg-sand"
              data-testid="button-contact-cancel"
            >
              Annulla
            </Button>
            <Button
              type="submit"
              disabled={submitMutation.isPending}
              className="flex-1 bg-leather-brown hover:bg-leather-hover text-cream"
              data-testid="button-contact-submit"
            >
              {submitMutation.isPending ? "Invio..." : buttonText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}