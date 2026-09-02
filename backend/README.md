# Forma Backend

Backend API for **Forma** — an AI-powered virtual interior design and product
visualization system. This backend is built with FastAPI and is designed to
grow incrementally: Phase 1 (this codebase) provides the application
foundation and a working **room upload API**. Computer Vision and Generative
AI services will be layered on top of this in later phases.

## Phase 1 Scope

- FastAPI application with versioned, modular routing
- `GET /api/health` — liveness check
- `POST /api/rooms/upload` — upload a room photo, validate it, store it, and
  create a room record
- `GET /api/rooms/{room_id}` — fetch a room's current metadata/status
- SQLAlchemy models, with PostgreSQL as the intended production database and
  a local SQLite fallback for development
- A storage abstraction (`app/storage/local_storage.py`) that currently
  writes to the local filesystem but can later be swapped for S3 / Supabase
  Storage without touching calling code
- Thin routes / fat services: business logic lives in `app/services/`, not
  in route handlers

Computer Vision, depth estimation, generative image models, and the LLM
design assistant are **not** implemented yet — this codebase only lays the
foundation those pieces will plug into later.

## Project Structure

```
backend/
├── app/
│   ├── main.py                  # FastAPI app, CORS, static files, error handlers
│   ├── core/
│   │   ├── config.py             # Settings (env-driven)
│   │   ├── database.py           # SQLAlchemy engine/session/Base
│   │   └── logging.py            # Logging setup
│   ├── api/
│   │   ├── dependencies.py       # Shared FastAPI dependencies
│   │   └── routes/
│   │       ├── health.py
│   │       └── rooms.py
│   ├── schemas/
│   │   ├── room.py               # RoomCreate / RoomResponse / RoomUploadResponse
│   │   └── common.py
│   ├── models/
│   │   └── room.py               # Room ORM model + RoomStatus enum
│   ├── services/
│   │   └── room_service.py       # Validation + business logic for rooms
│   └── storage/
│       └── local_storage.py      # Storage abstraction (local filesystem for now)
├── tests/
│   ├── conftest.py
│   ├── test_health.py
│   └── test_rooms.py
├── requirements.txt
├── .env.example
└── README.md
```

Uploaded images are written to `../storage/rooms` (relative to `backend/`)
by default, i.e. the top-level `storage/` directory in the repository — kept
outside the Python source tree.

## 1. Setup

### Create and activate a virtual environment

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` as needed. Notable variables:

| Variable         | Purpose                                                                 | Default (dev)                  |
|------------------|--------------------------------------------------------------------------|---------------------------------|
| `API_PREFIX`     | Prefix for all API routes                                               | `/api`                          |
| `FRONTEND_URL`   | Comma-separated allowed CORS origin(s) for the Next.js frontend         | `http://localhost:3000`         |
| `DATABASE_URL`   | PostgreSQL connection string (production). If blank, falls back to SQLite | *(blank → SQLite fallback)*   |
| `STORAGE_PATH`   | Local directory for uploaded images                                     | `../storage/rooms`              |
| `MAX_UPLOAD_SIZE_MB` | Maximum accepted upload size                                        | `15`                             |

No real secrets should ever be committed — only `.env.example` is tracked.

## 2. Running the Backend

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

Interactive API docs (Swagger UI):

```
http://127.0.0.1:8000/docs
```

## 3. API Endpoints

| Method | Path                     | Description                                   |
|--------|--------------------------|------------------------------------------------|
| GET    | `/api/health`            | Backend liveness check                         |
| POST   | `/api/rooms/upload`      | Upload a room image, create a room record      |
| GET    | `/api/rooms/{room_id}`   | Get a room's current metadata/status           |

### Health check

```bash
curl http://127.0.0.1:8000/api/health
```

```json
{ "status": "ok", "service": "forma-backend" }
```

### Upload a room photo

```bash
curl -X POST http://127.0.0.1:8000/api/rooms/upload \
  -F "file=@/path/to/room.jpg;type=image/jpeg" \
  -F "name=Living Room" \
  -F "room_type=living_room"
```

Example response:

```json
{
  "room_id": "53317954-32b8-4b08-a60a-6269c48b67ce",
  "status": "uploaded",
  "image_url": "/static/rooms/d0443c3ed49f46a09d9c0b39c2e2d975.jpg",
  "message": "Room uploaded successfully"
}
```

Accepted formats: JPG, JPEG, PNG, WEBP. Files are validated by MIME type,
extension, and size; client-supplied filenames are never trusted directly —
a unique, safe filename is generated on save.

### Get room status/metadata

```bash
curl http://127.0.0.1:8000/api/rooms/53317954-32b8-4b08-a60a-6269c48b67ce
```

```json
{
  "id": "53317954-32b8-4b08-a60a-6269c48b67ce",
  "name": "Living Room",
  "room_type": "living_room",
  "status": "uploaded",
  "image_url": "/static/rooms/d0443c3ed49f46a09d9c0b39c2e2d975.jpg",
  "created_at": "2026-09-01T04:08:06.346950",
  "updated_at": "2026-09-01T04:08:06.346955"
}
```

This endpoint is intended to become the main way the frontend polls
progress through later stages: `uploaded → analyzing → analyzed →
designing → completed` (or `failed`).

## 4. Testing

```bash
pytest -v
```

Tests cover:

- Health endpoint
- Successful room upload
- Unsupported file type rejection
- Oversized file rejection
- Room retrieval
- Nonexistent room (404)

Tests run against an isolated in-memory SQLite database and a temporary
storage directory — they never touch development data, and do not depend on
any external AI services.

## 5. Notes, Assumptions & Future Work

- **Database**: PostgreSQL is the intended production database
  (`DATABASE_URL`). No live Postgres instance was required for Phase 1;
  SQLite is used as a local fallback, and tables are created automatically
  on startup via `Base.metadata.create_all()`. A migration tool (e.g.
  Alembic) should be introduced before the schema evolves further.
- **Storage**: Local filesystem storage is implemented via a small
  `StorageBackend`-shaped interface so it can be swapped for S3 / Supabase
  Storage later without changing route or service code.
- **Static file serving**: Uploaded images are currently served from
  FastAPI itself at `/static/...` for convenience in local development.
  This will be replaced by real object storage URLs once a cloud backend is
  wired in.
- **No AI yet**: Computer Vision, depth estimation, generative image
  models, and the LLM design assistant are intentionally not implemented.
  The service-layer structure (`room_service` → future `cv_service` →
  `generation_service` → `recommendation_service`) is in place so those can
  be added without reworking the upload flow.
