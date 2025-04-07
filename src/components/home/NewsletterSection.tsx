
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNewsletterService } from '@/services/newsletterService';

const NewsletterSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { subscribeToNewsletter } = useNewsletterService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsLoading(true);
    
    try {
      // Chamar o serviço de newsletter
      await subscribeToNewsletter(email, language);
      
      // Limpar o formulário
      setEmail('');
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-base font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
              ) : null}
              {t('subscribe')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
