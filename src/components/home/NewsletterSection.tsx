
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would typically send the email to your newsletter service
    console.log('Subscribing email:', email);
    
    // Show a success toast
    toast({
      title: language === 'pt' ? 'Inscrição realizada com sucesso!' :
             language === 'en' ? 'Successfully subscribed!' :
             language === 'de' ? 'Erfolgreich abonniert!' :
             language === 'es' ? '¡Suscripción exitosa!' :
             language === 'it' ? 'Iscrizione effettuata con successo!' :
             'Inscription réussie !',
      description: language === 'pt' ? 'Obrigado por se inscrever na nossa newsletter.' :
                   language === 'en' ? 'Thank you for subscribing to our newsletter.' :
                   language === 'de' ? 'Vielen Dank für das Abonnieren unseres Newsletters.' :
                   language === 'es' ? 'Gracias por suscribirte a nuestro boletín.' :
                   language === 'it' ? 'Grazie per esserti iscritto alla nostra newsletter.' :
                   'Merci de vous être inscrit à notre newsletter.',
      variant: 'default',
    });
    
    // Clear the form
    setEmail('');
  };

  return (
    <section className="py-16 bg-primary/10 dark:bg-primary/5">
      <div className="container-content">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t('newsletter')}</h2>
          <p className="text-muted-foreground mb-8">
            {language === 'pt' && 'Receba nossos artigos mais recentes e conteúdo exclusivo diretamente na sua caixa de entrada.'}
            {language === 'en' && 'Receive our most recent articles and exclusive content directly in your inbox.'}
            {language === 'de' && 'Erhalten Sie unsere neuesten Artikel und exklusive Inhalte direkt in Ihren Posteingang.'}
            {language === 'es' && 'Reciba nuestros artículos más recientes y contenido exclusivo directamente en su bandeja de entrada.'}
            {language === 'it' && 'Ricevi i nostri articoli più recenti e contenuti esclusivi direttamente nella tua casella di posta.'}
            {language === 'fr' && 'Recevez nos articles les plus récents et du contenu exclusif directement dans votre boîte de réception.'}
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('emailPlaceholder')}
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-base font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t('subscribe')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
