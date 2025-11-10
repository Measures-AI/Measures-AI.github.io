# Beehiiv Integration Setup Guide

This guide walks you through setting up the Beehiiv API integration for the Measure Twice newsletter landing page.

## Step 1: Get Your Beehiiv API Credentials

### Get Your API Key:
1. Log in to your [Beehiiv dashboard](https://app.beehiiv.com)
2. Navigate to **Settings** → **API**
3. Under **API Keys** section, click **Create New API Key**
4. Provide a name: "Measure Twice Landing Page"
5. Click **Create New Key**
6. **IMPORTANT**: Copy the generated API key immediately and store it securely
7. This is the only time the key will be displayed in full

### Get Your Publication ID:
1. In the same **API** settings page, scroll to **Publication ID**
2. Select your publication from the dropdown
3. Copy the Publication ID (starts with `pub_`)

## Step 2: Set Up Environment Variables

In your Netlify dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add the following variables:

```
BEEHIIV_API_KEY = your_api_key_here
BEEHIIV_PUBLICATION_ID = pub_your_publication_id_here
```

## Step 3: Test the Integration

### Using the Beehiiv API Directly:
You can test your credentials using curl:

```bash
curl -X POST "https://api.beehiiv.com/v2/publications/YOUR_PUBLICATION_ID/subscriptions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "send_welcome_email": true,
    "utm_source": "test",
    "utm_campaign": "api_test"
  }'
```

### Expected Response:
```json
{
  "id": "sub_12345...",
  "email": "test@example.com",
  "status": "active",
  "created": "2024-01-01T12:00:00Z",
  "utm_source": "test",
  "utm_campaign": "api_test"
}
```

## Step 4: Understanding the Integration Flow

### First Submission (Email Only):
```javascript
// User enters email and clicks "Subscribe"
{
  "email": "user@example.com",
  "send_welcome_email": true,
  "utm_source": "measure-twice-landing",
  "utm_campaign": "measure-twice-newsletter"
}
```

### Second Submission (Complete Profile):
```javascript
// User fills out industry/role and clicks "Finish Subscribing"
{
  "email": "user@example.com",
  "send_welcome_email": false, // Already sent
  "custom_fields": [
    {
      "name": "industry",
      "value": "Technology"
    },
    {
      "name": "role", 
      "value": "Software Engineer"
    }
  ],
  "utm_source": "measure-twice-landing",
  "utm_campaign": "measure-twice-newsletter"
}
```

## Step 5: Set Up Custom Fields in Beehiiv

To capture industry and role data:

1. In your Beehiiv dashboard, go to **Audience** → **Custom Fields**
2. Create two new custom fields:
   - **Field Name**: `industry` | **Type**: Text
   - **Field Name**: `role` | **Type**: Text
3. These fields will automatically receive data from the form

## Step 6: Verify the Integration

After deploying to Netlify:

1. Visit your `/measure-twice` page
2. Submit the form with a test email
3. Check your Beehiiv dashboard under **Audience** → **Subscribers**
4. Verify the subscriber appears with the correct UTM data
5. Complete the second step with industry/role data
6. Verify the custom fields are populated

## Troubleshooting

### Common Issues:

**API Key Invalid:**
- Double-check the API key was copied correctly
- Ensure no extra spaces or characters
- Regenerate the API key if needed

**Publication ID Wrong:**
- Verify the ID starts with `pub_`
- Make sure you selected the correct publication

**Subscriber Already Exists:**
- This is normal behavior - Beehiiv will update existing subscribers
- The integration handles 409 conflicts gracefully

**Custom Fields Not Appearing:**
- Ensure custom fields are created in Beehiiv dashboard
- Field names must match exactly: `industry` and `role`
- Check the Beehiiv API logs for field validation errors

### Monitoring and Logs:

**Netlify Function Logs:**
- Go to Netlify dashboard → Functions → View logs
- Look for successful Beehiiv API responses
- Check for any error messages

**Beehiiv Dashboard:**
- Monitor subscriber growth in real-time
- Check UTM source/campaign data for attribution
- Verify custom field data is being captured

## Benefits of This Integration

✅ **Real-time Subscription**: Users are subscribed immediately upon email entry  
✅ **Progressive Profiling**: Demographic data collected without blocking subscription  
✅ **UTM Tracking**: Full attribution data for campaign analysis  
✅ **Custom Fields**: Industry and role data for segmentation  
✅ **Welcome Emails**: Automated welcome sequence triggered on first subscription  
✅ **Duplicate Handling**: Graceful handling of existing subscribers  

## API Rate Limits

Beehiiv API limits:
- **Rate Limit**: 100 requests per minute
- **Daily Limit**: 10,000 requests per day
- The integration includes error handling for rate limit responses

## Security Best Practices

- ✅ API keys stored as environment variables
- ✅ Server-side API calls only (keys never exposed to client)
- ✅ HTTPS-only communication
- ✅ Input validation and sanitization
- ✅ Error handling without exposing sensitive data

This integration provides a robust, scalable solution for newsletter subscriptions with comprehensive tracking and data collection capabilities.
