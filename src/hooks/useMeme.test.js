import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchMeme } from './useMeme.js';
import { LOCAL_MEMES, pickLocalMeme } from '../data/memes.js';

test('requests a random coding meme and normalizes the payload', async (context) => {
  let requested = null;
  context.mock.method(globalThis, 'fetch', async (url) => {
    requested = url;
    return Response.json({
      url: 'https://preview.redd.it/meme.jpg?auto=webp&s=abc',
      type: 'image/jpeg',
      width: 716,
      height: 801,
    });
  });

  const meme = await fetchMeme();
  assert.equal(requested.origin + requested.pathname, 'https://api.apileague.com/retrieve-random-meme');
  assert.equal(requested.searchParams.get('keywords'), 'coding');
  assert.ok(requested.searchParams.get('api-key'));
  assert.deepEqual(meme, { url: 'https://preview.redd.it/meme.jpg?auto=webp&s=abc', width: 716, height: 801 });
});

test('honours custom keywords and falls back to unknown dimensions', async (context) => {
  let requested = null;
  context.mock.method(globalThis, 'fetch', async (url) => {
    requested = url;
    return Response.json({ url: 'https://example.com/meme.png' });
  });

  const meme = await fetchMeme({ keywords: 'python,rust' });
  assert.equal(requested.searchParams.get('keywords'), 'python,rust');
  assert.deepEqual(meme, { url: 'https://example.com/meme.png', width: undefined, height: undefined });
});

test('rejects a failed or malformed response', async (context) => {
  context.mock.method(globalThis, 'fetch', async () => Response.json({ message: 'rate limit' }, { status: 429 }));
  await assert.rejects(fetchMeme(), /HTTP 429/);

  context.mock.method(globalThis, 'fetch', async () => Response.json({ unexpected: true }));
  await assert.rejects(fetchMeme(), /Invalid meme API response/);
});

test('forwards cancellation to the request', async (context) => {
  const controller = new AbortController();
  controller.abort();
  context.mock.method(globalThis, 'fetch', async (_url, { signal }) => signal.throwIfAborted());
  await assert.rejects(fetchMeme({ signal: controller.signal }), { name: 'AbortError' });
});

test('picks a bundled local meme when the random source is unavailable', () => {
  assert.ok(LOCAL_MEMES.length >= 1);
  for (const meme of LOCAL_MEMES) {
    assert.ok(meme.id);
    assert.ok(meme.width > 0 && meme.height > 0);
    assert.ok(meme.alt.length > 10);
  }
  assert.deepEqual(pickLocalMeme(() => 0), LOCAL_MEMES[0]);
  assert.deepEqual(pickLocalMeme(() => 0.999), LOCAL_MEMES[LOCAL_MEMES.length - 1]);
});
