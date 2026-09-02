"""
Application configuration.

Settings are loaded from environment variables (and a local .env file
during development). Nothing sensitive is hard-coded here.
"""

from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# Path to the backend/ directory (parent of app/)
BACKEND_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    """
    Central application settings.

    All values can be overridden via environment variables or a `.env`
    file placed in the backend/ directory (see .env.example).
    """

    model_config = SettingsConfigDict(
        env_file=str(BACKEND_DIR / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # --- General ---
    PROJECT_NAME: str = "Forma Backend"
    ENVIRONMENT: str = "development"
    API_PREFIX: str = "/api"

    # --- CORS / Frontend ---
    # Comma-separated list of allowed origins, e.g.
    # "http://localhost:3000,https://app.forma.example.com"
    FRONTEND_URL: str = "http://localhost:3000"

    # --- Database ---
    # Intended production database is PostgreSQL. If DATABASE_URL is not
    # set, we fall back to a local SQLite file so the project remains
    # runnable without a live Postgres instance during early development.
    DATABASE_URL: str = ""

    # --- Storage ---
    # Local filesystem directory used to store uploaded room images.
    # This is intentionally simple for now; app/storage/local_storage.py
    # exposes an interface that can later be backed by S3 / Supabase
    # Storage without changing calling code.
    STORAGE_PATH: str = "../storage/rooms"

    # --- Uploads ---
    MAX_UPLOAD_SIZE_MB: int = 15

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.FRONTEND_URL.split(",") if origin.strip()]

    @property
    def sqlalchemy_database_url(self) -> str:
        if self.DATABASE_URL:
            return self.DATABASE_URL
        # Development fallback only. Production is intended to use
        # PostgreSQL via DATABASE_URL.
        sqlite_path = BACKEND_DIR / "forma_dev.db"
        return f"sqlite:///{sqlite_path}"

    @property
    def storage_path(self) -> Path:
        path = Path(self.STORAGE_PATH)
        if not path.is_absolute():
            path = (BACKEND_DIR / path).resolve()
        return path

    @property
    def max_upload_size_bytes(self) -> int:
        return self.MAX_UPLOAD_SIZE_MB * 1024 * 1024


@lru_cache
def get_settings() -> Settings:
    """Return a cached Settings instance (settings are effectively immutable)."""
    return Settings()
