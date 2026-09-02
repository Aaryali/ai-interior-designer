from app.core.config import get_settings

from .conftest import make_test_image_bytes


def test_upload_room_success(client):
    image_bytes = make_test_image_bytes(fmt="PNG")

    response = client.post(
        "/api/rooms/upload",
        files={"file": ("living_room.png", image_bytes, "image/png")},
        data={"name": "My Living Room", "room_type": "living_room"},
    )

    assert response.status_code == 201
    body = response.json()

    assert body["status"] == "uploaded"
    assert body["message"] == "Room uploaded successfully"
    assert body["room_id"]
    assert body["image_url"].startswith("/static/rooms/")


def test_upload_room_unsupported_file_type(client):
    response = client.post(
        "/api/rooms/upload",
        files={"file": ("notes.txt", b"just some text", "text/plain")},
    )

    assert response.status_code == 415
    assert "Unsupported file extension" in response.json()["detail"]


def test_upload_room_oversized_file(client, monkeypatch):
    # Shrink the max upload size for this test so we don't need a huge fixture.
    settings = get_settings()
    monkeypatch.setattr(settings, "MAX_UPLOAD_SIZE_MB", 0)

    image_bytes = make_test_image_bytes(fmt="PNG")

    response = client.post(
        "/api/rooms/upload",
        files={"file": ("living_room.png", image_bytes, "image/png")},
    )

    assert response.status_code == 413
    assert "exceeds the maximum allowed size" in response.json()["detail"]


def test_get_room_success(client):
    image_bytes = make_test_image_bytes(fmt="PNG")
    upload_response = client.post(
        "/api/rooms/upload",
        files={"file": ("bedroom.png", image_bytes, "image/png")},
    )
    room_id = upload_response.json()["room_id"]

    response = client.get(f"/api/rooms/{room_id}")

    assert response.status_code == 200
    body = response.json()
    assert body["id"] == room_id
    assert body["status"] == "uploaded"
    assert body["image_url"].startswith("/static/rooms/")


def test_get_room_not_found(client):
    response = client.get("/api/rooms/does-not-exist")

    assert response.status_code == 404
    assert "was not found" in response.json()["detail"]
