# Computer Vision — Object Detection (Phase 2A)

This module is the first stage of Forma's Computer Vision pipeline:

```
Room Image
    │
    ▼
Object Detection   ← you are here
    │
    ▼
Segmentation                (future phase)
    │
    ▼
Depth / Room Geometry        (future phase)
    │
    ▼
Room Understanding           (future phase)
    │
    ▼
Generative AI                (future phase)
```

It detects furniture/interior objects in a room photo and returns a
strongly typed, structured result — no Generative AI, segmentation,
depth estimation, or recommendation logic is implemented here.

This module is intentionally **isolated** from `backend/`: it has its
own virtual environment and its own `requirements.txt`, and does not
import anything from, or get imported by, the existing FastAPI backend
yet. See "Future FastAPI Integration" below for how that will happen.

---

## 1. Model choice

**YOLOv8n ("nano") from [Ultralytics](https://docs.ultralytics.com/), pretrained on COCO.**

| Priority (from project requirements) | Why YOLOv8n/Ultralytics fits |
|---|---|
| Reliability | Actively maintained, widely used in production and academic projects, stable Python API. |
| Reasonable inference speed | Real-time even on CPU; effectively instant per image on an RTX 3050. |
| Easy local setup | `pip install ultralytics` pulls PyTorch automatically; pretrained weights (`yolov8n.pt`, ~6 MB) auto-download on first use. |
| Clean Python architecture | Returns structured `Results` objects (boxes, classes, confidences) — no manual NMS/box-decoding needed. |
| Easy FastAPI integration | `model.predict(image)` works identically from a CLI script or a backend route. |
| Ability to replace/fine-tune later | Ultralytics has first-class, well-documented support for fine-tuning YOLOv8 on a custom dataset — important since several categories this project wants (see Limitations) aren't in COCO. |

An earlier iteration of this module used OpenCV's `cv2.dnn` module with
YOLOv4-tiny/Darknet weights (no PyTorch, ~24 MB total). That approach
was replaced because: (a) it is much harder to fine-tune on a custom
dataset than the Ultralytics/PyTorch ecosystem, and (b) the target
development machine has an NVIDIA RTX 3050, so GPU-accelerated PyTorch
inference is both available and worth using.

## 2. Object detection pipeline

```
image_path
    │
    ▼
ObjectDetector.detect(image_path)
    │  - loads image, validates it exists/decodes
    │  - runs YOLOv8n inference (GPU if available, else CPU)
    │  - converts Ultralytics' Results into typed Detection objects
    ▼
DetectionResult (Pydantic)
    │
    ├──► visualize.save_annotated_image(...)   → storage/cv-results/*.jpg
    └──► (future) FastAPI route / backend service
```

## 3. Input / output format

**Input:** a path to a room image (JPG/PNG/etc.), or a `DetectionResult` when only visualizing.

**Output — `DetectionResult`:**

```json
{
  "image_width": 1920,
  "image_height": 1080,
  "model": "YOLOv8n (Ultralytics, COCO)",
  "device": "cuda:0",
  "inference_time_ms": 18.4,
  "detections": [
    {
      "label": "couch",
      "confidence": 0.94,
      "bbox": { "x1": 120, "y1": 240, "x2": 680, "y2": 620 }
    }
  ]
}
```

**Bounding box convention:** absolute pixel coordinates relative to the
original (unresized) image, top-left `(x1, y1)` to bottom-right
`(x2, y2)`, with `x` increasing rightward and `y` increasing downward
(`0 <= x1 < x2 <= image_width`, `0 <= y1 < y2 <= image_height`). This is
documented directly in `schemas.py` and is the format the backend and
frontend should assume.

**`device`** is never assumed — it reports the actual device
(`"cuda:0"` or `"cpu"`) that `torch.cuda.is_available()` resolved to at
inference time (see `detector.resolve_device()`).

## 4. GPU / CPU behavior

- On a machine with an NVIDIA GPU + driver installed (e.g. the target
  **RTX 3050** laptop), `pip install -r requirements.txt` installs a
  CUDA-enabled PyTorch build, and `ObjectDetector` automatically runs
  on `cuda:0`.
- On a machine without a supported GPU, PyTorch/Ultralytics
  transparently fall back to CPU — same code, same output format, just
  slower. No code changes are required either way.
- The code never *assumes* CUDA is present: `resolve_device()` calls
  `torch.cuda.is_available()` directly and reports whatever it finds.

## 5. Installation

Work inside `ai/` with its own **isolated virtual environment** —
do not install these dependencies into `backend/.venv`.

```bash
cd ai
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

This installs `ultralytics` (which pulls in a matching PyTorch build),
`opencv-python-headless`, `pydantic`, `Pillow`, and `pytest`.

`yolov8n.pt` (~6 MB) downloads automatically the first time you run
detection and is cached locally by Ultralytics (not committed to
source control).

## 6. Running inference

From the **repository root** (the parent of `ai/`, so that `ai` is
importable as a package):

```bash
python -m ai.cv.object_detection.cli path/to/room.jpg
```

Optional flags:

```bash
python -m ai.cv.object_detection.cli path/to/room.jpg \
  --output-dir storage/cv-results \
  --confidence 0.4 \
  --room-only        # restrict output to interior-relevant COCO classes
```

This prints the structured JSON `DetectionResult` to stdout, prints the
actual inference device to stderr, and saves an annotated copy of the
image (bounding boxes, labels, confidence scores) to
`storage/cv-results/<name>_annotated.jpg`.

Programmatic use (this is also the shape future FastAPI integration will call):

```python
from ai.cv.object_detection.service import get_detection_service

service = get_detection_service()
result = service.detect("path/to/room.jpg")
print(result.model_dump_json(indent=2))
```

## 7. Example output

```
$ python -m ai.cv.object_detection.cli storage/rooms/living_room.jpg
Using device: cuda:0
{
  "image_width": 1600,
  "image_height": 1200,
  "model": "YOLOv8n (Ultralytics, COCO)",
  "device": "cuda:0",
  "inference_time_ms": 14.2,
  "detections": [
    {
      "label": "couch",
      "confidence": 0.93,
      "bbox": { "x1": 102, "y1": 410, "x2": 890, "y2": 980 }
    },
    {
      "label": "tv",
      "confidence": 0.88,
      "bbox": { "x1": 1020, "y1": 140, "x2": 1400, "y2": 520 }
    },
    {
      "label": "potted plant",
      "confidence": 0.71,
      "bbox": { "x1": 40, "y1": 300, "x2": 220, "y2": 900 }
    }
  ]
}
Annotated image saved to: storage/cv-results/living_room_annotated.jpg
```

## 8. Testing

```bash
cd ai   # dependencies installed into ai/.venv
source .venv/bin/activate
cd ..   # run pytest from the repository root so `ai` is importable
python -m pytest ai/tests -v
```

Test files:

| File | Requires torch/ultralytics? | Covers |
|---|---|---|
| `test_schemas.py` | No | BoundingBox/Detection/DetectionResult validation |
| `test_visualize.py` | No | Box/label drawing, annotated image saving |
| `test_service.py` | No | Service delegation/caching via an injected fake detector |
| `test_detector.py` | **Yes** | Real model load, real inference, no-detections case, missing/corrupt image handling, device detection |

`test_detector.py` uses `pytest.importorskip` and is skipped (with a
clear reason, not silently) in any environment where `torch`/
`ultralytics` aren't installed. On a normal development machine —
including the target RTX 3050 laptop — installing
`requirements.txt` makes these dependencies available and all tests
are expected to run and pass.

## 9. Limitations

- **COCO class coverage.** YOLOv8n is pretrained on the 80 COCO
  classes. Of the categories this project wants, COCO provides:
  `chair`, `couch` (sofa), `bed`, `dining table`, `tv`, `laptop`,
  `potted plant`, `book`, `clock`, `vase`. COCO has **no** classes for
  `cabinet`, `bookshelf`, `desk`, `lamp`, `door`, or `window` — the
  model cannot detect these out of the box.
- **Future fine-tuning path.** To cover the missing categories, the
  plan is to fine-tune this same YOLOv8n architecture on a small,
  custom-labeled interior-image dataset (e.g. via Roboflow or manual
  annotation + Ultralytics' `model.train()`), which the Ultralytics
  ecosystem supports directly. This is why YOLOv8n/Ultralytics was
  chosen over a harder-to-fine-tune detector.
- **Single-image, 2D only.** No multi-angle consistency, no depth, no
  3D reasoning — that is future-phase work (Segmentation → Depth →
  Room Understanding).
- **Confidence threshold sensitivity.** Default confidence threshold is
  0.5; cluttered or dim room photos may need a lower threshold
  (`--confidence 0.3`, for example) at some cost to precision.

## 10. Future FastAPI Integration (not yet implemented)

`ai/cv/object_detection/service.py` exposes exactly the call shape a
future FastAPI route will use:

```python
from ai.cv.object_detection.service import get_detection_service

service = get_detection_service()
result = service.detect(image_path)   # returns a DetectionResult
```

When this is wired into `backend/`, the plan is: the room upload flow
already stores the image and creates a `Room` record with status
`"uploaded"`; a later endpoint (e.g. `POST /api/rooms/{room_id}/analyze`)
would call `get_detection_service().detect(room.original_image_path)`,
persist the result, and update the room's status to `"analyzed"`. No
backend code needed to change for this phase — the CV module was built
to be called from a backend without needing backend changes yet.
