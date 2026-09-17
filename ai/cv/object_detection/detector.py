"""
Object detector — YOLOv8n (Ultralytics), COCO-pretrained.

See ai/README.md for the full rationale behind this model choice, GPU/CPU
behavior, and current class-coverage limitations.

Device selection
-----------------
The device actually used for inference is detected via
`torch.cuda.is_available()` at construction time and is never assumed
or hard-coded. If a CUDA-capable GPU (e.g. an RTX 3050) is present and
its driver is installed, inference runs on `cuda:0`; otherwise it
transparently falls back to `cpu`. The resolved device is reported back
on every `DetectionResult` (see `schemas.py`), so callers/logs always
show what actually ran, not what was hoped for.

Weights
-------
`yolov8n.pt` (~6 MB) is downloaded automatically by Ultralytics on
first use and cached locally (by default under the Ultralytics config
directory, e.g. `~/.cache/ultralytics` / the Ultralytics "weights"
cache). It is NOT committed to source control.
"""

import time
from pathlib import Path

import torch
from ultralytics import YOLO

from .schemas import BoundingBox, Detection, DetectionResult

MODEL_WEIGHTS = "yolov8n.pt"
MODEL_NAME = "YOLOv8n (Ultralytics, COCO)"

DEFAULT_CONFIDENCE_THRESHOLD = 0.5
DEFAULT_IOU_THRESHOLD = 0.45

# Interior/room-relevant COCO classes this capstone project cares about.
# YOLOv8n/COCO does NOT include classes for "cabinet", "bookshelf", "desk",
# "lamp", "door" or "window" - see README "Limitations" and "Future
# fine-tuning" for how those will eventually be added via a custom-trained
# head on top of this same architecture.
ROOM_RELEVANT_LABELS = {
    "chair",
    "couch",  # commonly referred to as "sofa"
    "bed",
    "dining table",
    "tv",
    "laptop",
    "potted plant",
    "book",
    "clock",
    "vase",
}


class ModelLoadError(RuntimeError):
    """Raised when the detection model cannot be loaded."""


class InvalidImageError(ValueError):
    """Raised when the input image cannot be read/decoded."""


def resolve_device(prefer_cuda: bool = True) -> str:
    """
    Determine the actual inference device.

    Never assumes CUDA is available - always checks `torch.cuda.is_available()`
    directly. Returns 'cuda:0' only when a usable CUDA device is genuinely
    detected, otherwise 'cpu'.
    """
    if prefer_cuda and torch.cuda.is_available():
        return "cuda:0"
    return "cpu"


class ObjectDetector:
    """
    Thin, backend-agnostic wrapper around an Ultralytics YOLO model.

    Usage:
        detector = ObjectDetector()
        result = detector.detect("path/to/room.jpg")
        print(detector.device)  # actual device used, e.g. "cuda:0" or "cpu"
    """

    def __init__(
        self,
        weights: str | Path = MODEL_WEIGHTS,
        confidence_threshold: float = DEFAULT_CONFIDENCE_THRESHOLD,
        iou_threshold: float = DEFAULT_IOU_THRESHOLD,
        restrict_to_room_labels: bool = False,
        device: str | None = None,
    ) -> None:
        self.confidence_threshold = confidence_threshold
        self.iou_threshold = iou_threshold
        self.restrict_to_room_labels = restrict_to_room_labels

        # Explicit device detection - never assumed. Callers may force a
        # specific device (e.g. "cpu") for testing via the `device` arg.
        self.device = device or resolve_device()

        try:
            self.model = YOLO(str(weights))
            self.model.to(self.device)
        except Exception as exc:  # pragma: no cover - defensive
            raise ModelLoadError(
                f"Failed to load YOLO weights '{weights}': {exc}"
            ) from exc

        self.class_names: dict[int, str] = self.model.names

    def _validate_image(self, image_path: str | Path) -> Path:
        path = Path(image_path)
        if not path.exists():
            raise InvalidImageError(f"Image file not found: {path}")
        if path.stat().st_size == 0:
            raise InvalidImageError(f"Image file is empty: {path}")
        return path

    def detect(self, image_path: str | Path) -> DetectionResult:
        """
        Run object detection on a single image.

        Returns a `DetectionResult` with structured detections, the
        model name, the actual inference device, and timing. Raises
        `InvalidImageError` for missing/unreadable images.
        """
        path = self._validate_image(image_path)

        start = time.perf_counter()
        try:
            results = self.model.predict(
                source=str(path),
                conf=self.confidence_threshold,
                iou=self.iou_threshold,
                device=self.device,
                verbose=False,
            )
        except Exception as exc:
            raise InvalidImageError(
                f"Could not run inference on image (unsupported or corrupt file): {path} ({exc})"
            ) from exc
        elapsed_ms = (time.perf_counter() - start) * 1000.0

        if not results:
            # Ultralytics does not always raise for an unreadable/corrupt
            # image - it can instead return an empty results list. Treat
            # that the same as any other invalid image.
            raise InvalidImageError(
                f"Could not run inference on image (unsupported or corrupt file): {path}"
            )

        result = results[0]
        height, width = result.orig_shape

        detections: list[Detection] = []
        for box in result.boxes:
            class_id = int(box.cls.item())
            label = self.class_names.get(class_id, f"class_{class_id}")

            if self.restrict_to_room_labels and label not in ROOM_RELEVANT_LABELS:
                continue

            confidence = float(box.conf.item())
            x1, y1, x2, y2 = (int(v) for v in box.xyxy[0].tolist())

            detections.append(
                Detection(
                    label=label,
                    confidence=round(confidence, 4),
                    bbox=BoundingBox(x1=x1, y1=y1, x2=x2, y2=y2),
                )
            )

        return DetectionResult(
            image_width=width,
            image_height=height,
            model=MODEL_NAME,
            device=self.device,
            inference_time_ms=round(elapsed_ms, 2),
            detections=detections,
        )
