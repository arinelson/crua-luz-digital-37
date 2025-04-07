
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from 'react-router-dom';

// Sample web stories data
const webStories = [
  {
    id: 1,
    titleKey: 'Finding Inner Peace Through Prayer',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    date: '2025-03-20',
    category: 'connectionWithGod',
    slug: 'finding-inner-peace'
  },
  {
    id: 2,
    titleKey: '5 Teachings of Jesus That Changed My Life',
    imageUrl: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3',
    date: '2025-03-15',
    category: 'teachingsOfJesus',
    slug: '5-teachings-jesus'
  },
  {
    id: 3,
    titleKey: 'How to Overcome Anxiety with Faith',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    date: '2025-03-10',
    category: 'overcomingChallenges',
    slug: 'overcome-anxiety-faith'
  },
  {
    id: 4,
    titleKey: 'Understanding Psalm 23 in Modern Context',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
    date: '2025-03-05',
    category: 'understandingBible',
    slug: 'psalm-23-modern-context'
  },
  {
    id: 5,
    titleKey: 'Building a Spiritual Community Online',
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    date: '2025-02-28',
    category: 'communityAndCommunion',
    slug: 'spiritual-community-online'
  },
  {
    id: 6,
    titleKey: 'Simple Daily Prayer Routine',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    date: '2025-02-25',
    category: 'practicalResources',
    slug: 'daily-prayer-routine'
  }
];

// Translation keys for web stories
const translations = {
  en: {
    'Finding Inner Peace Through Prayer': 'Finding Inner Peace Through Prayer',
    '5 Teachings of Jesus That Changed My Life': '5 Teachings of Jesus That Changed My Life',
    'How to Overcome Anxiety with Faith': 'How to Overcome Anxiety with Faith',
    'Understanding Psalm 23 in Modern Context': 'Understanding Psalm 23 in Modern Context',
    'Building a Spiritual Community Online': 'Building a Spiritual Community Online',
    'Simple Daily Prayer Routine': 'Simple Daily Prayer Routine'
  },
  pt: {
    'Finding Inner Peace Through Prayer': 'Encontrando Paz Interior Através da Oração',
    '5 Teachings of Jesus That Changed My Life': '5 Ensinamentos de Jesus Que Mudaram Minha Vida',
    'How to Overcome Anxiety with Faith': 'Como Superar a Ansiedade com Fé',
    'Understanding Psalm 23 in Modern Context': 'Entendendo o Salmo 23 no Contexto Moderno',
    'Building a Spiritual Community Online': 'Construindo uma Comunidade Espiritual Online',
    'Simple Daily Prayer Routine': 'Rotina Simples de Oração Diária'
  },
  // Similar translations would be added for other languages
};

const WebStoriesPage: React.FC = () => {
  const { language, t } = useLanguage();
  
  // Translate content based on language
  const translate = (key: string) => {
    const langTranslations = translations[language as keyof typeof translations] || translations.en;
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  return (
    <>
      <Helmet>
        <title>{t('webStories')} | {language === 'pt' ? 'LUZ CRUA' : language === 'en' ? 'RAW LIGHT' : language === 'de' ? 'ROHES LICHT' : language === 'es' ? 'LUZ CRUDA' : language === 'it' ? 'LUCE CRUDA' : 'LUMIÈRE BRUTE'}</title>
        <meta name="description" content={t('footer')} />
      </Helmet>

      <div className="py-10 md:py-16">
        <div className="container-content">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">{t('webStories')}</h1>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {t('footer')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {webStories.map((story) => (
              <Link 
                key={story.id}
                to={`/${language}/web-stories/${story.slug}`} 
                className="group block"
              >
                <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
                  <div className="relative aspect-[9/16] overflow-hidden">
                    <img 
                      src={story.imageUrl} 
                      alt={translate(story.titleKey)} 
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <div>
                        <div className="text-sm font-medium text-primary-foreground mb-2">
                          {t(story.category)}
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          {translate(story.titleKey)}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      {new Date(story.date).toLocaleDateString(
                        language === 'en' ? 'en-US' : 
                        language === 'pt' ? 'pt-BR' : 
                        language === 'es' ? 'es-ES' : 
                        language === 'de' ? 'de-DE' : 
                        language === 'it' ? 'it-IT' : 'fr-FR'
                      )}
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WebStoriesPage;
