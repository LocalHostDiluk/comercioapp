// src/app/api/upload-image/route.ts
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No se ha subido ningún archivo.' }, { status: 400 });
    }

    // Convierte el archivo a un buffer para poder subirlo
    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(fileBuffer).toString('base64');
    const fileUri = `data:${mimeType};${encoding},${base64Data}`;

    // Sube la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: 'mi-taqueria', // Opcional: para organizar en una carpeta
    });

    // Devuelve la URL segura de la imagen
    return NextResponse.json({ success: true, url: result.secure_url }, { status: 200 });

  } catch (error) {
    console.error('Error al subir la imagen:', error);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}