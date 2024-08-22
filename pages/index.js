// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/fal/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: {
            prompt,
            model_name: "stabilityai/stable-diffusion-xl-base-1.0",
            image_size: "square_hd"
          }
        })
      });

      const data = await response.json();
      if (data.images && data.images[0]) {
        setImageUrl(data.images[0].url);
      } else {
        console.error('Image URL not found in response:', data);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Image Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          required
        />
        <button type="submit" disabled={loading}>Generate Image</button>
      </form>
      {loading && <p>Loading...</p>}
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
}
