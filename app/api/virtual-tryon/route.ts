// app/api/virtual-tryon/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@gradio/client';

async function entryToBuffer(
  entry: FormDataEntryValue
): Promise<{ buffer: Buffer; name: string; mime: string }> {

  // ── Case 1: plain string ──────────────────────────────────────────────────
  // The client sent a base64 data URL ("data:image/png;base64,....") or a
  // regular http/https URL instead of a binary file upload.
  if (typeof entry === 'string') {
    // base64 data URL
    if (entry.startsWith('data:')) {
      const [header, b64] = entry.split(',');
      const mime = header.replace('data:', '').replace(';base64', '') || 'image/png';
      return { buffer: Buffer.from(b64, 'base64'), name: 'upload.png', mime };
    }

    // remote URL — fetch it
    if (entry.startsWith('http://') || entry.startsWith('https://')) {
      const res = await fetch(entry);
      if (!res.ok) throw new Error(`Failed to fetch image URL: ${res.status}`);
      const ct = res.headers.get('content-type') || 'image/png';
      return { buffer: Buffer.from(await res.arrayBuffer()), name: 'upload.png', mime: ct };
    }

    throw new Error(`Received a plain string that is neither a data URL nor an http URL: "${entry.slice(0, 80)}"`);
  }

  // ── Case 2: object with arrayBuffer() (standard Web File / Blob) ──────────
  if (typeof (entry as any).arrayBuffer === 'function') {
    const blob = entry as Blob;
    const ab   = await (blob as any).arrayBuffer();
    return {
      buffer: Buffer.from(ab),
      name:   (entry as any).name ?? 'upload.png',
      mime:   blob.type || 'image/png',
    };
  }

  // ── Case 3: object with stream() (Next.js internal on Windows) ───────────
  if (typeof (entry as any).stream === 'function') {
    const stream: ReadableStream = (entry as any).stream();
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    return {
      buffer: Buffer.concat(chunks),
      name:   (entry as any).name ?? 'upload.png',
      mime:   (entry as any).type || 'image/png',
    };
  }

  throw new Error(
    `Unsupported FormData entry — type=${typeof entry} ` +
    `toString=${Object.prototype.toString.call(entry)} ` +
    `keys=${entry && typeof entry === 'object' ? Object.keys(entry).join(',') : 'n/a'}`
  );
}

function bufferToDataUrl(buffer: Buffer, mime: string): string {
  return `data:${mime};base64,${buffer.toString('base64')}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const personEntry  = formData.get('person');
    const garmentEntry = formData.get('garment');

    if (!personEntry || !garmentEntry) {
      return NextResponse.json(
        { error: 'Both garment and person images are required' },
        { status: 400 }
      );
    }

    // Log what we actually received (remove after debugging)
    console.log('person  entry type:', typeof personEntry,  Object.prototype.toString.call(personEntry));
    console.log('garment entry type:', typeof garmentEntry, Object.prototype.toString.call(garmentEntry));

    const [person, garment] = await Promise.all([
      entryToBuffer(personEntry),
      entryToBuffer(garmentEntry),
    ]);

    console.log(`person  buffer: ${person.buffer.length} bytes, mime: ${person.mime}`);
    console.log(`garment buffer: ${garment.buffer.length} bytes, mime: ${garment.mime}`);

    const personDataUrl  = bufferToDataUrl(person.buffer,  person.mime);
    const garmentDataUrl = bufferToDataUrl(garment.buffer, garment.mime);

    const client = await Client.connect("WeShopAI/WeShopAI-Virtual-Try-On");

    const result = await client.predict("/generate_image", {
      main_image: {
        url:       personDataUrl,
        orig_name: person.name,
        mime_type: person.mime,
        is_stream: false,
        meta:      { _type: 'gradio.FileData' },
      },
      background_image: {
        url:       garmentDataUrl,
        orig_name: garment.name,
        mime_type: garment.mime,
        is_stream: false,
        meta:      { _type: 'gradio.FileData' },
      },
    });

    console.log('Raw result:', JSON.stringify(result.data, null, 2));

    const resultData = result.data?.[0] ?? result.data;

    if (!resultData) {
      return NextResponse.json(
        { error: 'Our AI model is currently busy — please wait a moment and try again.' },
        { status: 503 }
      );
    }

    let imageUrl: string | null = null;

    if (typeof resultData === 'string') {
      imageUrl = resultData;
    } else if (resultData && typeof resultData === 'object') {
      imageUrl = (resultData as any).url ?? (resultData as any).path ?? null;
      if (!imageUrl) {
        for (const value of Object.values(resultData as object)) {
          if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('/'))) {
            imageUrl = value;
            break;
          }
        }
      }
    }

    if (!imageUrl) {
      throw new Error(`Cannot extract image URL from: ${JSON.stringify(resultData)}`);
    }

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error(`Download failed: ${imageResponse.status}`);

    const base64Image = Buffer.from(await imageResponse.arrayBuffer()).toString('base64');
    const dataUrl     = `data:image/png;base64,${base64Image}`;

    console.log('🎉 Success!');

    return NextResponse.json({
      success:      true,
      image:        dataUrl,
      model:        'WeShopAI',
      isLowQuality: false,
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        error:   'Our AI model is currently busy — please wait a moment and try again.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export const maxDuration = 300;