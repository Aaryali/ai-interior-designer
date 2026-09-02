"""
Room service layer.

Route handlers should stay thin and delegate business logic here.
This keeps `app/api/routes/rooms.py` easy to read and makes the
logic reusable once later stages (CV analysis, generation,
recommendations) need to interact with rooms.

Planned future flow:

    rooms route -> room_service -> cv_service -> generation_service -> recommendation_service
"""

from dataclasses import dataclass
from typing import BinaryIO

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models.room import Room, RoomStatus
from app.storage.local_storage import LocalStorage

settings = get_settings()

ALLOWED_CONTENT_TYPES = {
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
}

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


@dataclass
class RoomServiceError(Exception):
    status_code: int
    detail: str


def _validate_extension(filename: str | None) -> str:
    if not filename or "." not in filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file must have a valid filename and extension.",
        )
    extension = "." + filename.rsplit(".", 1)[-1].lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=(
                f"Unsupported file extension '{extension}'. "
                f"Allowed extensions: {', '.join(sorted(ALLOWED_EXTENSIONS))}."
            ),
        )
    return extension


def _validate_content_type(content_type: str | None) -> None:
    if content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=(
                f"Unsupported content type '{content_type}'. "
                f"Allowed types: {', '.join(sorted(ALLOWED_CONTENT_TYPES))}."
            ),
        )


def _validate_size(raw_bytes: bytes) -> None:
    if len(raw_bytes) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty.",
        )
    if len(raw_bytes) > settings.max_upload_size_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_CONTENT_TOO_LARGE,
            detail=(
                f"Uploaded file exceeds the maximum allowed size of "
                f"{settings.MAX_UPLOAD_SIZE_MB} MB."
            ),
        )


def validate_upload(file: UploadFile, raw_bytes: bytes) -> None:
    """Validate MIME type, extension, and size of an uploaded image."""
    _validate_extension(file.filename)
    _validate_content_type(file.content_type)
    _validate_size(raw_bytes)


def create_room_from_upload(
    db: Session,
    storage: LocalStorage,
    file: UploadFile,
    raw_bytes: bytes,
    name: str | None = None,
    room_type: str | None = None,
) -> Room:
    """
    Validate an uploaded image, persist it to storage, and create the
    corresponding Room record with status "uploaded".
    """
    validate_upload(file, raw_bytes)

    import io

    file_obj: BinaryIO = io.BytesIO(raw_bytes)
    relative_path = storage.save(subdir="rooms", filename=file.filename or "", file_obj=file_obj)

    room = Room(
        name=name,
        room_type=room_type,
        status=RoomStatus.UPLOADED,
        original_image_path=relative_path,
    )
    db.add(room)
    db.commit()
    db.refresh(room)
    return room


def get_room(db: Session, room_id: str) -> Room:
    room = db.get(Room, room_id)
    if room is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Room '{room_id}' was not found.",
        )
    return room


def build_image_url(storage: LocalStorage, room: Room) -> str:
    return storage.url_for(room.original_image_path)
