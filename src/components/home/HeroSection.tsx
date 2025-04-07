
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="container-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gradient">
                {language === 'pt' && 'LUZ CRUA'}
                {language === 'en' && 'RAW LIGHT'}
                {language === 'de' && 'ROHES LICHT'}
                {language === 'es' && 'LUZ CRUDA'}
                {language === 'it' && 'LUCE CRUDA'}
                {language === 'fr' && 'LUMIÈRE BRUTE'}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {language === 'pt' && 'Aprenda a se conectar com Deus profundamente e encontre alívio para suas dores através dos ensinamentos transformadores de Jesus.'}
              {language === 'en' && 'Learn to connect deeply with God and find relief for your pain through the transformative teachings of Jesus.'}
              {language === 'de' && 'Lernen Sie, sich tief mit Gott zu verbinden und Linderung für Ihre Schmerzen durch die transformativen Lehren Jesu zu finden.'}
              {language === 'es' && 'Aprenda a conectarse profundamente con Dios y encuentre alivio para su dolor a través de las enseñanzas transformadoras de Jesús.'}
              {language === 'it' && 'Impara a connetterti profondamente con Dio e trova sollievo per il tuo dolore attraverso gli insegnamenti trasformativi di Gesù.'}
              {language === 'fr' && 'Apprenez à vous connecter profondément avec Dieu et trouvez du soulagement pour vos douleurs grâce aux enseignements transformateurs de Jésus.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={`/${language}/blog`}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {language === 'pt' && 'Explorar Artigos'}
                {language === 'en' && 'Explore Articles'}
                {language === 'de' && 'Artikel Erkunden'}
                {language === 'es' && 'Explorar Artículos'}
                {language === 'it' && 'Esplora Articoli'}
                {language === 'fr' && 'Explorer les Articles'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                to={`/${language}/about`}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {language === 'pt' && 'Saiba Mais'}
                {language === 'en' && 'Learn More'}
                {language === 'de' && 'Mehr Erfahren'}
                {language === 'es' && 'Más Información'}
                {language === 'it' && 'Scopri di Più'}
                {language === 'fr' && 'En Savoir Plus'}
              </Link>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              alt="Spiritual light"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
