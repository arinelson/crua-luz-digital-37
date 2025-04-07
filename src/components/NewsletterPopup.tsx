
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useNewsletterService } from '@/services/newsletterService';

const translations = {
  pt: {
    title: 'Receba Conteúdo Exclusivo',
    description: 'Inscreva-se em nossa newsletter para receber artigos, dicas e atualizações diretamente em seu email.',
    placeholder: 'Seu endereço de e-mail',
    subscribe: 'Inscrever-se',
    noThanks: 'Agora não',
    close: 'Fechar'
  },
  en: {
    title: 'Get Exclusive Content',
    description: 'Subscribe to our newsletter to receive articles, tips, and updates directly in your email.',
    placeholder: 'Your email address',
    subscribe: 'Subscribe',
    noThanks: 'Not now',
    close: 'Close'
  },
  es: {
    title: 'Reciba Contenido Exclusivo',
    description: 'Suscríbete a nuestro boletín para recibir artículos, consejos y actualizaciones directamente en tu correo electrónico.',
    placeholder: 'Tu dirección de correo electrónico',
    subscribe: 'Suscribirse',
    noThanks: 'Ahora no',
    close: 'Cerrar'
  },
  de: {
    title: 'Erhalten Sie Exklusive Inhalte',
    description: 'Abonnieren Sie unseren Newsletter, um Artikel, Tipps und Updates direkt in Ihrer E-Mail zu erhalten.',
    placeholder: 'Ihre E-Mail-Adresse',
    subscribe: 'Abonnieren',
    noThanks: 'Jetzt nicht',
    close: 'Schließen'
  },
  fr: {
    title: 'Recevez du Contenu Exclusif',
    description: 'Abonnez-vous à notre newsletter pour recevoir des articles, des conseils et des mises à jour directement dans votre boîte mail.',
    placeholder: 'Votre adresse e-mail',
    subscribe: 'S\'abonner',
    noThanks: 'Pas maintenant',
    close: 'Fermer'
  },
  it: {
    title: 'Ricevi Contenuti Esclusivi',
    description: 'Iscriviti alla nostra newsletter per ricevere articoli, consigli e aggiornamenti direttamente nella tua email.',
    placeholder: 'Il tuo indirizzo email',
    subscribe: 'Iscriviti',
    noThanks: 'Non ora',
    close: 'Chiudi'
  }
};

const NewsletterPopup: React.FC = () => {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { subscribeToNewsletter } = useNewsletterService();
  const t = translations[language as keyof typeof translations] || translations.en;

  useEffect(() => {
    // Verificar se o popup já foi fechado anteriormente
    const hasClosedPopup = localStorage.getItem('newsletter_popup_closed');
    const hasSubscribed = localStorage.getItem('newsletter_subscribed');
    
    if (!hasClosedPopup && !hasSubscribed) {
      // Mostrar popup após 5 segundos
      const timer = setTimeout(() => {
        setOpen(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    // Marcar que o popup foi fechado para não mostrar novamente na mesma sessão
    localStorage.setItem('newsletter_popup_closed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsLoading(true);
    
    try {
      const success = await subscribeToNewsletter(email, language);
      
      if (success) {
        // Marcar que o usuário se inscreveu para não mostrar o popup novamente
        localStorage.setItem('newsletter_subscribed', 'true');
        setOpen(false);
        setEmail('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{t.title}</DialogTitle>
          <DialogDescription className="pt-2">
            {t.description}
          </DialogDescription>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">{t.close}</span>
          </button>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder={t.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
              ) : null}
              {t.subscribe}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              {t.noThanks}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;
