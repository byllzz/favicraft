import { NextResponse } from 'next/server';
import sharp from 'sharp';
import JSZip from 'jszip';

export async function POST(req) {
  try {
    // data: extract file and requested resolution
    const formData = await req.formData();
    const file = formData.get('file');
    const targetSize = formData.get('size');

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    // buffer: convert file for sharp processing
    const buffer = Buffer.from(await file.arrayBuffer());

    // flow: handle single image export
    if (targetSize && targetSize !== 'all') {
      const sizeInt = parseInt(targetSize);
      const resizedBuffer = await sharp(buffer)
        .resize(sizeInt, sizeInt)
        .png()
        .toBuffer();

      return new NextResponse(resizedBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Content-Disposition': `attachment; filename="favicon-${targetSize}x${targetSize}.png"`,
        },
      });
    }

    // flow: handle bulk zip generation
    const zip = new JSZip();
    const sizes = [
      { name: 'favicon-16x16.png', size: 16 },
      { name: 'favicon-32x32.png', size: 32 },
      { name: 'apple-touch-icon.png', size: 180 },
      { name: 'android-chrome-192x192.png', size: 192 },
    ];

    // loop: resize assets & append to zip
    for (const item of sizes) {
      const img = await sharp(buffer)
        .resize(item.size, item.size)
        .png()
        .toBuffer();
      zip.file(item.name, img);
    }

    // output: generate final node buffer
    const zipContent = await zip.generateAsync({ type: 'nodebuffer' });

    return new NextResponse(zipContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="favicons.zip"',
      },
    });

  } catch (err) {
    // error: generic failure response
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
