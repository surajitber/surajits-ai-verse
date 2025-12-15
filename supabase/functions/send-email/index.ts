import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: EmailRequest = await req.json();
    
    console.log("Sending email notification for contact from:", email);

    // Send notification email to site owner
    const ownerEmailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["your-email@example.com"], // Replace with your actual email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0B0F14; color: #ffffff;">
          <h1 style="color: #00D9FF; border-bottom: 2px solid #00D9FF; padding-bottom: 10px;">New Contact Form Submission</h1>
          
          <div style="background-color: #1a1f2e; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #00D9FF;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #00D9FF;">Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong style="color: #00D9FF;">Message:</strong></p>
            <p style="background-color: #0B0F14; padding: 15px; border-radius: 5px; border-left: 3px solid #00D9FF;">${message}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px;">This email was sent from your portfolio website contact form.</p>
        </div>
      `,
    });

    console.log("Owner notification sent:", ownerEmailResponse);

    // Send confirmation email to the person who submitted the form
    const confirmationEmailResponse = await resend.emails.send({
      from: "Surajit Bera <onboarding@resend.dev>",
      to: [email],
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0B0F14; color: #ffffff;">
          <h1 style="color: #00D9FF;">Thank you for your message, ${name}!</h1>
          
          <p style="font-size: 16px; line-height: 1.6; color: #e0e0e0;">
            I've received your message and appreciate you taking the time to reach out. 
            I'll get back to you as soon as possible.
          </p>
          
          <div style="background-color: #1a1f2e; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0; color: #888;">Your message:</p>
            <p style="margin: 10px 0 0 0; color: #e0e0e0; font-style: italic;">"${message}"</p>
          </div>
          
          <p style="font-size: 16px; color: #e0e0e0;">
            Best regards,<br>
            <span style="color: #00D9FF; font-weight: bold;">Surajit Bera</span><br>
            AI & Computer Vision Developer
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
            <p style="color: #888; font-size: 12px;">
              This is an automated response. Please don't reply to this email.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent:", confirmationEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        ownerEmail: ownerEmailResponse,
        confirmationEmail: confirmationEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
