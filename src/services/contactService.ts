
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sendConfirmationEmail } from './emailService';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const useContactService = () => {
  const { toast } = useToast();

  const submitContact = async (formData: ContactFormData, language: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('contacts')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        });

      if (error) {
        throw error;
      }

      // Enviar email de confirmação
      await sendConfirmationEmail('contact', formData.email, language, formData.name);

      // Mostrar toast de sucesso
      toast({
        title: language === 'pt' ? 'Mensagem enviada com sucesso!' :
               language === 'en' ? 'Message sent successfully!' :
               language === 'de' ? 'Nachricht erfolgreich gesendet!' :
               language === 'es' ? '¡Mensaje enviado con éxito!' :
               language === 'it' ? 'Messaggio inviato con successo!' :
               'Message envoyé avec succès !',
        description: language === 'pt' ? 'Obrigado pelo seu contato. Responderemos em breve.' :
                     language === 'en' ? 'Thank you for your message. We will respond shortly.' :
                     language === 'de' ? 'Danke für Ihre Nachricht. Wir werden in Kürze antworten.' :
                     language === 'es' ? 'Gracias por su mensaje. Responderemos pronto.' :
                     language === 'it' ? 'Grazie per il tuo messaggio. Risponderemo a breve.' :
                     'Merci pour votre message. Nous répondrons bientôt.',
        variant: 'default',
      });

      return true;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      // Mostrar toast de erro
      toast({
        title: language === 'pt' ? 'Erro ao enviar mensagem' :
               language === 'en' ? 'Error sending message' :
               language === 'de' ? 'Fehler beim Senden der Nachricht' :
               language === 'es' ? 'Error al enviar mensaje' :
               language === 'it' ? 'Errore nell\'invio del messaggio' :
               'Erreur lors de l\'envoi du message',
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

  return { submitContact };
};
