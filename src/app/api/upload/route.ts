// app/api/upload/route.ts

import { randomUUID } from 'crypto';
import admin from 'firebase-admin';
import { NextRequest, NextResponse } from 'next/server';
import { extname } from 'path';

// Inicialize o Firebase Admin SDK
if (!admin.apps.length) {
  const private_key = process.env.private_key?.replace(/\\n/g, '\n');
  const firebaseConfig: any = {
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key,
    client_email: process.env.client_email,
  };

  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    storageBucket: 'gs://spacetime-img.appspot.com',
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/;
    const isValidFileFormat = mimeTypeRegex.test(file.type);

    if (!isValidFileFormat) {
      return NextResponse.json({ error: 'Invalid file format' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
    }

    const fileId = randomUUID();
    const extension = extname(file.name);
    const fileName = fileId.concat(extension);

    const bucket = admin.storage().bucket();
    const firebaseFile = bucket.file(fileName);

    const buffer = await file.arrayBuffer();

    await firebaseFile.save(Buffer.from(buffer), {
      metadata: {
        contentType: file.type,
      },
      resumable: false,
    });

    const [fileUrl] = await firebaseFile.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });

    return NextResponse.json({ fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}

