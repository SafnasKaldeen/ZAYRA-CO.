// app/api/virtual-tryon/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@gradio/client';

export async function POST(request: NextRequest) {
  try {
    const formData    = await request.formData();
    const garmentFile = formData.get('garment') as File;
    const personFile  = formData.get('person')  as File;

    if (!garmentFile || !personFile) {
      return NextResponse.json(
        { error: 'Both garment and person images are required' },
        { status: 400 }
      );
    }

    const garmentBlob = new Blob([await garmentFile.arrayBuffer()], {
      type: garmentFile.type || 'image/png',
    });
    const personBlob = new Blob([await personFile.arrayBuffer()], {
      type: personFile.type || 'image/png',
    });

    const client = await Client.connect('WeShopAI/WeShopAI-Virtual-Try-On');

    const job = client.submit('/generate_image', [garmentBlob, personBlob]);

    let result = null;

    for await (const message of job) {
      if (message.type === 'data') {
        if (message.data && message.data[0] !== null) {
          result = message;
        }
        break;
      }
    }

    if (!result || !result.data || result.data[0] === null) {
      return NextResponse.json(
        { error: 'Our AI model is currently busy — please wait a moment and try again.' },
        { status: 503 }
      );
    }

    const resultData = result.data[0];
    let imageUrl: string | null = null;

    if (typeof resultData === 'string') {
      imageUrl = resultData;
    } else if (resultData && typeof resultData === 'object') {
      if ('url' in resultData) {
        imageUrl = (resultData as any).url;
      } else if ('path' in resultData) {
        imageUrl = (resultData as any).path;
      } else {
        for (const [, value] of Object.entries(resultData)) {
          if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('/'))) {
            imageUrl = value;
            break;
          }
        }
      }
    }

    if (!imageUrl) {
      throw new Error(`Cannot extract image URL from result`);
    }

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download result image: ${imageResponse.status}`);
    }

    const base64Image = Buffer.from(await imageResponse.arrayBuffer()).toString('base64');

    return NextResponse.json({
      success: true,
      image:        `data:image/png;base64,${base64Image}`,
      model:        'WeShopAI',
      isLowQuality: false,
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Our AI model is currently busy — please wait a moment and try again.' },
      { status: 500 }
    );
  }
}

export const maxDuration = 300;