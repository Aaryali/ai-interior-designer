"""
Storage abstraction.

`StorageBackend` defines the minimal interface the rest of the backend
depends on. `LocalStorage` is the Phase 1 implementation, writing files
to the local filesystem. Later this can be swapped for an S3 / Supabase
Storage backed implementation without changing any calling code, as
long as the new class implements the same interface.
"""

import uuid
from pathlib import Path
from typing import BinaryIO, Protocol

from app.core.config import get_settings

settings = get_settings()


class StorageBackend(Protocol):
    """Minimal interface any storage backend (local, S3, Supabase...) must implement."""

    def save(self, subdir: str, filename: str, file_obj: BinaryIO) -> str:
        """Persist `file_obj` and return a relative path/key that can be used to retrieve it."""
        ...

    def url_for(self, relative_path: str) -> str:
        """Return a URL/path the frontend can use to access the stored file."""
        ...


class LocalStorage:
    """Filesystem-backed storage used during local development."""

    def __init__(self, root: Path | None = None) -> None:
        self.root = root or settings.storage_path
        self.root.mkdir(parents=True, exist_ok=True)

    def build_safe_filename(self, original_filename: str) -> str:
        """
        Generate a safe, unique filename.

        We never trust the client-supplied filename directly - only the
        file extension (lower-cased, validated by the caller) is kept.
        """
        suffix = Path(original_filename or "").suffix.lower()
        return f"{uuid.uuid4().hex}{suffix}"

    def save(self, subdir: str, filename: str, file_obj: BinaryIO) -> str:
        target_dir = self.root / subdir
        target_dir.mkdir(parents=True, exist_ok=True)

        safe_filename = self.build_safe_filename(filename)
        target_path = target_dir / safe_filename

        with open(target_path, "wb") as out_file:
            file_obj.seek(0)
            out_file.write(file_obj.read())

        # Return a path relative to the storage root - this is what
        # gets persisted in the database, keeping the DB decoupled
        # from any particular storage backend's absolute paths.
        return f"{subdir}/{safe_filename}"

    def url_for(self, relative_path: str) -> str:
        """
        Build a URL the frontend can use to fetch the stored file.

        Phase 1 serves files directly from FastAPI via a static mount
        at `/static`. This will be replaced by a cloud storage URL
        (e.g. a signed S3/Supabase URL) later.
        """
        return f"/static/{relative_path}"


def get_storage() -> LocalStorage:
    return LocalStorage()
