
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const translations = {
  en: {
    'socialTitle': 'Social Media',
    'socialDesc': 'Connect with us on our social platforms for daily inspiration, updates, and community interactions.',
    'followUs': 'Follow Us',
    'facebookTitle': 'Facebook',
    'facebookDesc': 'Join our Facebook community for daily inspiration and discussions.',
    'instagramTitle': 'Instagram',
    'instagramDesc': 'Follow our Instagram for visual inspiration and stories of faith.',
    'youtubeTitle': 'YouTube',
    'youtubeDesc': 'Subscribe to our YouTube channel for video teachings and testimonials.',
    'twitterTitle': 'Twitter',
    'twitterDesc': 'Follow us on Twitter for quick spiritual insights and updates.',
    'recentPosts': 'Recent Social Media Posts',
    'viewProfile': 'View Profile'
  },
  pt: {
    'socialTitle': 'Redes Sociais',
    'socialDesc': 'Conecte-se conosco em nossas plataformas sociais para inspiração diária, atualizações e interações comunitárias.',
    'followUs': 'Siga-nos',
    'facebookTitle': 'Facebook',
    'facebookDesc': 'Junte-se à nossa comunidade no Facebook para inspiração diária e discussões.',
    'instagramTitle': 'Instagram',
    'instagramDesc': 'Siga nosso Instagram para inspiração visual e histórias de fé.',
    'youtubeTitle': 'YouTube',
    'youtubeDesc': 'Inscreva-se em nosso canal do YouTube para ensinamentos em vídeo e testemunhos.',
    'twitterTitle': 'Twitter',
    'twitterDesc': 'Siga-nos no Twitter para insights espirituais rápidos e atualizações.',
    'recentPosts': 'Posts Recentes de Redes Sociais',
    'viewProfile': 'Ver Perfil'
  },
  // Similar translations would be added for other languages
};

const SocialMediaPage: React.FC = () => {
  const { language, t } = useLanguage();
  
  // Translate content based on language
  const translate = (key: string) => {
    const langTranslations = translations[language as keyof typeof translations] || translations.en;
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  // Mock social media platforms
  const socialPlatforms = [
    {
      name: translate('facebookTitle'),
      description: translate('facebookDesc'),
      icon: <Facebook className="h-8 w-8" />,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      url: 'https://facebook.com/'
    },
    {
      name: translate('instagramTitle'),
      description: translate('instagramDesc'),
      icon: <Instagram className="h-8 w-8" />,
      color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
      url: 'https://instagram.com/'
    },
    {
      name: translate('youtubeTitle'),
      description: translate('youtubeDesc'),
      icon: <Youtube className="h-8 w-8" />,
      color: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
      url: 'https://youtube.com/'
    },
    {
      name: translate('twitterTitle'),
      description: translate('twitterDesc'),
      icon: <Twitter className="h-8 w-8" />,
      color: 'bg-sky-100 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400',
      url: 'https://twitter.com/'
    }
  ];

  // Mock recent posts
  const recentPosts = [
    {
      platform: 'instagram',
      content: '"The kingdom of God is not coming in ways that can be observed." - Luke 17:20',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
      date: '2025-04-05'
    },
    {
      platform: 'facebook',
      content: 'Join us this Sunday for our special online service focused on finding peace in challenging times.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
      date: '2025-04-04'
    },
    {
      platform: 'twitter',
      content: 'Daily reminder: You are loved more than you can imagine. #FaithJourney #DailyInspiration',
      image: '',
      date: '2025-04-03'
    }
  ];

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

  return (
    <>
      <Helmet>
        <title>{t('socialMedia')} | {language === 'pt' ? 'LUZ CRUA' : language === 'en' ? 'RAW LIGHT' : language === 'de' ? 'ROHES LICHT' : language === 'es' ? 'LUZ CRUDA' : language === 'it' ? 'LUCE CRUDA' : 'LUMIÈRE BRUTE'}</title>
        <meta name="description" content={translate('socialDesc')} />
      </Helmet>

      <div className="py-10 md:py-16">
        <div className="container-content">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">{t('socialMedia')}</h1>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {translate('socialDesc')}
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">{translate('followUs')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {socialPlatforms.map((platform, index) => (
                <a 
                  href={platform.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  key={index}
                  className="block hover:shadow-md transition-shadow"
                >
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className={`w-16 h-16 rounded-full ${platform.color} flex items-center justify-center mb-4`}>
                        {platform.icon}
                      </div>
                      <CardTitle>{platform.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{platform.description}</CardDescription>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-center mb-8">{translate('recentPosts')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  {post.image && (
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                      <img
                        src={post.image}
                        alt=""
                        className="object-cover w-full h-48"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-3">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                          post.platform === 'instagram' ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400' :
                          post.platform === 'facebook' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                          'bg-sky-100 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400'
                        }`}
                      >
                        {post.platform === 'instagram' ? <Instagram className="h-4 w-4" /> :
                         post.platform === 'facebook' ? <Facebook className="h-4 w-4" /> :
                         <Twitter className="h-4 w-4" />}
                      </div>
                      <span className="text-sm text-muted-foreground">{formatDate(post.date)}</span>
                    </div>
                    <p className="mb-4">{post.content}</p>
                    <a 
                      href="#" 
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {translate('viewProfile')} &rarr;
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialMediaPage;
