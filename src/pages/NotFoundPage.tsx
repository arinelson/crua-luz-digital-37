
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';

const NotFoundPage: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const getContent = () => {
    switch (language) {
      case 'pt':
        return {
          title: 'Página Não Encontrada | LUZ CRUA',
          heading: 'Página Não Encontrada',
          message: 'Desculpe, a página que você está procurando não existe.',
          button: 'Voltar para o Início'
        };
      case 'en':
        return {
          title: 'Page Not Found | RAW LIGHT',
          heading: 'Page Not Found',
          message: 'Sorry, the page you are looking for does not exist.',
          button: 'Back to Home'
        };
      case 'de':
        return {
          title: 'Seite Nicht Gefunden | ROHES LICHT',
          heading: 'Seite Nicht Gefunden',
          message: 'Entschuldigung, die gesuchte Seite existiert nicht.',
          button: 'Zurück zur Startseite'
        };
      case 'es':
        return {
          title: 'Página No Encontrada | LUZ CRUDA',
          heading: 'Página No Encontrada',
          message: 'Lo sentimos, la página que estás buscando no existe.',
          button: 'Volver al Inicio'
        };
      case 'it':
        return {
          title: 'Pagina Non Trovata | LUCE CRUDA',
          heading: 'Pagina Non Trovata',
          message: 'Ci dispiace, la pagina che stai cercando non esiste.',
          button: 'Torna alla Home'
        };
      case 'fr':
        return {
          title: 'Page Non Trouvée | LUMIÈRE BRUTE',
          heading: 'Page Non Trouvée',
          message: 'Désolé, la page que vous recherchez n\'existe pas.',
          button: 'Retour à l\'Accueil'
        };
      default:
        return {
          title: 'Page Not Found | RAW LIGHT',
          heading: 'Page Not Found',
          message: 'Sorry, the page you are looking for does not exist.',
          button: 'Back to Home'
        };
    }
  };

  const content = getContent();

  return (
    <>
      <Helmet>
        <title>{content.title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-16">
        <div className="text-center max-w-md px-4">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">{content.heading}</h2>
          <p className="text-muted-foreground mb-8">{content.message}</p>
          <Link
            to={`/${language}/`}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {content.button}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
