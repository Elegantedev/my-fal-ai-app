const { createImage } = require('./imageGenerator'); // Example import if you have a separate image generator

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
      const imageUrl = await createImage(prompt); // Your image generation logic
      return res.status(200).json({ imageUrl });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to generate image' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
