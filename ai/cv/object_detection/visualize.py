"""
Visualization utilities: draw bounding boxes, labels, and confidence
scores for a `DetectionResult` onto its source image, and save the
annotated result.

Kept dependency-light (OpenCV + numpy only) so it can be reused by the
CLI, by tests, and later directly by a FastAPI route without pulling in
anything beyond what `detector.py` already requires.
"""

from pathlib import Path

import cv2
import numpy as np

from .schemas import DetectionResult

BOX_COLOR = (46, 204, 113)  # BGR - a readable green
TEXT_COLOR = (255, 255, 255)
BOX_THICKNESS = 2
FONT = cv2.FONT_HERSHEY_SIMPLEX
FONT_SCALE = 0.5
FONT_THICKNESS = 1


def draw_detections(image: np.ndarray, result: DetectionResult) -> np.ndarray:
    """
    Draw all detections in `result` onto a copy of `image` and return it.

    `image` is expected to be a BGR array as read by `cv2.imread`, with
    dimensions matching `result.image_width` / `result.image_height`.
    """
    annotated = image.copy()

    for detection in result.detections:
        box = detection.bbox
        cv2.rectangle(
            annotated, (box.x1, box.y1), (box.x2, box.y2), BOX_COLOR, BOX_THICKNESS
        )

        label_text = f"{detection.label} {detection.confidence:.2f}"
        (text_w, text_h), baseline = cv2.getTextSize(
            label_text, FONT, FONT_SCALE, FONT_THICKNESS
        )

        label_bg_top = max(0, box.y1 - text_h - baseline - 4)
        cv2.rectangle(
            annotated,
            (box.x1, label_bg_top),
            (box.x1 + text_w + 4, box.y1),
            BOX_COLOR,
            thickness=-1,
        )
        cv2.putText(
            annotated,
            label_text,
            (box.x1 + 2, box.y1 - 4),
            FONT,
            FONT_SCALE,
            TEXT_COLOR,
            FONT_THICKNESS,
            lineType=cv2.LINE_AA,
        )

    return annotated


def save_annotated_image(
    image_path: str | Path,
    result: DetectionResult,
    output_dir: str | Path = "storage/cv-results",
) -> Path:
    """
    Load `image_path`, draw `result`'s detections on it, and save the
    annotated image into `output_dir` as `<original_name>_annotated.jpg`.

    Returns the path to the saved annotated image.
    """
    image_path = Path(image_path)
    image = cv2.imread(str(image_path))
    if image is None:
        raise ValueError(f"Could not read image for visualization: {image_path}")

    annotated = draw_detections(image, result)

    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    output_path = output_dir / f"{image_path.stem}_annotated.jpg"
    cv2.imwrite(str(output_path), annotated)
    return output_path
