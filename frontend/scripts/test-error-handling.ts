/**
 * Error Handling Verification Script
 */

import { uploadRoom, getRoom } from '../lib/api/rooms';
import { ApiError } from '../lib/api/config';

async function runErrorTests() {
  console.log('--- Starting Error Handling Verification ---');
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

  // 1. Non-existent room ID (404)
  try {
    await getRoom('00000000-0000-0000-0000-000000000000');
    assert(false, 'Expected 404 error');
  } catch (err: unknown) {
    const apiErr = err as ApiError;
    assert(apiErr.statusCode === 404, '404 error code returned');
    assert(apiErr.message.includes('was not found'), 'Clean user-facing 404 message');
  }

  // 2. Unreachable backend simulation
  // Temporarily points to an unused port
  process.env.NEXT_PUBLIC_API_URL = 'http://127.0.0.1:59999';
  // Re-import with new env
  const { uploadRoom: uploadOffline } = await import('../lib/api/rooms');

  try {
    const pngBytes = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0, 13, 73, 68, 65, 84, 120, 156, 99, 248, 207, 192, 0, 0, 3, 1, 1, 0, 24, 221, 141, 176, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);
    const file = new File([pngBytes], 'offline_test.png', { type: 'image/png' });
    await uploadOffline(file);
    assert(false, 'Expected offline failure');
  } catch (err: unknown) {
    const apiErr = err as ApiError;
    assert(apiErr.statusCode === 0, 'Offline error returns status 0');
    assert(apiErr.message.includes('Unable to connect to Forma backend'), 'Returns clean friendly offline message');
    assert(!apiErr.message.includes('Traceback'), 'Does not leak python stack trace');
  }

  console.log(`\n========================================`);
  console.log(`Error Handling Summary: ${passed} passed, ${failed} failed.`);
  console.log(`========================================`);

  if (failed > 0) process.exit(1);
}

runErrorTests().catch(console.error);
