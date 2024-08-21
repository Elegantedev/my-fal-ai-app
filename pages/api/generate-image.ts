// pages/api/generate-image.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import * as fal from '@fal-ai/serverless-client';

// Initialize the Fal.ai client with the API key from environment variables
fal.config({
  credentials: process.env.FAL_KEY || '', // Ensure you have this key set in your environment variables
});

const generateImage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Extract prompt from request body
      const { prompt } = req.body;

      // Call Fal.ai API to generate the image
      const result = await fal.subscribe('fal-ai/flux/dev', {
        input: {
          prompt,
          image_size: 'landscape_4_3', // You can adjust other parameters as needed
          num_images: 1,
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === 'IN_PROGRESS') {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });

      // Return the URL of the generated image
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate image' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default generateImage;
