/**
 * Room API Client for Forma backend interactions.
 * Handles room upload, retrieval, and client-side pre-validation.
 */

import {
  RoomUploadResponse,
  RoomResponse,
  UploadRoomOptions,
  FileValidationResult
} from '../../types';
import { getApiBaseUrl, ApiError } from './config';

export const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
export const SUPPORTED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];
export const MAX_UPLOAD_SIZE_MB = 15;
export const MAX_UPLOAD_SIZE_BYTES = MAX_UPLOAD_SIZE_MB * 1024 * 1024;

/**
 * Validates a room photograph before network transmission.
 */
export function validateRoomImage(file: File): FileValidationResult {
  if (!file) {
    return { valid: false, error: 'No image file selected.' };
  }

  if (file.size === 0) {
    return { valid: false, error: 'The selected file is empty.' };
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the maximum allowed size of ${MAX_UPLOAD_SIZE_MB} MB.`
    };
  }

  const filename = file.name || '';
  const lastDotIndex = filename.lastIndexOf('.');
  const extension = lastDotIndex !== -1 ? filename.slice(lastDotIndex).toLowerCase() : '';

  const isExtensionValid = SUPPORTED_EXTENSIONS.includes(extension);
  const isMimeValid = !file.type || SUPPORTED_MIME_TYPES.includes(file.type.toLowerCase());

  if (!isExtensionValid || (!isMimeValid && file.type)) {
    return {
      valid: false,
      error: `Unsupported file format '${extension || file.type}'. Please upload a JPG, PNG, or WEBP room photograph.`
    };
  }

  return { valid: true };
}

/**
 * Upload a room photograph to the FastAPI backend.
 * Dispatches multipart/form-data to POST /api/rooms/upload.
 */
export async function uploadRoom(
  file: File,
  options?: UploadRoomOptions
): Promise<RoomUploadResponse> {
  const validation = validateRoomImage(file);
  if (!validation.valid) {
    throw new ApiError(validation.error || 'Invalid file selected.', 400);
  }

  const formData = new FormData();
  formData.append('file', file);

  if (options?.name && options.name.trim().length > 0) {
    formData.append('name', options.name.trim());
  }

  if (options?.room_type && options.room_type.trim().length > 0) {
    formData.append('room_type', options.room_type.trim());
  }

  const baseUrl = getApiBaseUrl();
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/rooms/upload`, {
      method: 'POST',
      body: formData
    });
  } catch (err: unknown) {
    // Graceful recovery when backend is offline or unreachable
    const networkMessage =
      `Unable to connect to Forma backend (${baseUrl}). Please verify that the backend server is running.`;
    throw new ApiError(networkMessage, 0, (err as Error)?.message);
  }

  if (!response.ok) {
    let errorDetail = '';
    try {
      const errorJson = await response.json();
      if (errorJson && typeof errorJson.detail === 'string') {
        errorDetail = errorJson.detail;
      }
    } catch {
      // Ignore JSON parse error on non-JSON response
    }

    let userFriendlyMessage = 'Failed to upload room image.';
    if (response.status === 413) {
      userFriendlyMessage = `Uploaded image exceeds the ${MAX_UPLOAD_SIZE_MB} MB limit.`;
    } else if (response.status === 415) {
      userFriendlyMessage = errorDetail || 'Unsupported image format. Allowed formats: JPG, PNG, WEBP.';
    } else if (response.status === 400) {
      userFriendlyMessage = errorDetail || 'Invalid room upload request.';
    } else if (response.status >= 500) {
      userFriendlyMessage = 'The server encountered an error processing your room image. Please try again.';
    } else if (errorDetail) {
      userFriendlyMessage = errorDetail;
    }

    throw new ApiError(userFriendlyMessage, response.status, errorDetail);
  }

  const data: RoomUploadResponse = await response.json();
  return data;
}

/**
 * Retrieve current status and metadata for a previously uploaded room.
 * Dispatches GET /api/rooms/{room_id}.
 */
export async function getRoom(roomId: string): Promise<RoomResponse> {
  if (!roomId || roomId.trim().length === 0) {
    throw new ApiError('Room ID is required.', 400);
  }

  const baseUrl = getApiBaseUrl();
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/rooms/${encodeURIComponent(roomId)}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
  } catch (err: unknown) {
    throw new ApiError(
      `Unable to connect to Forma backend (${baseUrl}) to fetch room details.`,
      0,
      (err as Error)?.message
    );
  }

  if (!response.ok) {
    let errorDetail = '';
    try {
      const errorJson = await response.json();
      if (errorJson && typeof errorJson.detail === 'string') {
        errorDetail = errorJson.detail;
      }
    } catch {
      // Ignore
    }

    if (response.status === 404) {
      throw new ApiError(errorDetail || `Room '${roomId}' was not found.`, 404, errorDetail);
    }
    throw new ApiError(
      errorDetail || `Failed to fetch room details (HTTP ${response.status}).`,
      response.status,
      errorDetail
    );
  }

  const data: RoomResponse = await response.json();
  return data;
}
