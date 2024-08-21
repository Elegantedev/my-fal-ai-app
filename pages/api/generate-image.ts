// pages/api/generate-image.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const generateImage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    res.status(200).json({ message: 'Success' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default generateImage;
