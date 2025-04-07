
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { supabaseService } from '@/services/supabaseService';
import { Post } from '@/types/supabase';
import { useToast } from '@/hooks/use-toast';

const BlogPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsData = await supabaseService.getAllPosts(language);
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Erro ao carregar posts",
          description: "Não foi possível carregar os posts do blog",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [language, toast]);
  
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

  // Traduções para "min read" e "published on"
  const getTranslation = (key: 'readMin' | 'publishedOn' | 'sharePost' | 'readMore') => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        readMin: 'min read',
        publishedOn: 'Published on',
        sharePost: 'Share',
        readMore: 'Read more'
      },
      pt: {
        readMin: 'min de leitura',
        publishedOn: 'Publicado em',
        sharePost: 'Compartilhar',
        readMore: 'Leia mais'
      },
      es: {
        readMin: 'min de lectura',
        publishedOn: 'Publicado el',
        sharePost: 'Compartir',
        readMore: 'Leer más'
      },
      de: {
        readMin: 'min Lesezeit',
        publishedOn: 'Veröffentlicht am',
        sharePost: 'Teilen',
        readMore: 'Weiterlesen'
      },
      it: {
        readMin: 'min di lettura',
        publishedOn: 'Pubblicato il',
        sharePost: 'Condividi',
        readMore: 'Leggi di più'
      },
      fr: {
        readMin: 'min de lecture',
        publishedOn: 'Publié le',
        sharePost: 'Partager',
        readMore: 'Lire plus'
      }
    };
    
    const langTranslations = translations[language] || translations.en;
    return langTranslations[key];
  };

  return (
    <>
      <Helmet>
        <title>{t('blog')} | {language === 'pt' ? 'LUZ CRUA' : language === 'en' ? 'RAW LIGHT' : language === 'de' ? 'ROHES LICHT' : language === 'es' ? 'LUZ CRUDA' : language === 'it' ? 'LUCE CRUDA' : 'LUMIÈRE BRUTE'}</title>
        <meta name="description" content={t('footer')} />
        <meta property="og:title" content={t('blog')} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={t('footer')} />
      </Helmet>

      <div className="py-10 md:py-16">
        <div className="container-content">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">{t('blog')}</h1>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="animate-pulse">
                  <Card className="h-full overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                      <div className="bg-gray-300 dark:bg-gray-700 w-full h-48"></div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/4 mb-2"></div>
                      <div className="h-6 bg-gray-300 dark:bg-gray-700 w-3/4 mb-2"></div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 w-full mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 w-5/6 mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 w-4/6"></div>
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground">
                      <div className="flex items-center justify-between w-full">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 w-2/5"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/5"></div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
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
                        src={post.image_url} 
                        alt={post.post_translations?.[0]?.title || ''} 
                        className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="text-sm font-medium text-primary mb-2">
                        {post.category_translations?.[0]?.name || ''}
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {post.post_translations?.[0]?.title || ''}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription className="line-clamp-3">
                        {post.post_translations?.[0]?.summary || ''}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground">
                      <div className="flex items-center justify-between w-full">
                        <span>{getTranslation('publishedOn')} {formatDate(post.published_at)}</span>
                        <span>{post.read_time} {getTranslation('readMin')}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
