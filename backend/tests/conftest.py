"""Shared pytest fixtures for the Forma backend tests."""

import io
import shutil
import tempfile
from collections.abc import Generator
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from PIL import Image
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.api.dependencies import get_db, get_storage
from app.core.database import Base
from app.main import app
from app.storage.local_storage import LocalStorage


@pytest.fixture()
def temp_storage_dir() -> Generator[Path, None, None]:
    tmp_dir = tempfile.mkdtemp(prefix="forma-test-storage-")
    yield Path(tmp_dir)
    shutil.rmtree(tmp_dir, ignore_errors=True)


@pytest.fixture()
def client(temp_storage_dir: Path) -> Generator[TestClient, None, None]:
    """
    A TestClient wired to an isolated in-memory SQLite database and a
    temporary storage directory, so tests never touch real dev data.
    """
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)

    def override_get_db() -> Generator:
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    def override_get_storage() -> LocalStorage:
        return LocalStorage(root=temp_storage_dir)

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_storage] = override_get_storage

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()


def make_test_image_bytes(fmt: str = "PNG", size: tuple[int, int] = (32, 32)) -> bytes:
    """Generate an in-memory valid image file for upload tests."""
    buffer = io.BytesIO()
    image = Image.new("RGB", size, color=(200, 100, 50))
    image.save(buffer, format=fmt)
    buffer.seek(0)
    return buffer.read()
