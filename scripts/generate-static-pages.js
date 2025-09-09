#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exampleConfigs } from '../src/lets-see/utils/config.js';

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

// Function to generate meta tags and title from config
function generateMetaTags(config, slug) {
  const title = config.role && config.industry 
    ? `${config.role} - ${config.industry} | Measures AI`
    : 'Measures AI - Measure Everything';
  
  const description = config.story || 'Measure everything with Measures AI';
  const url = `https://measuresai.com/lets-see/${slug}`;
  
  return {
    title,
    description,
    url,
    metaTags: `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    `
  };
}

// Function to generate server-side rendered content
function generateSSRContent(config) {
  const storyLines = Array.isArray(config.story) 
    ? config.story 
    : [config.story];
  
  return `<div data-landing-page="${config.role || 'Unknown'}" data-industry="${config.industry || 'Unknown'}">
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a0a0a; color: #ffffff;">
      <div style="text-align: center; max-width: 800px; padding: 2rem;">
        <h1 style="font-size: 3rem; margin-bottom: 1rem;">${config.headline || 'Welcome to Measures AI'}</h1>
        <div style="font-size: 1.2rem; opacity: 0.8;">
          ${storyLines.map(line => `<p>${line}</p>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

// Generate pages for each configuration
Object.entries(exampleConfigs).forEach(([slug, config]) => {
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

// Generate main lets-see index page
const defaultConfig = exampleConfigs['head-of-support-retail'];
const mainPageHtml = template
  .replace(/<title>.*?<\/title>/, '<title>Measures AI - Landing Pages</title>')
  .replace(/<div id="root"><\/div>/, `<div id="root">${generateSSRContent(defaultConfig)}</div>`)
  .replace(/<script type="text\/javascript">/, `<script>
    window.__PRELOADED_CONFIG__ = ${JSON.stringify(defaultConfig)};
  </script>
  <script type="text/javascript">`);

fs.writeFileSync(path.join(letsSeeDir, 'index.html'), mainPageHtml);
console.log('Generated: /lets-see/index.html');

console.log(`\nGenerated ${Object.keys(exampleConfigs).length + 1} static pages successfully!`);
