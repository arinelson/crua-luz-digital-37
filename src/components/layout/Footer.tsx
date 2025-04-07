
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  
  const categories = [
    { id: 'teachingsOfJesus', label: t('teachingsOfJesus'), path: `/${language}/category/teachings-of-jesus` },
    { id: 'connectionWithGod', label: t('connectionWithGod'), path: `/${language}/category/connection-with-god` },
    { id: 'overcomingChallenges', label: t('overcomingChallenges'), path: `/${language}/category/overcoming-challenges` },
    { id: 'understandingBible', label: t('understandingBible'), path: `/${language}/category/understanding-bible` },
    { id: 'communityAndCommunion', label: t('communityAndCommunion'), path: `/${language}/category/community-communion` },
    { id: 'practicalResources', label: t('practicalResources'), path: `/${language}/category/practical-resources` },
  ];

  const navItems = [
    { id: 'home', label: t('home'), path: `/${language}/` },
    { id: 'blog', label: t('blog'), path: `/${language}/blog` },
    { id: 'webStories', label: t('webStories'), path: `/${language}/web-stories` },
    { id: 'about', label: t('about'), path: `/${language}/about` },
    { id: 'contact', label: t('contact'), path: `/${language}/contact` },
    { id: 'services', label: t('services'), path: `/${language}/services` },
    { id: 'socialMedia', label: t('socialMedia'), path: `/${language}/social-media` },
  ];

  return (
    <footer className="bg-primary/5 dark:bg-accent pt-12 pb-8">
      <div className="container-content">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link to={`/${language}/`} className="text-2xl font-bold text-gradient">
              {language === 'pt' && 'LUZ CRUA 🇧🇷'}
              {language === 'en' && 'RAW LIGHT 🇺🇸'}
              {language === 'de' && 'ROHES LICHT 🇩🇪'}
              {language === 'es' && 'LUZ CRUDA 🇪🇸'}
              {language === 'it' && 'LUCE CRUDA 🇮🇹'}
              {language === 'fr' && 'LUMIÈRE BRUTE 🇫🇷'}
            </Link>
            <p className="text-sm text-muted-foreground">
              {t('footer')}
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Email" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('categories')}</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link 
                    to={category.path} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('home')}</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link 
                    to={item.path} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('newsletter')}</h3>
            <form className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2"
              >
                {t('subscribe')}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {language === 'pt' ? 'LUZ CRUA' : language === 'en' ? 'RAW LIGHT' : language === 'de' ? 'ROHES LICHT' : language === 'es' ? 'LUZ CRUDA' : language === 'it' ? 'LUCE CRUDA' : 'LUMIÈRE BRUTE'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
