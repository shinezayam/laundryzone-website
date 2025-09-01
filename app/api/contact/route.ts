import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone must be at least 8 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Email content - Use Resend's onboarding domain for testing
    const fromEmail = process.env.FROM_EMAIL === 'noreply@laundryzone.mn' ? 'onboarding@resend.dev' : (process.env.FROM_EMAIL || 'onboarding@resend.dev');
    const toEmail = process.env.TO_EMAIL || 'laundryzone.mongolia@gmail.com';

    const emailContent = {
      from: fromEmail,
      to: [toEmail],
      subject: `LaundryZone Website - Contact Form Submission from ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h1 style="color: #F4781F; margin-bottom: 20px; font-size: 24px; text-align: center;">
              New Contact Form Submission
            </h1>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #F4781F; padding-bottom: 5px;">
                Contact Information
              </h2>
              
              <div style="margin-bottom: 12px;">
                <strong style="color: #6b7280; display: inline-block; width: 80px;">Name:</strong>
                <span style="color: #111827;">${validatedData.name}</span>
              </div>
              
              <div style="margin-bottom: 12px;">
                <strong style="color: #6b7280; display: inline-block; width: 80px;">Email:</strong>
                <a href="mailto:${validatedData.email}" style="color: #2563eb; text-decoration: none;">
                  ${validatedData.email}
                </a>
              </div>
              
              <div style="margin-bottom: 12px;">
                <strong style="color: #6b7280; display: inline-block; width: 80px;">Phone:</strong>
                <a href="tel:${validatedData.phone}" style="color: #2563eb; text-decoration: none;">
                  ${validatedData.phone}
                </a>
              </div>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #F4781F; padding-bottom: 5px;">
                Message
              </h2>
              <div style="color: #111827; line-height: 1.6; white-space: pre-wrap;">
${validatedData.message}
              </div>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
              <p>This message was sent from the LaundryZone website contact form.</p>
              <p>Generated on: ${new Date().toLocaleString('en-US', { 
                timeZone: 'Asia/Ulaanbaatar',
                year: 'numeric',
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send email using Resend
    const { data, error } = await resend.emails.send(emailContent);

    if (error) {
      console.error('Resend error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to send email';
      if (error.message?.includes('testing emails')) {
        errorMessage = 'Email service is in testing mode. Please contact support.';
      } else if ((error as any).statusCode === 403) {
        errorMessage = 'Email delivery restricted. Domain verification required.';
      } else if ((error as any).statusCode === 401) {
        errorMessage = 'Email service authentication failed.';
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: process.env.NODE_ENV === 'development' ? error : undefined
        },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully',
        emailId: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}