"""Pydantic schemas for Room-related requests and responses."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.room import RoomStatus


class RoomCreate(BaseModel):
    """
    Fields a client may optionally supply when uploading a room image.

    All fields are optional in Phase 1 - the only strictly required
    input to the upload endpoint is the image file itself.
    """

    name: str | None = None
    room_type: str | None = None


class RoomResponse(BaseModel):
    """Full metadata for a room, returned by GET /api/rooms/{room_id}."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str | None
    room_type: str | None
    status: RoomStatus
    image_url: str
    created_at: datetime
    updated_at: datetime


class RoomUploadResponse(BaseModel):
    """Response returned immediately after a successful room upload."""

    room_id: str
    status: RoomStatus
    image_url: str
    message: str
