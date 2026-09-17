/**
 * API configuration and shared utilities for Forma client requests.
 */

export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  return 'http://127.0.0.1:8000';
}

export const API_BASE_URL = getApiBaseUrl();

/**
 * Resolves an image URL or static path into an absolute accessible URL.
 * Supports relative backend static routes (e.g. /static/rooms/...) as well as
 * external full URLs (Unsplash, CDN, S3, blob previews).
 */
export function resolveImageUrl(pathOrUrl: string | null | undefined): string {
  if (!pathOrUrl) return '';

  const trimmed = pathOrUrl.trim();
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed;
  }

  const baseUrl = getApiBaseUrl();
  const normalizedPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${baseUrl}${normalizedPath}`;
}

export class ApiError extends Error {
  statusCode?: number;
  detail?: string;

  constructor(message: string, statusCode?: number, detail?: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.detail = detail;
  }
}
