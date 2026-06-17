import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'svg', 'gif']);
const MAX_FILE_BYTES = 20 * 1024 * 1024;
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'products');

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll('files').filter((value) => value instanceof File);

  if (files.length === 0) {
    return Response.json({ success: false, message: 'No se recibieron imágenes' }, { status: 400 });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const origin = new URL(request.url).origin;
  const urls: string[] = [];

  for (const file of files) {
    const extension = file.name.split('.').pop()?.toLowerCase() ?? '';

    if (!ALLOWED_EXTENSIONS.has(extension)) {
      return Response.json(
        { success: false, message: `Formato no permitido: .${extension}` },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_BYTES) {
      return Response.json(
        { success: false, message: 'Una imagen supera el tamaño máximo de 20MB' },
        { status: 400 },
      );
    }

    const filename = `${randomUUID()}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);
    urls.push(`${origin}/uploads/products/${filename}`);
  }

  return Response.json({ success: true, urls });
}
