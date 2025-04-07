
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from 'lucide-react';
import { useContactService, ContactFormData } from '@/services/contactService';

const translations = {
  en: {
    'contactTitle': 'Contact Us',
    'contactDesc': 'We would love to hear from you. Reach out with any questions, suggestions, or just to say hello.',
    'formName': 'Your Name',
    'formEmail': 'Your Email',
    'formSubject': 'Subject',
    'formMessage': 'Your Message',
    'formSubmit': 'Send Message',
    'contactInfo': 'Contact Information',
    'emailUs': 'Email Us',
    'callUs': 'Call Us',
    'visitUs': 'Visit Us',
    'contactEmail': 'contact@rawlight.com',
    'contactPhone': '+1 (555) 123-4567',
    'contactAddress': '123 Faith Street, Spiritual City, SC 12345'
  },
  pt: {
    'contactTitle': 'Entre em Contato',
    'contactDesc': 'Adoraríamos ouvir de você. Entre em contato com perguntas, sugestões ou apenas para dizer olá.',
    'formName': 'Seu Nome',
    'formEmail': 'Seu Email',
    'formSubject': 'Assunto',
    'formMessage': 'Sua Mensagem',
    'formSubmit': 'Enviar Mensagem',
    'contactInfo': 'Informações de Contato',
    'emailUs': 'Envie-nos um Email',
    'callUs': 'Ligue para Nós',
    'visitUs': 'Visite-nos',
    'contactEmail': 'contato@luzcrua.com',
    'contactPhone': '+55 (11) 98765-4321',
    'contactAddress': 'Rua da Fé 123, Cidade Espiritual, SP 12345'
  },
  // Similar translations would be added for other languages
};

const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { submitContact } = useContactService();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Translate content based on language
  const translate = (key: string) => {
    const langTranslations = translations[language as keyof typeof translations] || translations.en;
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await submitContact(formData, language);
      
      // Limpar formulário após envio bem-sucedido
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('contact')} | {language === 'pt' ? 'LUZ CRUA' : language === 'en' ? 'RAW LIGHT' : language === 'de' ? 'ROHES LICHT' : language === 'es' ? 'LUZ CRUDA' : language === 'it' ? 'LUCE CRUDA' : 'LUMIÈRE BRUTE'}</title>
        <meta name="description" content={translate('contactDesc')} />
      </Helmet>

      <div className="py-10 md:py-16">
        <div className="container-content">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">{t('contact')}</h1>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {translate('contactDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{translate('contactTitle')}</CardTitle>
                <CardDescription>{translate('contactDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        {translate('formName')}
                      </label>
                      <Input 
                        id="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {translate('formEmail')}
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      {translate('formSubject')}
                    </label>
                    <Input 
                      id="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      required 
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {translate('formMessage')}
                    </label>
                    <Textarea 
                      id="message" 
                      rows={5} 
                      value={formData.message}
                      onChange={handleChange}
                      required 
                      disabled={isLoading}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                        {translate('formSubmit')}
                      </>
                    ) : (
                      translate('formSubmit')
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{translate('contactInfo')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">{translate('emailUs')}</h3>
                    <p className="text-muted-foreground">{translate('contactEmail')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">{translate('callUs')}</h3>
                    <p className="text-muted-foreground">{translate('contactPhone')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">{translate('visitUs')}</h3>
                    <p className="text-muted-foreground">{translate('contactAddress')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
