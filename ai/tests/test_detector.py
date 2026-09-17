"""
End-to-end tests against the REAL YOLOv8n/Ultralytics detector.

These tests require `torch` and `ultralytics` to be installed (see
ai/requirements.txt) and will download `yolov8n.pt` (~6 MB) on first
run if not already cached.

They are skipped with a clear reason - not silently - if those
dependencies are not importable in the current environment (e.g. a
disk-constrained sandbox). On a normal development machine (including
the target RTX 3050 laptop) these dependencies are installed via
`pip install -r requirements.txt` and all tests below are expected to
run and pass.
"""

import pytest

torch = pytest.importorskip(
    "torch", reason="torch is not installed in this environment (see ai/requirements.txt)"
)
pytest.importorskip(
    "ultralytics", reason="ultralytics is not installed in this environment (see ai/requirements.txt)"
)

from ai.cv.object_detection.detector import InvalidImageError, ObjectDetector, resolve_device
from ai.cv.object_detection.schemas import DetectionResult


@pytest.fixture(scope="module")
def detector() -> ObjectDetector:
    return ObjectDetector()


def test_model_loads_successfully(detector: ObjectDetector):
    assert detector.model is not None
    assert len(detector.class_names) > 0


def test_device_is_explicitly_detected(detector: ObjectDetector):
    # Never assumed - must match what torch itself reports.
    expected = "cuda:0" if torch.cuda.is_available() else "cpu"
    assert detector.device == expected


def test_valid_image_inference_returns_structured_result(detector, sample_room_image):
    result = detector.detect(sample_room_image)

    assert isinstance(result, DetectionResult)
    assert result.image_width > 0
    assert result.image_height > 0
    assert result.model == "YOLOv8n (Ultralytics, COCO)"
    assert result.device == detector.device
    assert result.inference_time_ms is not None
    assert result.inference_time_ms >= 0

    for detection in result.detections:
        assert 0.0 <= detection.confidence <= 1.0
        assert detection.bbox.x2 > detection.bbox.x1
        assert detection.bbox.y2 > detection.bbox.y1
        assert detection.bbox.x2 <= result.image_width
        assert detection.bbox.y2 <= result.image_height


def test_blank_image_yields_no_or_minimal_detections(detector, blank_image):
    result = detector.detect(blank_image)
    assert isinstance(result, DetectionResult)
    assert result.detections == []


def test_missing_image_raises_invalid_image_error(detector):
    with pytest.raises(InvalidImageError):
        detector.detect("/nonexistent/path/does_not_exist.jpg")


def test_corrupt_image_raises_invalid_image_error(detector, corrupt_image_path):
    with pytest.raises(InvalidImageError):
        detector.detect(corrupt_image_path)


def test_resolve_device_matches_torch_cuda_availability():
    assert resolve_device() == ("cuda:0" if torch.cuda.is_available() else "cpu")
    assert resolve_device(prefer_cuda=False) == "cpu"
