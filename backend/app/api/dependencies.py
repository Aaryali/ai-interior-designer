"""Shared FastAPI dependencies for the API layer."""

from collections.abc import Generator

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.storage.local_storage import LocalStorage, get_storage

__all__ = ["get_db", "get_storage", "Session", "Generator", "LocalStorage"]
