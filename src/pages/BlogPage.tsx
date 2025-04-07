
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';

// Sample blog posts data - would typically come from an API
const blogPosts = [
  {
    id: 1,
    category: 'teachingsOfJesus',
    titleKey: 'How to Understand Jesus Parables',
    summaryKey: 'Learn the simple approach to understanding the deeper meanings in Jesus parables',
    imageUrl: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
    date: '2025-03-15',
    readTime: 5,
    slug: 'understanding-jesus-parables'
  },
  {
    id: 2,
    category: 'connectionWithGod',
    titleKey: 'Finding Peace in Prayer',
    summaryKey: 'Discover how to create a meaningful prayer routine that brings you closer to God',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    date: '2025-03-10',
    readTime: 4,
    slug: 'finding-peace-in-prayer'
  },
  {
    id: 3,
    category: 'overcomingChallenges',
    titleKey: 'When Faith Meets Anxiety',
    summaryKey: 'Practical ways to use faith as a foundation for managing anxiety and worry',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    date: '2025-03-05',
    readTime: 6,
    slug: 'faith-meets-anxiety'
  },
  {
    id: 4,
    category: 'understandingBible',
    titleKey: 'Bible Study for Beginners',
    summaryKey: "A simple approach to understanding the Bible even if you've never read it before",
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
    date: '2025-02-28',
    readTime: 7,
    slug: 'bible-study-beginners'
  },
  {
    id: 5,
    category: 'communityAndCommunion',
    titleKey: 'Building Faith Community Online',
    summaryKey: 'How to find and nurture spiritual connections in the digital age',
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    date: '2025-02-20',
    readTime: 5,
    slug: 'faith-community-online'
  },
  {
    id: 6,
    category: 'practicalResources',
    titleKey: 'Daily Prayer Templates',
    summaryKey: 'Ready-to-use prayer templates for different situations in your life',
    imageUrl: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3',
    date: '2025-02-15',
    readTime: 4,
    slug: 'daily-prayer-templates'
  },
  // More posts would be added here
];

// Translation keys for content
const translations = {
  en: {
    'How to Understand Jesus Parables': 'How to Understand Jesus Parables',
    'Learn the simple approach to understanding the deeper meanings in Jesus parables': 'Learn the simple approach to understanding the deeper meanings in Jesus parables',
    'Finding Peace in Prayer': 'Finding Peace in Prayer',
    'Discover how to create a meaningful prayer routine that brings you closer to God': 'Discover how to create a meaningful prayer routine that brings you closer to God',
    'When Faith Meets Anxiety': 'When Faith Meets Anxiety',
    'Practical ways to use faith as a foundation for managing anxiety and worry': 'Practical ways to use faith as a foundation for managing anxiety and worry',
    'Bible Study for Beginners': 'Bible Study for Beginners',
    "A simple approach to understanding the Bible even if you've never read it before": "A simple approach to understanding the Bible even if you've never read it before",
    'Building Faith Community Online': 'Building Faith Community Online',
    'How to find and nurture spiritual connections in the digital age': 'How to find and nurture spiritual connections in the digital age',
    'Daily Prayer Templates': 'Daily Prayer Templates',
    'Ready-to-use prayer templates for different situations in your life': 'Ready-to-use prayer templates for different situations in your life',
    'readMin': 'min read',
    'publishedOn': 'Published on'
  },
  pt: {
    'How to Understand Jesus Parables': 'Como Entender as Parábolas de Jesus',
    'Learn the simple approach to understanding the deeper meanings in Jesus parables': 'Aprenda a abordagem simples para compreender os significados mais profundos nas parábolas de Jesus',
    'Finding Peace in Prayer': 'Encontrando Paz na Oração',
    'Discover how to create a meaningful prayer routine that brings you closer to God': 'Descubra como criar uma rotina de oração significativa que te aproxima de Deus',
    'When Faith Meets Anxiety': 'Quando a Fé Encontra a Ansiedade',
    'Practical ways to use faith as a foundation for managing anxiety and worry': 'Maneiras práticas de usar a fé como base para gerenciar a ansiedade e preocupação',
    'Bible Study for Beginners': 'Estudo Bíblico para Iniciantes',
    "A simple approach to understanding the Bible even if you've never read it before": "Uma abordagem simples para entender a Bíblia mesmo que você nunca a tenha lido antes",
    'Building Faith Community Online': 'Construindo Comunidade de Fé Online',
    'How to find and nurture spiritual connections in the digital age': 'Como encontrar e nutrir conexões espirituais na era digital',
    'Daily Prayer Templates': 'Modelos de Oração Diária',
    'Ready-to-use prayer templates for different situations in your life': 'Modelos de oração prontos para usar em diferentes situações da sua vida',
    'readMin': 'min de leitura',
    'publishedOn': 'Publicado em'
  },
  // Similar translations would be added for other languages
};

const BlogPage: React.FC = () => {
  const { language, t } = useLanguage();
  
  // Format date based on locale
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === 'en' ? 'en-US' : 
      language === 'pt' ? 'pt-BR' : 
      language === 'es' ? 'es-ES' : 
      language === 'de' ? 'de-DE' : 
      language === 'it' ? 'it-IT' : 'fr-FR', 
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  // Translate content based on language
  const translate = (key: string) => {
    const langTranslations = translations[language as keyof typeof translations] || translations.en;
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  return (
    <>
      <Helmet>
        <title>{t('blog')} | {language === 'pt' ? 'LUZ CRUA' : language === 'en' ? 'RAW LIGHT' : language === 'de' ? 'ROHES LICHT' : language === 'es' ? 'LUZ CRUDA' : language === 'it' ? 'LUCE CRUDA' : 'LUMIÈRE BRUTE'}</title>
        <meta name="description" content={t('footer')} />
      </Helmet>

      <div className="py-10 md:py-16">
        <div className="container-content">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">{t('blog')}</h1>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link 
                key={post.id}
                to={`/${language}/blog/${post.slug}`} 
                className="group"
              >
                <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={translate(post.titleKey)} 
                      className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="text-sm font-medium text-primary mb-2">
                      {t(post.category)}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {translate(post.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <CardDescription className="line-clamp-3">
                      {translate(post.summaryKey)}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground">
                    <div className="flex items-center justify-between w-full">
                      <span>{translate('publishedOn')} {formatDate(post.date)}</span>
                      <span>{post.readTime} {translate('readMin')}</span>
                    </div>
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

export default BlogPage;
