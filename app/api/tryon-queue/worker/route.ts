// app/api/tryon-queue/worker/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../../lib/supabase';
import { Client } from '@gradio/client';

export const dynamic     = 'force-dynamic';
export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin();

  // ── 1. Check if any job is already processing ──────────────────────────
  const { data: processing, error: processingError } = await supabaseAdmin
    .from('tryon_jobs')
    .select('id')
    .eq('status', 'processing')
    .limit(1);

  console.log('Processing check:', processing, 'Error:', processingError);

  if (processingError) {
    return NextResponse.json({ error: 'DB error checking processing', details: processingError.message }, { status: 500 });
  }

  if (processing && processing.length > 0) {
    return NextResponse.json({ message: 'Worker busy — job already processing' });
  }

  // ── 2. Pick the oldest pending job ────────────────────────────────────
  const { data: jobs, error: jobsError } = await supabaseAdmin
    .from('tryon_jobs')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .limit(1);

  console.log('Pending jobs:', jobs, 'Error:', jobsError);

  if (jobsError) {
    return NextResponse.json({ error: 'DB error fetching jobs', details: jobsError.message }, { status: 500 });
  }

  if (!jobs || jobs.length === 0) {
    return NextResponse.json({ message: 'Queue is empty' });
  }

  const job = jobs[0];
  console.log('Processing job:', job.job_id);

  // ── 3. Mark as processing ─────────────────────────────────────────────
  const { error: updateError } = await supabaseAdmin
    .from('tryon_jobs')
    .update({ status: 'processing' })
    .eq('job_id', job.job_id);

  console.log('Mark processing error:', updateError);

  // ── 4. Reconstruct Blobs from base64 ──────────────────────────────────
  const garmentBuffer = Buffer.from(job.garment_image, 'base64');
  const personBuffer  = Buffer.from(job.person_image,  'base64');
  const garmentBlob   = new Blob([garmentBuffer], { type: job.garment_type });
  const personBlob    = new Blob([personBuffer],  { type: job.person_type  });

  // ── 5. Call Gradio — retry up to 3 times ─────────────────────────────
  let resultImage: string | null = null;
  let lastError:   string | null = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const client    = await Client.connect('WeShopAI/WeShopAI-Virtual-Try-On');
      const gradioJob = client.submit('/generate_image', [garmentBlob, personBlob]);

      let gradioResult = null;

      for await (const message of gradioJob) {
        if (message.type === 'data') {
          if (message.data && message.data[0] !== null) {
            gradioResult = message;
          }
          break;
        }
      }

      if (!gradioResult?.data?.[0]) throw new Error('Gradio returned null result');

      const resultData = gradioResult.data[0];
      let imageUrl: string | null = null;

      if (typeof resultData === 'string') {
        imageUrl = resultData;
      } else if (resultData && typeof resultData === 'object') {
        if ('url' in resultData)       imageUrl = (resultData as any).url;
        else if ('path' in resultData) imageUrl = (resultData as any).path;
        else {
          for (const [, value] of Object.entries(resultData)) {
            if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('/'))) {
              imageUrl = value;
              break;
            }
          }
        }
      }

      if (!imageUrl) throw new Error('Cannot extract image URL');

      const imageResponse = await fetch(imageUrl, { cache: 'no-store' });
      if (!imageResponse.ok) throw new Error(`Image download failed: ${imageResponse.status}`);

      const base64 = Buffer.from(await imageResponse.arrayBuffer()).toString('base64');
      resultImage  = `data:image/png;base64,${base64}`;
      break;

    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      console.error(`Attempt ${attempt} failed:`, lastError);
      if (attempt < 3) await new Promise(r => setTimeout(r, attempt * 5000));
    }
  }

  // ── 6. Update job with result or error ────────────────────────────────
  if (resultImage) {
    await supabaseAdmin
      .from('tryon_jobs')
      .update({ status: 'done', result_image: resultImage })
      .eq('job_id', job.job_id);
  } else {
    await supabaseAdmin
      .from('tryon_jobs')
      .update({ status: 'failed', error: lastError || 'AI model failed after 3 attempts' })
      .eq('job_id', job.job_id);
  }

  return NextResponse.json({
    message: resultImage ? 'Job completed' : 'Job failed',
    jobId:   job.job_id,
    success: !!resultImage,
  });
}