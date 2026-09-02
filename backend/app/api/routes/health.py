"""Health check endpoint."""

from fastapi import APIRouter

from app.schemas.common import HealthResponse

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    """Simple liveness check used by the frontend and deployment tooling."""
    return HealthResponse(status="ok", service="forma-backend")
