
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Book, Heart, Shield, BookOpen, Users, LifeBuoy } from 'lucide-react';
import { supabaseService } from '@/services/supabaseService';
import { Category, CategoryTranslation } from '@/types/supabase';
import { useToast } from '@/hooks/use-toast';

interface CategoryWithTranslation {
  id: string;
  slug: string;
  name: string;
}

const CategoriesSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [categories, setCategories] = useState<CategoryWithTranslation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await supabaseService.getCategories(language);
        
        // Montar um array de categorias com suas traduções
        const formattedCategories = data.map(category => {
          const translation = category.category_translations?.[0];
          return {
            id: category.id,
            slug: category.slug,
            name: translation?.name || ''
          };
        });
        
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: "Erro ao carregar categorias",
          description: "Não foi possível carregar as categorias",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [language, toast]);

  // Mapear os slugs para os ícones
  const getCategoryIcon = (slug: string) => {
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

  if (loading) {
    return (
      <section className="py-16">
        <div className="container-content">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">...</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="p-6 rounded-xl animate-pulse">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-full mb-4 h-20 w-20"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 w-3/4 mb-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container-content">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            {language === 'pt' && 'Categorias'}
            {language === 'en' && 'Categories'}
            {language === 'de' && 'Kategorien'}
            {language === 'es' && 'Categorías'}
            {language === 'it' && 'Categorie'}
            {language === 'fr' && 'Catégories'}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/${language}/category/${category.slug}`}
              className="group p-6 rounded-xl transition-all hover:shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 p-4 rounded-full mb-4 transition-transform group-hover:scale-110">
                  {getCategoryIcon(category.slug)}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
