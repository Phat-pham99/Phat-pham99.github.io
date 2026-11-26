import test from 'node:test';
import assert from 'node:assert/strict';
import { LOCALES, MESSAGES } from './messages.js';

// Lookup tables translate API values, so only Vietnamese needs entries.
const FREE_FORM = new Set(['languageNames', 'fluency']);

function assertSameShape(reference, candidate, path) {
  if (reference === null || candidate === null) {
    assert.ok(candidate === null || typeof candidate === 'string', `${path} must be null or a string`);
    return;
  }
  assert.equal(typeof candidate, typeof reference, `${path} type differs`);
  if (Array.isArray(reference)) {
    assert.equal(candidate.length, reference.length, `${path} length differs`);
    return;
  }
  if (typeof reference !== 'object') return;
  assert.deepEqual(Object.keys(candidate).sort(), Object.keys(reference).sort(), `${path} keys differ`);
  for (const key of Object.keys(reference)) {
    if (!FREE_FORM.has(key)) assertSameShape(reference[key], candidate[key], `${path}.${key}`);
  }
}

test('every picker locale has a dictionary and vice versa', () => {
  assert.deepEqual(LOCALES.map((locale) => locale.code).sort(), Object.keys(MESSAGES).sort());
});

test('every language defines the same message keys as English', () => {
  for (const [lang, messages] of Object.entries(MESSAGES)) {
    assertSameShape(MESSAGES.en, messages, lang);
  }
});

test('interpolated messages return non-empty strings', () => {
  for (const [lang, messages] of Object.entries(MESSAGES)) {
    for (const [section, entries] of Object.entries(messages)) {
      for (const [key, value] of Object.entries(entries)) {
        if (typeof value === 'function') {
          const result = value(2, 'x');
          assert.ok(typeof result === 'string' && result.length > 0, `${lang}.${section}.${key}`);
        }
      }
    }
  }
});
