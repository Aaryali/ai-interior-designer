"""
Tests for the strongly typed detection schemas.

These tests require no ML dependencies (no torch/ultralytics) - only
pydantic - so they run in any environment, including CI runners or
sandboxes without GPU/heavy CV dependencies installed.
"""

import pytest
from pydantic import ValidationError

from ai.cv.object_detection.schemas import BoundingBox, Detection, DetectionResult


def test_bounding_box_valid():
    box = BoundingBox(x1=10, y1=20, x2=110, y2=220)
    assert box.width == 100
    assert box.height == 200


def test_bounding_box_rejects_x2_not_greater_than_x1():
    with pytest.raises(ValidationError):
        BoundingBox(x1=100, y1=20, x2=100, y2=220)


def test_bounding_box_rejects_y2_not_greater_than_y1():
    with pytest.raises(ValidationError):
        BoundingBox(x1=10, y1=200, x2=110, y2=150)


def test_bounding_box_rejects_negative_coordinates():
    with pytest.raises(ValidationError):
        BoundingBox(x1=-5, y1=20, x2=110, y2=220)


def test_detection_confidence_must_be_between_zero_and_one():
    box = BoundingBox(x1=0, y1=0, x2=10, y2=10)
    with pytest.raises(ValidationError):
        Detection(label="chair", confidence=1.5, bbox=box)


def test_detection_result_valid_shape():
    box = BoundingBox(x1=120, y1=240, x2=680, y2=620)
    detection = Detection(label="couch", confidence=0.94, bbox=box)

    result = DetectionResult(
        image_width=1920,
        image_height=1080,
        model="YOLOv8n (Ultralytics, COCO)",
        device="cpu",
        inference_time_ms=123.4,
        detections=[detection],
    )

    dumped = result.model_dump()
    assert dumped["image_width"] == 1920
    assert dumped["image_height"] == 1080
    assert dumped["device"] == "cpu"
    assert dumped["detections"][0]["label"] == "couch"
    assert dumped["detections"][0]["bbox"]["x1"] == 120


def test_detection_result_allows_zero_detections():
    result = DetectionResult(
        image_width=320, image_height=240, model="YOLOv8n (Ultralytics, COCO)", device="cpu"
    )
    assert result.detections == []


def test_detection_result_rejects_non_positive_dimensions():
    with pytest.raises(ValidationError):
        DetectionResult(image_width=0, image_height=240, model="x", device="cpu")
