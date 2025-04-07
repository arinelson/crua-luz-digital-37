
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

// Sample recent articles data
const sampleArticles = {
  pt: [
    {
      id: 4,
      title: 'Superando o medo: Lições de Jesus para momentos de incerteza',
      excerpt: 'Como aplicar os ensinamentos de Jesus para enfrentar o medo e a ansiedade nos dias de hoje.',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
      date: '2025-03-25',
      category: 'Superando Desafios',
      slug: 'superando-medo-licoes-jesus'
    },
    {
      id: 5,
      title: 'Plano de leitura bíblica para 30 dias: Um novo começo',
      excerpt: 'Um guia passo a passo para iniciar sua jornada na leitura bíblica em apenas 30 dias.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      date: '2025-03-28',
      category: 'Entendendo a Bíblia',
      slug: 'plano-leitura-biblica-30-dias'
    }
  ],
  en: [
    {
      id: 4,
      title: 'Overcoming fear: Jesus\' lessons for moments of uncertainty',
      excerpt: 'How to apply Jesus\' teachings to face fear and anxiety in today\'s world.',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
      date: '2025-03-25',
      category: 'Overcoming Challenges',
      slug: 'overcoming-fear-jesus-lessons'
    },
    {
      id: 5,
      title: '30-day Bible reading plan: A new beginning',
      excerpt: 'A step-by-step guide to start your journey in Bible reading in just 30 days.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      date: '2025-03-28',
      category: 'Understanding the Bible',
      slug: '30-day-bible-reading-plan'
    }
  ],
  es: [
    {
      id: 4,
      title: 'Superando el miedo: Lecciones de Jesús para momentos de incertidumbre',
      excerpt: 'Cómo aplicar las enseñanzas de Jesús para enfrentar el miedo y la ansiedad en el mundo actual.',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
      date: '2025-03-25',
      category: 'Superando Desafíos',
      slug: 'superando-miedo-lecciones-jesus'
    },
    {
      id: 5,
      title: 'Plan de lectura bíblica para 30 días: Un nuevo comienzo',
      excerpt: 'Una guía paso a paso para comenzar tu jornada en la lectura bíblica en solo 30 días.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      date: '2025-03-28',
      category: 'Entendiendo la Biblia',
      slug: 'plan-lectura-biblica-30-dias'
    }
  ],
  de: [
    {
      id: 4,
      title: 'Angst überwinden: Jesu Lehren für Momente der Ungewissheit',
      excerpt: 'Wie man Jesu Lehren anwendet, um Angst und Unruhe in der heutigen Welt zu begegnen.',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
      date: '2025-03-25',
      category: 'Herausforderungen überwinden',
      slug: 'angst-ueberwinden-jesu-lehren'
    },
    {
      id: 5,
      title: '30-Tage-Bibelleseplan: Ein neuer Anfang',
      excerpt: 'Eine Schritt-für-Schritt-Anleitung, um Ihre Reise im Bibellesen in nur 30 Tagen zu beginnen.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      date: '2025-03-28',
      category: 'Die Bibel verstehen',
      slug: '30-tage-bibelleseplan'
    }
  ],
  fr: [
    {
      id: 4,
      title: 'Surmonter la peur : Leçons de Jésus pour les moments d\'incertitude',
      excerpt: 'Comment appliquer les enseignements de Jésus pour faire face à la peur et à l\'anxiété dans le monde d\'aujourd\'hui.',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
      date: '2025-03-25',
      category: 'Surmonter les Défis',
      slug: 'surmonter-peur-lecons-jesus'
    },
    {
      id: 5,
      title: 'Plan de lecture biblique de 30 jours : Un nouveau départ',
      excerpt: 'Un guide étape par étape pour commencer votre voyage dans la lecture biblique en seulement 30 jours.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      date: '2025-03-28',
      category: 'Comprendre la Bible',
      slug: 'plan-lecture-biblique-30-jours'
    }
  ],
  it: [
    {
      id: 4,
      title: 'Superare la paura: Lezioni di Gesù per momenti di incertezza',
      excerpt: 'Come applicare gli insegnamenti di Gesù per affrontare la paura e l\'ansia nel mondo di oggi.',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
      date: '2025-03-25',
      category: 'Superare le Sfide',
      slug: 'superare-paura-lezioni-gesu'
    },
    {
      id: 5,
      title: 'Piano di lettura biblica di 30 giorni: Un nuovo inizio',
      excerpt: 'Una guida passo passo per iniziare il tuo viaggio nella lettura biblica in soli 30 giorni.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      date: '2025-03-28',
      category: 'Comprendere la Bibbia',
      slug: 'piano-lettura-biblica-30-giorni'
    }
  ]
};

const RecentArticles: React.FC = () => {
  const { language, t } = useLanguage();
  const articles = sampleArticles[language as keyof typeof sampleArticles] || sampleArticles.en;

  // Function to format date according to the current language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(
      language === 'pt' ? 'pt-BR' : 
      language === 'en' ? 'en-US' : 
      language === 'es' ? 'es-ES' : 
      language === 'de' ? 'de-DE' : 
      language === 'fr' ? 'fr-FR' : 
      'it-IT', 
      options
    );
  };

  return (
    <section className="py-16">
      <div className="container-content">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{t('recentArticles')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="flex flex-col md:flex-row bg-card rounded-xl shadow-md overflow-hidden">
              <div className="md:w-2/5 relative">
                <Link to={`/${language}/blog/${article.slug}`}>
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </Link>
              </div>
              <div className="md:w-3/5 p-6">
                <div className="flex items-center mb-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  <time>{formatDate(article.date)}</time>
                  <span className="mx-2">•</span>
                  <span>{article.category}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  <Link to={`/${language}/blog/${article.slug}`} className="hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                <Link 
                  to={`/${language}/blog/${article.slug}`}
                  className="text-primary font-medium hover:underline mt-auto"
                >
                  {language === 'pt' && 'Ler mais'}
                  {language === 'en' && 'Read more'}
                  {language === 'de' && 'Weiterlesen'}
                  {language === 'es' && 'Leer más'}
                  {language === 'it' && 'Leggi di più'}
                  {language === 'fr' && 'Lire la suite'}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to={`/${language}/blog`}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {language === 'pt' && 'Ver todos os artigos'}
            {language === 'en' && 'View all articles'}
            {language === 'de' && 'Alle Artikel anzeigen'}
            {language === 'es' && 'Ver todos los artículos'}
            {language === 'it' && 'Visualizza tutti gli articoli'}
            {language === 'fr' && 'Voir tous les articles'}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentArticles;
