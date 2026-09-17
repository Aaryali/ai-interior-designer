/**
 * Comprehensive Integration Verification Script for Room Upload Feature.
 * Verifies API client logic, validations, URL resolution, and live backend contracts.
 */

import { validateRoomImage, uploadRoom, getRoom, SUPPORTED_EXTENSIONS } from '../lib/api/rooms';
import { resolveImageUrl, API_BASE_URL } from '../lib/api/config';

// Polyfill minimal File in node for testing if needed
class MockFile {
  name: string;
  size: number;
  type: string;
  _content: Uint8Array;

  constructor(content: Uint8Array, name: string, options: { type?: string } = {}) {
    this._content = content;
    this.name = name;
    this.size = content.byteLength;
    this.type = options.type || '';
  }
}

async function runTests() {
  console.log('--- Starting Room Upload Integration Verification ---');
  console.log('API Base URL:', API_BASE_URL);

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`✅ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${msg}`);
      failed++;
    }
  }

  // Test 1: URL Resolution
  console.log('\n[Suite 1] Image URL Resolution');
  assert(
    resolveImageUrl('/static/rooms/abc.png') === `${API_BASE_URL}/static/rooms/abc.png`,
    'Relative path starting with / resolves to API base URL'
  );
  assert(
    resolveImageUrl('static/rooms/abc.png') === `${API_BASE_URL}/static/rooms/abc.png`,
    'Relative path without leading slash resolves to API base URL'
  );
  assert(
    resolveImageUrl('https://images.unsplash.com/photo-123') === 'https://images.unsplash.com/photo-123',
    'Absolute HTTPS URL remains unchanged'
  );
  assert(
    resolveImageUrl('blob:http://localhost:3000/123-abc') === 'blob:http://localhost:3000/123-abc',
    'Blob URL remains unchanged'
  );
  assert(resolveImageUrl('') === '', 'Empty URL returns empty string');

  // Test 2: Client-side Validation Function
  console.log('\n[Suite 2] Client-Side File Validation');
  const validJpg = new MockFile(new Uint8Array([1, 2, 3]), 'living_room.jpg', { type: 'image/jpeg' }) as unknown as File;
  const validPng = new MockFile(new Uint8Array([1, 2, 3]), 'bedroom.png', { type: 'image/png' }) as unknown as File;
  const validWebp = new MockFile(new Uint8Array([1, 2, 3]), 'studio.webp', { type: 'image/webp' }) as unknown as File;
  const invalidTxt = new MockFile(new Uint8Array([1, 2, 3]), 'notes.txt', { type: 'text/plain' }) as unknown as File;
  const emptyFile = new MockFile(new Uint8Array([]), 'empty.png', { type: 'image/png' }) as unknown as File;
  const oversizedFile = new MockFile(new Uint8Array(16 * 1024 * 1024), 'huge.png', { type: 'image/png' }) as unknown as File;

  assert(validateRoomImage(validJpg).valid === true, 'Valid JPG is accepted');
  assert(validateRoomImage(validPng).valid === true, 'Valid PNG is accepted');
  assert(validateRoomImage(validWebp).valid === true, 'Valid WEBP is accepted');

  const txtVal = validateRoomImage(invalidTxt);
  assert(txtVal.valid === false && txtVal.error?.includes('Unsupported file format'), 'TXT is rejected with clear message');

  const emptyVal = validateRoomImage(emptyFile);
  assert(emptyVal.valid === false && emptyVal.error?.includes('empty'), 'Empty file is rejected');

  const hugeVal = validateRoomImage(oversizedFile);
  assert(hugeVal.valid === false && hugeVal.error?.includes('exceeds the maximum'), 'Oversized file (>15MB) is rejected');

  // Test 3: Live Backend Integration
  console.log('\n[Suite 3] Live FastAPI Backend Communication');
  try {
    const pngBytes = new Uint8Array([
      137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82,
      0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196,
      137, 0, 0, 0, 13, 73, 68, 65, 84, 120, 156, 99, 248, 207, 192, 0,
      0, 3, 1, 1, 0, 24, 221, 141, 176, 0, 0, 0, 0, 73, 69,
      78, 68, 174, 66, 96, 130
    ]);
    const testFile = new File([pngBytes], 'living_room_test.png', { type: 'image/png' });

    const uploadRes = await uploadRoom(testFile, {
      name: 'Studio Penthouse Test',
      room_type: 'Living Room'
    });

    assert(uploadRes.status === 'uploaded', 'Upload returned status "uploaded"');
    assert(Boolean(uploadRes.room_id), `Upload returned room_id: ${uploadRes.room_id}`);
    assert(uploadRes.image_url.startsWith('/static/rooms/'), `Upload returned image_url: ${uploadRes.image_url}`);
    assert(uploadRes.message === 'Room uploaded successfully', 'Upload returned success message');

    // Retrieve the room
    const getRes = await getRoom(uploadRes.room_id);
    assert(getRes.id === uploadRes.room_id, 'GET /api/rooms/{id} returns matching ID');
    assert(getRes.status === 'uploaded', 'GET /api/rooms/{id} returns status "uploaded"');
    assert(getRes.name === 'Studio Penthouse Test', 'GET /api/rooms/{id} returns correct name');
    assert(getRes.room_type === 'Living Room', 'GET /api/rooms/{id} returns correct room_type');
    assert(getRes.image_url === uploadRes.image_url, 'GET /api/rooms/{id} returns correct image_url');

  } catch (err: unknown) {
    console.error('Integration test failed with error:', err);
    assert(false, `Live backend communication error: ${(err as Error)?.message}`);
  }

  console.log(`\n========================================`);
  console.log(`Summary: ${passed} passed, ${failed} failed.`);
  console.log(`========================================`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
