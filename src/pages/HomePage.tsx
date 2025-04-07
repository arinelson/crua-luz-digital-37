
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedArticles from '../components/home/FeaturedArticles';
import CategoriesSection from '../components/home/CategoriesSection';
import RecentArticles from '../components/home/RecentArticles';
import NewsletterSection from '../components/home/NewsletterSection';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const { language } = useLanguage();
  
  // SEO metadata based on language
  const getSeoData = () => {
    switch (language) {
      case 'pt':
        return {
          title: 'LUZ CRUA | Conexão com Deus e Ensinamentos de Jesus',
          description: 'Aprenda a se conectar com Deus profundamente e encontre alívio para suas dores através dos ensinamentos transformadores de Jesus.',
          canonical: `https://luz-crua.netlify.app/pt/`
        };
      case 'en':
        return {
          title: 'RAW LIGHT | Connection with God and Teachings of Jesus',
          description: 'Learn to connect deeply with God and find relief for your pain through the transformative teachings of Jesus.',
          canonical: `https://luz-crua.netlify.app/en/`
        };
      case 'de':
        return {
          title: 'ROHES LICHT | Verbindung mit Gott und Lehren Jesu',
          description: 'Lernen Sie, sich tief mit Gott zu verbinden und Linderung für Ihre Schmerzen durch die transformativen Lehren Jesu zu finden.',
          canonical: `https://luz-crua.netlify.app/de/`
        };
      case 'es':
        return {
          title: 'LUZ CRUDA | Conexión con Dios y Enseñanzas de Jesús',
          description: 'Aprenda a conectarse profundamente con Dios y encuentre alivio para su dolor a través de las enseñanzas transformadoras de Jesús.',
          canonical: `https://luz-crua.netlify.app/es/`
        };
      case 'it':
        return {
          title: 'LUCE CRUDA | Connessione con Dio e Insegnamenti di Gesù',
          description: 'Impara a connetterti profondamente con Dio e trova sollievo per il tuo dolore attraverso gli insegnamenti trasformativi di Gesù.',
          canonical: `https://luz-crua.netlify.app/it/`
        };
      case 'fr':
        return {
          title: 'LUMIÈRE BRUTE | Connexion avec Dieu et Enseignements de Jésus',
          description: 'Apprenez à vous connecter profondément avec Dieu et trouvez du soulagement pour vos douleurs grâce aux enseignements transformateurs de Jésus.',
          canonical: `https://luz-crua.netlify.app/fr/`
        };
      default:
        return {
          title: 'LUZ CRUA | Conexão com Deus e Ensinamentos de Jesus',
          description: 'Aprenda a se conectar com Deus profundamente e encontre alívio para suas dores através dos ensinamentos transformadores de Jesus.',
          canonical: `https://luz-crua.netlify.app/pt/`
        };
    }
  };

  const seoData = getSeoData();

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <link rel="canonical" href={seoData.canonical} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <html lang={language} />
      </Helmet>

      <HeroSection />
      <FeaturedArticles />
      <CategoriesSection />
      <RecentArticles />
      <NewsletterSection />
    </>
  );
};

export default HomePage;
