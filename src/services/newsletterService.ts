
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sendConfirmationEmail } from './emailService';

export const useNewsletterService = () => {
  const { toast } = useToast();

  const subscribeToNewsletter = async (email: string, language: string): Promise<boolean> => {
    try {
      // Tentar obter o IP do usuário
      let ip_address = null;
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        ip_address = ipData.ip;
      } catch (ipError) {
        console.error('Could not fetch IP address:', ipError);
      }

      // Inserir na tabela de assinantes
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email,
          language,
          ip_address
        });

      if (error) {
        // Se o email já existe (violação de uniqueness)
        if (error.code === '23505') {
          toast({
            title: language === 'pt' ? 'Email já cadastrado!' :
                   language === 'en' ? 'Email already registered!' :
                   language === 'de' ? 'E-Mail bereits registriert!' :
                   language === 'es' ? '¡Email ya registrado!' :
                   language === 'it' ? 'Email già registrata!' :
                   'Email déjà enregistré !',
            description: language === 'pt' ? 'Você já está inscrito em nossa newsletter.' :
                         language === 'en' ? 'You are already subscribed to our newsletter.' :
                         language === 'de' ? 'Sie haben unseren Newsletter bereits abonniert.' :
                         language === 'es' ? 'Ya estás suscrito a nuestro boletín.' :
                         language === 'it' ? 'Sei già iscritto alla nostra newsletter.' :
                         'Vous êtes déjà abonné à notre newsletter.',
            variant: 'default',
          });
          return true;
        }
        throw error;
      }

      // Enviar email de confirmação
      await sendConfirmationEmail('newsletter', email, language);

      // Mostrar toast de sucesso
      toast({
        title: language === 'pt' ? 'Inscrição realizada com sucesso!' :
               language === 'en' ? 'Successfully subscribed!' :
               language === 'de' ? 'Erfolgreich abonniert!' :
               language === 'es' ? '¡Suscripción exitosa!' :
               language === 'it' ? 'Iscrizione effettuata con successo!' :
               'Inscription réussie !',
        description: language === 'pt' ? 'Obrigado por se inscrever na nossa newsletter.' :
                     language === 'en' ? 'Thank you for subscribing to our newsletter.' :
                     language === 'de' ? 'Vielen Dank für das Abonnieren unseres Newsletters.' :
                     language === 'es' ? 'Gracias por suscribirte a nuestro boletín.' :
                     language === 'it' ? 'Grazie per esserti iscritto alla nostra newsletter.' :
                     'Merci de vous être inscrit à notre newsletter.',
        variant: 'default',
      });

      return true;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      
      // Mostrar toast de erro
      toast({
        title: language === 'pt' ? 'Erro ao se inscrever' :
               language === 'en' ? 'Error subscribing' :
               language === 'de' ? 'Fehler beim Abonnieren' :
               language === 'es' ? 'Error al suscribirse' :
               language === 'it' ? 'Errore durante l\'iscrizione' :
               'Erreur lors de l\'abonnement',
        description: language === 'pt' ? 'Por favor, tente novamente mais tarde.' :
                     language === 'en' ? 'Please try again later.' :
                     language === 'de' ? 'Bitte versuchen Sie es später noch einmal.' :
                     language === 'es' ? 'Por favor, inténtelo de nuevo más tarde.' :
                     language === 'it' ? 'Per favore, riprova più tardi.' :
                     'Veuillez réessayer plus tard.',
        variant: 'destructive',
      });

      return false;
    }
  };

  return { subscribeToNewsletter };
};
