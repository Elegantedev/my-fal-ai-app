import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Place the handleSubmit function here
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageUrl(null);
    setError('');

    try {
      console.log('Sending prompt:', prompt);

      const response = await fetch('/api/fal/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API response error:', response.status, errorText);
        setError('Failed to generate image.');
        throw new Error('API request failed');
      }

      const data = await response.json();
      console.log('Received data:', data);

      if (data && data.images && data.images.length > 0) {
        setImageUrl(data.images[0].url);
      } else {
        console.error('Image URL not found in response:', data);
        setError('Image URL not found.');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Error generating image.');
    } finally {
      setLoading(false);
    }
  };

  // Return JSX
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
}
