
import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Book, Heart, Shield, BookOpen, Users, LifeBuoy } from 'lucide-react';

// Sample post data - would typically come from an API
const getCategoryPosts = (category: string) => {
  const allPosts = {
    'teachings-of-jesus': [
      {
        id: 1,
        titleKey: 'Understanding the Parable of the Prodigal Son',
        summaryKey: 'A fresh look at one of Jesus\' most famous parables and what it means for us today',
        imageUrl: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
        date: '2025-03-15',
        readTime: 5,
        slug: 'parable-prodigal-son'
      },
      {
        id: 2,
        titleKey: 'The Beatitudes Explained',
        summaryKey: 'Breaking down the blessings Jesus shared in the Sermon on the Mount',
        imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
        date: '2025-03-10',
        readTime: 7,
        slug: 'beatitudes-explained'
      },
      {
        id: 3,
        titleKey: 'Jesus\' Teachings on Prayer',
        summaryKey: 'How Jesus taught us to pray and what it means for our prayer life today',
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
        date: '2025-03-05',
        readTime: 6,
        slug: 'jesus-teachings-prayer'
      }
    ],
    'connection-with-god': [
      {
        id: 4,
        titleKey: 'Creating a Daily Prayer Routine',
        summaryKey: 'Practical steps to establish a consistent and meaningful prayer life',
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        date: '2025-03-12',
        readTime: 4,
        slug: 'daily-prayer-routine'
      },
      {
        id: 5,
        titleKey: 'The Power of Quiet Time',
        summaryKey: 'How setting aside time for silence can deepen your connection with God',
        imageUrl: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3',
        date: '2025-03-08',
        readTime: 5,
        slug: 'power-quiet-time'
      },
      {
        id: 6,
        titleKey: 'Hearing God\'s Voice in a Noisy World',
        summaryKey: 'Tips for recognizing divine guidance amidst life\'s constant distractions',
        imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
        date: '2025-03-01',
        readTime: 6,
        slug: 'hearing-gods-voice'
      }
    ],
    'overcoming-challenges': [
      {
        id: 7,
        titleKey: 'Finding Strength in Difficult Times',
        summaryKey: 'Biblical principles for staying strong when life gets tough',
        imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
        date: '2025-02-28',
        readTime: 7,
        slug: 'strength-difficult-times'
      },
      {
        id: 8,
        titleKey: 'Overcoming Anxiety with Faith',
        summaryKey: 'How faith provides powerful tools for managing anxiety and stress',
        imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
        date: '2025-02-25',
        readTime: 5,
        slug: 'overcoming-anxiety-faith'
      },
      {
        id: 9,
        titleKey: 'The Journey Through Grief',
        summaryKey: 'Finding comfort and healing through faith during times of loss',
        imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
        date: '2025-02-20',
        readTime: 8,
        slug: 'journey-through-grief'
      }
    ],
    'understanding-bible': [
      {
        id: 10,
        titleKey: 'Bible Study Methods for Beginners',
        summaryKey: 'Simple techniques to help you understand and apply Scripture',
        imageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
        date: '2025-02-15',
        readTime: 6,
        slug: 'bible-study-methods'
      },
      {
        id: 11,
        titleKey: 'Understanding Biblical Context',
        summaryKey: 'Why historical and cultural context matters when reading the Bible',
        imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
        date: '2025-02-10',
        readTime: 7,
        slug: 'biblical-context'
      },
      {
        id: 12,
        titleKey: 'The Bible\'s Big Story',
        summaryKey: 'Understanding the overarching narrative from Genesis to Revelation',
        imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
        date: '2025-02-05',
        readTime: 8,
        slug: 'bibles-big-story'
      }
    ],
    'community-communion': [
      {
        id: 13,
        titleKey: 'Building Authentic Faith Community',
        summaryKey: 'How to create meaningful connections with other believers',
        imageUrl: 'https://images.unsplash.com/photo-1458668383970-8ddd3927deed',
        date: '2025-01-30',
        readTime: 5,
        slug: 'building-faith-community'
      },
      {
        id: 14,
        titleKey: 'The Importance of Fellowship',
        summaryKey: 'Why connecting with others is essential for spiritual growth',
        imageUrl: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67',
        date: '2025-01-25',
        readTime: 4,
        slug: 'importance-fellowship'
      },
      {
        id: 15,
        titleKey: 'Serving Others as Spiritual Practice',
        summaryKey: 'How serving those around you deepens your connection with God',
        imageUrl: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151',
        date: '2025-01-20',
        readTime: 6,
        slug: 'serving-others'
      }
    ],
    'practical-resources': [
      {
        id: 16,
        titleKey: 'Creating a Home Prayer Space',
        summaryKey: 'Tips for designing a dedicated area for prayer and reflection',
        imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
        date: '2025-01-15',
        readTime: 4,
        slug: 'home-prayer-space'
      },
      {
        id: 17,
        titleKey: 'Digital Tools for Faith Growth',
        summaryKey: 'Apps and resources that can support your spiritual journey',
        imageUrl: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
        date: '2025-01-10',
        readTime: 5,
        slug: 'digital-faith-tools'
      },
      {
        id: 18,
        titleKey: 'Faith-Based Journaling Prompts',
        summaryKey: 'Writing exercises to deepen your reflection and spiritual awareness',
        imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
        date: '2025-01-05',
        readTime: 6,
        slug: 'faith-journaling-prompts'
      }
    ]
  };

  return allPosts[category as keyof typeof allPosts] || [];
};

// Basic translations for category
const getCategoryInfo = (categorySlug: string) => {
  const categories = {
    'teachings-of-jesus': {
      id: 'teachingsOfJesus',
      icon: <Book className="h-10 w-10" />,
      color: 'text-purple-600 dark:text-purple-400'
    },
    'connection-with-god': {
      id: 'connectionWithGod',
      icon: <Heart className="h-10 w-10" />,
      color: 'text-purple-600 dark:text-purple-400'
    },
    'overcoming-challenges': {
      id: 'overcomingChallenges',
      icon: <Shield className="h-10 w-10" />,
      color: 'text-purple-600 dark:text-purple-400'
    },
    'understanding-bible': {
      id: 'understandingBible',
      icon: <BookOpen className="h-10 w-10" />,
      color: 'text-purple-600 dark:text-purple-400'
    },
    'community-communion': {
      id: 'communityAndCommunion',
      icon: <Users className="h-10 w-10" />,
      color: 'text-purple-600 dark:text-purple-400'
    },
    'practical-resources': {
      id: 'practicalResources',
      icon: <LifeBuoy className="h-10 w-10" />,
      color: 'text-purple-600 dark:text-purple-400'
    }
  };

  return categories[categorySlug as keyof typeof categories] || {
    id: 'category',
    icon: <Book className="h-10 w-10" />,
    color: 'text-purple-600 dark:text-purple-400'
  };
};

// Translation keys for content
const translations = {
  en: {
    'Understanding the Parable of the Prodigal Son': 'Understanding the Parable of the Prodigal Son',
    'A fresh look at one of Jesus\' most famous parables and what it means for us today': 'A fresh look at one of Jesus\' most famous parables and what it means for us today',
    // Add other English translations here
    'readMin': 'min read',
    'publishedOn': 'Published on',
    'noPosts': 'No posts found in this category.'
  },
  pt: {
    'Understanding the Parable of the Prodigal Son': 'Entendendo a Parábola do Filho Pródigo',
    'A fresh look at one of Jesus\' most famous parables and what it means for us today': 'Um novo olhar sobre uma das parábolas mais famosas de Jesus e o que ela significa para nós hoje',
    // Add other Portuguese translations here
    'readMin': 'min de leitura',
    'publishedOn': 'Publicado em',
    'noPosts': 'Nenhum post encontrado nesta categoria.'
  },
  // Similar translations would be added for other languages
};

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { language, t } = useLanguage();
  
  const categoryInfo = getCategoryInfo(categorySlug || '');
  const posts = getCategoryPosts(categorySlug || '');
  
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
        <title>{t(categoryInfo.id)} | {language === 'pt' ? 'LUZ CRUA' : language === 'en' ? 'RAW LIGHT' : language === 'de' ? 'ROHES LICHT' : language === 'es' ? 'LUZ CRUDA' : language === 'it' ? 'LUCE CRUDA' : 'LUMIÈRE BRUTE'}</title>
        <meta name="description" content={t('footer')} />
      </Helmet>

      <div className="py-10 md:py-16">
        <div className="container-content">
          <div className="text-center mb-12">
            <div className={`${categoryInfo.color} inline-block p-4 rounded-full mb-4`}>
              {categoryInfo.icon}
            </div>
            <h1 className="text-4xl font-bold">{t(categoryInfo.id)}</h1>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
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
          ) : (
            <div className="text-center text-muted-foreground py-12">
              {translate('noPosts')}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
