
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Calendar, Video } from 'lucide-react';
import { supabaseService } from '@/services/supabaseService';
import { WebStory } from '@/types/supabase';
import { useToast } from '@/hooks/use-toast';

const FeaturedWebStories: React.FC = () => {
  const { language } = useLanguage();
  const [webStories, setWebStories] = useState<WebStory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWebStories = async () => {
      try {
        setLoading(true);
        const stories = await supabaseService.getAllWebStories(language);
        setWebStories(stories.slice(0, 3)); // Get only the first 3 stories
        console.log('Fetched web stories:', stories);
      } catch (error) {
        console.error('Error fetching web stories:', error);
        toast({
          title: "Error loading web stories",
          description: "Could not load featured web stories",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWebStories();
  }, [language, toast]);

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

  const getTitle = () => {
    switch(language) {
      case 'pt': return 'Web Stories';
      case 'en': return 'Web Stories';
      case 'de': return 'Web Stories';
      case 'es': return 'Web Stories';
      case 'it': return 'Web Stories';
      case 'fr': return 'Web Stories';
      default: return 'Web Stories';
    }
  };

  const getViewAllText = () => {
    switch(language) {
      case 'pt': return 'Ver todas as web stories';
      case 'en': return 'View all web stories';
      case 'de': return 'Alle Web Stories ansehen';
      case 'es': return 'Ver todas las web stories';
      case 'it': return 'Visualizza tutti i web stories';
      case 'fr': return 'Voir toutes les web stories';
      default: return 'View all web stories';
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-accent/5">
        <div className="container-content">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">...</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-card rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-300 dark:bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/3 mb-4"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 w-3/4 mb-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (webStories.length === 0) {
    return null; // Don't render the section if there are no web stories
  }

  return (
    <section className="py-16 bg-accent/5">
      <div className="container-content">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{getTitle()}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {webStories.map((story) => (
            <article key={story.id} className="bg-card rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
              <Link to={`/${language}/web-stories/${story.slug}`} className="relative block h-64">
                <img 
                  src={story.image_url} 
                  alt={story.web_story_translations?.[0]?.title || ''}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <div className="flex items-center mb-2 text-sm text-white/80">
                      <Video className="w-4 h-4 mr-1" />
                      <span>Web Story</span>
                      {story.category_translations?.[0]?.name && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{story.category_translations[0].name}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {story.web_story_translations?.[0]?.title || ''}
                    </h3>
                  </div>
                </div>
              </Link>
              <div className="p-4 text-sm text-muted-foreground mt-auto">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <time>{formatDate(story.published_at)}</time>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to={`/${language}/web-stories`}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {getViewAllText()}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWebStories;
