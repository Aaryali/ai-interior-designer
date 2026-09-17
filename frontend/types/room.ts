/**
 * TypeScript definitions for Room entity and FastAPI upload contracts.
 * Matches backend schemas in backend/app/schemas/room.py.
 */

export type RoomStatusType = 'uploaded' | 'analyzing' | 'analyzed' | 'failed';

export interface RoomUploadResponse {
  room_id: string;
  status: RoomStatusType | string;
  image_url: string;
  message: string;
}

export interface RoomResponse {
  id: string;
  name: string | null;
  room_type: string | null;
  status: RoomStatusType | string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface UploadRoomOptions {
  name?: string;
  room_type?: string;
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}
