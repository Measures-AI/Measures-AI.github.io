/**
 * Netlify Function to add subscriber data to Google Sheets
 * This function handles the thank you page data collection
 */

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
    const { email, industry, role, timestamp, utm_source, utm_campaign } = JSON.parse(event.body);

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

    // Get the Google Apps Script Web App URL from environment variables
    const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!GOOGLE_SHEETS_WEBHOOK_URL) {
      console.error('Missing Google Sheets webhook URL');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    console.log(`📊 Adding subscriber data to Google Sheets: ${email}`);

    // Prepare the data for Google Sheets
    const sheetsData = {
      email: email,
      industry: industry || '',
      role: role || '',
      timestamp: timestamp || new Date().toISOString(),
      utm_source: utm_source || 'measure-twice-landing',
      utm_campaign: utm_campaign || 'measure-twice-newsletter',
      source: 'Measure Twice Landing Page'
    };

    // Make the request to Google Apps Script
    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sheetsData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Google Sheets API Error:', response.status, errorData);
      
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'Failed to add data to Google Sheets',
          details: errorData 
        })
      };
    }

    const result = await response.text();
    console.log('✅ Successfully added data to Google Sheets:', result);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Data successfully added to Google Sheets'
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
