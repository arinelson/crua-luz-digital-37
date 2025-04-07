
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Book, Heart, Shield, BookOpen, Users, LifeBuoy } from 'lucide-react';

const CategoriesSection: React.FC = () => {
  const { language, t } = useLanguage();

  const categories = [
    {
      id: 'teachingsOfJesus',
      label: t('teachingsOfJesus'),
      icon: <Book className="h-10 w-10" />,
      path: `/${language}/category/teachings-of-jesus`,
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 'connectionWithGod',
      label: t('connectionWithGod'),
      icon: <Heart className="h-10 w-10" />,
      path: `/${language}/category/connection-with-god`,
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 'overcomingChallenges',
      label: t('overcomingChallenges'),
      icon: <Shield className="h-10 w-10" />,
      path: `/${language}/category/overcoming-challenges`,
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 'understandingBible',
      label: t('understandingBible'),
      icon: <BookOpen className="h-10 w-10" />,
      path: `/${language}/category/understanding-bible`,
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 'communityAndCommunion',
      label: t('communityAndCommunion'),
      icon: <Users className="h-10 w-10" />,
      path: `/${language}/category/community-communion`,
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 'practicalResources',
      label: t('practicalResources'),
      icon: <LifeBuoy className="h-10 w-10" />,
      path: `/${language}/category/practical-resources`,
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <section className="py-16">
      <div className="container-content">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{t('categories')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={category.path}
              className="group p-6 rounded-xl transition-all hover:shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`${category.bgColor} ${category.iconColor} p-4 rounded-full mb-4 transition-transform group-hover:scale-110`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {category.label}
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
