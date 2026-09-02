"""
Database engine and session management.

Intended production database: PostgreSQL (via DATABASE_URL).
Local development fallback: SQLite (see core/config.py).
"""

from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import get_settings

settings = get_settings()

_connect_args = {}
if settings.sqlalchemy_database_url.startswith("sqlite"):
    # Needed for SQLite when used with FastAPI's threaded test client / workers.
    _connect_args = {"check_same_thread": False}

engine = create_engine(
    settings.sqlalchemy_database_url,
    connect_args=_connect_args,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    """Base class for all ORM models."""


def init_db() -> None:
    """
    Create database tables if they do not already exist.

    For Phase 1 we use simple metadata.create_all(). A migration tool
    (e.g. Alembic) can be introduced later once the schema stabilizes.
    """
    # Import models here so they are registered on Base.metadata
    # before create_all() is called.
    from app.models import room  # noqa: F401

    Base.metadata.create_all(bind=engine)


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency that yields a database session per-request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
