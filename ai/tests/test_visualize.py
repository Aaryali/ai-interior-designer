"""
Tests for visualize.py. Uses only OpenCV/numpy - no ML model required.
"""

import cv2

from ai.cv.object_detection.schemas import BoundingBox, Detection, DetectionResult
from ai.cv.object_detection.visualize import draw_detections, save_annotated_image


def _sample_result(width: int, height: int) -> DetectionResult:
    return DetectionResult(
        image_width=width,
        image_height=height,
        model="YOLOv8n (Ultralytics, COCO)",
        device="cpu",
        inference_time_ms=12.3,
        detections=[
            Detection(
                label="couch",
                confidence=0.91,
                bbox=BoundingBox(x1=60, y1=260, x2=320, y2=420),
            ),
            Detection(
                label="tv",
                confidence=0.87,
                bbox=BoundingBox(x1=420, y1=80, x2=600, y2=220),
            ),
        ],
    )


def test_draw_detections_returns_modified_copy(sample_room_image):
    original = cv2.imread(str(sample_room_image))
    result = _sample_result(width=original.shape[1], height=original.shape[0])

    annotated = draw_detections(original, result)

    assert annotated.shape == original.shape
    # The annotated image should differ from the original (boxes/labels drawn).
    assert not (annotated == original).all()


def test_draw_detections_no_detections_leaves_image_mostly_unchanged(sample_room_image):
    original = cv2.imread(str(sample_room_image))
    empty_result = DetectionResult(
        image_width=original.shape[1],
        image_height=original.shape[0],
        model="YOLOv8n (Ultralytics, COCO)",
        device="cpu",
    )

    annotated = draw_detections(original, empty_result)
    assert (annotated == original).all()


def test_save_annotated_image_creates_file(sample_room_image, temp_dir):
    original = cv2.imread(str(sample_room_image))
    result = _sample_result(width=original.shape[1], height=original.shape[0])

    output_dir = temp_dir / "cv-results"
    output_path = save_annotated_image(sample_room_image, result, output_dir=output_dir)

    assert output_path.exists()
    assert output_path.parent == output_dir
    assert output_path.name.endswith("_annotated.jpg")

    saved_image = cv2.imread(str(output_path))
    assert saved_image is not None
    assert saved_image.shape == original.shape
