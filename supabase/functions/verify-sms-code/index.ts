import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  phone_number: string;
  code: string;
  language: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { phone_number, code, language }: RequestBody = await req.json();

    // Find the verification code
    const { data: codeData, error: codeError } = await supabase
      .from('verification_codes')
      .select('*')
      .eq('phone_number', phone_number)
      .eq('code', code)
      .eq('is_used', false)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (codeError || !codeData) {
      const errorMessages = {
        en: 'Invalid or expired verification code',
        de: 'Ungültiger oder abgelaufener Bestätigungscode'
      };
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: errorMessages[language as keyof typeof errorMessages] || errorMessages.en
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Mark code as used
    const { error: updateCodeError } = await supabase
      .from('verification_codes')
      .update({ is_used: true })
      .eq('id', codeData.id);

    if (updateCodeError) {
      throw updateCodeError;
    }

    // Update lead as verified
    const { error: updateLeadError } = await supabase
      .from('leads')
      .update({ is_verified: true, updated_at: new Date().toISOString() })
      .eq('mobile_phone', phone_number);

    if (updateLeadError) {
      throw updateLeadError;
    }

    const successMessages = {
      en: 'Phone number verified successfully! You can now download the whitepaper.',
      de: 'Telefonnummer erfolgreich bestätigt! Sie können jetzt das Whitepaper herunterladen.'
    };

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: successMessages[language as keyof typeof successMessages] || successMessages.en,
        verified: true
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});