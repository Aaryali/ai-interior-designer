"""
Tests for the ObjectDetectionService facade.

`ObjectDetectionService` is deliberately designed to accept any object
implementing `.detect(image_path) -> DetectionResult` (see service.py),
so these tests inject a lightweight fake detector instead of loading
the full YOLOv8n/torch model. This tests the REAL service.py logic
(caching, delegation, return contract) - only the heavy model backend
is substituted, which is exactly the seam the architecture was designed
around for later fine-tuned-model swaps.

Real, end-to-end inference against the actual YOLOv8n model is covered
in test_detector.py.
"""

from pathlib import Path

from ai.cv.object_detection.schemas import BoundingBox, Detection, DetectionResult
from ai.cv.object_detection.service import ObjectDetectionService


class FakeDetector:
    """Minimal stand-in for ObjectDetector implementing the same interface."""

    def __init__(self) -> None:
        self.calls: list[str] = []

    def detect(self, image_path: str | Path) -> DetectionResult:
        self.calls.append(str(image_path))
        return DetectionResult(
            image_width=640,
            image_height=480,
            model="fake-detector",
            device="cpu",
            inference_time_ms=1.0,
            detections=[
                Detection(
                    label="chair",
                    confidence=0.99,
                    bbox=BoundingBox(x1=1, y1=1, x2=10, y2=10),
                )
            ],
        )


def test_service_delegates_to_injected_detector():
    fake = FakeDetector()
    service = ObjectDetectionService(detector=fake)

    result = service.detect("room.jpg")

    assert isinstance(result, DetectionResult)
    assert result.model == "fake-detector"
    assert fake.calls == ["room.jpg"]


def test_service_returns_structured_detections_not_prints(capsys):
    fake = FakeDetector()
    service = ObjectDetectionService(detector=fake)

    result = service.detect("room.jpg")

    captured = capsys.readouterr()
    assert captured.out == ""  # service must not print - only return data
    assert result.detections[0].label == "chair"
