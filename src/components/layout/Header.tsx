
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage, Language, languageOptions } from '../../contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { id: 'home', label: t('home'), path: `/${language}/` },
    { id: 'blog', label: t('blog'), path: `/${language}/blog` },
    { id: 'webStories', label: t('webStories'), path: `/${language}/web-stories` },
    { id: 'about', label: t('about'), path: `/${language}/about` },
    { id: 'contact', label: t('contact'), path: `/${language}/contact` },
    { id: 'services', label: t('services'), path: `/${language}/services` },
    { id: 'socialMedia', label: t('socialMedia'), path: `/${language}/social-media` },
  ];

  const currentLanguage = languageOptions.find(lang => lang.code === language);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-content flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <Link 
            to={`/${language}/`} 
            className="flex items-center gap-2 text-2xl font-bold text-primary"
          >
            {currentLanguage?.name} <span className="text-xl">{currentLanguage?.flag}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-6 lg:gap-10">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
              <Globe className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languageOptions.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as Language)}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Switcher */}
          <button 
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="inline-flex items-center justify-center rounded-md md:hidden" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container-content py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
