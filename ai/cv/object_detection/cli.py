"""
CLI entry point for running object detection on a single room image.

Usage:
    python -m ai.cv.object_detection.cli path/to/room.jpg
    python -m ai.cv.object_detection.cli path/to/room.jpg --output-dir storage/cv-results --confidence 0.4

Prints the structured JSON detection result to stdout and saves an
annotated image (boxes + labels + confidence scores) to the output
directory.
"""

import argparse
import json
import sys
from pathlib import Path

from .detector import DEFAULT_CONFIDENCE_THRESHOLD, InvalidImageError, ModelLoadError, ObjectDetector
from .visualize import save_annotated_image


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="python -m ai.cv.object_detection.cli",
        description="Run YOLOv8n object detection on a room image and save an annotated copy.",
    )
    parser.add_argument("image_path", type=str, help="Path to the input room image.")
    parser.add_argument(
        "--output-dir",
        type=str,
        default="storage/cv-results",
        help="Directory to save the annotated image into (default: storage/cv-results).",
    )
    parser.add_argument(
        "--confidence",
        type=float,
        default=DEFAULT_CONFIDENCE_THRESHOLD,
        help=f"Confidence threshold, 0-1 (default: {DEFAULT_CONFIDENCE_THRESHOLD}).",
    )
    parser.add_argument(
        "--room-only",
        action="store_true",
        help="Restrict output to interior/room-relevant COCO classes only.",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)

    try:
        detector = ObjectDetector(
            confidence_threshold=args.confidence,
            restrict_to_room_labels=args.room_only,
        )
    except ModelLoadError as exc:
        print(f"Error loading model: {exc}", file=sys.stderr)
        return 1

    print(f"Using device: {detector.device}", file=sys.stderr)

    try:
        result = detector.detect(args.image_path)
    except InvalidImageError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    print(json.dumps(result.model_dump(), indent=2))

    annotated_path = save_annotated_image(args.image_path, result, output_dir=args.output_dir)
    print(f"Annotated image saved to: {annotated_path}", file=sys.stderr)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
