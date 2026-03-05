// app/api/tryon-queue/enqueue/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../../lib/supabase';

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

    const garmentBase64 = Buffer.from(await garmentFile.arrayBuffer()).toString('base64');
    const personBase64  = Buffer.from(await personFile.arrayBuffer()).toString('base64');

    const jobId = `job-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    const supabaseAdmin = getSupabaseAdmin();

    const { error } = await supabaseAdmin
      .from('tryon_jobs')
      .insert({
        job_id:        jobId,
        status:        'pending',
        garment_image: garmentBase64,
        garment_type:  garmentFile.type || 'image/jpeg',
        person_image:  personBase64,
        person_type:   personFile.type  || 'image/jpeg',
        website:       request.headers.get('origin') || 'zayra-co',
      });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to queue job' }, { status: 500 });
    }

    return NextResponse.json({ jobId });

  } catch (err) {
    console.error('Enqueue error:', err);
    return NextResponse.json({ error: 'Failed to queue job' }, { status: 500 });
  }
}