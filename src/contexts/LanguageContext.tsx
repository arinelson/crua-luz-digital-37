
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGeoLocation } from '@/hooks/useGeoLocation';

export type Language = 'pt' | 'en' | 'es' | 'de' | 'fr' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
  t: (key: string) => string;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

const defaultLanguage: Language = 'pt';

// Language names and flags for UI
export const languageOptions = [
  { code: 'pt', name: 'LUZ CRUA', flag: '🇧🇷' },
  { code: 'en', name: 'RAW LIGHT', flag: '🇺🇸' },
  { code: 'de', name: 'ROHES LICHT', flag: '🇩🇪' },
  { code: 'es', name: 'LUZ CRUDA', flag: '🇪🇸' },
  { code: 'it', name: 'LUCE CRUDA', flag: '🇮🇹' },
  { code: 'fr', name: 'LUMIÈRE BRUTE', flag: '🇫🇷' }
];

// Basic translation table (will be expanded)
const translationTable: Record<Language, Record<string, string>> = {
  pt: {
    'home': 'HOME',
    'blog': 'BLOG',
    'webStories': 'WEB STORIES',
    'about': 'SOBRE',
    'contact': 'CONTATO',
    'services': 'SERVIÇOS',
    'socialMedia': 'REDES SOCIAIS',
    'newsletter': 'Assinar Newsletter',
    'emailPlaceholder': 'Seu email',
    'subscribe': 'Assinar',
    'recentArticles': 'Artigos Recentes',
    'featuredArticles': 'Artigos em Destaque',
    'categories': 'Categorias',
    'teachingsOfJesus': 'Ensinos de Jesus',
    'connectionWithGod': 'Conexão com Deus',
    'overcomingChallenges': 'Superando Desafios',
    'understandingBible': 'Entendendo a Bíblia',
    'communityAndCommunion': 'Comunidade e Comunhão',
    'practicalResources': 'Recursos Práticos',
    'footer': 'Aprenda a se conectar com Deus profundamente e encontre alívio para suas dores através dos ensinamentos transformadores de Jesus, mesmo que você nunca tenha entendido a Bíblia antes.'
  },
  en: {
    'home': 'HOME',
    'blog': 'BLOG',
    'webStories': 'WEB STORIES',
    'about': 'ABOUT',
    'contact': 'CONTACT',
    'services': 'SERVICES',
    'socialMedia': 'SOCIAL MEDIA',
    'newsletter': 'Subscribe to Newsletter',
    'emailPlaceholder': 'Your email',
    'subscribe': 'Subscribe',
    'recentArticles': 'Recent Articles',
    'featuredArticles': 'Featured Articles',
    'categories': 'Categories',
    'teachingsOfJesus': 'Teachings of Jesus',
    'connectionWithGod': 'Connection with God',
    'overcomingChallenges': 'Overcoming Challenges',
    'understandingBible': 'Understanding the Bible',
    'communityAndCommunion': 'Community and Communion',
    'practicalResources': 'Practical Resources',
    'footer': 'Learn to connect deeply with God and find relief for your pain through the transformative teachings of Jesus, even if you have never understood the Bible before.'
  },
  es: {
    'home': 'INICIO',
    'blog': 'BLOG',
    'webStories': 'WEB STORIES',
    'about': 'ACERCA',
    'contact': 'CONTACTO',
    'services': 'SERVICIOS',
    'socialMedia': 'REDES SOCIALES',
    'newsletter': 'Suscribirse al Boletín',
    'emailPlaceholder': 'Tu correo electrónico',
    'subscribe': 'Suscribirse',
    'recentArticles': 'Artículos Recientes',
    'featuredArticles': 'Artículos Destacados',
    'categories': 'Categorías',
    'teachingsOfJesus': 'Enseñanzas de Jesús',
    'connectionWithGod': 'Conexión con Dios',
    'overcomingChallenges': 'Superando Desafíos',
    'understandingBible': 'Entendiendo la Biblia',
    'communityAndCommunion': 'Comunidad y Comunión',
    'practicalResources': 'Recursos Prácticos',
    'footer': 'Aprende a conectarte profundamente con Dios y encuentra alivio para tu dolor a través de las enseñanzas transformadoras de Jesús, incluso si nunca has entendido la Biblia antes.'
  },
  de: {
    'home': 'STARTSEITE',
    'blog': 'BLOG',
    'webStories': 'WEB STORIES',
    'about': 'ÜBER UNS',
    'contact': 'KONTAKT',
    'services': 'DIENSTLEISTUNGEN',
    'socialMedia': 'SOZIALE MEDIEN',
    'newsletter': 'Newsletter abonnieren',
    'emailPlaceholder': 'Ihre E-Mail',
    'subscribe': 'Abonnieren',
    'recentArticles': 'Neueste Artikel',
    'featuredArticles': 'Empfohlene Artikel',
    'categories': 'Kategorien',
    'teachingsOfJesus': 'Lehren Jesu',
    'connectionWithGod': 'Verbindung mit Gott',
    'overcomingChallenges': 'Herausforderungen überwinden',
    'understandingBible': 'Die Bibel verstehen',
    'communityAndCommunion': 'Gemeinschaft und Kommunion',
    'practicalResources': 'Praktische Ressourcen',
    'footer': 'Lernen Sie, sich tief mit Gott zu verbinden und Linderung für Ihre Schmerzen durch die transformativen Lehren Jesu zu finden, auch wenn Sie die Bibel noch nie verstanden haben.'
  },
  fr: {
    'home': 'ACCUEIL',
    'blog': 'BLOG',
    'webStories': 'WEB STORIES',
    'about': 'À PROPOS',
    'contact': 'CONTACT',
    'services': 'SERVICES',
    'socialMedia': 'RÉSEAUX SOCIAUX',
    'newsletter': 'S\'abonner à la Newsletter',
    'emailPlaceholder': 'Votre email',
    'subscribe': 'S\'abonner',
    'recentArticles': 'Articles Récents',
    'featuredArticles': 'Articles en Vedette',
    'categories': 'Catégories',
    'teachingsOfJesus': 'Enseignements de Jésus',
    'connectionWithGod': 'Connexion avec Dieu',
    'overcomingChallenges': 'Surmonter les Défis',
    'understandingBible': 'Comprendre la Bible',
    'communityAndCommunion': 'Communauté et Communion',
    'practicalResources': 'Ressources Pratiques',
    'footer': 'Apprenez à vous connecter profondément avec Dieu et trouvez du soulagement pour vos douleurs grâce aux enseignements transformateurs de Jésus, même si vous n\'avez jamais compris la Bible auparavant.'
  },
  it: {
    'home': 'HOME',
    'blog': 'BLOG',
    'webStories': 'WEB STORIES',
    'about': 'CHI SIAMO',
    'contact': 'CONTATTO',
    'services': 'SERVIZI',
    'socialMedia': 'SOCIAL MEDIA',
    'newsletter': 'Iscriviti alla Newsletter',
    'emailPlaceholder': 'La tua email',
    'subscribe': 'Iscriviti',
    'recentArticles': 'Articoli Recenti',
    'featuredArticles': 'Articoli in Evidenza',
    'categories': 'Categorie',
    'teachingsOfJesus': 'Insegnamenti di Gesù',
    'connectionWithGod': 'Connessione con Dio',
    'overcomingChallenges': 'Superare le Sfide',
    'understandingBible': 'Comprendere la Bibbia',
    'communityAndCommunion': 'Comunità e Comunione',
    'practicalResources': 'Risorse Pratiche',
    'footer': 'Impara a connetterti profondamente con Dio e trova sollievo per il tuo dolore attraverso gli insegnamenti trasformativi di Gesù, anche se non hai mai capito la Bibbia prima.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [translations, setTranslations] = useState(translationTable[defaultLanguage]);
  const [hasManuallySelectedLanguage, setHasManuallySelectedLanguage] = useState<boolean>(
    !!localStorage.getItem('manually_selected_language')
  );
  
  // Use our geolocation hook
  const { detectedLanguage, loading: geoLoading } = useGeoLocation();

  useEffect(() => {
    // Check URL for language code
    const pathParts = location.pathname.split('/').filter(Boolean);
    const langFromUrl = pathParts[0] as Language;
    
    if (langFromUrl && Object.keys(translationTable).includes(langFromUrl)) {
      setLanguageState(langFromUrl);
      setTranslations(translationTable[langFromUrl]);
    } else {
      // Se o usuário não selecionou manualmente um idioma e temos um idioma detectado
      if (!hasManuallySelectedLanguage && detectedLanguage && !geoLoading) {
        // Redirecionar para o idioma detectado por geolocalização
        const currentPath = location.pathname === '/' ? '' : location.pathname;
        navigate(`/${detectedLanguage}${currentPath}`);
      } else {
        // Se não conseguimos detectar ou o usuário já escolheu, usar o idioma padrão
        const currentPath = location.pathname === '/' ? '' : location.pathname;
        navigate(`/${defaultLanguage}${currentPath}`);
      }
    }
  }, [location.pathname, navigate, detectedLanguage, geoLoading, hasManuallySelectedLanguage]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setTranslations(translationTable[lang]);
    
    // Atualizar URL para refletir a mudança de idioma
    const currentPath = location.pathname;
    const pathWithoutLang = currentPath.split('/').slice(2).join('/');
    navigate(`/${lang}/${pathWithoutLang}`);
    
    // Marcar que o usuário selecionou manualmente um idioma
    localStorage.setItem('manually_selected_language', 'true');
    setHasManuallySelectedLanguage(true);
  };

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
