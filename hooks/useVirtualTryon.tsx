// hooks/useVirtualTryOn.js
import { useState } from 'react';

// ── Background save (fire & forget) ─────────────────────────────
// Uncomment each block as you build the APIs
async function saveInBackground(imageBase64, garmentFile, personFile) {
  try {
    const jobId = `job-${Date.now()}`;

    // // Upload result image to Cloudinary
    // const uploadRes = await fetch('/api/upload-output-image', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ imageUrl: imageBase64, jobId }),
    // });
    // const uploadData = uploadRes.ok ? await uploadRes.json() : {};

    // // Upload garment + person images
    // const imageForm = new FormData();
    // imageForm.append('garment', garmentFile);
    // imageForm.append('person',  personFile);
    // imageForm.append('jobId',   jobId);
    // const imagesRes = await fetch('/api/upload-images', {
    //   method: 'POST',
    //   body:   imageForm,
    // });
    // const imagesData = imagesRes.ok ? await imagesRes.json() : {};

    // // Save metadata to DB
    // await fetch('/api/save-tryon-metadata', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     jobId,
    //     cloudinaryUrls: {
    //       output:  uploadData.url        || null,
    //       garment: imagesData.garmentUrl || null,
    //       person:  imagesData.personUrl  || null,
    //     },
    //   }),
    // });

  } catch (err) {
    // Silent fail — never surfaces to the user
    console.error('Background save failed (non-critical):', err);
  }
}

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

      if (response.status === 503 && attempt < 3) {
        setError(`AI model is waking up… retrying (${attempt}/3)`);
        await new Promise(r => setTimeout(r, 5000));
        return generateTryOn(garmentFile, personFile, attempt + 1);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Our AI model is currently busy — please wait a moment and try again.');
      }

      // ✅ Client gets result immediately
      setError(null);
      setResult({
        imageBase64:  data.image,
        model:        data.model,
        isLowQuality: data.isLowQuality || false,
      });

      // 🔥 Fire & forget — uncomment saveInBackground calls as APIs are built
      // saveInBackground(data.image, garmentFile, personFile);

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