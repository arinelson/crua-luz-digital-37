
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { supabaseService } from '@/services/supabaseService';
import { Post } from '@/types/supabase';
import { useToast } from '@/hooks/use-toast';

const FeaturedArticles: React.FC = () => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        setLoading(true);
        const posts = await supabaseService.getFeaturedPosts(language);
        setArticles(posts);
      } catch (error) {
        console.error('Error fetching featured posts:', error);
        toast({
          title: "Erro ao carregar artigos",
          description: "Não foi possível carregar os artigos em destaque",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
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

  if (loading) {
    return (
      <section className="py-16 bg-primary/5 dark:bg-accent">
        <div className="container-content">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">...</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-card rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/3 mb-4"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 w-full mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-primary/5 dark:bg-accent">
      <div className="container-content">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            {language === 'pt' && 'Artigos em Destaque'}
            {language === 'en' && 'Featured Articles'}
            {language === 'de' && 'Ausgewählte Artikel'}
            {language === 'es' && 'Artículos Destacados'}
            {language === 'it' && 'Articoli in Evidenza'}
            {language === 'fr' && 'Articles en Vedette'}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="bg-card rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
              <Link to={`/${language}/blog/${article.slug}`}>
                <div className="relative h-48">
                  <img 
                    src={article.image_url} 
                    alt={article.post_translations?.[0]?.title || ''}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center mb-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  <time>{formatDate(article.published_at)}</time>
                  <span className="mx-2">•</span>
                  <span>{article.category_translations?.[0]?.name || ''}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  <Link to={`/${language}/blog/${article.slug}`} className="hover:text-primary transition-colors">
                    {article.post_translations?.[0]?.title || ''}
                  </Link>
                </h3>
                <p className="text-muted-foreground mb-4">{article.post_translations?.[0]?.summary || ''}</p>
                <Link 
                  to={`/${language}/blog/${article.slug}`}
                  className="text-primary font-medium hover:underline"
                >
                  {language === 'pt' && 'Ler mais'}
                  {language === 'en' && 'Read more'}
                  {language === 'de' && 'Weiterlesen'}
                  {language === 'es' && 'Leer más'}
                  {language === 'it' && 'Leggi di più'}
                  {language === 'fr' && 'Lire la suite'}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
