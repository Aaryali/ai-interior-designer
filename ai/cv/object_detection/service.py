"""
Object detection service.

This is the entry point later Phase 2 backend integration should call.
It deliberately returns structured Python/Pydantic data (never prints,
never hardcodes results), so it can be called directly from a FastAPI
route once integration is ready:

    from ai.cv.object_detection.service import get_detection_service

    service = get_detection_service()
    result = service.detect(image_path)

The service lazily loads and caches a single `ObjectDetector` instance
so the (relatively expensive) model load only happens once per process.

Note: the default `ObjectDetector` (and therefore `torch`/`ultralytics`)
is only imported when actually needed - i.e. when no `detector` is
injected. This keeps the service usable/testable with a lightweight
stand-in detector without requiring the full ML stack to be installed.
"""

from functools import lru_cache
from pathlib import Path
from typing import Protocol

from .schemas import DetectionResult


class Detects(Protocol):
    """Structural interface any detection backend must implement."""

    def detect(self, image_path: str | Path) -> DetectionResult: ...


class ObjectDetectionService:
    """Thin façade around a detection backend for use by other modules/backends."""

    def __init__(self, detector: Detects | None = None) -> None:
        if detector is None:
            # Imported lazily so this module doesn't force a torch/ultralytics
            # import path unless we actually need the default model backend.
            from .detector import ObjectDetector

            detector = ObjectDetector()
        self._detector = detector

    def detect(self, image_path: str | Path) -> DetectionResult:
        """Run object detection on `image_path` and return structured results."""
        return self._detector.detect(image_path)


@lru_cache
def get_detection_service() -> ObjectDetectionService:
    """Return a process-wide cached detection service (loads the model once)."""
    return ObjectDetectionService()

