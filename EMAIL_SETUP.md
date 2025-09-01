# Email Service Setup Guide

## Resend Configuration

The contact form now uses Resend API for reliable server-side email delivery.

### Step 1: Create Resend Account
1. Go to [https://resend.com/](https://resend.com/)
2. Sign up for a free account (includes 100 emails/day free)
3. Verify your email address

### Step 2: Get API Key
1. In the Resend dashboard, go to "API Keys"
2. Click "Create API Key"
3. Give it a name like "LaundryZone Website"
4. Copy the API key (it starts with `re_`)

### Step 3: Configure Domain (Optional but Recommended)
1. Go to "Domains" in the dashboard
2. Add your domain (e.g., `laundryzone.mn`)
3. Follow the DNS setup instructions
4. Once verified, you can send from `noreply@laundryzone.mn`

### Step 4: Update Environment Variables
1. Open `.env.local` file in your project root
2. Replace the placeholder values:

```env
# Resend Configuration
RESEND_API_KEY=re_your_actual_api_key_here

# Email Configuration
FROM_EMAIL=noreply@laundryzone.mn
TO_EMAIL=laundryzone.mongolia@gmail.com
```

**Important Notes:**
- If you haven't set up a custom domain, use `onboarding@resend.dev` as the FROM_EMAIL
- Keep your API key secure and never commit it to version control

### Step 5: Test the Setup
1. Restart your development server: `npm run dev`
2. Fill out and submit the contact form
3. Check your email for the form submission
4. Check the server console for any error messages

## API Endpoint Details

The contact form uses `POST /api/contact` endpoint:

- **Method:** POST
- **Content-Type:** application/json
- **Body:** `{ name, email, phone, message }`
- **Success Response:** `{ success: true, message: "Email sent successfully", emailId: "..." }`
- **Error Response:** `{ error: "Error message", details?: [...] }`

## Email Template

The system generates a professional HTML email with:
- LaundryZone branding colors (#F4781F)
- Organized contact information section
- Formatted message content
- Timestamp in Mongolia timezone
- Responsive design for all email clients

## Fallback Behavior

If the API fails or Resend is not configured, the form automatically falls back to opening the user's default email client with a pre-filled message.

## Troubleshooting

### Common Issues:

1. **"Email service not configured"**
   - Check that `RESEND_API_KEY` is set in `.env.local`
   - Restart your development server after adding environment variables

2. **"Failed to send email"**
   - Verify your API key is valid and active
   - Check the Resend dashboard for quota limits
   - Ensure your domain is verified (if using custom domain)

3. **Domain authentication issues**
   - Use `onboarding@resend.dev` temporarily for testing
   - Verify DNS records are properly configured
   - Wait for DNS propagation (up to 24 hours)

4. **Validation errors**
   - Check browser console for specific field validation issues
   - Ensure all required fields are filled properly

### Testing:
- Check browser network tab for API call responses
- Monitor server console for detailed error messages
- Verify environment variables are loaded: `console.log(process.env.RESEND_API_KEY)` in API route
- Test with different email addresses and message lengths

### Rate Limits:
- Free tier: 100 emails/day, 3,000 emails/month
- Paid plans available for higher volumes
- Check dashboard for current usage

## Security Features

- Server-side validation using Zod schemas
- Input sanitization and HTML escaping
- Rate limiting protection (built into Next.js API routes)
- Environment variable protection of sensitive data