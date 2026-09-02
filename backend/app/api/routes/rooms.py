"""Room upload and retrieval endpoints."""

from fastapi import APIRouter, Depends, File, Form, UploadFile, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, get_storage
from app.schemas.room import RoomResponse, RoomUploadResponse
from app.services import room_service
from app.storage.local_storage import LocalStorage

router = APIRouter(prefix="/rooms", tags=["rooms"])


@router.post(
    "/upload",
    response_model=RoomUploadResponse,
    status_code=status.HTTP_201_CREATED,
)
async def upload_room(
    file: UploadFile = File(..., description="Room photograph (JPG, PNG, or WEBP)"),
    name: str | None = Form(default=None),
    room_type: str | None = Form(default=None),
    db: Session = Depends(get_db),
    storage: LocalStorage = Depends(get_storage),
) -> RoomUploadResponse:
    """
    Upload a room photograph.

    This creates a new room record with status "uploaded". Computer
    Vision analysis and AI generation are handled by later phases and
    are intentionally not triggered here.
    """
    raw_bytes = await file.read()

    room = room_service.create_room_from_upload(
        db=db,
        storage=storage,
        file=file,
        raw_bytes=raw_bytes,
        name=name,
        room_type=room_type,
    )

    return RoomUploadResponse(
        room_id=room.id,
        status=room.status,
        image_url=room_service.build_image_url(storage, room),
        message="Room uploaded successfully",
    )


@router.get("/{room_id}", response_model=RoomResponse)
def get_room(
    room_id: str,
    db: Session = Depends(get_db),
    storage: LocalStorage = Depends(get_storage),
) -> RoomResponse:
    """Return current metadata and status for a room."""
    room = room_service.get_room(db, room_id)

    return RoomResponse(
        id=room.id,
        name=room.name,
        room_type=room.room_type,
        status=room.status,
        image_url=room_service.build_image_url(storage, room),
        created_at=room.created_at,
        updated_at=room.updated_at,
    )
