const fetch = require('node-fetch'); // If using fetch, ensure you have it installed

const API_URL = 'https://api.example.com/generate-image'; // Replace with your API URL

async function createImage(prompt) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    throw new Error('Failed to generate image');
  }

  const { imageUrl } = await response.json();
  return imageUrl;
}

module.exports = { createImage };
