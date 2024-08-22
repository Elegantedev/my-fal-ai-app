import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageUrl(null); // Reset image URL when starting a new request

    try {
      console.log('Sending prompt:', prompt);

      const response = await fetch('/api/fal/proxy', { // Ensure this is the correct endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        console.error('API response error:', response.status, response.statusText);
        throw new Error('API request failed');
      }

      const data = await response.json();
      console.log('Received data:', data);

      if (data && data.images && data.images.length > 0) {
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
