"""
Strongly typed schemas for object detection results.

Bounding box convention
------------------------
Bounding boxes are expressed in **absolute pixel coordinates**, relative
to the top-left corner of the original (unresized) input image:

    x1, y1  -> top-left corner of the box
    x2, y2  -> bottom-right corner of the box

    x increases to the right, y increases downward.
    0 <= x1 < x2 <= image_width
    0 <= y1 < y2 <= image_height

This matches the common convention used by most CV bounding-box
libraries (e.g. Pillow's ImageDraw.rectangle, COCO-style x1y1x2y2 boxes)
and is the format the FastAPI backend / frontend should expect when
this module is later wired into the API layer.
"""

from pydantic import BaseModel, Field, field_validator


class BoundingBox(BaseModel):
    """Absolute pixel bounding box: top-left (x1, y1) to bottom-right (x2, y2)."""

    x1: int = Field(..., ge=0, description="Left edge, in pixels from the image's left border.")
    y1: int = Field(..., ge=0, description="Top edge, in pixels from the image's top border.")
    x2: int = Field(..., ge=0, description="Right edge, in pixels from the image's left border.")
    y2: int = Field(..., ge=0, description="Bottom edge, in pixels from the image's top border.")

    @field_validator("x2")
    @classmethod
    def _x2_after_x1(cls, x2: int, info) -> int:
        x1 = info.data.get("x1")
        if x1 is not None and x2 <= x1:
            raise ValueError("x2 must be greater than x1")
        return x2

    @field_validator("y2")
    @classmethod
    def _y2_after_y1(cls, y2: int, info) -> int:
        y1 = info.data.get("y1")
        if y1 is not None and y2 <= y1:
            raise ValueError("y2 must be greater than y1")
        return y2

    @property
    def width(self) -> int:
        return self.x2 - self.x1

    @property
    def height(self) -> int:
        return self.y2 - self.y1


class Detection(BaseModel):
    """A single detected object."""

    label: str = Field(..., description="Class name predicted by the model, e.g. 'sofa'.")
    confidence: float = Field(
        ..., ge=0.0, le=1.0, description="Model confidence score for this detection, 0-1."
    )
    bbox: BoundingBox


class DetectionResult(BaseModel):
    """
    Full result of running object detection on a single image.
    """

    image_width: int = Field(..., gt=0)
    image_height: int = Field(..., gt=0)
    model: str = Field(..., description="Model name/version used for inference.")
    device: str = Field(
        ..., description="Actual compute device used for inference, e.g. 'cuda:0' or 'cpu'."
    )
    inference_time_ms: float | None = Field(
        None, description="Wall-clock inference time in milliseconds, if measured."
    )
    detections: list[Detection] = Field(default_factory=list)
