
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';

const translations = {
  en: {
    'aboutTitle': 'About Us',
    'aboutMission': 'Our Mission',
    'aboutMissionText': 'We believe that everyone deserves to experience the transformative teachings of Jesus in a way that is accessible, practical, and relevant to modern life. Our mission is to help you build a deep connection with God and find comfort for your pain through these teachings, even if you\'ve never understood the Bible before.',
    'aboutWhoWeAre': 'Who We Are',
    'aboutWhoWeAreText': 'We are a team of passionate believers who have experienced firsthand how understanding the true message of Jesus can change lives. With backgrounds in theology, education, and digital media, we\'ve come together to create content that bridges the gap between ancient wisdom and modern challenges.',
    'aboutValues': 'Our Values',
    'aboutValueSimplicity': 'Simplicity',
    'aboutValueSimplicityText': 'We believe in making spiritual content easy to understand without watering down its meaning.',
    'aboutValueAuthenticity': 'Authenticity',
    'aboutValueAuthenticityText': 'We share real experiences and practical advice, not abstract theories.',
    'aboutValueInclusion': 'Inclusion',
    'aboutValueInclusionText': 'We welcome everyone seeking spiritual growth, regardless of their background or previous knowledge.',
    'aboutValueGrowth': 'Growth',
    'aboutValueGrowthText': 'We encourage continuous learning and development on your spiritual journey.',
    'aboutJoinUs': 'Join Our Community',
    'aboutJoinUsText': 'We invite you to become part of our growing community of seekers. Subscribe to our newsletter, follow us on social media, and participate in the conversation. Your story matters, and we\'d love to hear how these teachings are impacting your life.'
  },
  pt: {
    'aboutTitle': 'Sobre Nós',
    'aboutMission': 'Nossa Missão',
    'aboutMissionText': 'Acreditamos que todos merecem experimentar os ensinamentos transformadores de Jesus de uma forma acessível, prática e relevante para a vida moderna. Nossa missão é ajudar você a construir uma conexão profunda com Deus e encontrar conforto para sua dor através desses ensinamentos, mesmo que você nunca tenha entendido a Bíblia antes.',
    'aboutWhoWeAre': 'Quem Somos',
    'aboutWhoWeAreText': 'Somos uma equipe de crentes apaixonados que experimentaram em primeira mão como entender a verdadeira mensagem de Jesus pode mudar vidas. Com formação em teologia, educação e mídia digital, nos unimos para criar conteúdo que preenche a lacuna entre a sabedoria antiga e os desafios modernos.',
    'aboutValues': 'Nossos Valores',
    'aboutValueSimplicity': 'Simplicidade',
    'aboutValueSimplicityText': 'Acreditamos em tornar o conteúdo espiritual fácil de entender sem diluir seu significado.',
    'aboutValueAuthenticity': 'Autenticidade',
    'aboutValueAuthenticityText': 'Compartilhamos experiências reais e conselhos práticos, não teorias abstratas.',
    'aboutValueInclusion': 'Inclusão',
    'aboutValueInclusionText': 'Damos as boas-vindas a todos que buscam crescimento espiritual, independentemente de sua origem ou conhecimento prévio.',
    'aboutValueGrowth': 'Crescimento',
    'aboutValueGrowthText': 'Incentivamos o aprendizado e o desenvolvimento contínuos em sua jornada espiritual.',
    'aboutJoinUs': 'Junte-se à Nossa Comunidade',
    'aboutJoinUsText': 'Convidamos você a fazer parte de nossa crescente comunidade de buscadores. Assine nossa newsletter, siga-nos nas redes sociais e participe da conversa. Sua história importa, e adoraríamos ouvir como esses ensinamentos estão impactando sua vida.'
  },
  // Similar translations would be added for other languages
};

const AboutPage: React.FC = () => {
  const { language, t } = useLanguage();
  
  // Translate content based on language
  const translate = (key: string) => {
    const langTranslations = translations[language as keyof typeof translations] || translations.en;
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  return (
    <>
      <Helmet>
        <title>{t('about')} | {language === 'pt' ? 'LUZ CRUA' : language === 'en' ? 'RAW LIGHT' : language === 'de' ? 'ROHES LICHT' : language === 'es' ? 'LUZ CRUDA' : language === 'it' ? 'LUCE CRUDA' : 'LUMIÈRE BRUTE'}</title>
        <meta name="description" content={translate('aboutMissionText')} />
      </Helmet>

      <div className="py-10 md:py-16">
        <div className="container-content">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">{t('about')}</h1>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">{translate('aboutMission')}</h2>
              <p className="text-muted-foreground">{translate('aboutMissionText')}</p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">{translate('aboutWhoWeAre')}</h2>
              <p className="text-muted-foreground">{translate('aboutWhoWeAreText')}</p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{translate('aboutValues')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg bg-secondary">
                  <h3 className="text-xl font-semibold mb-2">{translate('aboutValueSimplicity')}</h3>
                  <p className="text-muted-foreground">{translate('aboutValueSimplicityText')}</p>
                </div>
                <div className="p-6 rounded-lg bg-secondary">
                  <h3 className="text-xl font-semibold mb-2">{translate('aboutValueAuthenticity')}</h3>
                  <p className="text-muted-foreground">{translate('aboutValueAuthenticityText')}</p>
                </div>
                <div className="p-6 rounded-lg bg-secondary">
                  <h3 className="text-xl font-semibold mb-2">{translate('aboutValueInclusion')}</h3>
                  <p className="text-muted-foreground">{translate('aboutValueInclusionText')}</p>
                </div>
                <div className="p-6 rounded-lg bg-secondary">
                  <h3 className="text-xl font-semibold mb-2">{translate('aboutValueGrowth')}</h3>
                  <p className="text-muted-foreground">{translate('aboutValueGrowthText')}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">{translate('aboutJoinUs')}</h2>
              <p className="text-muted-foreground">{translate('aboutJoinUsText')}</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
