import { env } from '@/src/shared/infrastructure/env/env';
import { uploadImagesResponseSchema } from '@/src/features/listings/infrastructure/image-schemas';

export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  const files = formData.getAll('files').filter((value): value is File => value instanceof File);

  if (files.length === 0) {
    return Response.json({ success: false, message: 'No se recibieron imágenes' }, { status: 400 });
  }

  const productIdRaw = formData.get('productId');
  const productId = productIdRaw ? Number(productIdRaw) : null;

  const authHeader = request.headers.get('Authorization');

  const proxyForm = new FormData();
  for (const file of files) {
    proxyForm.append('images', file, file.name);
  }

  const backendPath =
    productId && Number.isInteger(productId) && productId > 0
      ? `/web/products/${productId}/images`
      : '/web/products/staging-images';

  const backendUrl = `${env.server.BACKEND_URL}${backendPath}`;

  const backendResponse = await fetch(backendUrl, {
    method: 'POST',
    body: proxyForm,
    headers: authHeader ? { Authorization: authHeader } : {},
  });

  const json: unknown = await backendResponse.json().catch(() => null);

  if (!backendResponse.ok) {
    return Response.json(
      { success: false, message: 'No se pudieron subir las imágenes al servidor' },
      { status: backendResponse.status },
    );
  }

  const parsed = uploadImagesResponseSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { success: false, message: 'Respuesta inesperada del servidor de imágenes' },
      { status: 502 },
    );
  }

  return Response.json({ success: true, urls: parsed.data.urls });
}
