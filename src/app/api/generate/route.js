import { NextResponse } from 'next/server';
import sharp from 'sharp';
import JSZip from 'jszip';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const targetSize = formData.get('size');

    if (!file) return NextResponse.json({ error: "Source asset required" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    // Lanczos3 kernel for maximum sharpness
    const renderer = (size) => sharp(buffer)
      .resize(size, size, {
        kernel: sharp.kernel.lanczos3,
        withoutEnlargement: false,
      })
      .png({ quality: 100, compressionLevel: 9 });

    //  SINGLE ASSET EXPORT
    if (targetSize && targetSize !== 'all') {
      const sizeInt = parseInt(targetSize);
      const output = await renderer(sizeInt).toBuffer();

      return new NextResponse(output, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Content-Disposition': `attachment; filename="favicon-${targetSize}x${targetSize}.png"`,
        },
      });
    }

    // BUNDLE GENERATION (.ZIP)
    const zip = new JSZip();

    // Comprehensive Icon Matrix
    const assets = [
      // Standard Web
      { name: 'favicon-16x16.png', size: 16 },
      { name: 'favicon-32x32.png', size: 32 },
      { name: 'favicon-48x48.png', size: 48 },
      // Apple
      { name: 'apple-touch-icon.png', size: 180 },
      { name: 'apple-touch-icon-57x57.png', size: 57 },
      { name: 'apple-touch-icon-114x114.png', size: 114 },
      { name: 'apple-touch-icon-152x152.png', size: 152 },
      // Android
      { name: 'android-chrome-192x192.png', size: 192 },
      { name: 'android-chrome-512x512.png', size: 512 },
      // Windows Tiles
      { name: 'mstile-150x150.png', size: 150 },
    ];

    // Batch Process Images
    for (const asset of assets) {
      const imgBuffer = await renderer(asset.size).toBuffer();
      zip.file(`favicons/${asset.name}`, imgBuffer);
    }

    // Generate legacy favicon.ico
    const icoBuffer = await renderer(32).toBuffer();
    zip.file('favicons/favicon.ico', icoBuffer);

    // Generate PWA Manifest
    const manifest = {
      name: "Favicraft Project",
      short_name: "Favicraft",
      icons: [
        { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
      ],
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone"
    };
    zip.file('favicons/site.webmanifest', JSON.stringify(manifest, null, 2));

    //  Generate Windows BrowserConfig
    const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png"/>
      <TileColor>#ffffff</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
    zip.file('favicons/browserconfig.xml', browserConfig);

    // Finalize Archive
    const zipContent = await zip.generateAsync({
      type: 'nodebuffer',
      compression: "DEFLATE",
      compressionOptions: { level: 9 }
    });

    return new NextResponse(zipContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="favicraft-pro-bundle.zip"',
      },
    });

  } catch (err) {
    console.error("ENGINE_ERROR:", err);
    return NextResponse.json({ error: "Rendering_Failure", code: 500 }, { status: 500 });
  }
}
