import { env } from '@/src/shared/infrastructure/env/env';

const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'svg', 'gif']);
const MAX_FILE_BYTES = 20 * 1024 * 1024;
const ADMIN_UPLOAD_URL = `${new URL(env.NEXT_PUBLIC_PRODUCT_IMAGE_BASE_URL).origin}/api/filepond-mode-server/process?folder=products`;

interface AdminUploadResponse {
  status: string;
  nameFile: string | null;
  msg: string | null;
}

export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  const files = formData.getAll('files').filter((value): value is File => value instanceof File);

  if (files.length === 0) {
    return Response.json({ success: false, message: 'No se recibieron imágenes' }, { status: 400 });
  }

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

    const proxyForm = new FormData();
    proxyForm.append('filepond', file, file.name);

    const adminResponse = await fetch(ADMIN_UPLOAD_URL, { method: 'POST', body: proxyForm });
    const result = (await adminResponse.json()) as AdminUploadResponse;

    if (result.status !== 'success' || !result.nameFile) {
      return Response.json(
        { success: false, message: result.msg ?? 'No se pudo subir la imagen' },
        { status: 502 },
      );
    }

    urls.push(`${env.NEXT_PUBLIC_PRODUCT_IMAGE_BASE_URL}/${result.nameFile}`);
  }

  return Response.json({ success: true, urls });
}
