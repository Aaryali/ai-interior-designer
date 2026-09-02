"""
Forma Backend - FastAPI application entrypoint.

Phase 1 scope: application setup, health check, and the room upload
workflow. Computer Vision and Generative AI services are added in
later phases on top of this foundation.
"""

import logging
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from app.api.routes import health, rooms
from app.core.config import get_settings
from app.core.database import init_db
from app.core.logging import configure_logging, get_logger

settings = get_settings()

configure_logging(level=logging.INFO)
logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    logger.info("Starting %s (environment=%s)", settings.PROJECT_NAME, settings.ENVIRONMENT)
    init_db()
    logger.info("Database ready. Storage path: %s", settings.storage_path)
    yield
    logger.info("Shutting down %s", settings.PROJECT_NAME)


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        description=(
            "Backend API for Forma - an AI-powered virtual interior design "
            "and product visualization system."
        ),
        version="0.1.0",
        lifespan=lifespan,
    )

    # --- CORS ---
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # --- Static files (Phase 1 local storage) ---
    # Serves uploaded room images from local disk. This mount will be
    # removed once storage moves to a cloud provider with its own URLs.
    settings.storage_path.mkdir(parents=True, exist_ok=True)
    app.mount("/static", StaticFiles(directory=str(settings.storage_path)), name="static")

    # --- Routers ---
    app.include_router(health.router, prefix=settings.API_PREFIX)
    app.include_router(rooms.router, prefix=settings.API_PREFIX)

    # --- Error handling ---
    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
        return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
        # Never leak internal exception details to clients.
        logger.exception("Unhandled exception while processing %s %s", request.method, request.url)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "Internal server error."},
        )

    return app


app = create_app()
