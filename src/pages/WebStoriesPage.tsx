
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { supabaseService } from '@/services/supabaseService';
import { WebStory } from '@/types/supabase';
import { useToast } from '@/hooks/use-toast';

const WebStoriesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [webStories, setWebStories] = useState<WebStory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchWebStories = async () => {
      try {
        setLoading(true);
        const stories = await supabaseService.getAllWebStories(language);
        setWebStories(stories);
      } catch (error) {
        console.error('Error fetching web stories:', error);
        toast({
          title: "Erro ao carregar web stories",
          description: "Não foi possível carregar as web stories",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWebStories();
  }, [language, toast]);
  
  // Format date based on locale
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === 'en' ? 'en-US' : 
      language === 'pt' ? 'pt-BR' : 
      language === 'es' ? 'es-ES' : 
      language === 'de' ? 'de-DE' : 
      language === 'it' ? 'it-IT' : 'fr-FR'
    );
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

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="animate-pulse">
                  <Card className="overflow-hidden h-full">
                    <div className="relative aspect-[9/16] overflow-hidden">
                      <div className="object-cover w-full h-full bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                    <CardFooter className="flex justify-between">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/3"></div>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          ) : webStories.length > 0 ? (
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
                        src={story.image_url} 
                        alt={story.web_story_translations?.[0]?.title || ''} 
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <div>
                          <div className="text-sm font-medium text-primary-foreground mb-2">
                            {story.category_translations?.[0]?.name || ''}
                          </div>
                          <h3 className="text-lg font-semibold text-white">
                            {story.web_story_translations?.[0]?.title || ''}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <CardFooter className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(story.published_at)}
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              {language === 'pt' ? 'Nenhuma web story encontrada' : 
               language === 'en' ? 'No web stories found' :
               language === 'de' ? 'Keine Web-Stories gefunden' :
               language === 'es' ? 'No se encontraron web stories' :
               language === 'it' ? 'Nessuna web story trovata' : 'Aucune web story trouvée'}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WebStoriesPage;
