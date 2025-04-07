
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, Headphones, Users, Mail, Calendar } from 'lucide-react';

const translations = {
  en: {
    'servicesTitle': 'Our Services',
    'servicesDesc': 'We offer various resources and services to help you in your spiritual journey.',
    'serviceStudies': 'Bible Studies',
    'serviceStudiesDesc': 'Personalized Bible study plans tailored to your spiritual needs and questions.',
    'serviceVideos': 'Video Content',
    'serviceVideosDesc': 'Professionally produced videos explaining complex spiritual concepts in simple terms.',
    'servicePodcasts': 'Podcasts',
    'servicePodcastsDesc': 'Weekly audio content for learning on the go, featuring interviews and teaching sessions.',
    'serviceCommunity': 'Community Groups',
    'serviceCommunityDesc': 'Online and in-person gatherings to connect with others on similar spiritual journeys.',
    'serviceNewsletter': 'Daily Devotionals',
    'serviceNewsletterDesc': 'Daily reflections and prayers delivered straight to your inbox.',
    'serviceCounseling': 'Spiritual Counseling',
    'serviceCounselingDesc': 'One-on-one sessions to address personal spiritual challenges and questions.',
    'learnMore': 'Learn More',
    'contactUs': 'Contact Us'
  },
  pt: {
    'servicesTitle': 'Nossos Serviços',
    'servicesDesc': 'Oferecemos vários recursos e serviços para ajudar você em sua jornada espiritual.',
    'serviceStudies': 'Estudos Bíblicos',
    'serviceStudiesDesc': 'Planos de estudo bíblico personalizados adaptados às suas necessidades e perguntas espirituais.',
    'serviceVideos': 'Conteúdo em Vídeo',
    'serviceVideosDesc': 'Vídeos produzidos profissionalmente explicando conceitos espirituais complexos em termos simples.',
    'servicePodcasts': 'Podcasts',
    'servicePodcastsDesc': 'Conteúdo de áudio semanal para aprender em movimento, com entrevistas e sessões de ensino.',
    'serviceCommunity': 'Grupos Comunitários',
    'serviceCommunityDesc': 'Encontros online e presenciais para se conectar com outros em jornadas espirituais semelhantes.',
    'serviceNewsletter': 'Devocionais Diários',
    'serviceNewsletterDesc': 'Reflexões diárias e orações entregues diretamente em sua caixa de entrada.',
    'serviceCounseling': 'Aconselhamento Espiritual',
    'serviceCounselingDesc': 'Sessões individuais para abordar desafios espirituais pessoais e perguntas.',
    'learnMore': 'Saiba Mais',
    'contactUs': 'Entre em Contato'
  },
  // Similar translations would be added for other languages
};

const ServicesPage: React.FC = () => {
  const { language, t } = useLanguage();
  
  // Translate content based on language
  const translate = (key: string) => {
    const langTranslations = translations[language as keyof typeof translations] || translations.en;
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  const services = [
    {
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      title: translate('serviceStudies'),
      description: translate('serviceStudiesDesc')
    },
    {
      icon: <Video className="h-12 w-12 text-primary" />,
      title: translate('serviceVideos'),
      description: translate('serviceVideosDesc')
    },
    {
      icon: <Headphones className="h-12 w-12 text-primary" />,
      title: translate('servicePodcasts'),
      description: translate('servicePodcastsDesc')
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: translate('serviceCommunity'),
      description: translate('serviceCommunityDesc')
    },
    {
      icon: <Mail className="h-12 w-12 text-primary" />,
      title: translate('serviceNewsletter'),
      description: translate('serviceNewsletterDesc')
    },
    {
      icon: <Calendar className="h-12 w-12 text-primary" />,
      title: translate('serviceCounseling'),
      description: translate('serviceCounselingDesc')
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('services')} | {language === 'pt' ? 'LUZ CRUA' : language === 'en' ? 'RAW LIGHT' : language === 'de' ? 'ROHES LICHT' : language === 'es' ? 'LUZ CRUDA' : language === 'it' ? 'LUCE CRUDA' : 'LUMIÈRE BRUTE'}</title>
        <meta name="description" content={translate('servicesDesc')} />
      </Helmet>

      <div className="py-10 md:py-16">
        <div className="container-content">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">{t('services')}</h1>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {translate('servicesDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-col items-center text-center pb-2">
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <Button variant="outline" className="w-full">
                    {translate('learnMore')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              {t('footer')}
            </p>
            <Button asChild>
              <a href={`/${language}/contact`}>{translate('contactUs')}</a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
