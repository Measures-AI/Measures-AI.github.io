#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Generate meta tags for a page
function generateMetaTags(config, slug) {
  const title = `${config.headline} - Measures AI`;
  const description = config.story || 'Turn customer conversations into actionable insights with Measures AI.';
  const url = `https://measuresai.com/lets-see/${slug}`;
  
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
function generateSSRContent(config) {
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
      // Add preloaded configuration
      .replace(/<script type="text\/javascript">/, `<script>
        // Pre-load the configuration for this page
        window.__PRELOADED_CONFIG__ = ${JSON.stringify(config)};
      </script>
      <script type="text/javascript">`);
    
    // Write the HTML file
    fs.writeFileSync(path.join(pageDir, 'index.html'), pageHtml);
    
    console.log(`Generated: /lets-see/${slug}/index.html`);
  });

  // Generate main lets-see index page with redirect
  const redirectPageHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/img/platform.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Measures AI - Landing Pages</title>
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
    <div class="container">
      <p>
        Redirecting to home page...
      </p>
    </div>
  </body>
</html>`;

  fs.writeFileSync(path.join(letsSeeDir, 'index.html'), redirectPageHtml);
  console.log('Generated: /lets-see/index.html (redirect)');

  console.log(`\nGenerated ${Object.keys(configs).length + 1} static pages successfully!`);
}

// Run the async function
generatePages().catch(console.error);
