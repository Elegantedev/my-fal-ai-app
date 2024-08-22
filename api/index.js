// api/index.js
import { NextResponse } from 'next/server';
import { imageGenerator } from './imageGenerator';

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const imageUrl = await imageGenerator(prompt);
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
