# Client-Side Beehiiv Integration Setup

This document explains how to set up the direct client-side Beehiiv API integration for the Measure Twice newsletter.

## Overview

The integration now uses direct client-side API calls to Beehiiv instead of server-side Netlify Functions. While this exposes the API key in the client code, it's acceptable for newsletter subscriptions since they are typically public actions.

## Environment Variables Required

Add these environment variables to your deployment platform (Netlify, Vercel, etc.):

```env
# Beehiiv API Integration (client-side)
VITE_BEEHIIV_API_KEY=your_beehiiv_api_key_here
VITE_BEEHIIV_PUBLICATION_ID=pub_your_publication_id_here

# EmailJS Integration (for industry context emails)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

## Getting Your Beehiiv Credentials

### 1. Get Your API Key
1. Log in to your [Beehiiv dashboard](https://app.beehiiv.com)
2. Navigate to **Settings** → **API**
3. Under **API Keys** section, click **Create New API Key**
4. Provide a name: "Client-Side Integration"
5. Click **Create New Key**
6. Copy the generated API key

### 2. Get Your Publication ID
1. In the same **API** settings page, scroll to **Publication ID**
2. Select your publication from the dropdown
3. Copy the Publication ID (starts with `pub_`)

## How It Works

### First Submission (Email Only)
1. User enters email and clicks "Subscribe"
2. Direct API call to Beehiiv to subscribe the email
3. Welcome email is sent immediately
4. Form shows additional fields for industry/role

### Second Submission (Complete Profile)
1. User fills industry and role fields
2. EmailJS sends you an email with the industry context
3. User is redirected to thank you page

## Error Handling

The integration includes robust error handling:

- **CORS Errors**: If Beehiiv blocks the request, user gets a helpful message
- **API Errors**: Specific error messages for different scenarios
- **Already Subscribed**: Handles duplicate subscriptions gracefully
- **Missing Credentials**: Clear error if environment variables aren't set

## Security Considerations

- **API Key Exposure**: The Beehiiv API key will be visible in client-side code
- **Rate Limiting**: Beehiiv may rate limit requests from the same IP
- **Abuse Prevention**: Consider implementing client-side rate limiting if needed

## Testing

To test the integration:

1. Set up the environment variables
2. Deploy your application
3. Test with a real email address
4. Check Beehiiv dashboard for new subscribers
5. Verify EmailJS receives industry context emails

## Fallback Options

If CORS issues persist, you can:

1. Re-enable Netlify Functions (server-side proxy)
2. Use Beehiiv's embed widget instead
3. Implement a simple backend service on another platform

## Troubleshooting

### Common Issues

1. **CORS Error**: Beehiiv may not allow client-side requests from all domains
   - Solution: Add your domain to Beehiiv's allowed origins (if supported)
   - Fallback: Use the embedded widget approach

2. **API Key Not Found**: Environment variables not properly set
   - Check variable names start with `VITE_`
   - Restart development server after adding variables

3. **409 Conflict**: Email already subscribed
   - This is handled gracefully and user can continue

### Support

If you encounter issues:
1. Check browser console for detailed error messages
2. Verify environment variables are set correctly
3. Test API credentials directly using curl or Postman
4. Contact Beehiiv support if CORS issues persist

