
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

// Sample featured articles data (in a real application, this would come from an API)
const sampleArticles = {
  pt: [
    {
      id: 1,
      title: 'Como orar mesmo sem saber por onde começar',
      excerpt: 'Descubra passos simples para iniciar sua jornada de oração, mesmo que você nunca tenha orado antes.',
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
      date: '2025-03-10',
      category: 'Conexão com Deus',
      slug: 'como-orar-sem-saber-por-onde-comecar'
    },
    {
      id: 2,
      title: 'Os 3 segredos para entender melhor a Bíblia',
      excerpt: 'Técnicas simples que vão transformar sua leitura bíblica e ajudar você a compreender as escrituras.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      date: '2025-03-15',
      category: 'Entendendo a Bíblia',
      slug: 'segredos-para-entender-melhor-a-biblia'
    },
    {
      id: 3,
      title: 'Encontre alívio para sua dor emocional com estes versículos',
      excerpt: 'Versículos poderosos que trazem conforto e esperança nos momentos mais difíceis da vida.',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      date: '2025-03-20',
      category: 'Superando Desafios',
      slug: 'versiculos-para-alivio-emocional'
    }
  ],
  en: [
    {
      id: 1,
      title: 'How to pray even if you don\'t know where to start',
      excerpt: 'Discover simple steps to begin your prayer journey, even if you\'ve never prayed before.',
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
      date: '2025-03-10',
      category: 'Connection with God',
      slug: 'how-to-pray-without-knowing-where-to-start'
    },
    {
      id: 2,
      title: 'The 3 secrets to better understanding the Bible',
      excerpt: 'Simple techniques that will transform your Bible reading and help you comprehend the scriptures.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      date: '2025-03-15',
      category: 'Understanding the Bible',
      slug: 'secrets-to-better-understand-the-bible'
    },
    {
      id: 3,
      title: 'Find relief for your emotional pain with these verses',
      excerpt: 'Powerful verses that bring comfort and hope in life\'s most difficult moments.',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      date: '2025-03-20',
      category: 'Overcoming Challenges',
      slug: 'verses-for-emotional-relief'
    }
  ],
  es: [
    {
      id: 1,
      title: 'Cómo orar incluso si no sabes por dónde empezar',
      excerpt: 'Descubre pasos sencillos para comenzar tu viaje de oración, incluso si nunca has orado antes.',
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
      date: '2025-03-10',
      category: 'Conexión con Dios',
      slug: 'como-orar-sin-saber-por-donde-empezar'
    },
    {
      id: 2,
      title: 'Los 3 secretos para entender mejor la Biblia',
      excerpt: 'Técnicas sencillas que transformarán tu lectura bíblica y te ayudarán a comprender las escrituras.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      date: '2025-03-15',
      category: 'Entendiendo la Biblia',
      slug: 'secretos-para-entender-mejor-la-biblia'
    },
    {
      id: 3,
      title: 'Encuentra alivio para tu dolor emocional con estos versículos',
      excerpt: 'Versículos poderosos que traen consuelo y esperanza en los momentos más difíciles de la vida.',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      date: '2025-03-20',
      category: 'Superando Desafíos',
      slug: 'versiculos-para-alivio-emocional'
    }
  ],
  de: [
    {
      id: 1,
      title: 'Wie man betet, auch wenn man nicht weiß, wo man anfangen soll',
      excerpt: 'Entdecken Sie einfache Schritte, um Ihre Gebetsreise zu beginnen, auch wenn Sie noch nie gebetet haben.',
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
      date: '2025-03-10',
      category: 'Verbindung mit Gott',
      slug: 'wie-man-betet-ohne-zu-wissen-wo-man-anfangen-soll'
    },
    {
      id: 2,
      title: 'Die 3 Geheimnisse, um die Bibel besser zu verstehen',
      excerpt: 'Einfache Techniken, die Ihr Bibellesen verändern und Ihnen helfen, die Schriften zu verstehen.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      date: '2025-03-15',
      category: 'Die Bibel verstehen',
      slug: 'geheimnisse-um-die-bibel-besser-zu-verstehen'
    },
    {
      id: 3,
      title: 'Finden Sie Linderung für Ihren emotionalen Schmerz mit diesen Versen',
      excerpt: 'Kraftvolle Verse, die in den schwierigsten Momenten des Lebens Trost und Hoffnung bringen.',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      date: '2025-03-20',
      category: 'Herausforderungen überwinden',
      slug: 'verse-fuer-emotionale-linderung'
    }
  ],
  fr: [
    {
      id: 1,
      title: 'Comment prier même si vous ne savez pas par où commencer',
      excerpt: 'Découvrez des étapes simples pour commencer votre voyage de prière, même si vous n\'avez jamais prié auparavant.',
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
      date: '2025-03-10',
      category: 'Connexion avec Dieu',
      slug: 'comment-prier-sans-savoir-par-ou-commencer'
    },
    {
      id: 2,
      title: 'Les 3 secrets pour mieux comprendre la Bible',
      excerpt: 'Des techniques simples qui transformeront votre lecture de la Bible et vous aideront à comprendre les écritures.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      date: '2025-03-15',
      category: 'Comprendre la Bible',
      slug: 'secrets-pour-mieux-comprendre-la-bible'
    },
    {
      id: 3,
      title: 'Trouvez du soulagement pour votre douleur émotionnelle avec ces versets',
      excerpt: 'Des versets puissants qui apportent réconfort et espoir dans les moments les plus difficiles de la vie.',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      date: '2025-03-20',
      category: 'Surmonter les Défis',
      slug: 'versets-pour-soulagement-emotionnel'
    }
  ],
  it: [
    {
      id: 1,
      title: 'Come pregare anche se non sai da dove iniziare',
      excerpt: 'Scopri semplici passi per iniziare il tuo viaggio di preghiera, anche se non hai mai pregato prima.',
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
      date: '2025-03-10',
      category: 'Connessione con Dio',
      slug: 'come-pregare-senza-sapere-da-dove-iniziare'
    },
    {
      id: 2,
      title: 'I 3 segreti per comprendere meglio la Bibbia',
      excerpt: 'Tecniche semplici che trasformeranno la tua lettura della Bibbia e ti aiuteranno a comprendere le scritture.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      date: '2025-03-15',
      category: 'Comprendere la Bibbia',
      slug: 'segreti-per-comprendere-meglio-la-bibbia'
    },
    {
      id: 3,
      title: 'Trova sollievo per il tuo dolore emotivo con questi versetti',
      excerpt: 'Versetti potenti che portano conforto e speranza nei momenti più difficili della vita.',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      date: '2025-03-20',
      category: 'Superare le Sfide',
      slug: 'versetti-per-il-sollievo-emotivo'
    }
  ]
};

const FeaturedArticles: React.FC = () => {
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
    <section className="py-16 bg-primary/5 dark:bg-accent">
      <div className="container-content">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{t('featuredArticles')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="bg-card rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
              <Link to={`/${language}/blog/${article.slug}`}>
                <div className="relative h-48">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div className="p-6">
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
                  className="text-primary font-medium hover:underline"
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
      </div>
    </section>
  );
};

export default FeaturedArticles;
