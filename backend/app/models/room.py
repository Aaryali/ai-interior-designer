"""
Room ORM model.

Represents a single uploaded room/project. Kept intentionally small
for Phase 1 - future Computer Vision analysis results, generated
designs, and product placements will be associated with a Room via
separate related tables rather than by adding many columns here.
"""

import enum
import uuid
from datetime import datetime, timezone

from sqlalchemy import DateTime, Enum, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class RoomStatus(str, enum.Enum):
    UPLOADED = "uploaded"
    ANALYZING = "analyzing"
    ANALYZED = "analyzed"
    DESIGNING = "designing"
    COMPLETED = "completed"
    FAILED = "failed"


class Room(Base):
    __tablename__ = "rooms"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    room_type: Mapped[str | None] = mapped_column(String(100), nullable=True)

    status: Mapped[RoomStatus] = mapped_column(
        Enum(RoomStatus, native_enum=False, length=20),
        default=RoomStatus.UPLOADED,
        nullable=False,
    )

    # Path (relative to the storage root) of the originally uploaded image.
    original_image_path: Mapped[str] = mapped_column(String(512), nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
