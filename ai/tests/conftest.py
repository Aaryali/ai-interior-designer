"""Shared pytest fixtures for the ai/cv/object_detection test suite."""

import shutil
import tempfile
from collections.abc import Generator
from pathlib import Path

import cv2
import numpy as np
import pytest


@pytest.fixture()
def temp_dir() -> Generator[Path, None, None]:
    tmp_dir = tempfile.mkdtemp(prefix="ai-cv-test-")
    yield Path(tmp_dir)
    shutil.rmtree(tmp_dir, ignore_errors=True)


@pytest.fixture()
def sample_room_image(temp_dir: Path) -> Path:
    """
    A synthetic 'room-like' image: a few solid rectangles on a plain
    background, standing in for furniture shapes. Real pretrained-model
    inference on this synthetic image is exercised in test_detector.py
    only when torch/ultralytics are actually installed; the file itself
    is also reused by visualization tests, which do not require the model.
    """
    image = np.full((480, 640, 3), (235, 235, 235), dtype=np.uint8)
    # A "sofa"-shaped rectangle
    cv2.rectangle(image, (60, 260), (320, 420), (120, 80, 40), thickness=-1)
    # A "TV"-shaped rectangle
    cv2.rectangle(image, (420, 80), (600, 220), (20, 20, 20), thickness=-1)

    path = temp_dir / "sample_room.jpg"
    cv2.imwrite(str(path), image)
    return path


@pytest.fixture()
def blank_image(temp_dir: Path) -> Path:
    """A featureless blank image, expected to yield zero (or very few) detections."""
    image = np.full((240, 320, 3), 255, dtype=np.uint8)
    path = temp_dir / "blank.jpg"
    cv2.imwrite(str(path), image)
    return path


@pytest.fixture()
def corrupt_image_path(temp_dir: Path) -> Path:
    """A file with an image extension but invalid content."""
    path = temp_dir / "corrupt.jpg"
    path.write_bytes(b"this is not a real image file")
    return path
