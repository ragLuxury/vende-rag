import { type z } from 'zod';
import { env } from '@/src/shared/infrastructure/env/env';
import { HttpError, UnauthorizedError, ValidationError } from '@/src/shared/domain/errors';
import { tokenStorage } from './token-storage';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions<TSchema extends z.ZodTypeAny> = {
  method?: Method;
  body?: unknown;
  schema: TSchema;
  signal?: AbortSignal;
  headers?: Record<string, string>;
};

function resolveBaseUrl(): string {
  return typeof window === 'undefined' ? env.server.BACKEND_URL : env.NEXT_PUBLIC_BACKEND_URL;
}

export async function httpRequest<TSchema extends z.ZodTypeAny>(
  path: string,
  options: RequestOptions<TSchema>,
): Promise<z.infer<TSchema>> {
  const url = `${resolveBaseUrl()}${path}`;
  const token = tokenStorage.get();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const init: RequestInit = {
    method: options.method ?? 'GET',
    headers,
  };
  if (options.body !== undefined) init.body = JSON.stringify(options.body);
  if (options.signal !== undefined) init.signal = options.signal;

  const res = await fetch(url, init);

  const text = await res.text();
  const json = text ? safeJson(text) : null;

  if (!res.ok) {
    if (res.status === 401) throw new UnauthorizedError(json);
    throw new HttpError(res.status, `${res.status} ${res.statusText}`, json);
  }

  const parsed = options.schema.safeParse(json);
  if (!parsed.success) {
    throw new ValidationError(`Response failed schema validation for ${path}`, parsed.error);
  }
  return parsed.data;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
