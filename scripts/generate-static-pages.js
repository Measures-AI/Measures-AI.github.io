#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from '../config/build.js';
import { generateGTMScripts } from '../config/gtm.js';

// Import the Node.js-compatible loader to get configurations
async function loadConfigs() {
  const { testPageLoader } = await import('../src/lets-see/utils/nodeTestLoader.js');
  const result = await testPageLoader();
  return result.configs;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');
const templatePath = path.join(__dirname, '../dist/index.html');

// Read the main template
const template = fs.readFileSync(templatePath, 'utf8');

// Create lets-see directory if it doesn't exist
const letsSeeDir = path.join(distDir, 'lets-see');
if (!fs.existsSync(letsSeeDir)) {
  fs.mkdirSync(letsSeeDir, { recursive: true });
}

// Create measure-twice directory if it doesn't exist
const measureTwiceDir = path.join(distDir, 'measure-twice');
if (!fs.existsSync(measureTwiceDir)) {
  fs.mkdirSync(measureTwiceDir, { recursive: true });
}

// Generate meta tags for a page
function generateMetaTags(config, slug) {
  const title = `${config.headline} - ${buildConfig.site.name}`;
  const description = config.story || buildConfig.site.description;
  const url = `https://${buildConfig.domain}/lets-see/${slug}`;
  
  return {
    title,
    description,
    url,
    metaTags: `
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    `
  };
}

// Generate server-side rendered content
function generateSSRContent(config, isThankYou = false) {
  if (isThankYou) {
    return `
      <div class="thank-you-page" data-theme="${config.themeColor}">
        <div class="hero-section">
          <h1>Thanks!</h1>
          <p>${config.headline}</p>
          <p>Let's schedule a quick demo to show you exactly how we can help achieve your goals.</p>
        </div>
        <div class="loading-indicator">
          <p>Loading calendar...</p>
        </div>
      </div>`;
  }
  
  return `
    <div class="landing-page" data-theme="${config.themeColor}">
      <div class="hero-section">
        <h1>${config.headline}</h1>
        <p>${config.story}</p>
      </div>
      <div class="loading-indicator">
        <p>Loading personalized content...</p>
      </div>
    </div>`;
}

// Main async function to generate pages
async function generatePages() {
  // Load configurations using Node.js loader
  console.log('Loading page configurations...');
  const configs = await loadConfigs();
  console.log(`Loaded ${Object.keys(configs).length} configurations\n`);

  // Generate pages for each configuration
  Object.entries(configs).forEach(([slug, config]) => {
    const pageDir = path.join(letsSeeDir, slug);
    
    // Create directory for this page
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }
    
    const { title, description, url, metaTags } = generateMetaTags(config, slug);
    const ssrContent = generateSSRContent(config);
    
    // Create the HTML content by replacing parts of the template
    let pageHtml = template
      // Replace title and meta tags
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace(/<meta name="viewport".*?>/, `<meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="${description}" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="${url}" />`)
      // Replace the root div content with SSR content
      .replace(/<div id="root"><\/div>/, `<div id="root">${ssrContent}</div>`)
      // Add preloaded configuration before the first script tag
      .replace(/<script type="module"/, `<script>
        // Pre-load the configuration for this page
        window.__PRELOADED_CONFIG__ = ${JSON.stringify(config)};
        window.__PAGE_TYPE__ = 'landing';
      </script>
      <script type="module"`);
    
    // Write the HTML file
    fs.writeFileSync(path.join(pageDir, 'index.html'), pageHtml);
    
    console.log(`Generated: /lets-see/${slug}/index.html`);
    
    // Generate thank-you page for each landing page
    const thankYouDir = path.join(pageDir, 'thank-you');
    if (!fs.existsSync(thankYouDir)) {
      fs.mkdirSync(thankYouDir, { recursive: true });
    }
    
    const thankYouTitle = `Thank You - ${config.headline} - ${buildConfig.site.name}`;
    const thankYouDescription = `Thank you for your interest! Schedule a demo to see how we can help.`;
    const thankYouUrl = `https://${buildConfig.domain}/lets-see/${slug}/thank-you`;
    const thankYouSSRContent = generateSSRContent(config, true);
    
    // Create thank-you page HTML
    let thankYouHtml = template
      // Replace title and meta tags
      .replace(/<title>.*?<\/title>/, `<title>${thankYouTitle}</title>`)
      .replace(/<meta name="viewport".*?>/, `<meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="${thankYouDescription}" />
      <meta property="og:title" content="${thankYouTitle}" />
      <meta property="og:description" content="${thankYouDescription}" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="${thankYouUrl}" />`)
      // Replace the root div content with thank-you SSR content
      .replace(/<div id="root"><\/div>/, `<div id="root">${thankYouSSRContent}</div>`)
      // Add preloaded configuration before the first script tag
      .replace(/<script type="module"/, `<script>
        // Pre-load the configuration for this page
        window.__PRELOADED_CONFIG__ = ${JSON.stringify(config)};
        window.__PAGE_TYPE__ = 'thank-you';
      </script>
      <script type="module"`);
    
    // Write the thank-you HTML file
    fs.writeFileSync(path.join(thankYouDir, 'index.html'), thankYouHtml);
    
    console.log(`Generated: /lets-see/${slug}/thank-you/index.html`);
  });

  // Generate main lets-see index page with redirect
  const gtmScripts = generateGTMScripts();
  const redirectPageHtml = `<!doctype html>
<html lang="en">
  <head>
    ${gtmScripts.headScript}
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/img/platform.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${buildConfig.site.name} - Landing Pages</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        background: #000000;
        color: white;
      }
      .container {
        text-align: center;
        max-width: 500px;
        padding: 2rem;
      }
      h1 { font-size: 2.5rem; margin-bottom: 1rem; }
      p { font-size: 1.2rem; opacity: 0.9; }
    </style>
    <script>
      // Immediate redirect to home page
      window.location.href = '/';
    </script>
  </head>
  <body>
    ${gtmScripts.bodyScript}
    <div class="container">
      <p>
        Redirecting to home page...
      </p>
    </div>
  </body>
</html>`;

  fs.writeFileSync(path.join(letsSeeDir, 'index.html'), redirectPageHtml);
  console.log('Generated: /lets-see/index.html (redirect)');

  // Generate measure-twice pages
  console.log('\nGenerating measure-twice pages...');
  
  // Generate measure-twice landing page
  const measureTwiceTitle = 'Measure Twice Newsletter - Measures AI';
  const measureTwiceDescription = 'Turning millions of documents across 10 industries into a handful of good ideas.';
  const measureTwiceUrl = `https://${buildConfig.domain}/measure-twice`;
  const measureTwiceSSRContent = `
    <div class="measure-twice-page">
      <div class="hero-section">
        <h1>Measure Twice Newsletter</h1>
        <p>Turning millions of documents across 10 industries into a handful of good ideas.</p>
      </div>
      <div class="loading-indicator">
        <p>Loading content...</p>
      </div>
    </div>`;
  
  let measureTwiceHtml = template
    .replace(/<title>.*?<\/title>/, `<title>${measureTwiceTitle}</title>`)
    .replace(/<meta name="viewport".*?>/, `<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${measureTwiceDescription}" />
    <meta property="og:title" content="${measureTwiceTitle}" />
    <meta property="og:description" content="${measureTwiceDescription}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${measureTwiceUrl}" />`)
    .replace(/<div id="root"><\/div>/, `<div id="root">${measureTwiceSSRContent}</div>`)
    .replace(/<script type="module"/, `<script>
      window.__PAGE_TYPE__ = 'measure-twice';
    </script>
    <script type="module"`);
  
  fs.writeFileSync(path.join(measureTwiceDir, 'index.html'), measureTwiceHtml);
  console.log('Generated: /measure-twice/index.html');
  
  // Generate measure-twice thank-you page
  const thankYouDir = path.join(measureTwiceDir, 'thank-you');
  if (!fs.existsSync(thankYouDir)) {
    fs.mkdirSync(thankYouDir, { recursive: true });
  }
  
  const measureTwiceThankYouTitle = 'Thank You - Measure Twice Newsletter - Measures AI';
  const measureTwiceThankYouDescription = 'Thank you for subscribing to the Measure Twice Newsletter!';
  const measureTwiceThankYouUrl = `https://${buildConfig.domain}/measure-twice/thank-you`;
  const measureTwiceThankYouSSRContent = `
    <div class="measure-twice-thank-you-page">
      <div class="thank-you-section">
        <h1>Thank You!</h1>
        <p>You've successfully subscribed to the Measure Twice Newsletter.</p>
      </div>
      <div class="loading-indicator">
        <p>Loading content...</p>
      </div>
    </div>`;
  
  let measureTwiceThankYouHtml = template
    .replace(/<title>.*?<\/title>/, `<title>${measureTwiceThankYouTitle}</title>`)
    .replace(/<meta name="viewport".*?>/, `<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${measureTwiceThankYouDescription}" />
    <meta property="og:title" content="${measureTwiceThankYouTitle}" />
    <meta property="og:description" content="${measureTwiceThankYouDescription}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${measureTwiceThankYouUrl}" />`)
    .replace(/<div id="root"><\/div>/, `<div id="root">${measureTwiceThankYouSSRContent}</div>`)
    .replace(/<script type="module"/, `<script>
      window.__PAGE_TYPE__ = 'measure-twice-thank-you';
    </script>
    <script type="module"`);
  
  fs.writeFileSync(path.join(thankYouDir, 'index.html'), measureTwiceThankYouHtml);
  console.log('Generated: /measure-twice/thank-you/index.html');

  const totalPages = (Object.keys(configs).length * 2) + 1 + 2; // landing pages + thank-you pages + redirect + measure-twice pages
  console.log(`\nGenerated ${totalPages} static pages successfully!`);
}

// Run the async function
generatePages().catch(console.error);
