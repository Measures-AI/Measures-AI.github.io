# Google Sheets Integration Setup

This guide walks you through setting up a free Google Sheets integration using Google Apps Script to collect subscriber data from the Measure Twice landing page.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Measure Twice Newsletter Subscribers"
4. Set up the following column headers in row 1:
   - A1: `Email`
   - B1: `Industry`
   - C1: `Role`
   - D1: `Timestamp`
   - E1: `UTM Source`
   - F1: `UTM Campaign`
   - G1: `Source`

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to `Extensions` → `Apps Script`
2. Replace the default code with the following:

```javascript
/**
 * Google Apps Script Web App to receive form data and add it to Google Sheets
 * This function handles POST requests from the Netlify function
 */

function doPost(e) {
  try {
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Prepare the row data
    const rowData = [
      data.email || '',
      data.industry || '',
      data.role || '',
      data.timestamp || new Date().toISOString(),
      data.utm_source || '',
      data.utm_campaign || '',
      data.source || 'Measure Twice Landing Page'
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Log the successful addition
    console.log('Added subscriber data:', data.email);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data added successfully',
        email: data.email
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error adding data to sheet:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function to verify the setup works
 */
function testFunction() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        email: 'test@example.com',
        industry: 'Technology',
        role: 'Developer',
        timestamp: new Date().toISOString(),
        utm_source: 'test',
        utm_campaign: 'test'
      })
    }
  };
  
  const result = doPost(testData);
  console.log('Test result:', result.getContent());
}
```

3. Save the script (Ctrl+S or Cmd+S)
4. Name your project "Measure Twice Sheets Integration"

## Step 3: Deploy the Web App

1. Click the `Deploy` button (top right)
2. Choose `New deployment`
3. Click the gear icon next to "Type" and select `Web app`
4. Set the configuration:
   - **Description**: "Measure Twice Newsletter Data Collection"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click `Deploy`
6. **IMPORTANT**: Copy the Web App URL that appears - you'll need this for the environment variable

## Step 4: Set Environment Variables

In your Netlify dashboard, add these environment variables:

### Required for Beehiiv Integration:
- `BEEHIIV_API_KEY` = Your Beehiiv API key
- `BEEHIIV_PUBLICATION_ID` = Your Beehiiv publication ID (starts with `pub_`)

### Required for Google Sheets Integration:
- `GOOGLE_SHEETS_WEBHOOK_URL` = The Google Apps Script Web App URL from Step 3

## Step 5: Test the Integration

1. Deploy your site to Netlify
2. Visit your `/measure-twice` page
3. Submit the form with test data
4. Check your Google Sheet to see if the data appears
5. Check the Netlify function logs for any errors

## Troubleshooting

### Google Apps Script Issues:
- **Permission denied**: Make sure the Web App is set to "Anyone" access
- **Script not executing**: Check the Apps Script logs in the Google Apps Script editor
- **Data not appearing**: Verify the column headers match exactly

### Netlify Function Issues:
- **Function not found**: Make sure the `netlify/functions` directory is in your project root
- **CORS errors**: The functions include CORS headers, but check browser console for issues
- **Environment variables**: Verify all required env vars are set in Netlify dashboard

### Beehiiv Integration Issues:
- **API key invalid**: Double-check your API key in Beehiiv settings
- **Publication ID wrong**: Ensure the publication ID starts with `pub_`
- **Rate limiting**: Beehiiv may have rate limits, check their API documentation

## Data Flow

1. **User submits email** → Beehiiv API (immediate subscription)
2. **User completes profile** → Beehiiv API (update with demographics)
3. **User reaches thank you page** → Google Sheets (data collection for analysis)

This setup provides:
- ✅ Free Google Sheets integration (no monthly costs)
- ✅ Real-time newsletter subscription via Beehiiv
- ✅ Comprehensive data collection for analysis
- ✅ Backup data storage in Google Sheets
- ✅ Easy data export and analysis capabilities

## Security Notes

- The Google Apps Script Web App URL should be kept private
- All API keys should be stored as environment variables, never in code
- The Google Sheet can be shared with team members as needed
- Consider setting up data retention policies if required
