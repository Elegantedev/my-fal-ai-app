// pages/index.tsx
import { useState } from 'react';

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const generateImage = async () => {
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.images && data.images.length > 0) {
        setImage(data.images[0].url); // Display the first generated image
      }
    } catch (error) {
      console.error('Failed to generate image:', error);
    }
  };

  return (
    <div>
      <h1>Generate an Image</h1>
      <input 
        type="text" 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter image prompt"
      />
      <button onClick={generateImage}>Generate</button>
      {image && <img src={image} alt="Generated" />}
    </div>
  );
};

export default Home;
