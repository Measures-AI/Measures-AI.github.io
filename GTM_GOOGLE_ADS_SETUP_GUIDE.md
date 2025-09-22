# GTM & Google Ads Setup Guide - Data Layer Implementation

## Overview
This website now pushes structured lead data to the GTM data layer on every form submission. This guide enumerates all available data points and provides setup instructions for GTM and Google Ads experts.

## 🎯 Primary Trigger Event

**Event Name:** `lead`
- **When it fires:** Every form submission across all landing pages and main contact form
- **GTM Trigger Type:** Custom Event
- **Event Name:** `lead`
- **Fire on:** All Custom Events

---

## 📊 Complete Data Layer Structure

When a form is submitted, the following object is pushed to `window.dataLayer`:

```javascript
{
  // PRIMARY EVENT IDENTIFIER
  event: 'lead',                    // ← GTM trigger listens for this
  
  // LEAD IDENTIFICATION & VALUE
  lead_id: 'LEAD-a1b2c3d4-e5f6-7890-abcd-ef1234567890',  // Unique UUID
  lead_type: 'Demo Request',        // See "Lead Types" section below
  value: 150,                       // Numeric value for conversion tracking
  currency: 'USD',                  // Always USD
  
  // USER DATA (PII)
  user_data: {
    email: 'prospect@example.com',  // Always captured
    first_name: 'Ada',              // Auto-split from 'name' field
    last_name: 'Lovelace',          // Auto-split from 'name' field  
    company: 'Example Corp',        // Always captured
    // Additional custom fields may appear here
  },
  
  // FORM METADATA
  form: {
    id: 'lead-form-head-of-support-nps',     // Unique form identifier
    name: 'head-of-support-nps_demo',        // Form name for reporting
    variant: 'A',                            // A/B test variant
    role: 'Head of Support',                 // Target role
    industry: 'B2C Retail',                 // Target industry
  },
  
  // PAGE CONTEXT
  page: {
    url: 'https://measuresai.com/lets-see/head-of-support-nps',
    path: '/lets-see/head-of-support-nps',
    title: 'Measures AI - Fix the "why" behind your NPS'
  },
  
  // ATTRIBUTION DATA
  attribution: {
    gclid: 'Cj0KCQiA...',           // Google Click ID (if present)
    utm_source: 'google',           // Traffic source
    utm_medium: 'cpc',              // Marketing medium  
    utm_campaign: 'support-nps',    // Campaign name
    utm_term: 'nps-software',       // Keyword term
    utm_content: 'ad-variant-1'     // Ad content identifier
  }
}
```

---

## 🏷️ Lead Types (lead_type values)

The system automatically determines lead types based on page configuration:

| Lead Type | Description | Pages |
|-----------|-------------|-------|
| `Demo Request` | Primary conversion goal | Most landing pages |
| `Contact` | General inquiry | Main contact form |
| `Pricing Request` | Pricing inquiry | Pages with pricing CTAs |
| `Lead` | Generic fallback | Uncategorized forms |

**Custom Configuration:** Each landing page can override the lead type in its config file.

---

## 💰 Lead Values (value field)

Lead values are configurable per page and represent estimated conversion value:

| Page Type | Default Value | Configurable |
|-----------|---------------|--------------|
| Landing Pages | 100-150 USD | ✅ Per page config |
| Contact Form | 100 USD | ✅ Environment variable |
| Custom Pages | 100 USD | ✅ Per page config |

**Environment Override:** Set `VITE_DEFAULT_LEAD_VALUE=200` to change the global default.

---

## 🎨 Form Variants (form.variant)

Used for A/B testing and form optimization:

| Variant | Description |
|---------|-------------|
| `A` | Default variant (most common) |
| `B`, `C`, etc. | Test variants (configurable per page) |

---

## 🎯 GTM Variable Setup

Create these GTM variables to access the data:

### Built-in Variables (Enable these)
- ✅ Page URL
- ✅ Page Path  
- ✅ Page Title
- ✅ Referrer

### Custom Data Layer Variables

| Variable Name | Data Layer Variable Name | Type |
|---------------|-------------------------|------|
| `DL - Lead ID` | `lead_id` | Data Layer Variable |
| `DL - Lead Type` | `lead_type` | Data Layer Variable |
| `DL - Lead Value` | `value` | Data Layer Variable |
| `DL - User Email` | `user_data.email` | Data Layer Variable |
| `DL - User First Name` | `user_data.first_name` | Data Layer Variable |
| `DL - User Last Name` | `user_data.last_name` | Data Layer Variable |
| `DL - User Company` | `user_data.company` | Data Layer Variable |
| `DL - Form ID` | `form.id` | Data Layer Variable |
| `DL - Form Name` | `form.name` | Data Layer Variable |
| `DL - Form Variant` | `form.variant` | Data Layer Variable |
| `DL - Target Role` | `form.role` | Data Layer Variable |
| `DL - Target Industry` | `form.industry` | Data Layer Variable |
| `DL - GCLID` | `attribution.gclid` | Data Layer Variable |
| `DL - UTM Source` | `attribution.utm_source` | Data Layer Variable |
| `DL - UTM Medium` | `attribution.utm_medium` | Data Layer Variable |
| `DL - UTM Campaign` | `attribution.utm_campaign` | Data Layer Variable |
| `DL - UTM Term` | `attribution.utm_term` | Data Layer Variable |
| `DL - UTM Content` | `attribution.utm_content` | Data Layer Variable |

---

## 🎯 Google Ads Conversion Setup

### 1. Conversion Action Configuration

**Conversion Name:** Lead Submission
**Category:** Submit lead form
**Value:** Use data layer variable `{{DL - Lead Value}}`
**Count:** One per click
**Attribution Model:** Data-driven (recommended)

### 2. Enhanced Conversions Setup

Map these data layer variables to enhanced conversion parameters:

| Enhanced Conversion Field | GTM Variable | Required |
|---------------------------|--------------|----------|
| Email | `{{DL - User Email}}` | ✅ Required |
| First Name | `{{DL - User First Name}}` | ✅ Recommended |
| Last Name | `{{DL - User Last Name}}` | ✅ Recommended |

### 3. Conversion Linker Tag

Ensure the Conversion Linker tag fires on all pages to capture GCLID.

---

## 🏷️ Recommended GTM Tags

### 1. Google Ads Conversion Tag
- **Tag Type:** Google Ads Conversion Tracking
- **Trigger:** Custom Event - lead
- **Conversion ID:** Your Google Ads conversion ID
- **Conversion Label:** Your conversion label
- **Conversion Value:** `{{DL - Lead Value}}`
- **Enhanced Conversions:** Enable with user data variables

### 2. GA4 Event Tag  
- **Tag Type:** Google Analytics: GA4 Event
- **Event Name:** `lead_submission`
- **Parameters:**
  - `lead_type`: `{{DL - Lead Type}}`
  - `lead_value`: `{{DL - Lead Value}}`
  - `form_name`: `{{DL - Form Name}}`
  - `target_role`: `{{DL - Target Role}}`
  - `target_industry`: `{{DL - Target Industry}}`

### 3. Facebook Pixel Event (if applicable)
- **Tag Type:** Custom HTML or Facebook Pixel
- **Event:** `Lead`
- **Parameters:**
  - `value`: `{{DL - Lead Value}}`
  - `currency`: `USD`
  - `content_name`: `{{DL - Lead Type}}`

---

## 🎯 Current Landing Pages & Their Data

| Page Slug | Role | Industry | Lead Type | Value | Form ID |
|-----------|------|----------|-----------|-------|---------|
| `head-of-support-nps` | Head of Support | B2C Retail | Demo Request | 150 | `lead-form-head-of-support-nps` |
| `csw-youre-early` | CSW | CSW | Demo Request | 120 | `lead-form-csw-youre-early` |
| `head-of-support-replace-surveys` | Head of Support | B2C Retail | Demo Request | 100* | `lead-form-head-of-support-replace-surveys` |
| `head-of-support-retail` | Head of Support | B2C Retail | Demo Request | 100* | `lead-form-head-of-support-retail` |
| Homepage Contact | N/A | N/A | Contact | 100* | `main-contact-form` |

*Uses default value (configurable)

---

## 🔍 Testing & Debugging

### 1. Browser Console Testing
1. Open Developer Tools → Console
2. Submit a form
3. Look for: `DataLayer Lead Event: {object}`
4. Verify all expected fields are present

### 2. GTM Preview Mode
1. Enable GTM Preview Mode
2. Submit a form  
3. Check "Data Layer" tab for the `lead` event
4. Verify all variables populate correctly

### 3. Google Ads Testing
1. Use Google Ads conversion tracking helper
2. Submit test conversions
3. Verify conversions appear in Google Ads within 24 hours

---

## 🚨 Important Notes

### Attribution Data Availability
- **GCLID:** Only present if user clicked a Google Ad
- **UTM Parameters:** Only present if URL contains UTM parameters
- **Null Handling:** All attribution fields can be `null` - handle gracefully in tags

### User Data Privacy
- All PII is captured in the `user_data` object
- Ensure compliance with privacy policies
- Consider data retention policies for enhanced conversions

### Form Variants
- Currently most forms use variant "A"
- Variants can be configured per page for A/B testing
- Use for campaign optimization and form testing

### Lead Values
- Values represent estimated conversion worth
- Can be customized per landing page
- Use for ROAS calculations and bid optimization

---

## 📋 Implementation Checklist

### GTM Setup
- [ ] Create custom trigger for `lead` event
- [ ] Set up all recommended data layer variables
- [ ] Configure Google Ads conversion tag
- [ ] Set up GA4 event tracking
- [ ] Test in Preview Mode
- [ ] Publish container

### Google Ads Setup  
- [ ] Create conversion action
- [ ] Configure enhanced conversions
- [ ] Set up conversion linker
- [ ] Test conversion tracking
- [ ] Verify attribution data flow

### Monitoring
- [ ] Set up conversion reporting
- [ ] Monitor lead quality by source
- [ ] Track form variant performance
- [ ] Analyze role/industry targeting effectiveness

This implementation provides comprehensive tracking for lead generation optimization and attribution across all marketing channels.
