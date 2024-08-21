// pages/api/generate-image.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { generateImage } from '../../lib/imageGenerator'; // Adjust import according to your project structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    try {
      const imageUrl = await generateImage(prompt);
      res.status(200).json({ imageUrl });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate image' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
