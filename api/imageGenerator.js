// api/imageGenerator.js
const FAL_KEY = process.env.FAL_KEY;

export async function imageGenerator(prompt) {
  const response = await fetch('https://api.fal.ai/v1/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${FAL_KEY}`
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    throw new Error(`Fal.ai API request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.imageUrl; // Adjust according to Fal.ai API response
}
