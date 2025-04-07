
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: 'contact' | 'newsletter';
  email: string;
  name?: string;
  language: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, email, name, language } = await req.json() as EmailRequest;

    // Em uma implementação real, você enviaria um email aqui usando um serviço como Resend, SendGrid, etc.
    // Por enquanto, vamos apenas simular o envio e retornar sucesso

    console.log(`Email de confirmação enviado para ${email} (${type}, ${language})`);

    // Simular atraso de rede
    await new Promise(resolve => setTimeout(resolve, 500));

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Erro na função send-confirmation:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido"
      }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
