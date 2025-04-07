
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Book, Heart, Shield, BookOpen, Users, LifeBuoy } from 'lucide-react';
import { supabaseService } from '@/services/supabaseService';
import { Post, Category, CategoryTranslation } from '@/types/supabase';
import { useToast } from '@/hooks/use-toast';

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { language, t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [categoryTranslation, setCategoryTranslation] = useState<CategoryTranslation | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      if (!categorySlug) return;
      
      try {
        setLoading(true);
        const postsData = await supabaseService.getPostsByCategory(language, categorySlug);
        setPosts(postsData);
        
        // Extrair informações da categoria do primeiro post, se disponível
        if (postsData.length > 0 && postsData[0].categories) {
          setCategory(postsData[0].categories);
          
          if (postsData[0].category_translations?.[0]) {
            setCategoryTranslation(postsData[0].category_translations[0]);
          }
        }
      } catch (error) {
        console.error(`Error fetching data for category ${categorySlug}:`, error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os posts desta categoria",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug, language, toast]);
  
  // Mapear os slugs para os ícones
  const getCategoryIcon = (slug: string | undefined) => {
    if (!slug) return <Book className="h-10 w-10" />;
    
    switch (slug) {
      case 'teachings-of-jesus':
        return <Book className="h-10 w-10" />;
      case 'connection-with-god':
        return <Heart className="h-10 w-10" />;
      case 'overcoming-challenges':
        return <Shield className="h-10 w-10" />;
      case 'understanding-bible':
        return <BookOpen className="h-10 w-10" />;
      case 'community-communion':
        return <Users className="h-10 w-10" />;
      case 'practical-resources':
        return <LifeBuoy className="h-10 w-10" />;
      default:
        return <Book className="h-10 w-10" />;
    }
  };
  
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
  const getTranslation = (key: 'readMin' | 'publishedOn' | 'noPosts') => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        readMin: 'min read',
        publishedOn: 'Published on',
        noPosts: 'No posts found in this category.'
      },
      pt: {
        readMin: 'min de leitura',
        publishedOn: 'Publicado em',
        noPosts: 'Nenhum post encontrado nesta categoria.'
      },
      es: {
        readMin: 'min de lectura',
        publishedOn: 'Publicado el',
        noPosts: 'No se encontraron publicaciones en esta categoría.'
      },
      de: {
        readMin: 'min Lesezeit',
        publishedOn: 'Veröffentlicht am',
        noPosts: 'Keine Beiträge in dieser Kategorie gefunden.'
      },
      it: {
        readMin: 'min di lettura',
        publishedOn: 'Pubblicato il',
        noPosts: 'Nessun post trovato in questa categoria.'
      },
      fr: {
        readMin: 'min de lecture',
        publishedOn: 'Publié le',
        noPosts: 'Aucun article trouvé dans cette catégorie.'
      }
    };
    
    const langTranslations = translations[language] || translations.en;
    return langTranslations[key];
  };

  return (
    <>
      <Helmet>
        <title>
          {categoryTranslation?.name || ''} | {language === 'pt' ? 'LUZ CRUA' : language === 'en' ? 'RAW LIGHT' : language === 'de' ? 'ROHES LICHT' : language === 'es' ? 'LUZ CRUDA' : language === 'it' ? 'LUCE CRUDA' : 'LUMIÈRE BRUTE'}
        </title>
        <meta name="description" content={t('footer')} />
      </Helmet>

      <div className="py-10 md:py-16">
        <div className="container-content">
          <div className="text-center mb-12">
            <div className="text-purple-600 dark:text-purple-400 inline-block p-4 rounded-full mb-4">
              {getCategoryIcon(category?.slug)}
            </div>
            <h1 className="text-4xl font-bold">
              {categoryTranslation?.name || ''}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <Card className="h-full overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                      <div className="bg-gray-300 dark:bg-gray-700 w-full h-48"></div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="h-6 bg-gray-300 dark:bg-gray-700 w-3/4 mb-2"></div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 w-full mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 w-4/5 mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 w-3/5"></div>
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
          ) : posts.length > 0 ? (
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
          ) : (
            <div className="text-center text-muted-foreground py-12">
              {getTranslation('noPosts')}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
