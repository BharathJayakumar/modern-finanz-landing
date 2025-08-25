import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  name: string;
  email: string;
  mobile_phone: string;
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

    const { name, email, mobile_phone, language }: RequestBody = await req.json();

    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiry time (10 minutes from now)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Store lead in database
    const { data: leadData, error: leadError } = await supabase
      .from('leads')
      .insert([{ name, email, mobile_phone, is_verified: false }])
      .select()
      .single();

    if (leadError) {
      throw leadError;
    }

    // Store verification code
    const { error: codeError } = await supabase
      .from('verification_codes')
      .insert([{
        phone_number: mobile_phone,
        code: verificationCode,
        expires_at: expiresAt,
        is_used: false
      }]);

    if (codeError) {
      throw codeError;
    }

    // Send SMS via Twilio
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioPhoneNumber = Deno.env.get('TWILIO_PHONE_NUMBER');

    if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
      throw new Error('Twilio credentials not configured');
    }

    const messages = {
      en: `Your verification code is: ${verificationCode}. Valid for 10 minutes.`,
      de: `Ihr Bestätigungscode lautet: ${verificationCode}. Gültig für 10 Minuten.`
    };

    const message = messages[language as keyof typeof messages] || messages.en;

    const twilioResponse = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${twilioAccountSid}:${twilioAuthToken}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: twilioPhoneNumber,
          To: mobile_phone,
          Body: message,
        }),
      }
    );

    if (!twilioResponse.ok) {
      const twilioError = await twilioResponse.text();
      throw new Error(`Twilio error: ${twilioError}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: language === 'de' ? 'SMS versendet' : 'SMS sent',
        leadId: leadData.id 
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
        status: 400 
      }
    );
  }
});