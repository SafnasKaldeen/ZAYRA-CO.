// hooks/useVirtualTryOn.js
import { useState } from 'react';

export function useVirtualTryOn() {
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const generateTryOn = async (garmentFile, personFile, attempt = 1) => {
    setLoading(true);
    setError(null);
    if (attempt === 1) setResult(null);

    try {
      const formData = new FormData();
      formData.append('garment', garmentFile);
      formData.append('person',  personFile);

      const response = await fetch('/api/virtual-tryon', {
        method: 'POST',
        body:   formData,
      });

      const data = await response.json();

      // Space was sleeping — auto retry up to 3 times
      if (response.status === 503 && attempt < 3) {
        setError(`AI model is waking up… retrying (${attempt}/3)`);
        await new Promise(r => setTimeout(r, 5000));
        return generateTryOn(garmentFile, personFile, attempt + 1);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Our AI model is currently busy — please wait a moment and try again.');
      }

      setError(null);
      setResult({
        imageBase64:  data.image,
        model:        data.model,
        isLowQuality: data.isLowQuality || false,
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { result, loading, error, generateTryOn, reset };
}