/**
 * Netlify Function to handle Beehiiv newsletter subscriptions
 * This function securely processes form submissions and adds subscribers to Beehiiv
 */

const BEEHIIV_API_BASE = 'https://api.beehiiv.com/v2';

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      }
    };
  }

  try {
    // Parse the request body
    const { email, industry, role, submissionType } = JSON.parse(event.body);

    // Validate required fields
    if (!email) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Email is required' })
      };
    }

    // Get environment variables
    const API_KEY = process.env.BEEHIIV_API_KEY;
    const PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

    if (!API_KEY || !PUBLICATION_ID) {
      console.error('Missing Beehiiv API credentials');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    console.log(`🐝 Subscribing email to Beehiiv: ${email} (${submissionType || 'initial'})`);

    // Prepare the subscription data
    const subscriptionData = {
      email: email,
      send_welcome_email: submissionType === 'email_only', // Only send welcome email on first submission
      utm_source: 'measure-twice-landing',
      utm_medium: 'newsletter-form',
      utm_campaign: 'measure-twice-newsletter'
    };

    // Add custom fields if provided (for demographic data)
    if (industry || role) {
      subscriptionData.custom_fields = [];
      
      if (industry) {
        subscriptionData.custom_fields.push({
          name: 'industry',
          value: industry
        });
      }
      
      if (role) {
        subscriptionData.custom_fields.push({
          name: 'role', 
          value: role
        });
      }
    }

    // Make the API request to Beehiiv
    const response = await fetch(`${BEEHIIV_API_BASE}/publications/${PUBLICATION_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscriptionData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Beehiiv API Error:', response.status, errorData);
      
      // Handle specific error cases
      if (response.status === 409) {
        // Email already exists - this is okay for our use case
        console.log('✅ Email already subscribed to Beehiiv, updating profile...');
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ 
            success: true, 
            message: 'Subscription updated successfully',
            already_subscribed: true
          })
        };
      }
      
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'Failed to subscribe to newsletter',
          details: errorData 
        })
      };
    }

    const data = await response.json();
    console.log('✅ Successfully subscribed to Beehiiv:', data);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        subscriber_id: data.id
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};
