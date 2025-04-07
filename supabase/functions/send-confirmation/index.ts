
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Configure o Resend com sua chave de API
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Headers CORS para permitir acesso da aplicação frontend
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Interface para a requisição de email
interface EmailRequest {
  type: "contact" | "newsletter";
  email: string;
  name?: string; // Opcional para newsletter
  language: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Tratar solicitações OPTIONS para CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, email, name, language } = await req.json() as EmailRequest;

    // Templates de email para cada tipo e idioma
    const templates = {
      contact: {
        pt: {
          subject: "Recebemos sua mensagem - Luz Crua",
          html: `
            <h1>Olá ${name || ""},</h1>
            <p>Obrigado por entrar em contato conosco. Recebemos sua mensagem e responderemos o mais breve possível.</p>
            <p>Atenciosamente,<br>Equipe Luz Crua</p>
          `,
        },
        en: {
          subject: "We received your message - Raw Light",
          html: `
            <h1>Hello ${name || ""},</h1>
            <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
            <p>Best regards,<br>Raw Light Team</p>
          `,
        },
        de: {
          subject: "Wir haben Ihre Nachricht erhalten - Rohes Licht",
          html: `
            <h1>Hallo ${name || ""},</h1>
            <p>Vielen Dank für Ihre Kontaktaufnahme. Wir haben Ihre Nachricht erhalten und werden uns so schnell wie möglich bei Ihnen melden.</p>
            <p>Mit freundlichen Grüßen,<br>Rohes Licht Team</p>
          `,
        },
        es: {
          subject: "Hemos recibido tu mensaje - Luz Cruda",
          html: `
            <h1>Hola ${name || ""},</h1>
            <p>Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos lo antes posible.</p>
            <p>Saludos cordiales,<br>Equipo Luz Cruda</p>
          `,
        },
        it: {
          subject: "Abbiamo ricevuto il tuo messaggio - Luce Cruda",
          html: `
            <h1>Ciao ${name || ""},</h1>
            <p>Grazie per averci contattato. Abbiamo ricevuto il tuo messaggio e ti risponderemo il prima possibile.</p>
            <p>Cordiali saluti,<br>Team Luce Cruda</p>
          `,
        },
        fr: {
          subject: "Nous avons reçu votre message - Lumière Brute",
          html: `
            <h1>Bonjour ${name || ""},</h1>
            <p>Merci de nous avoir contacté. Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.</p>
            <p>Cordialement,<br>L'équipe Lumière Brute</p>
          `,
        },
      },
      newsletter: {
        pt: {
          subject: "Bem-vindo à nossa Newsletter - Luz Crua",
          html: `
            <h1>Bem-vindo(a)!</h1>
            <p>Obrigado por se inscrever na nossa newsletter. A partir de agora, você receberá atualizações sobre nossos artigos mais recentes e conteúdos exclusivos.</p>
            <p>Atenciosamente,<br>Equipe Luz Crua</p>
          `,
        },
        en: {
          subject: "Welcome to our Newsletter - Raw Light",
          html: `
            <h1>Welcome!</h1>
            <p>Thank you for subscribing to our newsletter. From now on, you will receive updates about our latest articles and exclusive content.</p>
            <p>Best regards,<br>Raw Light Team</p>
          `,
        },
        de: {
          subject: "Willkommen zu unserem Newsletter - Rohes Licht",
          html: `
            <h1>Willkommen!</h1>
            <p>Vielen Dank für Ihr Abonnement unseres Newsletters. Ab sofort erhalten Sie Updates zu unseren neuesten Artikeln und exklusiven Inhalten.</p>
            <p>Mit freundlichen Grüßen,<br>Rohes Licht Team</p>
          `,
        },
        es: {
          subject: "Bienvenido a nuestro Boletín - Luz Cruda",
          html: `
            <h1>¡Bienvenido!</h1>
            <p>Gracias por suscribirte a nuestro boletín. A partir de ahora, recibirás actualizaciones sobre nuestros artículos más recientes y contenido exclusivo.</p>
            <p>Saludos cordiales,<br>Equipo Luz Cruda</p>
          `,
        },
        it: {
          subject: "Benvenuto alla nostra Newsletter - Luce Cruda",
          html: `
            <h1>Benvenuto!</h1>
            <p>Grazie per esserti iscritto alla nostra newsletter. D'ora in poi, riceverai aggiornamenti sui nostri articoli più recenti e contenuti esclusivi.</p>
            <p>Cordiali saluti,<br>Team Luce Cruda</p>
          `,
        },
        fr: {
          subject: "Bienvenue à notre Newsletter - Lumière Brute",
          html: `
            <h1>Bienvenue!</h1>
            <p>Merci de vous être abonné à notre newsletter. Désormais, vous recevrez des mises à jour sur nos derniers articles et contenus exclusifs.</p>
            <p>Cordialement,<br>L'équipe Lumière Brute</p>
          `,
        },
      },
    };

    // Selecionar template com base no tipo e idioma
    const template = templates[type][language as keyof typeof templates.contact] || templates[type].en;

    // Enviar email usando o Resend
    const { data, error } = await resend.emails.send({
      from: "Luz Crua <onboarding@resend.dev>",
      to: [email],
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw error;
    }

    console.log("Email sent successfully:", data);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in send-confirmation function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
