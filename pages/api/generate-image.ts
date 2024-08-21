// pages/api/generate-image.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const generateImage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('https://api.fal.ai/v1/images/generate', {
        prompt: req.body.prompt,
        // Include any additional parameters here
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.FAL_AI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate image' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default generateImage;
